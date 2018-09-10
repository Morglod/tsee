# ts-event-emitter (WIP)

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

## Feature?

`EventEmitter.emit`'s args is fully typed based on events map.

For `foo` event in example above, signature is: `emit(string, number, string)`.

## Api

`EventEmitter<T>` where `T` extends `{ [eventName]: Call signature }`.