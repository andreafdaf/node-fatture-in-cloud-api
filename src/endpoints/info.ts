import BaseEndpoint from '../data/base-endpoint'
import noop from '../data/noop'

const methods = {
  account: noop,
}

export default class Info extends BaseEndpoint {
  info = { ...methods }
}
