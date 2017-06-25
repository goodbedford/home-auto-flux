import { EventEmitter } from 'events';
import eventTypes from '../constants/eventTypes';

const { CHANGE } = eventTypes;

class Store extends EventEmitter {
  addChangeListener (callback) {
    this.on(CHANGE, callback);
  }

  emitChange () {
    this.emit(CHANGE);
  }

  removeChangeListener (callback) {
    this.removeListener(CHANGE, callback);
  }
}

export default Store;
