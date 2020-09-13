"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var eventemitter2_1 = require("eventemitter2");
var StateSubscriber = /** @class */ (function (_super) {
    __extends(StateSubscriber, _super);
    function StateSubscriber() {
        var _this = _super.call(this) || this;
        /*
         * Set this to true, if you want only receive updates on next events.
         */
        _this.updatesOnly = false;
        /*
         * The internal cache to keep the last values of an event.
         */
        _this._recentValues = {};
        return _this;
    }
    /*
     * Next will update the state of the last value of an event.
     * If you set updatesOnly to true, then it will prevent from sending duplicate event values.
     */
    StateSubscriber.prototype.next = function (event, data) {
        if (this.updatesOnly &&
            this._recentValues.hasOwnProperty(event) &&
            this._recentValues[event] === data) {
            return false;
        }
        this._recentValues[event] = data;
        return this.emit(event, data);
    };
    /*
     * Subscribe will receive the values from next or emit.
     * Similar to .on() but you will receive the last value on subscription from the next event.
     */
    StateSubscriber.prototype.subscribe = function (event, cb) {
        this.addListener(event, cb);
        cb(this._recentValues[event]);
        return this;
    };
    /*
     * Subscribe will receive the last value from next.
     * Similar to .once() but you will receive the last value on subscription from the next event once.
     */
    StateSubscriber.prototype.subscribeOnce = function (event, cb) {
        this.once(event, cb);
        cb(this._recentValues[event]);
        return this;
    };
    /*
     * Unsubscribe will unsubscribe from an event.
     * Similar to .removeListener().
     */
    StateSubscriber.prototype.unsubscribe = function (event, cb) {
        this.removeListener(event, cb);
        return this;
    };
    /*
     * UnsubscribeAll will unsubscribe all listeners from an event.
     * Similar to .removeAllListeners().
     */
    StateSubscriber.prototype.unsubscribeAll = function (event) {
        this.removeAllListeners(event);
        return this;
    };
    /*
     * This will clear all values cache for an event or for all events.
     */
    StateSubscriber.prototype.clearEvent = function (event) {
        if (!event) {
            this._recentValues = {};
            return;
        }
        delete this._recentValues[event];
    };
    return StateSubscriber;
}(eventemitter2_1.EventEmitter2));
exports.default = StateSubscriber;
