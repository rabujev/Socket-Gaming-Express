const EventEmitter = require('events');

export default class GameRules {
  constructor(EventEmitter) {
    this.eventEmitter = new EventEmitter;
  }
}
