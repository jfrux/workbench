const capnp = require('capnp-ts');
const partial = require('ap').partial;

const Log = require('../capnp/log.capnp');
const toJSON = require('capnp-json');

const CapnpThermalData = Log.ThermalData;

module.exports = ThermalData;

function ThermalData (buf) {
  // force usage of new
  if (!(this instanceof ThermalData)) {
    return new ThermalData(buf);
  }
  this.msg = new capnp.Message(buf, false);
  this.thermal = this.msg.getRoot(CapnpThermalData);

  this.toJSON = partial(toJSON, this.event);
}
