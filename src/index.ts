import * as events from 'events';
import { Arg1, Arg2, Arg3, Arg4, Arg5 } from 'tsargs';

export type Listener = (...args: any[]) => Promise<any>|void;
export type DefaultEventMap = { [event: string]: Listener };

export class EventEmitter<EventMap extends DefaultEventMap = DefaultEventMap> {
    readonly emitter = new events.EventEmitter;

    emit<EventKey extends keyof EventMap = string>(
        event: EventKey,
        arg1?: never, arg2?: never, arg3?: never, arg4?: never, arg5?: never,
    );
    emit<EventKey extends keyof EventMap = string>(
        event: EventKey,
        arg1: Arg1<EventMap[EventKey]>,
        arg2?: never, arg3?: never, arg4?: never, arg5?: never,
    );
    emit<EventKey extends keyof EventMap = string>(
        event: EventKey,
        arg1: Arg1<EventMap[EventKey]>, arg2: Arg2<EventMap[EventKey]>,
        arg3?: never, arg4?: never, arg5?: never,
    );
    emit<EventKey extends keyof EventMap = string>(
        event: EventKey,
        arg1: Arg1<EventMap[EventKey]>, arg2: Arg2<EventMap[EventKey]>, arg3: Arg3<EventMap[EventKey]>,
        arg4?: never, arg5?: never,
    );
    emit<EventKey extends keyof EventMap = string>(
        event: EventKey,
        arg1: Arg1<EventMap[EventKey]>, arg2: Arg2<EventMap[EventKey]>, arg3: Arg3<EventMap[EventKey]>, arg4: Arg4<EventMap[EventKey]>,
        arg5?: never,
    );
    emit<EventKey extends keyof EventMap = string>(
        event: EventKey,
        arg1: Arg1<EventMap[EventKey]>, arg2: Arg2<EventMap[EventKey]>, arg3: Arg3<EventMap[EventKey]>, arg4: Arg4<EventMap[EventKey]>, arg5: Arg5<EventMap[EventKey]>,
    );
    emit<EventKey extends keyof EventMap = string>(
        event: EventKey,
        arg1: Arg1<EventMap[EventKey]>, arg2: Arg2<EventMap[EventKey]>, arg3: Arg3<EventMap[EventKey]>, arg4: Arg4<EventMap[EventKey]>, arg5: Arg5<EventMap[EventKey]>
    ) {
        // if (isDebug) console.log('emit', event, args);
        this.emitter.emit(event as string, arg1, arg2, arg3, arg4, arg5);
    }

    async emitWait<EventKey extends keyof EventMap = string>(
        timeout: number,
        event: EventKey,
        ...args: any[]
    ) {
        // if (isDebug) console.log('emit', timeout, event, args);
        return new Promise(resolve => {
            setTimeout(async () => {
                await Promise.all(this.emitter.listeners(event as string).map(x => x(...args)));
                resolve();
            }, timeout);
        });
    }

    on<EventKey extends keyof EventMap = string>(event: EventKey, listener: EventMap[EventKey]): this {
        this.emitter.on(event as string, listener);
        return this;
    }
    once<EventKey extends keyof EventMap = string>(event: EventKey, listener: EventMap[EventKey]): this {
        this.emitter.once(event as string, listener);
        return this;
    }
    addListener<EventKey extends keyof EventMap = string>(event: EventKey, listener: EventMap[EventKey]): this {
        this.emitter.addListener(event as string, listener);
        return this;
    }
    removeListener<EventKey extends keyof EventMap = string>(event: EventKey, listener: EventMap[EventKey]): this {
        this.emitter.removeListener(event as string, listener);
        return this;
    }
    hasListeners<EventKey extends keyof EventMap = string>(event: EventKey) {
        return this.emitter.listenerCount(event as string) !== 0;
    }
}

// export function createEventEmitter<EventMap extends DefaultEventMap>(): (EventEmitter_<EventMap> & { emit: ({  })[number] }) {
//     return new EventEmitter_<EventMap>();
// }