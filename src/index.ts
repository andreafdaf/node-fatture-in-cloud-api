import { post } from 'request-promise-native'

import BaseFattureInCloudAPI from './classes/base-fatture-in-cloud-api'
import { RequestFunction } from './classes/base-rate-limited-api'
import endpoints, {
  Endpoint,
  BaseEnumValues,
  SimpleFacetEnumValues,
  CompositeFacetEnumValues,
  MethodEnumValues,
} from './data/endpoints'

interface IFattureInCloudResponse {
  success: boolean
  [key: string]: any
}

interface IFattureInCloudRequestFunction extends RequestFunction {
  (data: object): Promise<IFattureInCloudResponse>
}

type FattureInCloudMethod = {
  [method in MethodEnumValues]?: IFattureInCloudRequestFunction
}

type FattureInCloudFacetEndpoint = {
  [facet in SimpleFacetEnumValues]: FattureInCloudMethod
}

type FattureInCloudCompositeEndpoint = {
  [base in BaseEnumValues]: {
    [facet in CompositeFacetEnumValues]?: FattureInCloudMethod
  }
}

type Route = {
  request: IFattureInCloudRequestFunction
  base?: BaseEnumValues
  facet: SimpleFacetEnumValues | CompositeFacetEnumValues
  method: MethodEnumValues
}

const noop = (() => ({})) as IFattureInCloudRequestFunction

class FattureInCloudAPI
  extends BaseFattureInCloudAPI
  implements FattureInCloudFacetEndpoint, FattureInCloudCompositeEndpoint
{
  constructor () {
    super()
    this.initMethods()
  }

  private buildRequest ({ path, method }: { path: string, method: string }): IFattureInCloudRequestFunction {
    return (async (data: object = {}) => {
      const body = {
        ...data,
        ...this.credentials,
      }

      const response: IFattureInCloudResponse = await post({
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
    }) as IFattureInCloudRequestFunction
  }

  private buildEndpoint ({ base, facets, methods }: Endpoint): Route[] {
    return facets.reduce((acc, facet) => {
      const facetRoutes =  methods.map(method => {
        const request = this.buildRequest({
          path: facet,
          method,
        })

        return { request, base, facet, method } as Route
      })

      return acc.concat(facetRoutes)
    }, [] as Route[])
  }

  private initMethods (): void {
    const routes: Route[] = []
    for (const e of endpoints) {
      routes.push(...this.buildEndpoint(e))
    }

    for (const { request, base, facet, method } of routes) {
      const rateLimitedRequest = this.rateLimitedRequestFactory<
        IFattureInCloudRequestFunction,
        IFattureInCloudResponse,
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
