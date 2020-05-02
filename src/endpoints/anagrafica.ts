import BaseEndpoint from '../utils/base-endpoint'
import noop from '../utils/noop'

class Anagrafica extends BaseEndpoint {
  lista = noop
  nuovo = noop
  importa = noop
  modifica = noop
  elimina = noop
}

export class Clienti extends Anagrafica {}
export class Fornitori extends Anagrafica {}
