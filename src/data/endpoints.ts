type Endpoint = {
  name: string
  facets: string[]
  methods: string[]
}

const endpoints: Endpoint[] = [
  {
    name: 'anagrafica',
    facets: ['clienti', 'fornitori'],
    methods: ['lista', 'nuovo', 'importa', 'modifica', 'elimina'],
  },
  {
    name: 'prodotti',
    facets: [],
    methods: ['lista', 'nuovo', 'importa', 'modifica', 'elimina'],
  },
  {
    name: 'documenti',
    facets: ['fatture', 'ricevute', 'preventivi', 'ordini', 'ndc', 'proforma', 'rapporti', 'ordforn', 'ddt'],
    methods: ['lista', 'dettagli', 'nuovo', 'modifica', 'elimina', 'info', 'infomail', 'inviamail'],
  },
  {
    name: 'acquisti',
    facets: [],
    methods: ['lista', 'dettagli', 'nuovo', 'modifica', 'elimina'],
  },
  {
    name: 'corrispettivi',
    facets: [],
    methods: ['lista', 'nuovo', 'modifica', 'elimina'],
  },
  {
    name: 'magazzino',
    facets: [],
    methods: ['lista', 'dettagli'],
  },
  {
    name: 'mail',
    facets: [],
    methods: ['lista'],
  },
  {
    name: 'info',
    facets: [],
    methods: ['account'],
  },
]

export default endpoints
