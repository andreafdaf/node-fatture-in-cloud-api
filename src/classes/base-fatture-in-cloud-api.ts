import BaseRateLimitedAPI, { RequestFunction } from './base-rate-limited-api'

import { MethodsEnum } from '../data/methods'

type Credentials = {
  api_uid: string
  api_key: string
}

type FattureInCloudType = {
  [m in MethodsEnum]: RequestFunction
}

export default class BaseFattureInCloudAPI extends BaseRateLimitedAPI implements FattureInCloudType {
  baseUrl = 'https://api.fattureincloud.it/v1'

  #credentials: Credentials = {
    api_uid: process.env.FATTURE_IN_CLOUD_API_UID || '',
    api_key: process.env.FATTURE_IN_CLOUD_API_KEY || '',
  }

  constructor() {
    super()
    this.rateLimiting = {
      rpm: Number(process.env.FATTURE_IN_CLOUD_API_RPM) || 30,
      rph: Number(process.env.FATTURE_IN_CLOUD_API_RPH) || 500,
    }
  }

  get credentials (): Credentials {
    return { ...this.#credentials }
  }

  set credentials (value: Credentials) {
    this.#credentials = {
      ...this.#credentials,
      ...value,
    }
  }

  listaAnagraficaClienti: RequestFunction = async () => null
  nuovoAnagraficaClienti: RequestFunction = async () => null
  importaAnagraficaClienti: RequestFunction = async () => null
  modificaAnagraficaClienti: RequestFunction = async () => null
  eliminaAnagraficaClienti: RequestFunction = async () => null
  listaAnagraficaFornitori: RequestFunction = async () => null
  nuovoAnagraficaFornitori: RequestFunction = async () => null
  importaAnagraficaFornitori: RequestFunction = async () => null
  modificaAnagraficaFornitori: RequestFunction = async () => null
  eliminaAnagraficaFornitori: RequestFunction = async () => null
  listaProdotti: RequestFunction = async () => null
  nuovoProdotti: RequestFunction = async () => null
  importaProdotti: RequestFunction = async () => null
  modificaProdotti: RequestFunction = async () => null
  eliminaProdotti: RequestFunction = async () => null
  listaDocumentiFatture: RequestFunction = async () => null
  dettagliDocumentiFatture: RequestFunction = async () => null
  nuovoDocumentiFatture: RequestFunction = async () => null
  modificaDocumentiFatture: RequestFunction = async () => null
  eliminaDocumentiFatture: RequestFunction = async () => null
  infoDocumentiFatture: RequestFunction = async () => null
  infomailDocumentiFatture: RequestFunction = async () => null
  inviamailDocumentiFatture: RequestFunction = async () => null
  listaDocumentiRicevute: RequestFunction = async () => null
  dettagliDocumentiRicevute: RequestFunction = async () => null
  nuovoDocumentiRicevute: RequestFunction = async () => null
  modificaDocumentiRicevute: RequestFunction = async () => null
  eliminaDocumentiRicevute: RequestFunction = async () => null
  infoDocumentiRicevute: RequestFunction = async () => null
  infomailDocumentiRicevute: RequestFunction = async () => null
  inviamailDocumentiRicevute: RequestFunction = async () => null
  listaDocumentiPreventivi: RequestFunction = async () => null
  dettagliDocumentiPreventivi: RequestFunction = async () => null
  nuovoDocumentiPreventivi: RequestFunction = async () => null
  modificaDocumentiPreventivi: RequestFunction = async () => null
  eliminaDocumentiPreventivi: RequestFunction = async () => null
  infoDocumentiPreventivi: RequestFunction = async () => null
  infomailDocumentiPreventivi: RequestFunction = async () => null
  inviamailDocumentiPreventivi: RequestFunction = async () => null
  listaDocumentiOrdini: RequestFunction = async () => null
  dettagliDocumentiOrdini: RequestFunction = async () => null
  nuovoDocumentiOrdini: RequestFunction = async () => null
  modificaDocumentiOrdini: RequestFunction = async () => null
  eliminaDocumentiOrdini: RequestFunction = async () => null
  infoDocumentiOrdini: RequestFunction = async () => null
  infomailDocumentiOrdini: RequestFunction = async () => null
  inviamailDocumentiOrdini: RequestFunction = async () => null
  listaDocumentiNdc: RequestFunction = async () => null
  dettagliDocumentiNdc: RequestFunction = async () => null
  nuovoDocumentiNdc: RequestFunction = async () => null
  modificaDocumentiNdc: RequestFunction = async () => null
  eliminaDocumentiNdc: RequestFunction = async () => null
  infoDocumentiNdc: RequestFunction = async () => null
  infomailDocumentiNdc: RequestFunction = async () => null
  inviamailDocumentiNdc: RequestFunction = async () => null
  listaDocumentiProforma: RequestFunction = async () => null
  dettagliDocumentiProforma: RequestFunction = async () => null
  nuovoDocumentiProforma: RequestFunction = async () => null
  modificaDocumentiProforma: RequestFunction = async () => null
  eliminaDocumentiProforma: RequestFunction = async () => null
  infoDocumentiProforma: RequestFunction = async () => null
  infomailDocumentiProforma: RequestFunction = async () => null
  inviamailDocumentiProforma: RequestFunction = async () => null
  listaDocumentiRapporti: RequestFunction = async () => null
  dettagliDocumentiRapporti: RequestFunction = async () => null
  nuovoDocumentiRapporti: RequestFunction = async () => null
  modificaDocumentiRapporti: RequestFunction = async () => null
  eliminaDocumentiRapporti: RequestFunction = async () => null
  infoDocumentiRapporti: RequestFunction = async () => null
  infomailDocumentiRapporti: RequestFunction = async () => null
  inviamailDocumentiRapporti: RequestFunction = async () => null
  listaDocumentiOrdforn: RequestFunction = async () => null
  dettagliDocumentiOrdforn: RequestFunction = async () => null
  nuovoDocumentiOrdforn: RequestFunction = async () => null
  modificaDocumentiOrdforn: RequestFunction = async () => null
  eliminaDocumentiOrdforn: RequestFunction = async () => null
  infoDocumentiOrdforn: RequestFunction = async () => null
  infomailDocumentiOrdforn: RequestFunction = async () => null
  inviamailDocumentiOrdforn: RequestFunction = async () => null
  listaDocumentiDdt: RequestFunction = async () => null
  dettagliDocumentiDdt: RequestFunction = async () => null
  nuovoDocumentiDdt: RequestFunction = async () => null
  modificaDocumentiDdt: RequestFunction = async () => null
  eliminaDocumentiDdt: RequestFunction = async () => null
  infoDocumentiDdt: RequestFunction = async () => null
  infomailDocumentiDdt: RequestFunction = async () => null
  inviamailDocumentiDdt: RequestFunction = async () => null
  listaAcquisti: RequestFunction = async () => null
  dettagliAcquisti: RequestFunction = async () => null
  nuovoAcquisti: RequestFunction = async () => null
  modificaAcquisti: RequestFunction = async () => null
  eliminaAcquisti: RequestFunction = async () => null
  listaCorrispettivi: RequestFunction = async () => null
  nuovoCorrispettivi: RequestFunction = async () => null
  modificaCorrispettivi: RequestFunction = async () => null
  eliminaCorrispettivi: RequestFunction = async () => null
  listaMagazzino: RequestFunction = async () => null
  dettagliMagazzino: RequestFunction = async () => null
  listaMail: RequestFunction = async () => null
  accountInfo: RequestFunction = async () => null
}
