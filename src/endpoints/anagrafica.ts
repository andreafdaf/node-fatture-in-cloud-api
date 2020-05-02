import { BaseEndpoint } from '../types'
import noop from '../utils/noop'

class Anagrafica implements BaseEndpoint {
  lista = noop
  nuovo = noop
  importa = noop
  modifica = noop
  elimina = noop
}

export class Clienti extends Anagrafica {}
export class Fornitori extends Anagrafica {}
