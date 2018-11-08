var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = toJSON;

function toJSON(capnpObject, struct) {
  if ((typeof capnpObject === 'undefined' ? 'undefined' : _typeof(capnpObject)) !== 'object' || !capnpObject._capnp) {
    return capnpObject;
  }
  if (Array.isArray(capnpObject)) {
    return capnpObject.map(toJSON);
  }
  struct = struct || capnpObject.constructor;
  var which = capnpObject.which ? capnpObject.which() : -1;
  var unionCapsName = null;
  var unionName = null;

  if (capnpObject.constructor._capnp.displayName.startsWith('List')) {
    return capnpObject.toArray().map(function (n) {
      return toJSON(n);
    });
  }

  var data = {};

  Object.keys(capnpObject.constructor.prototype).forEach(function (method) {
    if (!method.startsWith('get')) {
      return;
    }
    var name = method.substr(3);
    var capsName = '';
    var wasLower = false;

    for (var i = 0, len = name.length; i < len; ++i) {
      if (name[i].toLowerCase() !== name[i]) {
        if (wasLower) {
          capsName += '_';
        }
        wasLower = false;
      } else {
        wasLower = true;
      }
      capsName += name[i].toUpperCase();
    }

    if (which === struct[capsName]) {
      assignGetter(data, name, capnpObject, method);
      unionName = name;
      unionCapsName = capsName;
    } else if (struct[capsName] === undefined) {
      assignGetter(data, name, capnpObject, method);
    }
  });

  return data;
}

function assignGetter(data, name, capnpObject, method) {
  Object.defineProperty(data, name, {
    enumerable: true,
    configurable: true,
    get: function get() {
      var value = capnpObject[method]();
      switch (value.constructor.name) {
        case 'Uint64':
        case 'Int64':
          // just tostring all 64 bit ints
          value = value.toString();
          break;
        default:
          value = toJSON(value);
          break;
      }
      Object.defineProperty(data, name, {
        configurable: false,
        writable: false,
        value: value
      });
      return value;
    }
  });
}