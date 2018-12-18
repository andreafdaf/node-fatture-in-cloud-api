# node-fatture-in-cloud-api
NodeJS wrapper for FattureInCloud API

## Install
```
npm install --save fatture-in-cloud-api
```

## Authentication
Credentials are read from two env vars by default:
```
FATTURE_IN_CLOUD_API_UID
FATTURE_IN_CLOUD_API_KEY
```
You can also set them via a setter method:
```js
const fattureInCloud = require('fatture-in-cloud-api')

const credentials = {
  api_uid: 'uid',
  api_key: 'key',
}

fattureInCloud.credentials = credentials
```

## Rate limiting
As of December 18th, 2018 the API limits are:
- 30 req/minute (0.5 req/second)
- 500 req/hour (0.138 req/second)

For now only the first limit is implemented, if you use this API heavily you might run into error_code 2002

## Usage
```js
const fattureInCloud = require('fatture-in-cloud-api')

const customers = await fattureInCloud.listaAnagraficaClienti()
const invoices = await fattureInCloud.listaDocumentiFatture({ anno: 2018 })
const customer = await fattureInCloud.nuovoAnagraficaClienti({ nome: 'Andrea' })
```

## Methods
### - Anagrafica
#### Clienti
- listaAnagraficaClienti
- nuovoAnagraficaClienti
- importaAnagraficaClienti
- modificaAnagraficaClienti
- eliminaAnagraficaClienti
#### Fornitori
- listaAnagraficaFornitori
- nuovoAnagraficaFornitori
- importaAnagraficaFornitori
- modificaAnagraficaFornitori
- eliminaAnagraficaFornitori
### - Prodotti
- listaProdotti
- nuovoProdotti
- importaProdotti
- modificaProdotti
- eliminaProdotti
### - Documenti
#### Fatture
- listaDocumentiFatture
- dettagliDocumentiFatture
- nuovoDocumentiFatture
- modificaDocumentiFatture
- eliminaDocumentiFatture
- infoDocumentiFatture
- infomailDocumentiFatture
- inviamailDocumentiFatture
#### Ricevute
- listaDocumentiRicevute
- dettagliDocumentiRicevute
- nuovoDocumentiRicevute
- modificaDocumentiRicevute
- eliminaDocumentiRicevute
- infoDocumentiRicevute
- infomailDocumentiRicevute
- inviamailDocumentiRicevute
#### Preventivi
- listaDocumentiPreventivi
- dettagliDocumentiPreventivi
- nuovoDocumentiPreventivi
- modificaDocumentiPreventivi
- eliminaDocumentiPreventivi
- infoDocumentiPreventivi
- infomailDocumentiPreventivi
- inviamailDocumentiPreventivi
#### Ordini
- listaDocumentiOrdini
- dettagliDocumentiOrdini
- nuovoDocumentiOrdini
- modificaDocumentiOrdini
- eliminaDocumentiOrdini
- infoDocumentiOrdini
- infomailDocumentiOrdini
- inviamailDocumentiOrdini
#### Ndc
- listaDocumentiNdc
- dettagliDocumentiNdc
- nuovoDocumentiNdc
- modificaDocumentiNdc
- eliminaDocumentiNdc
- infoDocumentiNdc
- infomailDocumentiNdc
- inviamailDocumentiNdc
#### Proforma
- listaDocumentiProforma
- dettagliDocumentiProforma
- nuovoDocumentiProforma
- modificaDocumentiProforma
- eliminaDocumentiProforma
- infoDocumentiProforma
- infomailDocumentiProforma
- inviamailDocumentiProforma
#### Rapporti
- listaDocumentiRapporti
- dettagliDocumentiRapporti
- nuovoDocumentiRapporti
- modificaDocumentiRapporti
- eliminaDocumentiRapporti
- infoDocumentiRapporti
- infomailDocumentiRapporti
- inviamailDocumentiRapporti
#### Ordforn
- listaDocumentiOrdforn
- dettagliDocumentiOrdforn
- nuovoDocumentiOrdforn
- modificaDocumentiOrdforn
- eliminaDocumentiOrdforn
- infoDocumentiOrdforn
- infomailDocumentiOrdforn
- inviamailDocumentiOrdforn
#### Ddt
- listaDocumentiDdt
- dettagliDocumentiDdt
- nuovoDocumentiDdt
- modificaDocumentiDdt
- eliminaDocumentiDdt
- infoDocumentiDdt
- infomailDocumentiDdt
- inviamailDocumentiDdt
### - Acquisti
- listaAcquisti
- dettagliAcquisti
- nuovoAcquisti
- modificaAcquisti
- eliminaAcquisti
### - Corrispettivi
- listaCorrispettivi
- nuovoCorrispettivi
- modificaCorrispettivi
- eliminaCorrispettivi
### - Magazzino
- listaMagazzino
- dettagliMagazzino
### - Mail
- listaMail
### - Info
- accountInfo
