import { BaseEndpoint } from '../types'
import noop from '../utils/noop'

export default class Magazzino implements BaseEndpoint {
  lista = noop
  dettagli = noop
}
