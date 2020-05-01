export enum BaseEnum {
  anagrafica = 'anagrafica',
  documenti = 'documenti',
}
export enum SimpleFacetEnum {
  prodotti = 'prodotti',
  acquisti = 'acquisti',
  corrispettivi = 'corrispettivi',
  magazzino = 'magazzino',
  mail = 'mail',
  info = 'info',
}
export enum CompositeFacetEnum {
  clienti = 'clienti',
  fornitori = 'fornitori',
  fatture = 'fatture',
  ricevute = 'ricevute',
  preventivi = 'preventivi',
  ordini = 'ordini',
  ndc = 'ndc',
  proforma = 'proforma',
  rapporti = 'rapporti',
  ordforn = 'ordforn',
  ddt = 'ddt',
}
export enum MethodEnum {
  lista = 'lista',
  dettagli = 'dettagli',
  nuovo = 'nuovo',
  modifica = 'modifica',
  elimina = 'elimina',
  info = 'info',
  infomail = 'infomail',
  inviamail = 'inviamail',
  importa = 'importa',
  account = 'account',
}

export type Endpoint = {
  base?: keyof typeof BaseEnum
  facets: (keyof typeof SimpleFacetEnum | keyof typeof CompositeFacetEnum)[]
  methods: (keyof typeof MethodEnum)[]
}

const endpoints: Endpoint[] = [
  {
    base: 'anagrafica',
    facets: ['clienti', 'fornitori'],
    methods: ['lista', 'nuovo', 'importa', 'modifica', 'elimina'],
  },
  {
    facets: ['prodotti'],
    methods: ['lista', 'nuovo', 'importa', 'modifica', 'elimina'],
  },
  {
    base: 'documenti',
    facets: ['fatture', 'ricevute', 'preventivi', 'ordini', 'ndc', 'proforma', 'rapporti', 'ordforn', 'ddt'],
    methods: ['lista', 'dettagli', 'nuovo', 'modifica', 'elimina', 'info', 'infomail', 'inviamail'],
  },
  {
    facets: ['acquisti'],
    methods: ['lista', 'dettagli', 'nuovo', 'modifica', 'elimina'],
  },
  {
    facets: ['corrispettivi'],
    methods: ['lista', 'nuovo', 'modifica', 'elimina'],
  },
  {
    facets: ['magazzino'],
    methods: ['lista', 'dettagli'],
  },
  {
    facets: ['mail'],
    methods: ['lista'],
  },
  {
    facets: ['info'],
    methods: ['account'],
  },
]

export default endpoints
