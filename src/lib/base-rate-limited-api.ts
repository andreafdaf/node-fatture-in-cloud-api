import { EventEmitter } from 'events'
import uuidv4 from 'uuid/v4'

import {
  SECOND_IN_MILLISECONDS,
  MINUTE_IN_MILLISECONDS,
  HOUR_IN_MILLISECONDS,
} from './constants'

type RateLimiting = {
  rpm: number
  rph: number
}

export type RequestFunction<T> = (data?: object) => Promise<T>

export default abstract class BaseRateLimitedAPI<RF extends RequestFunction<T>, T, E extends Error> {
  protected abstract baseUrl: string = ''

  #rateLimiting: RateLimiting = {
    rpm: 0,
    rph: 0,
  }
  #scheduledTick: any
  #queue: {
    request: RF,
    key: string,
    data: object,
  }[] = []
  #emitter: EventEmitter = new EventEmitter()
  #hourTickStart = 0
  #minuteTickStart = 0
  #requestsInHourTick = 0
  #requestsInMinuteTick = 0

  get rateLimiting (): RateLimiting {
    return {
      ...this.#rateLimiting,
    }
  }

  set rateLimiting (value: RateLimiting) {
    this.#rateLimiting = {
      ...this.#rateLimiting,
      ...value,
    }
  }

  private scheduleTick (duration: number, diff: number): void {
    if (!this.#scheduledTick) {
      this.#scheduledTick = setTimeout(
        () => { this.tick() },
        duration - diff + SECOND_IN_MILLISECONDS
      )
    }
  }

  private async tick (): Promise<void> {
    const { rpm, rph } = this.rateLimiting

    const now = Date.now()
    const diffHour = now - this.#hourTickStart
    const diffMinute = now - this.#minuteTickStart

    // check if it's the start of a new tick
    if (diffHour > HOUR_IN_MILLISECONDS) {
      this.#hourTickStart = now
      this.#requestsInHourTick = 0
    }
    if (diffMinute > MINUTE_IN_MILLISECONDS) {
      this.#minuteTickStart = now
      this.#requestsInMinuteTick = 0
    }

    // check if request is over quota and schedule a new tick if not already scheduled
    if (this.#requestsInHourTick >= rph) {
      return this.scheduleTick(HOUR_IN_MILLISECONDS, diffHour)
    }
    if (this.#requestsInMinuteTick >= rpm) {
      return this.scheduleTick(MINUTE_IN_MILLISECONDS, diffMinute)
    }

    this.#scheduledTick = null

    const nRequestsHour = rph - this.#requestsInHourTick
    const nRequestsMinute = rpm - this.#requestsInMinuteTick
    const nRequests = Math.min(nRequestsHour, nRequestsMinute)

    const batch = this.#queue.splice(0, nRequests)

    this.#requestsInHourTick += batch.length
    this.#requestsInMinuteTick += batch.length

    for (const element of batch) {
      const { request, key, data } = element

      try {
        const response = await request(data)
        this.#emitter.emit(key, { response })
      } catch (error) {
        this.#emitter.emit(key, { error })
      }
    }
  }

  private rateLimitedRequest ({ request, data }: { request: RF, data: object }): Promise<T> {
    return new Promise((resolve, reject) => {
      const key = uuidv4()

      this.#emitter.once(key, ({ error, response }) => {
        if (error) {
          reject(error as E)
        } else {
          resolve(response as T)
        }
      })
      this.#queue.push({
        request,
        key,
        data: { ...data },
      })
      this.tick()
    })
  }

  protected rateLimitedRequestFactory (request: RF) {
    return (data: object = {}): Promise<T> => this.rateLimitedRequest({ request, data })
  }
}
