type EventListener = (event: any) => void;

export class EventsManager {
  private readonly _eventListeners = new Map<string, Array<EventListener>>();

  public addListener(eventName: string, listener: EventListener): void {
    if (!this._eventListeners.has(eventName)) {
      this._eventListeners.set(eventName, []);
    }

    this._eventListeners.get(eventName).push(listener);
  }

  public emit(eventName: string, event: any): void {
    this._eventListeners.get(eventName)?.forEach((listener) => listener(event));
  }
}
