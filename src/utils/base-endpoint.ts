import { IFattureInCloudRequestFunction } from "../types";

export default class BaseEndpoint {
  [key: string]: IFattureInCloudRequestFunction
}
