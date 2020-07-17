'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const eventemitter2_1 = require('eventemitter2');
class StateSubscriber extends eventemitter2_1.EventEmitter2 {
    constructor() {
        super();
        /*
         * Set this to true, if you want only receive updates on next events.
         */
        this.updatesOnly = false;
        /*
         * The internal cache to keep the last values of an event.
         */
        this._recentValues = {};
    }
    /*
     * Next will update the state of the last value of an event.
     * If you set updatesOnly to true, then it will prevent from sending duplicate event values.
     */
    next(event, data) {
        if (
            this.updatesOnly &&
            this._recentValues.hasOwnProperty(event) &&
            this._recentValues[event] === data
        ) {
            return false;
        }
        this._recentValues[event] = data;
        return this.emit(event, data);
    }
    /*
     * Subscribe will receive the values from next or emit.
     * Similar to .on() but you will receive the last value on subscription from the next event.
     */
    subscribe(event, cb) {
        this.addListener(event, cb);
        cb(this._recentValues[event]);
        return this;
    }
    /*
     * Subscribe will receive the last value from next.
     * Similar to .once() but you will receive the last value on subscription from the next event once.
     */
    subscribeOnce(event, cb) {
        this.once(event, cb);
        cb(this._recentValues[event]);
        return this;
    }
    /*
     * Unsubscribe will unsubscribe from an event.
     * Similar to .removeListener().
     */
    unsubscribe(event, cb) {
        this.removeListener(event, cb);
        return this;
    }
    /*
     * UnsubscribeAll will unsubscribe all listeners from an event.
     * Similar to .removeAllListeners().
     */
    unsubscribeAll(event) {
        this.removeAllListeners(event);
        return this;
    }
}
exports.default = StateSubscriber;
