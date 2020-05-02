import { RequestFunction } from './lib/base-rate-limited-api'

export interface IFattureInCloudResponse {
  success: boolean
  [key: string]: any
}

export interface IFattureInCloudRequestFunction extends RequestFunction {
  (data: object): Promise<IFattureInCloudResponse>
}
