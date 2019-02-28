var zerorpc = require("zerorpc");

var server = new zerorpc.Server({
  [types.SCAN_NETWORK]: function() {
      reply(null, sentence + ", man!");
  },

  add42: function(n, reply) {
      reply(null, n + 42);
  },

  iter: function(from, to, step, reply) {
      for(i=from; i<to; i+=step) {
          reply(null, i, true);
      }

      reply();
  }
});

server.bind("tcp://0.0.0.0:12000");
