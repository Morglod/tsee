"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var symbol_str_mapping_1 = require("./symbol_str_mapping");
/**
 * nullify objects proto
 *
 * this will make fields access much faster
 * userful for maps/dictionaries
 *
 * check `https://github.com/Morglod/tseep` benchmark
 */
function nullObj(x) {
    if (!x)
        x = {};
    x.__proto__ = null;
    return x;
}
/** Implemented event emitter */
var EventEmitter = /** @class */ (function () {
    function EventEmitter() {
        this._events = nullObj({});
        this.maxListeners = Infinity;
    }
    EventEmitter.prototype.emit = function (event) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        event = symbol_str_mapping_1.symbolToString(event);
        if (this._events[event] !== undefined) {
            // should save because of once events
            var status_1 = this._events[event].all.length !== 0;
            for (var _a = 0, _b = this._events[event].all; _a < _b.length; _a++) {
                var e = _b[_a];
                e.apply(void 0, args);
            }
            if (this._events[event].once.length !== 0) {
                // should not use filter because of parity in all-once
                for (var _c = 0, _d = this._events[event].once; _c < _d.length; _c++) {
                    var onceE = _d[_c];
                    var i = this._events[event].all.lastIndexOf(onceE);
                    if (i !== -1) {
                        this._events[event].all.splice(i, 1);
                    }
                }
                this._events[event].once = [];
            }
            return status_1;
        }
        return false;
    };
    EventEmitter.prototype.on = function (event, listener) {
        this.addListener(event, listener);
        return this;
    };
    EventEmitter.prototype.once = function (event, listener) {
        event = symbol_str_mapping_1.symbolToString(event);
        this.addListener(event, listener);
        this._events[event].once.push(listener);
        return this;
    };
    EventEmitter.prototype.addListener = function (event, listener) {
        if (typeof listener !== 'function')
            throw new TypeError('[ERR_INVALID_ARG_TYPE]: The "listener" argument must be of type Function. Received type ' + typeof listener);
        event = symbol_str_mapping_1.symbolToString(event);
        if (this._events[event] === undefined)
            this._events[event] = { all: [listener], once: [] };
        if (this.maxListeners !== Infinity && this.maxListeners <= this._events[event].all.length) {
            console.warn("Maximum event listeners for \"" + event + "\" event!");
            return this;
        }
        else
            this._events[event].all.push(listener);
        return this;
    };
    EventEmitter.prototype.removeListener = function (event, listener) {
        event = symbol_str_mapping_1.symbolToString(event);
        if (this._events[event] !== undefined) {
            var i = this._events[event].all.lastIndexOf(listener);
            if (i !== -1) {
                this._events[event].all.splice(i, 1);
                var i2 = this._events[event].once.lastIndexOf(listener);
                if (i2 !== -1)
                    this._events[event].once.splice(i, 1);
            }
        }
        return this;
    };
    EventEmitter.prototype.hasListeners = function (event) {
        event = symbol_str_mapping_1.symbolToString(event);
        return this._events[event] && !!this._events[event].all.length;
    };
    EventEmitter.prototype.prependListener = function (event, listener) {
        event = symbol_str_mapping_1.symbolToString(event);
        if (this._events[event] === undefined)
            this._events[event] = { all: [listener], once: [] };
        else
            this._events[event].all.unshift(listener);
        return this;
    };
    EventEmitter.prototype.prependOnceListener = function (event, listener) {
        event = symbol_str_mapping_1.symbolToString(event);
        this.prependListener(event, listener);
        this._events[event].once.unshift(listener);
        return this;
    };
    EventEmitter.prototype.off = function (event, listener) {
        event = symbol_str_mapping_1.symbolToString(event);
        return this.removeListener(event, listener);
    };
    EventEmitter.prototype.removeAllListeners = function (event) {
        if (event === undefined) {
            this._events = nullObj({});
        }
        else {
            event = symbol_str_mapping_1.symbolToString(event);
            delete this._events[event];
        }
        return this;
    };
    EventEmitter.prototype.setMaxListeners = function (n) {
        this.maxListeners = n;
        return this;
    };
    EventEmitter.prototype.getMaxListeners = function () {
        return this.maxListeners;
    };
    EventEmitter.prototype.listeners = function (event) {
        event = symbol_str_mapping_1.symbolToString(event);
        return this._events[event] !== undefined ? Array.from(this._events[event].all) : [];
    };
    EventEmitter.prototype.rawListeners = function (event) {
        event = symbol_str_mapping_1.symbolToString(event);
        return this._events[event] !== undefined ? this._events[event].all : undefined;
    };
    EventEmitter.prototype.eventNames = function () {
        var _this = this;
        return Object.keys(this._events).reduce(function (sum, x) {
            if (_this._events[x].all.length !== 0)
                sum.push(symbol_str_mapping_1.stringToSymbol(x));
            return sum;
        }, []);
    };
    EventEmitter.prototype.listenerCount = function (type) {
        type = symbol_str_mapping_1.symbolToString(type);
        return this._events[type] !== undefined ? this._events[type].all.length : 0;
    };
    return EventEmitter;
}());
exports.EventEmitter = EventEmitter;
//# sourceMappingURL=ee.js.map