import { post } from 'request-promise-native'

import BaseRateLimitedAPI from '../lib/base-rate-limited-api'
import { IFattureInCloudRequestFunction, IFattureInCloudResponse } from '../types'

type Credentials = {
  api_uid: string
  api_key: string
}

export default class BaseFattureInCloudAPI
  extends BaseRateLimitedAPI<IFattureInCloudRequestFunction, IFattureInCloudResponse, Error> {
  baseUrl = 'https://api.fattureincloud.it/v1'

  #credentials: Credentials = {
    api_uid: process.env.FATTURE_IN_CLOUD_API_UID || '', // eslint-disable-line @typescript-eslint/camelcase
    api_key: process.env.FATTURE_IN_CLOUD_API_KEY || '', // eslint-disable-line @typescript-eslint/camelcase
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

  constructor () {
    super()
    this.rateLimiting = {
      rpm: Number(process.env.FATTURE_IN_CLOUD_API_RPM) || 30,
      rph: Number(process.env.FATTURE_IN_CLOUD_API_RPH) || 500,
    }
  }

  protected buildRequest ({ path, method }: { path: string, method: string }): IFattureInCloudRequestFunction {
    const request = (async (data: object = {}) => {
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
    })

    return this.rateLimitedRequestFactory(request)
  }
}
