const baseUrl = Symbol('properties/baseUrl')
const queue = Symbol('properties/queue')
const emitter = Symbol('properties/emitter')
const credentials = Symbol('properties/credentials')
const rateLimiting = Symbol('properties/rateLimiting')
const hourTickStart = Symbol('properties/hourTickStart')
const minuteTickStart = Symbol('properties/minuteTickStart')
const scheduledTick = Symbol('properties/scheduledTick')
const requestsInHourTick = Symbol('properties/requestsInHourTick')
const requestsInMinuteTick = Symbol('properties/requestsInMinuteTick')

module.exports = {
  baseUrl,
  queue,
  emitter,
  credentials,
  rateLimiting,
  hourTickStart,
  minuteTickStart,
  scheduledTick,
  requestsInHourTick,
  requestsInMinuteTick,
}
