import { BaseEndpoint } from '../types'
import noop from '../utils/noop'

export default class Info implements BaseEndpoint {
  account = noop
}
