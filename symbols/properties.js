const baseUrl = Symbol('properties/baseUrl')
const queue = Symbol('properties/queue')
const emitter = Symbol('properties/emitter')
const credentials = Symbol('properties/credentials')
const tickStart = Symbol('properties/tickStart')
const tickScheduled = Symbol('properties/tickScheduled')
const requestsInTick = Symbol('properties/requestsInTick')

module.exports = {
  baseUrl,
  queue,
  emitter,
  credentials,
  tickStart,
  tickScheduled,
  requestsInTick,
}
