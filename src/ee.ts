import { DefaultEventMap, IEventEmitter } from './index';
import { symbolToString, stringToSymbol } from './symbol_str_mapping';

/**
 * nullify objects proto
 * 
 * this will make fields access much faster  
 * userful for maps/dictionaries
 * 
 * check `https://github.com/Morglod/tseep` benchmark
 */
function nullObj<T = any>(x?: T): T {
    if (!x) x = {} as any;
    (x as any).__proto__ = null;
    return x as any;
}

/** Implemented event emitter */
export class EventEmitter<EventMap extends DefaultEventMap = DefaultEventMap> implements IEventEmitter<EventMap> {
    protected _events: {
        [eventName in keyof EventMap]?: {
            all: Function[],
            once: Function[],
        }
    } = nullObj({});

    maxListeners: number = Infinity;

    emit<EventKey extends keyof EventMap>(
        event: EventKey,
        ...args: Parameters<EventMap[EventKey]>
    ) {
        event = symbolToString(event as any) as any;
        if (this._events[event] !== undefined) {
            // should save because of once events
            const status = this._events[event].all.length !== 0;
            for (const e of this._events[event].all) e(...args);
            if (this._events[event].once.length !== 0) {
                // should not use filter because of parity in all-once
                for (const onceE of this._events[event].once) {
                    const i = this._events[event].all.lastIndexOf(onceE);
                    if (i !== -1) {
                        this._events[event].all.splice(i, 1)
                    }
                }
                this._events[event].once = [];
            }
            return status;
        }
        return false;
    }
    
    on<EventKey extends keyof EventMap = string>(event: EventKey, listener: EventMap[EventKey]): this {
        this.addListener(event, listener);
        return this;
    }

    once<EventKey extends keyof EventMap = string>(event: EventKey, listener: EventMap[EventKey]): this {
        event = symbolToString(event as any) as any;
        this.addListener(event, listener);
        this._events[event].once.push(listener);
        return this;
    }

    addListener<EventKey extends keyof EventMap = string>(event: EventKey, listener: EventMap[EventKey]): this {
        if (typeof listener !== 'function') throw new TypeError('[ERR_INVALID_ARG_TYPE]: The "listener" argument must be of type Function. Received type ' + typeof listener);
        event = symbolToString(event as any) as any;
        if (this._events[event] === undefined) this._events[event] = { all: [ listener ], once: [] };
        if (this.maxListeners !== Infinity && this.maxListeners <= this._events[event].all.length) {
            console.warn(`Maximum event listeners for "${event}" event!`);
            return this;
        }
        else this._events[event].all.push(listener);
        return this;
    }

    removeListener<EventKey extends keyof EventMap = string>(event: EventKey, listener: EventMap[EventKey]): this {
        event = symbolToString(event as any) as any;
        if (this._events[event] !== undefined) {
            const i = this._events[event].all.lastIndexOf(listener);
            if (i !== -1) {
                this._events[event].all.splice(i, 1);

                const i2 = this._events[event].once.lastIndexOf(listener);
                if (i2 !== -1) this._events[event].once.splice(i, 1);
            }
        }
        return this;
    }

    hasListeners<EventKey extends keyof EventMap = string>(event: EventKey) {
        event = symbolToString(event as any) as any;
        return this._events[event] && !!this._events[event].all.length;
    }

    prependListener<EventKey extends keyof EventMap = string>(event: EventKey, listener: EventMap[EventKey]): this {
        event = symbolToString(event as any) as any;
        if (this._events[event] === undefined) this._events[event] = { all: [ listener ], once: [] };
        else this._events[event].all.unshift(listener);
        return this;
    }

    prependOnceListener<EventKey extends keyof EventMap = string>(event: EventKey, listener: EventMap[EventKey]): this {
        event = symbolToString(event as any) as any;
        this.prependListener(event, listener);
        this._events[event].once.unshift(listener);
        return this;
    }

    off<EventKey extends keyof EventMap = string>(event: EventKey, listener: EventMap[EventKey]): this {
        event = symbolToString(event as any) as any;
        return this.removeListener(event, listener);
    }

    removeAllListeners<EventKey extends keyof EventMap = string>(event?: EventKey): this {
        if (event === undefined) {
            this._events = nullObj({});
        } else {
            event = symbolToString(event as any) as any;
            delete this._events[event];
        }
        return this;
    }

    setMaxListeners(n: number): this {
        this.maxListeners = n;
        return this;
    }

    getMaxListeners(): number {
        return this.maxListeners;
    }

    listeners<EventKey extends keyof EventMap = string>(event: EventKey): EventMap[EventKey][] {
        event = symbolToString(event as any) as any;
        return this._events[event] !== undefined ? Array.from(this._events[event].all) as any[] : [];
    }

    rawListeners<EventKey extends keyof EventMap = string>(event: EventKey): EventMap[EventKey][]|undefined {
        event = symbolToString(event as any) as any;
        return this._events[event] !== undefined ? this._events[event].all as any[] : undefined;
    }

    eventNames(): Array<string | symbol> {
        return Object.keys(this._events).reduce((sum, x) => {
            if (this._events[x].all.length !== 0) sum.push(stringToSymbol(x));
            return sum;
        }, []);
    }

    listenerCount<EventKey extends keyof EventMap = string>(type: EventKey): number {
        type = symbolToString(type as any) as any;
        return this._events[type] !== undefined ? this._events[type].all.length : 0;
    }
}
