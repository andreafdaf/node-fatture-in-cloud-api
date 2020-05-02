import BaseEndpoint from '../data/base-endpoint'
import noop from '../data/noop'

const methods = {
  lista: noop,
  dettagli: noop,
  nuovo: noop,
  modifica: noop,
  elimina: noop,
}

export default class Acquisti extends BaseEndpoint {
  acquisti = { ...methods }
}
