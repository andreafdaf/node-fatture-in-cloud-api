import { BaseEndpoint } from '../types'
import noop from '../utils/noop'

export default class Mail implements BaseEndpoint {
  lista = noop
}
