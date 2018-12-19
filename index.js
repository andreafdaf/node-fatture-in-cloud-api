const EventEmitter = require('events')
const uuidv4 = require('uuid/v4')
const { post } = require('request-promise-native')

const endpoints = require('./endpoints')

const camelCaseJoin = require('./utils/camel-case-join')

const {
  SECOND_IN_MILLISECONDS,
  MINUTE_IN_MILLISECONDS,
  HOUR_IN_MILLISECONDS,
} = require('./constants')

const {
  buildRequest,
  buildEndpoint,
  buildEndpointWithFacets,
  scheduleTick,
  tick,
  rateLimitedRequest,
  rateLimitedRequestFactory,
  initMethods,
} = require('./symbols/methods')
const {
  baseUrl,
  queue,
  emitter,
  credentials,
  rateLimiting,
  hourTickStart,
  minuteTickStart,
  scheduledTick,
  requestsInHourTick,
  requestsInMinuteTick,
} = require('./symbols/properties')

class FattureInCloudAPI {
  constructor () {
    this.methods = []
    this[baseUrl] = 'https://api.fattureincloud.it/v1'
    this[queue] = []
    this[emitter] = new EventEmitter()
    this[credentials] = {
      api_uid: process.env.FATTURE_IN_CLOUD_API_UID,
      api_key: process.env.FATTURE_IN_CLOUD_API_KEY,
    }
    this[rateLimiting] = {
      rpm: process.env.FATTURE_IN_CLOUD_API_RPM || 30,
      rph: process.env.FATTURE_IN_CLOUD_API_RPH || 500,
    }
    this[hourTickStart] = 0
    this[minuteTickStart] = 0
    this[requestsInHourTick] = 0
    this[requestsInMinuteTick] = 0
    this[initMethods]()
  }

  get credentials () {
    return Object.assign({}, this[credentials])
  }

  set credentials ({ api_uid, api_key }) { // eslint-disable-line camelcase
    Object.assign(this[credentials], { api_uid, api_key })
  }

  get rateLimiting () {
    return Object.assign({}, this[rateLimiting])
  }

  set rateLimiting ({ rpm, rph }) {
    Object.assign(this[rateLimiting], { rpm, rph })
  }

  get Class () {
    return FattureInCloudAPI
  }

  [buildRequest] ({
    path = '',
    method = '',
  }) {
    return async (data) => {
      const body = Object.assign({}, data, this[credentials])

      const response = await post({
        json: true,
        url: `${this[baseUrl]}/${path}/${method}`,
        body,
      })

      if (!response.success) {
        return Promise.reject(response)
      }

      return response
    }
  }

  [buildEndpoint] ({
    name = '',
    facet = '',
    methods = [],
  }) {
    const routes = methods.map(method => {
      const request = this[buildRequest]({
        path: facet || name,
        method,
      })
      const title = camelCaseJoin([ method, name, facet ])

      return { request, title }
    })

    return routes
  }

  [buildEndpointWithFacets] ({
    name = '',
    facets = '',
    methods = [],
  }) {
    const routes = facets.reduce((acc, facet) => {
      const facetRoutes = this[buildEndpoint]({
        name,
        facet,
        methods,
      })

      return acc.concat(facetRoutes)
    }, [])

    return routes
  }

  [scheduleTick] (duration, diff) {
    if (!this[scheduledTick]) {
      this[scheduledTick] = setTimeout(
        () => this[tick](),
        duration - diff + SECOND_IN_MILLISECONDS
      )
    }
  }

  async [tick] () {
    const { rpm, rph } = this[rateLimiting]

    const now = Date.now()
    const diffHour = now - this[hourTickStart]
    const diffMinute = now - this[minuteTickStart]

    // check if it's the start of a new tick
    if (diffHour > HOUR_IN_MILLISECONDS) {
      this[hourTickStart] = now
      this[requestsInHourTick] = 0
    }
    if (diffMinute > MINUTE_IN_MILLISECONDS) {
      this[minuteTickStart] = now
      this[requestsInMinuteTick] = 0
    }

    // check if request is over quota and schedule a new tick if not already scheduled
    if (this[requestsInHourTick] >= rph) {
      this[scheduleTick](HOUR_IN_MILLISECONDS, diffHour)
      return
    }
    if (this[requestsInMinuteTick] >= rpm) {
      this[scheduleTick](MINUTE_IN_MILLISECONDS, diffMinute)
      return
    }

    delete this[scheduledTick]

    const nRequestsHour = rph - this[requestsInHourTick]
    const nRequestsMinute = rpm - this[requestsInMinuteTick]
    const nRequests = Math.min(nRequestsHour, nRequestsMinute)

    const batch = this[queue].splice(0, nRequests)

    this[requestsInHourTick] += batch.length
    this[requestsInMinuteTick] += batch.length

    for (const element of batch) {
      const { request, key, data } = element

      try {
        const response = await request(data)
        this[emitter].emit(key, { response })
      } catch (error) {
        this[emitter].emit(key, { error })
      }
    }
  }

  [rateLimitedRequest] ({ request, data }) {
    return new Promise((resolve, reject) => {
      const key = uuidv4()

      this[queue].push({
        request,
        key,
        data: JSON.parse(JSON.stringify(data)),
      })
      this[emitter].on(key, ({ error, response }) => {
        if (error) {
          reject(error)
        } else {
          resolve(response)
        }
      })
      this[tick]()
    })
  }

  [rateLimitedRequestFactory] (request) {
    return (data = {}) => {
      return this[rateLimitedRequest]({ request, data })
    }
  }

  [initMethods] () {
    for (const e of endpoints) {
      const routes = e.facets
        ? this[buildEndpointWithFacets](e)
        : this[buildEndpoint](e)

      for (const route of routes) {
        const { request, title } = route
        const _title = `_${title}`

        // method prefixed with underscore is not rate limited and executed right away
        this[_title] = request
        // method not prefixed with underscore is rate limited and runs through the queue
        this[title] = this[rateLimitedRequestFactory](this[_title])
        this.methods.push(title)
      }
    }
  }
}

module.exports = new FattureInCloudAPI()
