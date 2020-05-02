import BaseEndpoint from '../data/base-endpoint'
import noop from '../data/noop'

const methods = {
  lista: noop,
}

export default class Mail extends BaseEndpoint {
  mail = { ...methods }
}
