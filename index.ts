import { EventEmitter2 } from 'eventemitter2';

export default class StateSubscriber extends EventEmitter2 {
    /*
     * Set this to true, if you want only receive updates on next events.
     */
    updatesOnly: boolean = false;
    /*
     * The internal cache to keep the last values of an event.
     */
    _recentValues: {
        [event: string]: any;
    } = {};

    constructor() {
        super();
    }

    /*
     * Next will update the state of the last value of an event.
     * If you set updatesOnly to true, then it will prevent from sending duplicate event values.
     */
    next(event: string, data: any): boolean {
        if (
            this.updatesOnly &&
            this._recentValues[event] &&
            this._recentValues[event] === data
        ) {
            return false;
        }

        this._recentValues[event] = data;
        return this.emit(event, data);
    }

    /*
     * Subscribe will receive the values from next or emit.
     * Similar to .on() but you will receive the last value on subscription from the next event.
     */
    subscribe(event: string, cb: (data: any) => void): EventEmitter2 {
        this.addListener(event, cb);
        cb(this._recentValues[event]);

        return this;
    }

    /*
     * Subscribe will receive the last value from next.
     * Similar to .once() but you will receive the last value on subscription from the next event once.
     */
    subscribeOnce(event: string, cb: (data: any) => void): EventEmitter2 {
        this.once(event, cb);
        cb(this._recentValues[event]);

        return this;
    }

    /*
     * Unsubscribe will unsubscribe from an event.
     * Similar to .removeListener().
     */
    unsubscribe(event: string, cb: (data: any) => void): EventEmitter2 {
        this.removeListener(event, cb);
        return this;
    }

    /*
     * UnsubscribeAll will unsubscribe all listeners from an event.
     * Similar to .removeAllListeners().
     */
    unsubscribeAll(event: string): EventEmitter2 {
        this.removeAllListeners(event);
        return this;
    }
}
