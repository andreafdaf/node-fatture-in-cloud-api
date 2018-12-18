const EventEmitter = require('events')
const uuidv4 = require('uuid/v4')
const { post } = require('request-promise-native')

const endpoints = require('./endpoints')

const camelCaseJoin = require('./utils/camel-case-join')

const {
  buildRequest,
  buildEndpoint,
  buildEndpointWithFacets,
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
  tickStart,
  tickScheduled,
  requestsInTick,
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
    this[tickStart] = 0
    this[initMethods]()
  }

  get credentials () {
    return Object.assign({}, this[credentials])
  }

  set credentials ({ api_uid, api_key }) { // eslint-disable-line camelcase
    Object.assign(this[credentials], { api_uid, api_key })
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

  async [tick] () {
    const REQUESTS_PER_MINUTE = 30

    const now = Date.now()
    const diff = now - this[tickStart]

    if (diff > 60000) {
      this[tickStart] = now
      this[requestsInTick] = 0
      delete this[tickScheduled]
    } else if (this[requestsInTick] >= REQUESTS_PER_MINUTE) {
      if (this[tickScheduled]) {
        return
      }
      this[tickScheduled] = setTimeout(() => this[tick](), 61000)
      return
    }

    const nRequests = REQUESTS_PER_MINUTE - this[requestsInTick]
    const batch = this[queue].splice(0, nRequests)
    this[requestsInTick] += batch.length

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
