import { BaseEndpoint } from '../types'
import noop from '../utils/noop'

export class Info implements BaseEndpoint {
  account = noop
}
