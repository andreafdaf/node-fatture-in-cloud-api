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
  anagrafica = 'anagrafica',
  corrispettivi = 'corrispettivi',
  documenti = 'documenti',
  info = 'info',
  magazzino = 'magazzino',
  mail = 'mail',
  prodotti = 'prodotti',
}
