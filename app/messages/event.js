const capnp = require('capnp-ts');
const partial = require('ap').partial;

const Log = require('../capnp/log.capnp');
const toJSON = require('capnp-json');

const CapnpEvent = Log.Event;

module.exports = Event;

function Event (buf) {
  // force usage of new
  if (!(this instanceof Event)) {
    return new Event(buf);
  }
  this.msg = new capnp.Message(buf, false);
  this.event = this.msg.getRoot(CapnpEvent);

  this.toJSON = partial(toJSON, this.event);
}
