import { FattureInCloudEndpoints, EndpointsEnum } from './classes/fatture-in-cloud-endpoints'
import BaseEndpoint from './data/base-endpoint'

class FattureInCloudAPI extends FattureInCloudEndpoints {
  constructor () {
    super()
    this.initMethods()
  }

  private initMethods (): void {
    // we need reflection because TS won't let us access those properties programmatically
    for (const [base, e] of Object.entries(EndpointsEnum)) {
      const endpoint: BaseEndpoint = this[e]
      const root = endpoint.composite
        ? Reflect.get(this, base)
        : this
      for (const [path, methods] of Object.entries(endpoint)) {
        const where = Reflect.get(root, path)
        for (const [method] of Object.entries(methods)) {
          const rateLimitedRequest = this.buildRequest({ path, method })
          Reflect.set(where, method, rateLimitedRequest)
        }
      }
    }
  }
}

export = FattureInCloudAPI
