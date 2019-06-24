/// <reference types="node" />
import { ArgsN } from 'tsargs';
export declare type Listener = (...args: any[]) => Promise<any> | void;
export declare type DefaultEventMap = {
    [event in string | symbol]: Listener;
};
export interface EventEmitter<EventMap extends DefaultEventMap = DefaultEventMap> {
    emit<EventKey extends keyof EventMap>(event: EventKey, ...args: ArgsN<EventMap[EventKey]>): boolean;
    on<EventKey extends keyof EventMap = string>(event: EventKey, listener: EventMap[EventKey]): this;
    once<EventKey extends keyof EventMap = string>(event: EventKey, listener: EventMap[EventKey]): this;
    addListener<EventKey extends keyof EventMap = string>(event: EventKey, listener: EventMap[EventKey]): this;
    removeListener<EventKey extends keyof EventMap = string>(event: EventKey, listener: EventMap[EventKey]): this;
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
export declare function asTypedEventEmitter<EventMap extends DefaultEventMap, X extends NodeJS.EventEmitter>(x: X): EventEmitter<EventMap>;
/** Proxifying event emitter with types */
export declare class EventEmitter<EventMap extends DefaultEventMap = DefaultEventMap> implements EventEmitter<EventMap> {
    emitter: NodeJS.EventEmitter;
    constructor(baseClass?: (new () => NodeJS.EventEmitter));
    emit: <EventKey extends keyof EventMap>(event: EventKey, ...args: ArgsN<EventMap[EventKey]>) => boolean;
    on: <EventKey extends keyof EventMap = string>(event: EventKey, listener: EventMap[EventKey]) => this;
    once: <EventKey extends keyof EventMap = string>(event: EventKey, listener: EventMap[EventKey]) => this;
    addListener: <EventKey extends keyof EventMap = string>(event: EventKey, listener: EventMap[EventKey]) => this;
    removeListener: <EventKey extends keyof EventMap = string>(event: EventKey, listener: EventMap[EventKey]) => this;
    hasListeners: <EventKey extends keyof EventMap = string>(event: EventKey) => boolean;
    prependListener: <EventKey extends keyof EventMap = string>(event: EventKey, listener: EventMap[EventKey]) => this;
    prependOnceListener: <EventKey extends keyof EventMap = string>(event: string | symbol, listener: EventMap[EventKey]) => this;
    off: <EventKey extends keyof EventMap = string>(event: EventKey, listener: EventMap[EventKey]) => this;
    removeAllListeners: <EventKey extends keyof EventMap = string>(event?: EventKey) => this;
    setMaxListeners: (n: number) => this;
    getMaxListeners: () => number;
    listeners: <EventKey extends keyof EventMap = string>(event: EventKey) => EventMap[EventKey][];
    rawListeners: <EventKey extends keyof EventMap = string>(event: EventKey) => EventMap[EventKey][];
    eventNames: () => (string | symbol)[];
    listenerCount: <EventKey extends keyof EventMap = string>(type: EventKey) => number;
}
