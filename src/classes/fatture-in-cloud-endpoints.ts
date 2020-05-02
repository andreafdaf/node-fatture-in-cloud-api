import BaseFattureInCloudAPI from './base-fatture-in-cloud-api'

import {
  Acquisti,
  Anagrafica,
  Corrispettivi,
  Documenti,
  Info,
  Magazzino,
  Mail,
  Prodotti,
} from '../endpoints'

export enum EndpointsEnum {
  acquisti = 'acquisti',
  anagrafica = 'anagrafica',
  corrispettivi = 'corrispettivi',
  documenti = 'documenti',
  info = 'info',
  magazzino = 'magazzino',
  mail = 'mail',
  prodotti = 'prodotti',
}

export interface IFattureInCloudEndpoints {
  acquisti: Acquisti
  anagrafica: Anagrafica
  corrispettivi: Corrispettivi
  documenti: Documenti
  info: Info
  magazzino: Magazzino
  mail: Mail
  prodotti: Prodotti
}

export class FattureInCloudEndpoints
  extends BaseFattureInCloudAPI
  implements IFattureInCloudEndpoints
{
  acquisti = new Acquisti()
  anagrafica = new Anagrafica()
  corrispettivi = new Corrispettivi()
  documenti = new Documenti()
  info = new Info()
  magazzino = new Magazzino()
  mail = new Mail()
  prodotti = new Prodotti()
}

export default new FattureInCloudEndpoints()
