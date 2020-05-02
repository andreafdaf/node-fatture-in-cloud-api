import BaseEndpoint from '../data/base-endpoint'
import noop from '../data/noop'

const methods = {
  lista: noop,
  nuovo: noop,
  importa: noop,
  modifica: noop,
  elimina: noop,
}

export default class Prodotti extends BaseEndpoint {
  prodotti = { ...methods }
}
