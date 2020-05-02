import { BaseEndpoint } from '../types'
import noop from '../utils/noop'

export default class Corrispettivi implements BaseEndpoint {
  lista = noop
  nuovo = noop
  modifica = noop
  elimina = noop
}
