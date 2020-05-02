# node-fatture-in-cloud-api
NodeJS wrapper for FattureInCloud API

## Install
```
npm install --save fatture-in-cloud-api
```

## Usage
```js
const FattureInCloudAPI = require('fatture-in-cloud-api')
const fic = new FattureInCloudApi()

const customers = await fic.anagrafica.clienti.lista()
const invoices = await fic.documenti.fatture.lista({ anno: 2020 })
const customer = await fic.anagrafica.clienti.nuovo({ nome: 'Andrea' })
```

## Authentication
Credentials are read from two env vars by default:
```
FATTURE_IN_CLOUD_API_UID
FATTURE_IN_CLOUD_API_KEY
```
You can also set them using a setter method:
```js
const credentials = {
  api_uid: 'uid',
  api_key: 'key',
}

fic.credentials = credentials
```

## Rate limiting
As of December 18th, 2018 the default API limits are:
- 30 req/minute (0.5 req/second)
- 500 req/hour (0.138 req/second)

If you have different quotas you can set them from the following env vars:
```
FATTURE_IN_CLOUD_API_RPM
FATTURE_IN_CLOUD_API_RPH
```
Or using a setter method:
```js
const rateLimiting = {
  rpm: 100,
  rph: 1000,
}

fic.rateLimiting = rateLimiting
```

## Methods
#### Anagrafica
### Clienti
- lista
- nuovo
- importa
- modifica
- elimina
### Fornitori
- lista
- nuovo
- importa
- modifica
- elimina
#### Prodotti
- lista
- nuovo
- importa
- modifica
- elimina
#### Documenti
### Fatture
- lista
- dettagli
- nuovo
- modifica
- elimina
- info
- infomail
- inviamail
### Ricevute
- lista
- dettagli
- nuovo
- modifica
- elimina
- info
- infomail
- inviamail
### Preventivi
- lista
- dettagli
- nuovo
- modifica
- elimina
- info
- infomail
- inviamail
### Ordini
- lista
- dettagli
- nuovo
- modifica
- elimina
- info
- infomail
- inviamail
### Ndc
- lista
- dettagli
- nuovo
- modifica
- elimina
- info
- infomail
- inviamail
### Proforma
- lista
- dettagli
- nuovo
- modifica
- elimina
- info
- infomail
- inviamail
### Rapporti
- lista
- dettagli
- nuovo
- modifica
- elimina
- info
- infomail
- inviamail
### Ordforn
- lista
- dettagli
- nuovo
- modifica
- elimina
- info
- infomail
- inviamail
### Ddt
- lista
- dettagli
- nuovo
- modifica
- elimina
- info
- infomail
- inviamail
#### Acquisti
- lista
- dettagli
- nuovo
- modifica
- elimina
#### Corrispettivi
- lista
- nuovo
- modifica
- elimina
#### Magazzino
- lista
- dettagli
#### Mail
- lista
#### Info
- account
