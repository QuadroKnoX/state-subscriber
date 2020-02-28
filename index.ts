import { EventEmitter2 } from 'eventemitter2';

export default class StateSubscriber extends EventEmitter2 {
  _recentValues: {
    [event: string]: any;
  } = {};

  constructor() {
    super();
  }

  next(event: string, data: any) {
    this._recentValues[event] = data;
    return this.emit(event, data);
  }

  subscribe(event: string, cb: (data: any) => void) {
    this.addListener(event, cb);
    cb(this._recentValues[event]);

    return this;
  }

  subscribeOnce(event, cb: (data: any) => void) {
    this.once(event, cb);
    cb(this._recentValues[event]);

    return this;
  }

  unsubscribe(event, cb: (data: any) => void) {
    this.removeListener(event, cb);
    return this;
  }
}
