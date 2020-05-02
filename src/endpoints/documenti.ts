import { BaseEndpoint } from '../types'
import noop from '../utils/noop'

class Documenti implements BaseEndpoint {
  lista = noop
  dettagli = noop
  nuovo = noop
  modifica = noop
  elimina = noop
  info = noop
  infomail = noop
  inviamail = noop
}

export class Fatture extends Documenti {}
export class Ricevute extends Documenti {}
export class Preventivi extends Documenti {}
export class Ordini extends Documenti {}
export class Ndc extends Documenti {}
export class Proforma extends Documenti {}
export class Rapporti extends Documenti {}
export class Ordforn extends Documenti {}
export class Ddt extends Documenti {}
