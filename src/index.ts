import { post } from 'request-promise-native'

import { RequestFunction } from './classes/base-rate-limited-api'
import BaseFattureInCloudAPI from './classes/base-fatture-in-cloud-api'
import endpoints from './data/endpoints'
import camelCaseJoin from './utils/camel-case-join'
import { MethodsEnum } from './data/methods'

type FattureInCloudResponse = {
  success: boolean
  [key: string]: any
}

interface FattureInCloudRequestFunction extends RequestFunction {
  (data: object): Promise<FattureInCloudResponse>
}

type Route = {
  request: FattureInCloudRequestFunction,
  title: MethodsEnum,
}

class FattureInCloudAPI extends BaseFattureInCloudAPI {
  constructor () {
    super()
    this.initMethods()
  }

  get Class () {
    return FattureInCloudAPI
  }

  private buildRequest ({
    path = '',
    method = '',
  }: { path: string, method: string }): FattureInCloudRequestFunction {
    return async (data: object = {}) => {
      const body = {
        ...data,
        ...this.credentials,
      }

      const response: FattureInCloudResponse = await post({
        json: true,
        url: `${this.baseUrl}/${path}/${method}`,
        body,
      })

      if (!response.success) {
        const error = new Error('FattureInCloud error')
        Object.assign(error, response)
        throw error
      }

      return response
    }
  }

  private buildEndpoint ({
    name = '',
    methods = [],
    facet = '',
  }: { name: string, methods: string[], facet?: string }): Route[] {
    const routes = methods.map(method => {
      const request = this.buildRequest({
        path: facet || name,
        method,
      })
      const title = camelCaseJoin([ method, name, facet ]) as MethodsEnum

      return { request, title } as Route
    })

    return routes
  }

  private buildEndpointWithFacets ({
    name = '',
    methods = [],
    facets = [],
  }: { name: string, methods: string[], facets: string[] }) {
    const routes = facets.reduce((acc, facet) => {
      const facetRoutes = this.buildEndpoint({
        name,
        facet,
        methods,
      })

      return acc.concat(facetRoutes)
    }, [] as Route[])

    return routes
  }

  private initMethods () {
    const routes: Route[] = []

    for (const e of endpoints) {
      const endpointRoutes = e.facets.length
        ? this.buildEndpointWithFacets(e)
        : this.buildEndpoint(e)

      routes.push(...endpointRoutes)
    }

    for (const { request, title } of routes) {
      this[title] = this.rateLimitedRequestFactory<
        FattureInCloudRequestFunction,
        FattureInCloudResponse,
        Error
      >(request)
    }
  }
}

const a = async () => {
  const b = new FattureInCloudAPI()
  const c = await b.listaAcquisti({})
}
a()

export = new FattureInCloudAPI()
