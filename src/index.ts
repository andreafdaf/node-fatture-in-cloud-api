import BaseFattureInCloudAPI from './classes/base-fatture-in-cloud-api'

import * as endpoints from './endpoints'

export = class FattureInCloudAPI extends BaseFattureInCloudAPI {
  acquisti = new endpoints.Acquisti()
  client = new endpoints.Clienti()
  fornitori = new endpoints.Fornitori()
  corrispettivi = new endpoints.Corrispettivi()
  fatture = new endpoints.Fatture()
  ricevute = new endpoints.Ricevute()
  preventivi = new endpoints.Preventivi()
  ordini = new endpoints.Ordini()
  ndc = new endpoints.Ndc()
  proforma = new endpoints.Proforma()
  rapporti = new endpoints.Rapporti()
  ordforn = new endpoints.Ordforn()
  ddt = new endpoints.Ddt()
  info = new endpoints.Info()
  magazzino = new endpoints.Magazzino()
  mail = new endpoints.Mail()
  prodotti = new endpoints.Prodotti()

  constructor () {
    super()

    for (const [path, endpoint] of (Object.entries(endpoints.EndpointsEnum))) {
      const root = Reflect.get(this, path)
      for (const [method] of Object.keys(endpoint)) {
        const rateLimitedRequest = this.buildRequest({ path, method })
        Reflect.set(root, method, rateLimitedRequest)
      }
    }
  }
}
