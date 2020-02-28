import { EventEmitter2 } from 'eventemitter2';

export default class StateSubscriber extends EventEmitter2 {
  _recentValues: {
    [event: string]: any;
  } = {};

  constructor(props) {
    super(props);
  }

  next(event: string, data: any) {
    this._recentValues[event] = data;
    return this.emit(event, data);
  }

  subscribe(event: string, cb: (data: any) => {}) {
    this.addListener(event, cb);
    cb(this._recentValues[event]);

    return this;
  }

  subscribeOnce(event, cb: (data: any) => {}) {
    this.once(event, cb);
    cb(this._recentValues[event]);

    return this;
  }

  unsubscribe(event, cb: (data: any) => {}) {
    this.removeListener(event, cb);
    return this;
  }
}
