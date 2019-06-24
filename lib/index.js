"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** cast type of any event emitter to typed event emitter */
function asTypedEventEmitter(x) {
    return x;
}
exports.asTypedEventEmitter = asTypedEventEmitter;
/** Proxifying event emitter with types */
var EventEmitter = /** @class */ (function () {
    function EventEmitter(baseClass) {
        if (baseClass === void 0) { baseClass = require('events').EventEmitter; }
        var _this = this;
        this.emit = function (event) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var _a;
            return (_a = _this.emitter).emit.apply(_a, [event].concat(args));
        };
        this.on = function (event, listener) {
            _this.emitter.on(event, listener);
            return _this;
        };
        this.once = function (event, listener) {
            _this.emitter.once(event, listener);
            return _this;
        };
        this.addListener = function (event, listener) {
            _this.emitter.addListener(event, listener);
            return _this;
        };
        this.removeListener = function (event, listener) {
            _this.emitter.removeListener(event, listener);
            return _this;
        };
        this.hasListeners = function (event) {
            return _this.emitter.listenerCount(event) !== 0;
        };
        this.prependListener = function (event, listener) {
            _this.emitter.prependListener(event, listener);
            return _this;
        };
        this.prependOnceListener = function (event, listener) {
            _this.emitter.prependOnceListener(event, listener);
            return _this;
        };
        this.off = function (event, listener) {
            _this.emitter.off(event, listener);
            return _this;
        };
        this.removeAllListeners = function (event) {
            _this.emitter.removeAllListeners(event);
            return _this;
        };
        this.setMaxListeners = function (n) {
            _this.emitter.setMaxListeners(n);
            return _this;
        };
        this.getMaxListeners = function () {
            return _this.emitter.getMaxListeners();
        };
        this.listeners = function (event) {
            return _this.emitter.listeners(event);
        };
        this.rawListeners = function (event) {
            return _this.emitter.rawListeners(event);
        };
        this.eventNames = function () {
            return _this.emitter.eventNames();
        };
        this.listenerCount = function (type) {
            return _this.emitter.listenerCount(type);
        };
        this.emitter = new baseClass();
    }
    return EventEmitter;
}());
exports.EventEmitter = EventEmitter;
//# sourceMappingURL=index.js.map