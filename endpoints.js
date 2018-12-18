const endpoints = [
  {
    name: 'anagrafica',
    facets: ['clienti', 'fornitori'],
    methods: ['lista', 'nuovo', 'importa', 'modifica', 'elimina'],
  },
  {
    name: 'prodotti',
    methods: ['lista', 'nuovo', 'importa', 'modifica', 'elimina'],
  },
  {
    name: 'documenti',
    facets: ['fatture', 'ricevute', 'preventivi', 'ordini', 'ndc', 'proforma', 'rapporti', 'ordforn', 'ddt'],
    methods: ['lista', 'dettagli', 'nuovo', 'modifica', 'elimina', 'info', 'infomail', 'inviamail'],
  },
  {
    name: 'acquisti',
    methods: ['lista', 'dettagli', 'nuovo', 'modifica', 'elimina'],
  },
  {
    name: 'corrispettivi',
    methods: ['lista', 'nuovo', 'modifica', 'elimina'],
  },
  {
    name: 'magazzino',
    methods: ['lista', 'dettagli'],
  },
  {
    name: 'mail',
    methods: ['lista'],
  },
  {
    name: 'info',
    methods: ['account'],
  },
]

module.exports = endpoints
