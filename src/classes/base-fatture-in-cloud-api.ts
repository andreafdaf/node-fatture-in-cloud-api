import BaseRateLimitedAPI, { RequestFunction } from './base-rate-limited-api'

import {
  BaseEnum,
  SimpleFacetEnum,
  CompositeFacetEnum,
  MethodEnum,
} from '../data/endpoints'

type Credentials = {
  api_uid: string
  api_key: string
}

export interface FattureInCloudResponse {
  success: boolean
  [key: string]: any
}

export interface FattureInCloudRequestFunction extends RequestFunction {
  (data: object): Promise<FattureInCloudResponse>
}

type FattureInCloudMethod = {
  [method in keyof typeof MethodEnum]?: FattureInCloudRequestFunction
}

type FattureInCloudFacetEndpoint = {
  [facet in keyof typeof SimpleFacetEnum]?: FattureInCloudMethod
}

type FattureInCloudCompositeEndpoint = {
  [base in keyof typeof BaseEnum]: {
    [facet in keyof typeof CompositeFacetEnum]?: FattureInCloudMethod
  }
}

const noop = <FattureInCloudRequestFunction> (async () => ({}))

export default class BaseFattureInCloudAPI
  extends BaseRateLimitedAPI
  implements FattureInCloudFacetEndpoint, FattureInCloudCompositeEndpoint
{
  baseUrl = 'https://api.fattureincloud.it/v1'

  #credentials: Credentials = {
    api_uid: process.env.FATTURE_IN_CLOUD_API_UID || '',
    api_key: process.env.FATTURE_IN_CLOUD_API_KEY || '',
  }

  constructor() {
    super()
    this.rateLimiting = {
      rpm: Number(process.env.FATTURE_IN_CLOUD_API_RPM) || 30,
      rph: Number(process.env.FATTURE_IN_CLOUD_API_RPH) || 500,
    }
  }

  get credentials (): Credentials {
    return { ...this.#credentials }
  }

  set credentials (value: Credentials) {
    this.#credentials = {
      ...this.#credentials,
      ...value,
    }
  }

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
