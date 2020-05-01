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
var _rateLimiting, _scheduledTick, _queue, _emitter, _hourTickStart, _minuteTickStart, _requestsInHourTick, _requestsInMinuteTick;
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
const v4_1 = __importDefault(require("uuid/v4"));
const constants_1 = require("../data/constants");
class BaseRateLimitedAPI {
    constructor() {
        this.baseUrl = '';
        _rateLimiting.set(this, {
            rpm: 0,
            rph: 0,
        });
        _scheduledTick.set(this, void 0);
        _queue.set(this, []);
        _emitter.set(this, new events_1.EventEmitter());
        _hourTickStart.set(this, 0);
        _minuteTickStart.set(this, 0);
        _requestsInHourTick.set(this, 0);
        _requestsInMinuteTick.set(this, 0);
    }
    scheduleTick(duration, diff) {
        if (!__classPrivateFieldGet(this, _scheduledTick)) {
            __classPrivateFieldSet(this, _scheduledTick, setTimeout(() => this.tick(), duration - diff + constants_1.SECOND_IN_MILLISECONDS));
        }
    }
    async tick() {
        const { rpm, rph } = this.rateLimiting;
        const now = Date.now();
        const diffHour = now - __classPrivateFieldGet(this, _hourTickStart);
        const diffMinute = now - __classPrivateFieldGet(this, _minuteTickStart);
        // check if it's the start of a new tick
        if (diffHour > constants_1.HOUR_IN_MILLISECONDS) {
            __classPrivateFieldSet(this, _hourTickStart, now);
            __classPrivateFieldSet(this, _requestsInHourTick, 0);
        }
        if (diffMinute > constants_1.MINUTE_IN_MILLISECONDS) {
            __classPrivateFieldSet(this, _minuteTickStart, now);
            __classPrivateFieldSet(this, _requestsInMinuteTick, 0);
        }
        // check if request is over quota and schedule a new tick if not already scheduled
        if (__classPrivateFieldGet(this, _requestsInHourTick) >= rph) {
            this.scheduleTick(constants_1.HOUR_IN_MILLISECONDS, diffHour);
            return;
        }
        if (__classPrivateFieldGet(this, _requestsInMinuteTick) >= rpm) {
            this.scheduleTick(constants_1.MINUTE_IN_MILLISECONDS, diffMinute);
            return;
        }
        __classPrivateFieldSet(this, _scheduledTick, undefined);
        const nRequestsHour = rph - __classPrivateFieldGet(this, _requestsInHourTick);
        const nRequestsMinute = rpm - __classPrivateFieldGet(this, _requestsInMinuteTick);
        const nRequests = Math.min(nRequestsHour, nRequestsMinute);
        const batch = __classPrivateFieldGet(this, _queue).splice(0, nRequests);
        __classPrivateFieldSet(this, _requestsInHourTick, __classPrivateFieldGet(this, _requestsInHourTick) + batch.length);
        __classPrivateFieldSet(this, _requestsInMinuteTick, __classPrivateFieldGet(this, _requestsInMinuteTick) + batch.length);
        for (const element of batch) {
            const { request, key, data } = element;
            try {
                const response = await request(data);
                __classPrivateFieldGet(this, _emitter).emit(key, { response });
            }
            catch (error) {
                __classPrivateFieldGet(this, _emitter).emit(key, { error });
            }
        }
    }
    rateLimitedRequest({ request, data }) {
        return new Promise((resolve, reject) => {
            const key = v4_1.default();
            __classPrivateFieldGet(this, _emitter).once(key, ({ error, response }) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(response);
                }
            });
            __classPrivateFieldGet(this, _queue).push({
                request,
                key,
                data: Object.assign({}, data),
            });
            this.tick();
        });
    }
    rateLimitedRequestFactory(request) {
        return (data = {}) => {
            return this.rateLimitedRequest({ request, data });
        };
    }
    get rateLimiting() {
        return Object.assign({}, __classPrivateFieldGet(this, _rateLimiting));
    }
    set rateLimiting(value) {
        __classPrivateFieldSet(this, _rateLimiting, Object.assign(Object.assign({}, __classPrivateFieldGet(this, _rateLimiting)), value));
    }
}
exports.default = BaseRateLimitedAPI;
_rateLimiting = new WeakMap(), _scheduledTick = new WeakMap(), _queue = new WeakMap(), _emitter = new WeakMap(), _hourTickStart = new WeakMap(), _minuteTickStart = new WeakMap(), _requestsInHourTick = new WeakMap(), _requestsInMinuteTick = new WeakMap();
