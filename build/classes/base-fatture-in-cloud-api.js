"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _credentials;
Object.defineProperty(exports, "__esModule", { value: true });
const base_rate_limited_api_1 = __importDefault(require("./base-rate-limited-api"));
class BaseFattureInCloudAPI extends base_rate_limited_api_1.default {
    constructor() {
        super();
        this.baseUrl = 'https://api.fattureincloud.it/v1';
        _credentials.set(this, {
            api_uid: process.env.FATTURE_IN_CLOUD_API_UID || '',
            api_key: process.env.FATTURE_IN_CLOUD_API_KEY || '',
        });
        this.listaAnagraficaClienti = async () => null;
        this.nuovoAnagraficaClienti = async () => null;
        this.importaAnagraficaClienti = async () => null;
        this.modificaAnagraficaClienti = async () => null;
        this.eliminaAnagraficaClienti = async () => null;
        this.listaAnagraficaFornitori = async () => null;
        this.nuovoAnagraficaFornitori = async () => null;
        this.importaAnagraficaFornitori = async () => null;
        this.modificaAnagraficaFornitori = async () => null;
        this.eliminaAnagraficaFornitori = async () => null;
        this.listaProdotti = async () => null;
        this.nuovoProdotti = async () => null;
        this.importaProdotti = async () => null;
        this.modificaProdotti = async () => null;
        this.eliminaProdotti = async () => null;
        this.listaDocumentiFatture = async () => null;
        this.dettagliDocumentiFatture = async () => null;
        this.nuovoDocumentiFatture = async () => null;
        this.modificaDocumentiFatture = async () => null;
        this.eliminaDocumentiFatture = async () => null;
        this.infoDocumentiFatture = async () => null;
        this.infomailDocumentiFatture = async () => null;
        this.inviamailDocumentiFatture = async () => null;
        this.listaDocumentiRicevute = async () => null;
        this.dettagliDocumentiRicevute = async () => null;
        this.nuovoDocumentiRicevute = async () => null;
        this.modificaDocumentiRicevute = async () => null;
        this.eliminaDocumentiRicevute = async () => null;
        this.infoDocumentiRicevute = async () => null;
        this.infomailDocumentiRicevute = async () => null;
        this.inviamailDocumentiRicevute = async () => null;
        this.listaDocumentiPreventivi = async () => null;
        this.dettagliDocumentiPreventivi = async () => null;
        this.nuovoDocumentiPreventivi = async () => null;
        this.modificaDocumentiPreventivi = async () => null;
        this.eliminaDocumentiPreventivi = async () => null;
        this.infoDocumentiPreventivi = async () => null;
        this.infomailDocumentiPreventivi = async () => null;
        this.inviamailDocumentiPreventivi = async () => null;
        this.listaDocumentiOrdini = async () => null;
        this.dettagliDocumentiOrdini = async () => null;
        this.nuovoDocumentiOrdini = async () => null;
        this.modificaDocumentiOrdini = async () => null;
        this.eliminaDocumentiOrdini = async () => null;
        this.infoDocumentiOrdini = async () => null;
        this.infomailDocumentiOrdini = async () => null;
        this.inviamailDocumentiOrdini = async () => null;
        this.listaDocumentiNdc = async () => null;
        this.dettagliDocumentiNdc = async () => null;
        this.nuovoDocumentiNdc = async () => null;
        this.modificaDocumentiNdc = async () => null;
        this.eliminaDocumentiNdc = async () => null;
        this.infoDocumentiNdc = async () => null;
        this.infomailDocumentiNdc = async () => null;
        this.inviamailDocumentiNdc = async () => null;
        this.listaDocumentiProforma = async () => null;
        this.dettagliDocumentiProforma = async () => null;
        this.nuovoDocumentiProforma = async () => null;
        this.modificaDocumentiProforma = async () => null;
        this.eliminaDocumentiProforma = async () => null;
        this.infoDocumentiProforma = async () => null;
        this.infomailDocumentiProforma = async () => null;
        this.inviamailDocumentiProforma = async () => null;
        this.listaDocumentiRapporti = async () => null;
        this.dettagliDocumentiRapporti = async () => null;
        this.nuovoDocumentiRapporti = async () => null;
        this.modificaDocumentiRapporti = async () => null;
        this.eliminaDocumentiRapporti = async () => null;
        this.infoDocumentiRapporti = async () => null;
        this.infomailDocumentiRapporti = async () => null;
        this.inviamailDocumentiRapporti = async () => null;
        this.listaDocumentiOrdforn = async () => null;
        this.dettagliDocumentiOrdforn = async () => null;
        this.nuovoDocumentiOrdforn = async () => null;
        this.modificaDocumentiOrdforn = async () => null;
        this.eliminaDocumentiOrdforn = async () => null;
        this.infoDocumentiOrdforn = async () => null;
        this.infomailDocumentiOrdforn = async () => null;
        this.inviamailDocumentiOrdforn = async () => null;
        this.listaDocumentiDdt = async () => null;
        this.dettagliDocumentiDdt = async () => null;
        this.nuovoDocumentiDdt = async () => null;
        this.modificaDocumentiDdt = async () => null;
        this.eliminaDocumentiDdt = async () => null;
        this.infoDocumentiDdt = async () => null;
        this.infomailDocumentiDdt = async () => null;
        this.inviamailDocumentiDdt = async () => null;
        this.listaAcquisti = async () => null;
        this.dettagliAcquisti = async () => null;
        this.nuovoAcquisti = async () => null;
        this.modificaAcquisti = async () => null;
        this.eliminaAcquisti = async () => null;
        this.listaCorrispettivi = async () => null;
        this.nuovoCorrispettivi = async () => null;
        this.modificaCorrispettivi = async () => null;
        this.eliminaCorrispettivi = async () => null;
        this.listaMagazzino = async () => null;
        this.dettagliMagazzino = async () => null;
        this.listaMail = async () => null;
        this.accountInfo = async () => null;
        this.rateLimiting = {
            rpm: Number(process.env.FATTURE_IN_CLOUD_API_RPM) || 30,
            rph: Number(process.env.FATTURE_IN_CLOUD_API_RPH) || 500,
        };
    }
    get credentials() {
        return Object.assign({}, __classPrivateFieldGet(this, _credentials));
    }
    set credentials(value) {
        __classPrivateFieldSet(this, _credentials, Object.assign(Object.assign({}, __classPrivateFieldGet(this, _credentials)), value));
    }
}
exports.default = BaseFattureInCloudAPI;
_credentials = new WeakMap();
