"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var eventemitter2_1 = require("eventemitter2");
var StateSubscriber = /** @class */ (function (_super) {
    __extends(StateSubscriber, _super);
    function StateSubscriber(props) {
        var _this = _super.call(this, props) || this;
        _this._recentValues = {};
        return _this;
    }
    StateSubscriber.prototype.next = function (event, data) {
        this._recentValues[event] = data;
        return this.emit(event, data);
    };
    StateSubscriber.prototype.subscribe = function (event, cb) {
        this.addListener(event, cb);
        cb(this._recentValues[event]);
        return this;
    };
    StateSubscriber.prototype.subscribeOnce = function (event, cb) {
        this.once(event, cb);
        cb(this._recentValues[event]);
        return this;
    };
    StateSubscriber.prototype.unsubscribe = function (event, cb) {
        this.removeListener(event, cb);
        return this;
    };
    return StateSubscriber;
}(eventemitter2_1.EventEmitter2));
exports["default"] = StateSubscriber;
