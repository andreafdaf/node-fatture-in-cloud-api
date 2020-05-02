import BaseEndpoint from '../utils/base-endpoint'
import noop from '../utils/noop'

export default class Corrispettivi extends BaseEndpoint {
  lista = noop
  nuovo = noop
  modifica = noop
  elimina = noop
}
