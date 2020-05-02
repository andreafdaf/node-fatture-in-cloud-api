import BaseFattureInCloudAPI from './classes/base-fatture-in-cloud-api'
import { IFattureInCloudAPI, EndpointsEnum, EndpointsEnumValues, MethodsEnumValues } from './types'
import * as endpoints from './endpoints'

export = class FattureInCloudAPI
  extends BaseFattureInCloudAPI
  implements IFattureInCloudAPI {
  acquisti = new endpoints.Acquisti()
  clienti = new endpoints.Clienti()
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

    for (const [path] of (Object.entries(EndpointsEnum) as [EndpointsEnumValues, EndpointsEnum][])) {
      for (const method of Object.keys(this[path]) as MethodsEnumValues[]) {
        const rateLimitedRequest = this.buildRequest({ path, method })
        Reflect.set(this[path], method, rateLimitedRequest)
      }
    }
  }
}
