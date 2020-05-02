import { BaseEndpoint } from '../types'
import noop from '../utils/noop'

export class Prodotti implements BaseEndpoint {
  lista = noop
  nuovo = noop
  importa = noop
  modifica = noop
  elimina = noop
}
