import BaseEndpoint from '../data/base-endpoint'
import noop from '../data/noop'

const methods = {
  lista: noop,
  dettagli: noop,
}

export default class Magazzino extends BaseEndpoint {
  magazzino = { ...methods }
}
