import { EventEmitter2 } from 'eventemitter2';

export default class StateSubscriber extends EventEmitter2 {
  _recentValues: {
    [event: string]: any;
  } = {};

  constructor() {
    super();
  }

  next(event: string, data: any): boolean {
    this._recentValues[event] = data;
    return this.emit(event, data);
  }

  subscribe(event: string, cb: (data: any) => void): EventEmitter2 {
    this.addListener(event, cb);
    cb(this._recentValues[event]);

    return this;
  }

  subscribeOnce(event: string, cb: (data: any) => void): EventEmitter2 {
    this.once(event, cb);
    cb(this._recentValues[event]);

    return this;
  }

  unsubscribe(event: string, cb: (data: any) => void): EventEmitter2 {
    this.removeListener(event, cb);
    return this;
  }

  unsubscribeAll(event: string): EventEmitter2 {
    this.removeAllListeners(event);
    return this;
  }
}
