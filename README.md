[![NPM Version](https://badge.fury.io/js/yet-another-unique-name-ts-event-emitter.svg?style=flat)](https://www.npmjs.com/package/yet-another-unique-name-ts-event-emitter)

# ts-event-emitter

Typed EventEmitter implemented with [tsargs](https://www.npmjs.com/package/tsargs), based on nodejs EventEmitter.

## Install & use

```
npm i ts-event-emitter
```

```ts
import { EventEmitter } from 'ts-event-emitter';

const events = new EventEmitter<{
    foo: (a: number, b: string) => void,
}>();

events.emit('foo', 123, 'hello world');
```

## Feature

`EventEmitter.emit`'s args is fully typed based on events map.

For `foo` event in example above, signature is: `emit(eventName: string, a: number, b: string)`.

## Api

`EventEmitter<T>` where `T` extends `{ [eventName]: Call signature }`.

## How it works?

Secret is [ArgsN from tsargs](https://github.com/Morglod/tsargs#pick-range-of-arguments):
```ts
emit<EventKey extends keyof EventMap>(
    event: EventKey,
    ...args: ArgsN<EventMap[EventKey]>
) {
    this.emitter.emit(event as string, ...args);
}
```