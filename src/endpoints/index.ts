export { default as Acquisti } from './acquisti'
export * from './anagrafica'
export { default as Corrispettivi } from './corrispettivi'
export * from './documenti'
export { default as Info } from './info'
export { default as Magazzino } from './magazzino'
export { default as Mail } from './mail'
export { default as Prodotti } from './prodotti'

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
