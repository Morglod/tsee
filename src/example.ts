import { EventEmitter } from './index';

const events = new EventEmitter<{
    foo: (a: number, b: string) => void,
}>();

events.emit('foo', 123);