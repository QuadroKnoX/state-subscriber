"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const eventemitter2_1 = require("eventemitter2");
class StateSubscriber extends eventemitter2_1.EventEmitter2 {
    constructor() {
        super();
        this._recentValues = {};
    }
    next(event, data) {
        this._recentValues[event] = data;
        return this.emit(event, data);
    }
    subscribe(event, cb) {
        this.addListener(event, cb);
        cb(this._recentValues[event]);
        return this;
    }
    subscribeOnce(event, cb) {
        this.once(event, cb);
        cb(this._recentValues[event]);
        return this;
    }
    unsubscribe(event, cb) {
        this.removeListener(event, cb);
        return this;
    }
    unsubscribeAll(event) {
        this.removeAllListeners(event);
        return this;
    }
}
exports.default = StateSubscriber;
