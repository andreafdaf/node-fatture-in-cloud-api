import BaseEndpoint from '../utils/base-endpoint'
import noop from '../utils/noop'

export default class Magazzino extends BaseEndpoint {
  lista = noop
  dettagli = noop
}
