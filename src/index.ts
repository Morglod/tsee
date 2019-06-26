import { ArgsN } from 'tsargs';

export type Listener = (...args: any[]) => Promise<any>|void;
export type DefaultEventMap = { [event in string|symbol]: Listener };

export interface IEventEmitter<EventMap extends DefaultEventMap = DefaultEventMap> {
    emit<EventKey extends keyof EventMap>(
        event: EventKey,
        ...args: ArgsN<EventMap[EventKey]>
    ): boolean;

    on<EventKey extends keyof EventMap = string>(event: EventKey, listener: EventMap[EventKey]): this;
    once<EventKey extends keyof EventMap = string>(event: EventKey, listener: EventMap[EventKey]): this;
    addListener<EventKey extends keyof EventMap = string>(event: EventKey, listener: EventMap[EventKey]): this;
    removeListener<EventKey extends keyof EventMap = string>(event: EventKey, listener: EventMap[EventKey]): this;

    // hasListeners = <EventKey extends keyof EventMap = string>(event: EventKey) => {
    //     return this.emitter.listenerCount(event as string) !== 0;
    // };
    prependListener<EventKey extends keyof EventMap = string>(event: EventKey, listener: EventMap[EventKey]): this;
    prependOnceListener<EventKey extends keyof EventMap = string>(event: string | symbol, listener: EventMap[EventKey]): this;
    off<EventKey extends keyof EventMap = string>(event: EventKey, listener: EventMap[EventKey]): this;
    removeAllListeners<EventKey extends keyof EventMap = string>(event?: EventKey): this;
    setMaxListeners(n: number): this;
    getMaxListeners(): number;
    listeners<EventKey extends keyof EventMap = string>(event: EventKey): EventMap[EventKey][];
    rawListeners<EventKey extends keyof EventMap = string>(event: EventKey): EventMap[EventKey][];
    eventNames(): Array<string | symbol>;
    listenerCount<EventKey extends keyof EventMap = string>(type: EventKey): number;
}

/** cast type of any event emitter to typed event emitter */
export function asTypedEventEmitter<EventMap extends DefaultEventMap, X extends NodeJS.EventEmitter>(x: X): IEventEmitter<EventMap> {
    return x as any;
}

/** Proxifying event emitter with types */
export class EventEmitter<EventMap extends DefaultEventMap = DefaultEventMap> implements IEventEmitter<EventMap> {
    private emitter: NodeJS.EventEmitter;

    constructor(
        baseClass: (new () => NodeJS.EventEmitter) = require('events').EventEmitter,
    ) {
        this.emitter = new baseClass();
    }

    emit = <EventKey extends keyof EventMap>(
        event: EventKey,
        ...args: ArgsN<EventMap[EventKey]>
    ) => {
        return this.emitter.emit(event as string, ...args);
    };

    on = <EventKey extends keyof EventMap = string>(event: EventKey, listener: EventMap[EventKey]): this => {
        this.emitter.on(event as string, listener);
        return this;
    };
    once = <EventKey extends keyof EventMap = string>(event: EventKey, listener: EventMap[EventKey]): this => {
        this.emitter.once(event as string, listener);
        return this;
    };
    addListener = <EventKey extends keyof EventMap = string>(event: EventKey, listener: EventMap[EventKey]): this => {
        this.emitter.addListener(event as string, listener);
        return this;
    };
    removeListener = <EventKey extends keyof EventMap = string>(event: EventKey, listener: EventMap[EventKey]): this => {
        this.emitter.removeListener(event as string, listener);
        return this;
    };
    hasListeners = <EventKey extends keyof EventMap = string>(event: EventKey) => {
        return this.emitter.listenerCount(event as string) !== 0;
    };
    prependListener = <EventKey extends keyof EventMap = string>(event: EventKey, listener: EventMap[EventKey]): this => {
        this.emitter.prependListener(event as string, listener);
        return this;
    };
    prependOnceListener = <EventKey extends keyof EventMap = string>(event: string | symbol, listener: EventMap[EventKey]): this => {
        this.emitter.prependOnceListener(event as string, listener);
        return this;
    };
    off = <EventKey extends keyof EventMap = string>(event: EventKey, listener: EventMap[EventKey]): this => {
        this.emitter.off(event as string, listener);
        return this;
    };
    removeAllListeners = <EventKey extends keyof EventMap = string>(event?: EventKey): this => {
        this.emitter.removeAllListeners(event as string);
        return this;
    };
    setMaxListeners = (n: number): this => {
        this.emitter.setMaxListeners(n);
        return this;
    };
    getMaxListeners = (): number => {
        return this.emitter.getMaxListeners();
    };
    listeners = <EventKey extends keyof EventMap = string>(event: EventKey): EventMap[EventKey][] => {
        return this.emitter.listeners(event as string) as any[];
    };
    rawListeners = <EventKey extends keyof EventMap = string>(event: EventKey): EventMap[EventKey][] => {
        return this.emitter.rawListeners(event as string) as any[];
    };
    eventNames = (): Array<string | symbol> => {
        return this.emitter.eventNames();
    };
    listenerCount = <EventKey extends keyof EventMap = string>(type: EventKey): number => {
        return this.emitter.listenerCount(type as string);
    };
}
