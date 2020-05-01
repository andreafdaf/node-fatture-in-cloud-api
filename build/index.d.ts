import BaseFICAPI from './classes/base-fatture-in-cloud-api';
declare class FICAPI extends BaseFICAPI {
    constructor();
    get Class(): typeof FICAPI;
    private buildRequest;
    private buildEndpoint;
    private buildEndpointWithFacets;
    private initMethods;
}
declare const _default: FICAPI;
export = _default;
