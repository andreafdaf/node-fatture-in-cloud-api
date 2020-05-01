import { post } from 'request-promise-native'

import BaseFattureInCloudAPI, {
  FattureInCloudResponse,
  FattureInCloudRequestFunction,
} from './classes/base-fatture-in-cloud-api'
import endpoints, {
  Endpoint,
  BaseEnum,
  SimpleFacetEnum,
  CompositeFacetEnum,
  MethodEnum,
} from './data/endpoints'

type Route = {
  request: FattureInCloudRequestFunction
  base?: keyof typeof BaseEnum
  facet: keyof typeof SimpleFacetEnum | keyof typeof CompositeFacetEnum
  method: keyof typeof MethodEnum
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
    base,
    facets,
    methods,
  }: Endpoint) {
    const routes = facets.reduce((acc, facet) => {
      const facetRoutes =  methods.map(method => {
        const request = this.buildRequest({
          path: facet,
          method,
        })
  
        return { request, base, facet, method } as Route
      })

      return acc.concat(facetRoutes)
    }, [] as Route[])

    return routes
  }

  private initMethods () {
    const routes: Route[] = []
    for (const e of endpoints) {
      routes.push(...this.buildEndpoint(e))
    }

    for (const { request, base, facet, method } of routes) {
      const rateLimitedRequest = this.rateLimitedRequestFactory<
        FattureInCloudRequestFunction,
        FattureInCloudResponse,
        Error
      >(request)

      // we need reflection because TS won't let us access those properties programmatically
      const root = base
        ? Reflect.get(this, base)
        : this
      const where = Reflect.get(root, facet)
      Reflect.set(where, method, rateLimitedRequest)
      // end reflection trick
    }
  }
}

export = new FattureInCloudAPI()
