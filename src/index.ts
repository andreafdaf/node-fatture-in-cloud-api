import { post } from 'request-promise-native'

import BaseFattureInCloudAPI from './classes/base-fatture-in-cloud-api'
import { RequestFunction } from './classes/base-rate-limited-api'
import endpoints, {
  Endpoint,
  BaseEnum,
  SimpleFacetEnum,
  CompositeFacetEnum,
  MethodEnum,
} from './data/endpoints'

interface FattureInCloudResponse {
  success: boolean
  [key: string]: any
}

interface FattureInCloudRequestFunction extends RequestFunction {
  (data: object): Promise<FattureInCloudResponse>
}

type FattureInCloudMethod = {
  [method in keyof typeof MethodEnum]?: FattureInCloudRequestFunction
}

type FattureInCloudFacetEndpoint = {
  [facet in keyof typeof SimpleFacetEnum]: FattureInCloudMethod
}

type FattureInCloudCompositeEndpoint = {
  [base in keyof typeof BaseEnum]: {
    [facet in keyof typeof CompositeFacetEnum]?: FattureInCloudMethod
  }
}

type Route = {
  request: FattureInCloudRequestFunction
  base?: keyof typeof BaseEnum
  facet: keyof typeof SimpleFacetEnum | keyof typeof CompositeFacetEnum
  method: keyof typeof MethodEnum
}

const noop = <FattureInCloudRequestFunction> (async () => ({}))

class FattureInCloudAPI
  extends BaseFattureInCloudAPI  
  implements FattureInCloudFacetEndpoint, FattureInCloudCompositeEndpoint
{
  constructor () {
    super()
    this.initMethods()
  }

  get Class () {
    return FattureInCloudAPI
  }

  private buildRequest ({ path, method }: { path: string, method: string }) {
    return <FattureInCloudRequestFunction> (async (data: object = {}) => {
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
    })
  }

  private buildEndpoint ({ base, facets, methods }: Endpoint) {
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

  // the following are here because we want .d.ts files to be generated correctly
  anagrafica = {
    clienti: {
      lista: noop,
      nuovo: noop,
      importa: noop,
      modifica: noop,
      elimina: noop,
    },
    fornitori: {
      lista: noop,
      nuovo: noop,
      importa: noop,
      modifica: noop,
      elimina: noop,
    },
  }

  prodotti = {
    lista: noop,
    nuovo: noop,
    importa: noop,
    modifica: noop,
    elimina: noop,
  }

  documenti = {
    fatture: {
      lista: noop,
      dettagli: noop,
      nuovo: noop,
      modifica: noop,
      elimina: noop,
      info: noop,
      infomail: noop,
      inviamail: noop,
    },
    ricevute: {
      lista: noop,
      dettagli: noop,
      nuovo: noop,
      modifica: noop,
      elimina: noop,
      info: noop,
      infomail: noop,
      inviamail: noop,
    },
    preventivi: {
      lista: noop,
      dettagli: noop,
      nuovo: noop,
      modifica: noop,
      elimina: noop,
      info: noop,
      infomail: noop,
      inviamail: noop,
    },
    ordini: {
      lista: noop,
      dettagli: noop,
      nuovo: noop,
      modifica: noop,
      elimina: noop,
      info: noop,
      infomail: noop,
      inviamail: noop,
    },
    ndc: {
      lista: noop,
      dettagli: noop,
      nuovo: noop,
      modifica: noop,
      elimina: noop,
      info: noop,
      infomail: noop,
      inviamail: noop,
    },
    proforma: {
      lista: noop,
      dettagli: noop,
      nuovo: noop,
      modifica: noop,
      elimina: noop,
      info: noop,
      infomail: noop,
      inviamail: noop,
    },
    rapporti: {
      lista: noop,
      dettagli: noop,
      nuovo: noop,
      modifica: noop,
      elimina: noop,
      info: noop,
      infomail: noop,
      inviamail: noop,
    },
    ordforn: {
      lista: noop,
      dettagli: noop,
      nuovo: noop,
      modifica: noop,
      elimina: noop,
      info: noop,
      infomail: noop,
      inviamail: noop,
    },
    ddt: {
      lista: noop,
      dettagli: noop,
      nuovo: noop,
      modifica: noop,
      elimina: noop,
      info: noop,
      infomail: noop,
      inviamail: noop,
    },
  }

  acquisti = {
    lista: noop,
    dettagli: noop,
    nuovo: noop,
    modifica: noop,
    elimina: noop,
  }

  corrispettivi = {
    lista: noop,
    nuovo: noop,
    modifica: noop,
    elimina: noop,
  }

  magazzino = {
    lista: noop,
    dettagli: noop,
  }

  mail = {
    lista: noop,
  }

  info = {
    account: noop,
  }
}

export = new FattureInCloudAPI()
