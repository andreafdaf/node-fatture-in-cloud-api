import BaseEndpoint from '../data/base-endpoint'
import noop from '../data/noop'

const methods = {
  lista: noop,
  dettagli: noop,
  nuovo: noop,
  modifica: noop,
  elimina: noop,
  info: noop,
  infomail: noop,
  inviamail: noop,
}

export default class Documenti extends BaseEndpoint {
  composite = true
  fatture = { ...methods }
  ricevute = { ...methods }
  preventivi = { ...methods }
  ordini = { ...methods }
  ndc = { ...methods }
  proforma = { ...methods }
  rapporti = { ...methods }
  ordforn = { ...methods }
  ddt = { ...methods }
}
