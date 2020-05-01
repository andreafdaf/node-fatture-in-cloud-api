import BaseRateLimitedAPI from './base-rate-limited-api'

type Credentials = {
  api_uid: string
  api_key: string
}

export default class BaseFattureInCloudAPI extends BaseRateLimitedAPI {
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
}
