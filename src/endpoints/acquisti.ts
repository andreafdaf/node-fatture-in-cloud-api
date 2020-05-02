import { BaseEndpoint } from '../types'
import noop from '../utils/noop'

export default class Acquisti implements BaseEndpoint {
  lista = noop
  dettagli = noop
  nuovo = noop
  modifica = noop
  elimina = noop
}
