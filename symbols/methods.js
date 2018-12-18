const buildRequest = Symbol('methods/buildRequest')
const buildEndpoint = Symbol('methods/buildEndpoint')
const buildEndpointWithFacets = Symbol('methods/buildEndpointWithFacets')
const tick = Symbol('methods/tick')
const rateLimitedRequest = Symbol('methods/rateLimitedRequest')
const rateLimitedRequestFactory = Symbol('methods/rateLimitedRequestFactory')
const initMethods = Symbol('methods/initMethods')

module.exports = {
  buildRequest,
  buildEndpoint,
  buildEndpointWithFacets,
  tick,
  rateLimitedRequest,
  rateLimitedRequestFactory,
  initMethods,
}
