const EventEmitter = require('eventemitter');

/**
 * This class describes a state emitter.
 *
 * @class      StateEmitter (name)
 */
class StateEmitter extends EventEmitter {
  constructor(props) {
    super(props);
    this._recentValues = {};
  }

  /**
   * Emit event values and save the value to the states
   *
   * @param      {string}  event  The event name
   * @param      {*}       data       The data
   * @return     {boolean} Returns a boolean
   */
  next(event, data) {
    this._recentValues[event] = data;
    return this.emit(event, data);
  }

  /**
   * Subscribe to an event
   *
   * @param      {string | string[]}    event            The event name
   * @param      {Function}  cb                   The handler for the event
   * @return     {this}    Returns the emitter
   */
  subscribe(event, cb) {
    this.addListener(event, cb);
    cb(this._recentValues[event]);

    return this;
  }

  /**
   * Subscribe to an event once
   *
   * @param      {string | string[]}    event            The event name
   * @param      {Function}  cb                   The handler for the event
   * @return     {this}    Returns the emitter
   */
  subscribeOnce(event, cb) {
    this.once(event, cb);
    cb(this._recentValues[event]);

    return this;
  }

  /**
   * Unsubscribe to an event
   *
   * @param      {string | string[]}    event            The event name
   * @param      {Function}  cb                   The handler for the event
   * @return     {this}    Returns the emitter
   */
  unsubscribe(event, cb) {
    this.removeListener(event, cb);
    return this;
  }
}

module.exports = StateEmitter;
