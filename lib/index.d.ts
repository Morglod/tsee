/// <reference types="node" />
import * as events from 'events';
import { ArgsN } from 'tsargs';
export declare type Listener = (...args: any[]) => Promise<any> | void;
export declare type DefaultEventMap = {
    [event: string]: Listener;
};
export declare class EventEmitter<EventMap extends DefaultEventMap = DefaultEventMap> {
    readonly emitter: events.EventEmitter;
    emit<EventKey extends keyof EventMap>(event: EventKey, ...args: ArgsN<EventMap[EventKey]>): void;
    emitWait<EventKey extends keyof EventMap = string>(timeout: number, event: EventKey, ...args: ArgsN<EventMap[EventKey]>): Promise<{}>;
    on<EventKey extends keyof EventMap = string>(event: EventKey, listener: EventMap[EventKey]): this;
    once<EventKey extends keyof EventMap = string>(event: EventKey, listener: EventMap[EventKey]): this;
    addListener<EventKey extends keyof EventMap = string>(event: EventKey, listener: EventMap[EventKey]): this;
    removeListener<EventKey extends keyof EventMap = string>(event: EventKey, listener: EventMap[EventKey]): this;
    hasListeners<EventKey extends keyof EventMap = string>(event: EventKey): boolean;
}
