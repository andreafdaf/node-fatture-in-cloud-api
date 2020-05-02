import { BaseEndpoint } from '../types'
import noop from '../utils/noop'

export class Magazzino implements BaseEndpoint {
  lista = noop
  dettagli = noop
}
