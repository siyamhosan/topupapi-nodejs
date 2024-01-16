type EventListener<T extends Array<any>> = (...args: T) => void;

export class EventEmitter<EventMap extends Record<string, Array<any>>> {
  private listeners: {
    [K in keyof EventMap]?: Set<EventListener<EventMap[K]>>;
  } = {};

  on<K extends keyof EventMap>(event: K, listener: EventListener<EventMap[K]>) {
    if (!this.listeners[event]) {
      this.listeners[event] = new Set();
    }
    this.listeners[event]!.add(listener);
  }

  emit<K extends keyof EventMap>(event: K, ...args: EventMap[K]) {
    if (!this.listeners[event]) {
      return;
    }
    this.listeners[event]!.forEach((listener) => listener(...args));
  }
}
