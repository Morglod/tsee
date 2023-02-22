"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/** Implemented event emitter */
var EventEmitter = /** @class */ (function () {
    function EventEmitter() {
        var _this = this;
        this.events = {};
        this.maxListeners = Infinity;
        this.emit = function (event) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            if (_this.events[event]) {
                var len = _this.events[event].length;
                var events = Array.from(_this.events[event]);
                for (var _a = 0, events_1 = events; _a < events_1.length; _a++) {
                    var e = events_1[_a];
                    e.apply(void 0, args);
                }
                return !!len;
            }
            return false;
        };
        this.on = function (event, listener) {
            _this.addListener(event, listener);
            return _this;
        };
        this.once = function (event, listener) {
            var onceListener = (function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                listener.apply(void 0, args);
                _this.removeListener(event, onceListener);
            });
            _this.addListener(event, onceListener);
            return _this;
        };
        this.addListener = function (event, listener) {
            if (!(event in _this.events))
                _this.events[event] = [listener];
            else
                _this.events[event].push(listener);
            if (_this.maxListeners !== Infinity && _this.maxListeners <= _this.events[event].length)
                console.warn("Maximum event listeners for \"" + event + "\" event!");
            return _this;
        };
        this.removeListener = function (event, listener) {
            if (event in _this.events) {
                var i = _this.events[event].indexOf(listener);
                if (i !== -1)
                    _this.events[event].splice(i, 1);
            }
            return _this;
        };
        this.hasListeners = function (event) {
            return _this.events[event] && !!_this.events[event].length;
        };
        this.prependListener = function (event, listener) {
            if (!(event in _this.events))
                _this.events[event] = [listener];
            else
                _this.events[event].unshift(listener);
            return _this;
        };
        this.prependOnceListener = function (event, listener) {
            var onceListener = (function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                listener.apply(void 0, args);
                _this.removeListener(event, onceListener);
            });
            _this.prependListener(event, onceListener);
            return _this;
        };
        this.off = function (event, listener) {
            return _this.removeListener(event, listener);
        };
        this.removeAllListeners = function (event) {
            delete _this.events[event];
            return _this;
        };
        this.setMaxListeners = function (n) {
            _this.maxListeners = n;
            return _this;
        };
        this.getMaxListeners = function () {
            return _this.maxListeners;
        };
        this.listeners = function (event) {
            return __spreadArrays(_this.events[event]);
        };
        this.rawListeners = function (event) {
            return _this.events[event];
        };
        this.eventNames = function () {
            return Object.keys(_this.events);
        };
        this.listenerCount = function (type) {
            return _this.events[type] && _this.events[type].length || 0;
        };
    }
    return EventEmitter;
}());
exports.EventEmitter = EventEmitter;
//# sourceMappingURL=ee.js.map