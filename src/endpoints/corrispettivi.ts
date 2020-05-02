import BaseEndpoint from '../data/base-endpoint'
import noop from '../data/noop'

const methods = {
  lista: noop,
  nuovo: noop,
  modifica: noop,
  elimina: noop,
}

export default class Corrispettivi extends BaseEndpoint {
  corrispettivi = { ...methods }
}
