import BaseEndpoint from '../utils/base-endpoint'
import noop from '../utils/noop'

export default class Prodotti extends BaseEndpoint {
  lista = noop
  nuovo = noop
  importa = noop
  modifica = noop
  elimina = noop
}
