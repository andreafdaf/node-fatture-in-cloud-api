import { RequestFunction } from './lib/base-rate-limited-api'

export interface IFattureInCloudResponse {
  success: boolean
  [key: string]: any
}

export interface IFattureInCloudRequestFunction extends RequestFunction<IFattureInCloudResponse> {
  (data: object): Promise<IFattureInCloudResponse>
}

export enum EndpointsEnum {
  acquisti = 'acquisti',
  clienti = 'clienti',
  fornitori = 'fornitori',
  corrispettivi = 'corrispettivi',
  fatture = 'fatture',
  ricevute = 'ricevute',
  preventivi = 'preventivi',
  ordini = 'ordini',
  ndc = 'ndc',
  proforma = 'proforma',
  rapporti = 'rapporti',
  ordforn = 'ordforn',
  ddt = 'ddt',
  info = 'info',
  magazzino = 'magazzino',
  mail = 'mail',
  prodotti = 'prodotti',
}

export type EndpointsEnumValues = keyof typeof EndpointsEnum

export enum MethodsEnum {
  lista = 'lista',
  dettagli = 'dettagli',
  nuovo = 'nuovo',
  modifica = 'modifica',
  elimina = 'elimina',
  info = 'info',
  infomail = 'infomail',
  inviamail = 'inviamail',
  account = 'account',
  importa = 'importa',
}

export type MethodsEnumValues = keyof typeof MethodsEnum

export type BaseEndpoint = {
  [method in MethodsEnumValues]?: IFattureInCloudRequestFunction
}

export type IFattureInCloudAPI = {
  [endpoint in EndpointsEnumValues]: BaseEndpoint
}
