// const capnp = require('capnp-ts');
const partial = require('ap').partial;
// const Log = require('../capnp/log.capnp');
// import {toJSON} from './capnp-json';

// const CapnpEvent = Log.Event;

module.exports = Event;
// msg:
//   Message {
//     _capnp: { arena: [Object], segments: [Array], traversalLimit: 67108856 } },
// event:
//   Event {
//     _capnp:
//     { compositeList: false,
//       depthLimit: 2147483647,
//       compositeIndex: undefined },
//     segment:
//     Segment {
//       id: 0,
//       message: [Object],
//       buffer: ArrayBuffer { byteLength: 72 },
//       _dv: [Object],
//       byteOffset: 0,
//       byteLength: 72,
//       [Symbol(Symbol.toStringTag)]: 'Segment' },
//     byteOffset: 0 },
// toJSON: [Function] }
function Event (buf) {
  // force usage of new
  if (!(this instanceof Event)) {
    return new Event(buf);
  }
  // this.msg = JSON.parse(buf.toString('utf8'));
  // console.log("this.msg",this.msg);
  // this.eventKey = Object.keys(this.msg)[0];
  // console.log("this.eventKey",this.eventKey);
  // this.event = inflection.camelize(this.eventKey, true);
  // console.log("this.event",this.event);
  this.toJSON = () => {
    return JSON.parse(buf.toString('utf8'))
  }
}
