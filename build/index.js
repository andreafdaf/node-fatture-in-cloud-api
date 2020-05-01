"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const request_promise_native_1 = require("request-promise-native");
const base_fatture_in_cloud_api_1 = __importDefault(require("./classes/base-fatture-in-cloud-api"));
const endpoints_1 = __importDefault(require("./data/endpoints"));
const camel_case_join_1 = __importDefault(require("./utils/camel-case-join"));
class FICAPI extends base_fatture_in_cloud_api_1.default {
    constructor() {
        super();
        this.initMethods();
    }
    get Class() {
        return FICAPI;
    }
    buildRequest({ path = '', method = '', }) {
        return async (data = {}) => {
            const body = Object.assign(Object.assign({}, data), this.credentials);
            const response = await request_promise_native_1.post({
                json: true,
                url: `${this.baseUrl}/${path}/${method}`,
                body,
            });
            if (!response.success) {
                const error = new Error('FattureInCloud error');
                Object.assign(error, response);
                throw error;
            }
            return response;
        };
    }
    buildEndpoint({ name = '', methods = [], facet = '', }) {
        const routes = methods.map(method => {
            const request = this.buildRequest({
                path: facet || name,
                method,
            });
            const title = camel_case_join_1.default([method, name, facet]);
            return { request, title };
        });
        return routes;
    }
    buildEndpointWithFacets({ name = '', methods = [], facets = [], }) {
        const routes = facets.reduce((acc, facet) => {
            const facetRoutes = this.buildEndpoint({
                name,
                facet,
                methods,
            });
            return acc.concat(facetRoutes);
        }, []);
        return routes;
    }
    initMethods() {
        const routes = [];
        for (const e of endpoints_1.default) {
            const endpointRoutes = e.facets.length
                ? this.buildEndpointWithFacets(e)
                : this.buildEndpoint(e);
            routes.push(...endpointRoutes);
        }
        for (const { request, title } of routes) {
            this[title] = this.rateLimitedRequestFactory(request);
        }
    }
}
const a = async () => {
    const b = new FICAPI();
    const c = await b.listaDocumentiOrdforn({ prezzo: 1 });
};
a();
module.exports = new FICAPI();
