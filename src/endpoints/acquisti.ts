import BaseEndpoint from '../utils/base-endpoint'
import noop from '../utils/noop'

export default class Acquisti extends BaseEndpoint {
  lista = noop
  dettagli = noop
  nuovo = noop
  modifica = noop
  elimina = noop
}
