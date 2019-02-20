! function(e) {
  function __webpack_require__(r) {
      if (t[r]) return t[r].exports;
      var n = t[r] = {
          i: r,
          l: !1,
          exports: {}
      };
      return e[r].call(n.exports, n, n.exports, __webpack_require__), n.l = !0, n.exports
  }
  var t = {};
  __webpack_require__.m = e, __webpack_require__.c = t, __webpack_require__.d = function(e, t, r) {
      __webpack_require__.o(e, t) || Object.defineProperty(e, t, {
          configurable: !1,
          enumerable: !0,
          get: r
      })
  }, __webpack_require__.n = function(e) {
      var t = e && e.__esModule ? function() {
          return e.default
      } : function() {
          return e
      };
      return __webpack_require__.d(t, "a", t), t
  }, __webpack_require__.o = function(e, t) {
      return Object.prototype.hasOwnProperty.call(e, t)
  }, __webpack_require__.p = "/", __webpack_require__(__webpack_require__.s = 22)
}([function(e, t, r) {
  e.exports = r(28)
}, function(e, t) {
  var r;
  r = function() {
      return this
  }();
  try {
      r = r || Function("return this")() || (0, eval)("this")
  } catch (e) {
      "object" === typeof window && (r = window)
  }
  e.exports = r
}, function(e, t, r) {
  "use strict";

  function encoderForArrayFormat(e) {
      switch (e.arrayFormat) {
          case "index":
              return function(t, r, n) {
                  return null === r ? [encode(t, e), "[", n, "]"].join("") : [encode(t, e), "[", encode(n, e), "]=", encode(r, e)].join("")
              };
          case "bracket":
              return function(t, r) {
                  return null === r ? encode(t, e) : [encode(t, e), "[]=", encode(r, e)].join("")
              };
          default:
              return function(t, r) {
                  return null === r ? encode(t, e) : [encode(t, e), "=", encode(r, e)].join("")
              }
      }
  }

  function parserForArrayFormat(e) {
      var t;
      switch (e.arrayFormat) {
          case "index":
              return function(e, r, n) {
                  if (t = /\[(\d*)\]$/.exec(e), e = e.replace(/\[\d*\]$/, ""), !t) return void(n[e] = r);
                  void 0 === n[e] && (n[e] = {}), n[e][t[1]] = r
              };
          case "bracket":
              return function(e, r, n) {
                  return t = /(\[\])$/.exec(e), e = e.replace(/\[\]$/, ""), t ? void 0 === n[e] ? void(n[e] = [r]) : void(n[e] = [].concat(n[e], r)) : void(n[e] = r)
              };
          default:
              return function(e, t, r) {
                  if (void 0 === r[e]) return void(r[e] = t);
                  r[e] = [].concat(r[e], t)
              }
      }
  }

  function encode(e, t) {
      return t.encode ? t.strict ? n(e) : encodeURIComponent(e) : e
  }

  function keysSorter(e) {
      return Array.isArray(e) ? e.sort() : "object" === typeof e ? keysSorter(Object.keys(e)).sort(function(e, t) {
          return Number(e) - Number(t)
      }).map(function(t) {
          return e[t]
      }) : e
  }

  function extract(e) {
      var t = e.indexOf("?");
      return -1 === t ? "" : e.slice(t + 1)
  }

  function parse(e, t) {
      t = o({
          arrayFormat: "none"
      }, t);
      var r = parserForArrayFormat(t),
          n = Object.create(null);
      return "string" !== typeof e ? n : (e = e.trim().replace(/^[?#&]/, "")) ? (e.split("&").forEach(function(e) {
          var t = e.replace(/\+/g, " ").split("="),
              o = t.shift(),
              a = t.length > 0 ? t.join("=") : void 0;
          a = void 0 === a ? null : i(a), r(i(o), a, n)
      }), Object.keys(n).sort().reduce(function(e, t) {
          var r = n[t];
          return Boolean(r) && "object" === typeof r && !Array.isArray(r) ? e[t] = keysSorter(r) : e[t] = r, e
      }, Object.create(null))) : n
  }
  var n = r(10),
      o = r(11),
      i = r(35);
  t.extract = extract, t.parse = parse, t.stringify = function(e, t) {
      t = o({
          encode: !0,
          strict: !0,
          arrayFormat: "none"
      }, t), !1 === t.sort && (t.sort = function() {});
      var r = encoderForArrayFormat(t);
      return e ? Object.keys(e).sort(t.sort).map(function(n) {
          var o = e[n];
          if (void 0 === o) return "";
          if (null === o) return encode(n, t);
          if (Array.isArray(o)) {
              var i = [];
              return o.slice().forEach(function(e) {
                  void 0 !== e && i.push(r(n, e, i.length))
              }), i.join("&")
          }
          return encode(n, t) + "=" + encode(o, t)
      }).filter(function(e) {
          return e.length > 0
      }).join("&") : ""
  }, t.parseUrl = function(e, t) {
      return {
          url: e.split("?")[0] || "",
          query: parse(extract(e), t)
      }
  }
}, function(e, t) {
  function isFunction(e) {
      var t = r.call(e);
      return "[object Function]" === t || "function" === typeof e && "[object RegExp]" !== t || "undefined" !== typeof window && (e === window.setTimeout || e === window.alert || e === window.confirm || e === window.prompt)
  }
  e.exports = isFunction;
  var r = Object.prototype.toString
}, function(e, t, r) {
  function reducer() {
      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : n,
          t = arguments[1],
          r = null;
      switch (e.loop && null !== e.loop.startTime && (r = e.loop.startTime - e.start), t.type) {
          case o:
              e.offset = t.offset, e.startTime = Date.now(), null !== r && (e.offset < r || e.offset > r + e.loop.duration ? (e.loop = {
                  startTime: null,
                  duration: null
              }, e.loopOffset = null) : (e.offset > r + e.loop.duration && (e.offset = r + e.loop.duration - 1e3), e.offset < r && (e.offset = r)));
              break;
          case i:
              e.offset = currentOffset(e), e.playSpeed = 0;
              break;
          case a:
              t.speed !== e.playSpeed && (e.offset = currentOffset(e), e.playSpeed = t.speed, e.startTime = Date.now());
              break;
          case s:
              e.loop = {
                  startTime: t.startTime,
                  duration: t.duration
              }
      }
      var u = e.offset + (Date.now() - e.startTime) * e.playSpeed;
      return e.loop && null !== e.loop.startTime && (r = e.loop.startTime - e.start, u < r ? (e.startTime = Date.now(), e.offset = r) : u > r + e.loop.duration && (e.offset = (u - r) % e.loop.duration + r, e.startTime = Date.now())), e
  }

  function timestampToOffset(e, t) {
      return t - e.start
  }

  function currentOffset(e) {
      var t = e.offset + (Date.now() - e.startTime) * e.playSpeed;
      if (e.loop && e.loop.startTime) {
          var r = e.loop.startTime - e.start;
          t > r + e.loop.duration && (t = (t - r) % e.loop.duration + r)
      }
      return t
  }

  function seek(e) {
      return {
          type: o,
          offset: e
      }
  }

  function pause() {
      return {
          type: i
      }
  }

  function play() {
      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1;
      return {
          type: a,
          speed: e
      }
  }

  function selectLoop(e, t) {
      return {
          type: s,
          startTime: e,
          duration: t
      }
  }
  var n = r(20),
      o = "action_seek",
      i = "action_pause",
      a = "action_play",
      s = "action_loop";
  e.exports = {
      pause: pause,
      play: play,
      seek: seek,
      currentOffset: currentOffset,
      selectLoop: selectLoop,
      timestampToOffset: timestampToOffset,
      reducer: reducer
  }
}, function(e, t, r) {
  "use strict";
  r.d(t, "d", function() {
      return n
  }), r.d(t, "a", function() {
      return o
  }), r.d(t, "b", function() {
      return i
  }), r.d(t, "c", function() {
      return a
  }), r.d(t, "e", function() {
      return s
  });
  var n = "ACTION_STARTUP_DATA",
      o = "ACTION_PROFILE_REFRESHED",
      i = "ACTION_SELECT_DEVICE",
      a = "ACTION_SELECT_TIME_RANGE",
      s = "ACTION_UPDATE_DEVICE"
}, function(e, t) {
  function Event() {
      function broadcast(t) {
          for (var r = e.slice(), n = 0; n < r.length; n++) r[n].deleted || r[n].fn(t)
      }

      function event(t) {
          function removeListener() {
              for (var r = 0; r < e.length; r++)
                  if (e[r].fn === t) {
                      e[r].deleted = !0, e.splice(r, 1);
                      break
                  }
          }
          return e.push(new ListItem(t)), removeListener
      }
      var e = [];
      return {
          broadcast: broadcast,
          listen: event
      }
  }

  function ListItem(e) {
      this.fn = e, this.deleted = !1
  }
  e.exports = Event
}, function(e, t, r) {
  function wrap(e, t) {
      return function(r, o) {
          return n(r), handler(t, e(r, o))
      }
  }

  function handler(e, t) {
      return function() {
          return e(t)
      }
  }
  var n = r(33);
  e.exports = {
      timeout: wrap(setTimeout, clearTimeout),
      interval: wrap(setInterval, clearInterval)
  }
}, function(e, t, r) {
  (function(t) {
      var r, r;
      ! function(t) {
          e.exports = t()
      }(function() {
          return function e(t, n, o) {
              function s(a, u) {
                  if (!n[a]) {
                      if (!t[a]) {
                          var c = "function" == typeof r && r;
                          if (!u && c) return r(a, !0);
                          if (i) return i(a, !0);
                          var f = new Error("Cannot find module '" + a + "'");
                          throw f.code = "MODULE_NOT_FOUND", f
                      }
                      var l = n[a] = {
                          exports: {}
                      };
                      t[a][0].call(l.exports, function(e) {
                          var r = t[a][1][e];
                          return s(r || e)
                      }, l, l.exports, e, t, n, o)
                  }
                  return n[a].exports
              }
              for (var i = "function" == typeof r && r, a = 0; a < o.length; a++) s(o[a]);
              return s
          }({
              1: [function(e, r, n) {
                  (function(e) {
                      "use strict";

                      function nextTick() {
                          u = !0;
                          for (var e, t, r = c.length; r;) {
                              for (t = c, c = [], e = -1; ++e < r;) t[e]();
                              r = c.length
                          }
                          u = !1
                      }

                      function immediate(e) {
                          1 !== c.push(e) || u || t()
                      }
                      var t, n = e.MutationObserver || e.WebKitMutationObserver;
                      if (n) {
                          var o = 0,
                              i = new n(nextTick),
                              a = e.document.createTextNode("");
                          i.observe(a, {
                              characterData: !0
                          }), t = function() {
                              a.data = o = ++o % 2
                          }
                      } else if (e.setImmediate || "undefined" === typeof e.MessageChannel) t = "document" in e && "onreadystatechange" in e.document.createElement("script") ? function() {
                          var t = e.document.createElement("script");
                          t.onreadystatechange = function() {
                              nextTick(), t.onreadystatechange = null, t.parentNode.removeChild(t), t = null
                          }, e.document.documentElement.appendChild(t)
                      } : function() {
                          setTimeout(nextTick, 0)
                      };
                      else {
                          var s = new e.MessageChannel;
                          s.port1.onmessage = nextTick, t = function() {
                              s.port2.postMessage(0)
                          }
                      }
                      var u, c = [];
                      r.exports = immediate
                  }).call(this, "undefined" !== typeof t ? t : "undefined" !== typeof self ? self : "undefined" !== typeof window ? window : {})
              }, {}],
              2: [function(e, t, r) {
                  "use strict";

                  function INTERNAL() {}

                  function Promise(e) {
                      if ("function" !== typeof e) throw new TypeError("resolver must be a function");
                      this.state = s, this.queue = [], this.outcome = void 0, e !== INTERNAL && safelyResolveThenable(this, e)
                  }

                  function QueueItem(e, t, r) {
                      this.promise = e, "function" === typeof t && (this.onFulfilled = t, this.callFulfilled = this.otherCallFulfilled), "function" === typeof r && (this.onRejected = r, this.callRejected = this.otherCallRejected)
                  }

                  function unwrap(e, t, r) {
                      n(function() {
                          var n;
                          try {
                              n = t(r)
                          } catch (t) {
                              return o.reject(e, t)
                          }
                          n === e ? o.reject(e, new TypeError("Cannot resolve promise with itself")) : o.resolve(e, n)
                      })
                  }

                  function getThen(e) {
                      var t = e && e.then;
                      if (e && ("object" === typeof e || "function" === typeof e) && "function" === typeof t) return function() {
                          t.apply(e, arguments)
                      }
                  }

                  function safelyResolveThenable(e, t) {
                      function onError(t) {
                          r || (r = !0, o.reject(e, t))
                      }

                      function onSuccess(t) {
                          r || (r = !0, o.resolve(e, t))
                      }

                      function tryToUnwrap() {
                          t(onSuccess, onError)
                      }
                      var r = !1,
                          n = tryCatch(tryToUnwrap);
                      "error" === n.status && onError(n.value)
                  }

                  function tryCatch(e, t) {
                      var r = {};
                      try {
                          r.value = e(t), r.status = "success"
                      } catch (e) {
                          r.status = "error", r.value = e
                      }
                      return r
                  }

                  function resolve(e) {
                      return e instanceof this ? e : o.resolve(new this(INTERNAL), e)
                  }

                  function reject(e) {
                      var t = new this(INTERNAL);
                      return o.reject(t, e)
                  }

                  function all(e) {
                      var t = this;
                      if ("[object Array]" !== Object.prototype.toString.call(e)) return this.reject(new TypeError("must be an array"));
                      var r = e.length,
                          n = !1;
                      if (!r) return this.resolve([]);
                      for (var i = new Array(r), a = 0, s = -1, u = new this(INTERNAL); ++s < r;) ! function(e, s) {
                          function resolveFromAll(e) {
                              i[s] = e, ++a !== r || n || (n = !0, o.resolve(u, i))
                          }
                          t.resolve(e).then(resolveFromAll, function(e) {
                              n || (n = !0, o.reject(u, e))
                          })
                      }(e[s], s);
                      return u
                  }

                  function race(e) {
                      var t = this;
                      if ("[object Array]" !== Object.prototype.toString.call(e)) return this.reject(new TypeError("must be an array"));
                      var r = e.length,
                          n = !1;
                      if (!r) return this.resolve([]);
                      for (var i = -1, a = new this(INTERNAL); ++i < r;) ! function(e) {
                          t.resolve(e).then(function(e) {
                              n || (n = !0, o.resolve(a, e))
                          }, function(e) {
                              n || (n = !0, o.reject(a, e))
                          })
                      }(e[i]);
                      return a
                  }
                  var n = e(1),
                      o = {},
                      i = ["REJECTED"],
                      a = ["FULFILLED"],
                      s = ["PENDING"];
                  t.exports = Promise, Promise.prototype.catch = function(e) {
                      return this.then(null, e)
                  }, Promise.prototype.then = function(e, t) {
                      if ("function" !== typeof e && this.state === a || "function" !== typeof t && this.state === i) return this;
                      var r = new this.constructor(INTERNAL);
                      if (this.state !== s) {
                          unwrap(r, this.state === a ? e : t, this.outcome)
                      } else this.queue.push(new QueueItem(r, e, t));
                      return r
                  }, QueueItem.prototype.callFulfilled = function(e) {
                      o.resolve(this.promise, e)
                  }, QueueItem.prototype.otherCallFulfilled = function(e) {
                      unwrap(this.promise, this.onFulfilled, e)
                  }, QueueItem.prototype.callRejected = function(e) {
                      o.reject(this.promise, e)
                  }, QueueItem.prototype.otherCallRejected = function(e) {
                      unwrap(this.promise, this.onRejected, e)
                  }, o.resolve = function(e, t) {
                      var r = tryCatch(getThen, t);
                      if ("error" === r.status) return o.reject(e, r.value);
                      var n = r.value;
                      if (n) safelyResolveThenable(e, n);
                      else {
                          e.state = a, e.outcome = t;
                          for (var i = -1, s = e.queue.length; ++i < s;) e.queue[i].callFulfilled(t)
                      }
                      return e
                  }, o.reject = function(e, t) {
                      e.state = i, e.outcome = t;
                      for (var r = -1, n = e.queue.length; ++r < n;) e.queue[r].callRejected(t);
                      return e
                  }, Promise.resolve = resolve, Promise.reject = reject, Promise.all = all, Promise.race = race
              }, {
                  1: 1
              }],
              3: [function(e, r, n) {
                  (function(t) {
                      "use strict";
                      "function" !== typeof t.Promise && (t.Promise = e(2))
                  }).call(this, "undefined" !== typeof t ? t : "undefined" !== typeof self ? self : "undefined" !== typeof window ? window : {})
              }, {
                  2: 2
              }],
              4: [function(e, t, r) {
                  "use strict";

                  function _classCallCheck(e, t) {
                      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                  }

                  function createBlob(e, t) {
                      e = e || [], t = t || {};
                      try {
                          return new Blob(e, t)
                      } catch (i) {
                          if ("TypeError" !== i.name) throw i;
                          for (var r = "undefined" !== typeof BlobBuilder ? BlobBuilder : "undefined" !== typeof MSBlobBuilder ? MSBlobBuilder : "undefined" !== typeof MozBlobBuilder ? MozBlobBuilder : WebKitBlobBuilder, n = new r, o = 0; o < e.length; o += 1) n.append(e[o]);
                          return n.getBlob(t.type)
                      }
                  }

                  function executeCallback(e, t) {
                      t && e.then(function(e) {
                          t(null, e)
                      }, function(e) {
                          t(e)
                      })
                  }

                  function executeTwoCallbacks(e, t, r) {
                      "function" === typeof t && e.then(t), "function" === typeof r && e.catch(r)
                  }

                  function normalizeKey(e) {
                      return "string" !== typeof e && (console.warn(e + " used as a key, but it is not a string."), e = String(e)), e
                  }

                  function getCallback() {
                      if (arguments.length && "function" === typeof arguments[arguments.length - 1]) return arguments[arguments.length - 1]
                  }

                  function _binStringToArrayBuffer(e) {
                      for (var t = e.length, r = new ArrayBuffer(t), n = new Uint8Array(r), o = 0; o < t; o++) n[o] = e.charCodeAt(o);
                      return r
                  }

                  function _checkBlobSupportWithoutCaching(e) {
                      return new i(function(t) {
                          var r = e.transaction(a, l),
                              n = createBlob([""]);
                          r.objectStore(a).put(n, "key"), r.onabort = function(e) {
                              e.preventDefault(), e.stopPropagation(), t(!1)
                          }, r.oncomplete = function() {
                              var e = navigator.userAgent.match(/Chrome\/(\d+)/),
                                  r = navigator.userAgent.match(/Edge\//);
                              t(r || !e || parseInt(e[1], 10) >= 43)
                          }
                      }).catch(function() {
                          return !1
                      })
                  }

                  function _checkBlobSupport(e) {
                      return "boolean" === typeof s ? i.resolve(s) : _checkBlobSupportWithoutCaching(e).then(function(e) {
                          return s = e
                      })
                  }

                  function _deferReadiness(e) {
                      var t = u[e.name],
                          r = {};
                      r.promise = new i(function(e, t) {
                          r.resolve = e, r.reject = t
                      }), t.deferredOperations.push(r), t.dbReady ? t.dbReady = t.dbReady.then(function() {
                          return r.promise
                      }) : t.dbReady = r.promise
                  }

                  function _advanceReadiness(e) {
                      var t = u[e.name],
                          r = t.deferredOperations.pop();
                      if (r) return r.resolve(), r.promise
                  }

                  function _rejectReadiness(e, t) {
                      var r = u[e.name],
                          n = r.deferredOperations.pop();
                      if (n) return n.reject(t), n.promise
                  }

                  function _getConnection(e, t) {
                      return new i(function(r, n) {
                          if (u[e.name] = u[e.name] || createDbContext(), e.db) {
                              if (!t) return r(e.db);
                              _deferReadiness(e), e.db.close()
                          }
                          var i = [e.name];
                          t && i.push(e.version);
                          var s = o.open.apply(o, i);
                          t && (s.onupgradeneeded = function(t) {
                              var r = s.result;
                              try {
                                  r.createObjectStore(e.storeName), t.oldVersion <= 1 && r.createObjectStore(a)
                              } catch (r) {
                                  if ("ConstraintError" !== r.name) throw r;
                                  console.warn('The database "' + e.name + '" has been upgraded from version ' + t.oldVersion + " to version " + t.newVersion + ', but the storage "' + e.storeName + '" already exists.')
                              }
                          }), s.onerror = function(e) {
                              e.preventDefault(), n(s.error)
                          }, s.onsuccess = function() {
                              r(s.result), _advanceReadiness(e)
                          }
                      })
                  }

                  function _getOriginalConnection(e) {
                      return _getConnection(e, !1)
                  }

                  function _getUpgradedConnection(e) {
                      return _getConnection(e, !0)
                  }

                  function _isUpgradeNeeded(e, t) {
                      if (!e.db) return !0;
                      var r = !e.db.objectStoreNames.contains(e.storeName),
                          n = e.version < e.db.version,
                          o = e.version > e.db.version;
                      if (n && (e.version !== t && console.warn('The database "' + e.name + "\" can't be downgraded from version " + e.db.version + " to version " + e.version + "."), e.version = e.db.version), o || r) {
                          if (r) {
                              var i = e.db.version + 1;
                              i > e.version && (e.version = i)
                          }
                          return !0
                      }
                      return !1
                  }

                  function _encodeBlob(e) {
                      return new i(function(t, r) {
                          var n = new FileReader;
                          n.onerror = r, n.onloadend = function(r) {
                              var n = btoa(r.target.result || "");
                              t({
                                  __local_forage_encoded_blob: !0,
                                  data: n,
                                  type: e.type
                              })
                          }, n.readAsBinaryString(e)
                      })
                  }

                  function _decodeBlob(e) {
                      return createBlob([_binStringToArrayBuffer(atob(e.data))], {
                          type: e.type
                      })
                  }

                  function _isEncodedBlob(e) {
                      return e && e.__local_forage_encoded_blob
                  }

                  function _fullyReady(e) {
                      var t = this,
                          r = t._initReady().then(function() {
                              var e = u[t._dbInfo.name];
                              if (e && e.dbReady) return e.dbReady
                          });
                      return executeTwoCallbacks(r, e, e), r
                  }

                  function _tryReconnect(e) {
                      _deferReadiness(e);
                      for (var t = u[e.name], r = t.forages, n = 0; n < r.length; n++) {
                          var o = r[n];
                          o._dbInfo.db && (o._dbInfo.db.close(), o._dbInfo.db = null)
                      }
                      return e.db = null, _getOriginalConnection(e).then(function(t) {
                          return e.db = t, _isUpgradeNeeded(e) ? _getUpgradedConnection(e) : t
                      }).then(function(n) {
                          e.db = t.db = n;
                          for (var o = 0; o < r.length; o++) r[o]._dbInfo.db = n
                      }).catch(function(t) {
                          throw _rejectReadiness(e, t), t
                      })
                  }

                  function createTransaction(e, t, r, n) {
                      void 0 === n && (n = 1);
                      try {
                          var o = e.db.transaction(e.storeName, t);
                          r(null, o)
                      } catch (o) {
                          if (n > 0 && (!e.db || "InvalidStateError" === o.name || "NotFoundError" === o.name)) return i.resolve().then(function() {
                              if (!e.db || "NotFoundError" === o.name && !e.db.objectStoreNames.contains(e.storeName) && e.version <= e.db.version) return e.db && (e.version = e.db.version + 1), _getUpgradedConnection(e)
                          }).then(function() {
                              return _tryReconnect(e).then(function() {
                                  createTransaction(e, t, r, n - 1)
                              })
                          }).catch(r);
                          r(o)
                      }
                  }

                  function createDbContext() {
                      return {
                          forages: [],
                          db: null,
                          dbReady: null,
                          deferredOperations: []
                      }
                  }

                  function _initStorage(e) {
                      function ignoreErrors() {
                          return i.resolve()
                      }
                      var t = this,
                          r = {
                              db: null
                          };
                      if (e)
                          for (var n in e) r[n] = e[n];
                      var o = u[r.name];
                      o || (o = createDbContext(), u[r.name] = o), o.forages.push(t), t._initReady || (t._initReady = t.ready, t.ready = _fullyReady);
                      for (var a = [], s = 0; s < o.forages.length; s++) {
                          var c = o.forages[s];
                          c !== t && a.push(c._initReady().catch(ignoreErrors))
                      }
                      var f = o.forages.slice(0);
                      return i.all(a).then(function() {
                          return r.db = o.db, _getOriginalConnection(r)
                      }).then(function(e) {
                          return r.db = e, _isUpgradeNeeded(r, t._defaultConfig.version) ? _getUpgradedConnection(r) : e
                      }).then(function(e) {
                          r.db = o.db = e, t._dbInfo = r;
                          for (var n = 0; n < f.length; n++) {
                              var i = f[n];
                              i !== t && (i._dbInfo.db = r.db, i._dbInfo.version = r.version)
                          }
                      })
                  }

                  function getItem(e, t) {
                      var r = this;
                      e = normalizeKey(e);
                      var n = new i(function(t, n) {
                          r.ready().then(function() {
                              createTransaction(r._dbInfo, f, function(o, i) {
                                  if (o) return n(o);
                                  try {
                                      var a = i.objectStore(r._dbInfo.storeName),
                                          s = a.get(e);
                                      s.onsuccess = function() {
                                          var e = s.result;
                                          void 0 === e && (e = null), _isEncodedBlob(e) && (e = _decodeBlob(e)), t(e)
                                      }, s.onerror = function() {
                                          n(s.error)
                                      }
                                  } catch (e) {
                                      n(e)
                                  }
                              })
                          }).catch(n)
                      });
                      return executeCallback(n, t), n
                  }

                  function iterate(e, t) {
                      var r = this,
                          n = new i(function(t, n) {
                              r.ready().then(function() {
                                  createTransaction(r._dbInfo, f, function(o, i) {
                                      if (o) return n(o);
                                      try {
                                          var a = i.objectStore(r._dbInfo.storeName),
                                              s = a.openCursor(),
                                              u = 1;
                                          s.onsuccess = function() {
                                              var r = s.result;
                                              if (r) {
                                                  var n = r.value;
                                                  _isEncodedBlob(n) && (n = _decodeBlob(n));
                                                  var o = e(n, r.key, u++);
                                                  void 0 !== o ? t(o) : r.continue()
                                              } else t()
                                          }, s.onerror = function() {
                                              n(s.error)
                                          }
                                      } catch (e) {
                                          n(e)
                                      }
                                  })
                              }).catch(n)
                          });
                      return executeCallback(n, t), n
                  }

                  function setItem(e, t, r) {
                      var n = this;
                      e = normalizeKey(e);
                      var o = new i(function(r, o) {
                          var i;
                          n.ready().then(function() {
                              return i = n._dbInfo, "[object Blob]" === c.call(t) ? _checkBlobSupport(i.db).then(function(e) {
                                  return e ? t : _encodeBlob(t)
                              }) : t
                          }).then(function(t) {
                              createTransaction(n._dbInfo, l, function(i, a) {
                                  if (i) return o(i);
                                  try {
                                      var s = a.objectStore(n._dbInfo.storeName);
                                      null === t && (t = void 0);
                                      var u = s.put(t, e);
                                      a.oncomplete = function() {
                                          void 0 === t && (t = null), r(t)
                                      }, a.onabort = a.onerror = function() {
                                          var e = u.error ? u.error : u.transaction.error;
                                          o(e)
                                      }
                                  } catch (e) {
                                      o(e)
                                  }
                              })
                          }).catch(o)
                      });
                      return executeCallback(o, r), o
                  }

                  function removeItem(e, t) {
                      var r = this;
                      e = normalizeKey(e);
                      var n = new i(function(t, n) {
                          r.ready().then(function() {
                              createTransaction(r._dbInfo, l, function(o, i) {
                                  if (o) return n(o);
                                  try {
                                      var a = i.objectStore(r._dbInfo.storeName),
                                          s = a.delete(e);
                                      i.oncomplete = function() {
                                          t()
                                      }, i.onerror = function() {
                                          n(s.error)
                                      }, i.onabort = function() {
                                          var e = s.error ? s.error : s.transaction.error;
                                          n(e)
                                      }
                                  } catch (e) {
                                      n(e)
                                  }
                              })
                          }).catch(n)
                      });
                      return executeCallback(n, t), n
                  }

                  function clear(e) {
                      var t = this,
                          r = new i(function(e, r) {
                              t.ready().then(function() {
                                  createTransaction(t._dbInfo, l, function(n, o) {
                                      if (n) return r(n);
                                      try {
                                          var i = o.objectStore(t._dbInfo.storeName),
                                              a = i.clear();
                                          o.oncomplete = function() {
                                              e()
                                          }, o.onabort = o.onerror = function() {
                                              var e = a.error ? a.error : a.transaction.error;
                                              r(e)
                                          }
                                      } catch (e) {
                                          r(e)
                                      }
                                  })
                              }).catch(r)
                          });
                      return executeCallback(r, e), r
                  }

                  function length(e) {
                      var t = this,
                          r = new i(function(e, r) {
                              t.ready().then(function() {
                                  createTransaction(t._dbInfo, f, function(n, o) {
                                      if (n) return r(n);
                                      try {
                                          var i = o.objectStore(t._dbInfo.storeName),
                                              a = i.count();
                                          a.onsuccess = function() {
                                              e(a.result)
                                          }, a.onerror = function() {
                                              r(a.error)
                                          }
                                      } catch (e) {
                                          r(e)
                                      }
                                  })
                              }).catch(r)
                          });
                      return executeCallback(r, e), r
                  }

                  function key(e, t) {
                      var r = this,
                          n = new i(function(t, n) {
                              if (e < 0) return void t(null);
                              r.ready().then(function() {
                                  createTransaction(r._dbInfo, f, function(o, i) {
                                      if (o) return n(o);
                                      try {
                                          var a = i.objectStore(r._dbInfo.storeName),
                                              s = !1,
                                              u = a.openCursor();
                                          u.onsuccess = function() {
                                              var r = u.result;
                                              if (!r) return void t(null);
                                              0 === e ? t(r.key) : s ? t(r.key) : (s = !0, r.advance(e))
                                          }, u.onerror = function() {
                                              n(u.error)
                                          }
                                      } catch (e) {
                                          n(e)
                                      }
                                  })
                              }).catch(n)
                          });
                      return executeCallback(n, t), n
                  }

                  function keys(e) {
                      var t = this,
                          r = new i(function(e, r) {
                              t.ready().then(function() {
                                  createTransaction(t._dbInfo, f, function(n, o) {
                                      if (n) return r(n);
                                      try {
                                          var i = o.objectStore(t._dbInfo.storeName),
                                              a = i.openCursor(),
                                              s = [];
                                          a.onsuccess = function() {
                                              var t = a.result;
                                              if (!t) return void e(s);
                                              s.push(t.key), t.continue()
                                          }, a.onerror = function() {
                                              r(a.error)
                                          }
                                      } catch (e) {
                                          r(e)
                                      }
                                  })
                              }).catch(r)
                          });
                      return executeCallback(r, e), r
                  }

                  function dropInstance(e, t) {
                      t = getCallback.apply(this, arguments);
                      var r = this.config();
                      e = "function" !== typeof e && e || {}, e.name || (e.name = e.name || r.name, e.storeName = e.storeName || r.storeName);
                      var n, a = this;
                      if (e.name) {
                          var s = e.name === r.name && a._dbInfo.db,
                              c = s ? i.resolve(a._dbInfo.db) : _getOriginalConnection(e).then(function(t) {
                                  var r = u[e.name],
                                      n = r.forages;
                                  r.db = t;
                                  for (var o = 0; o < n.length; o++) n[o]._dbInfo.db = t;
                                  return t
                              });
                          n = e.storeName ? c.then(function(t) {
                              if (t.objectStoreNames.contains(e.storeName)) {
                                  var r = t.version + 1;
                                  _deferReadiness(e);
                                  var n = u[e.name],
                                      a = n.forages;
                                  t.close();
                                  for (var s = 0; s < a.length; s++) {
                                      var c = a[s];
                                      c._dbInfo.db = null, c._dbInfo.version = r
                                  }
                                  return new i(function(t, n) {
                                      var i = o.open(e.name, r);
                                      i.onerror = function(e) {
                                          i.result.close(), n(e)
                                      }, i.onupgradeneeded = function() {
                                          i.result.deleteObjectStore(e.storeName)
                                      }, i.onsuccess = function() {
                                          var e = i.result;
                                          e.close(), t(e)
                                      }
                                  }).then(function(e) {
                                      n.db = e;
                                      for (var t = 0; t < a.length; t++) {
                                          var r = a[t];
                                          r._dbInfo.db = e, _advanceReadiness(r._dbInfo)
                                      }
                                  }).catch(function(t) {
                                      throw (_rejectReadiness(e, t) || i.resolve()).catch(function() {}), t
                                  })
                              }
                          }) : c.then(function(t) {
                              _deferReadiness(e);
                              var r = u[e.name],
                                  n = r.forages;
                              t.close();
                              for (var a = 0; a < n.length; a++) {
                                  n[a]._dbInfo.db = null
                              }
                              return new i(function(t, r) {
                                  var n = o.deleteDatabase(e.name);
                                  n.onerror = n.onblocked = function(e) {
                                      var t = n.result;
                                      t && t.close(), r(e)
                                  }, n.onsuccess = function() {
                                      var e = n.result;
                                      e && e.close(), t(e)
                                  }
                              }).then(function(e) {
                                  r.db = e;
                                  for (var t = 0; t < n.length; t++) _advanceReadiness(n[t]._dbInfo)
                              }).catch(function(t) {
                                  throw (_rejectReadiness(e, t) || i.resolve()).catch(function() {}), t
                              })
                          })
                      } else n = i.reject("Invalid arguments");
                      return executeCallback(n, t), n
                  }

                  function stringToBuffer(e) {
                      var t, r, n, o, i, a = .75 * e.length,
                          s = e.length,
                          u = 0;
                      "=" === e[e.length - 1] && (a--, "=" === e[e.length - 2] && a--);
                      var c = new ArrayBuffer(a),
                          f = new Uint8Array(c);
                      for (t = 0; t < s; t += 4) r = h.indexOf(e[t]), n = h.indexOf(e[t + 1]), o = h.indexOf(e[t + 2]), i = h.indexOf(e[t + 3]), f[u++] = r << 2 | n >> 4, f[u++] = (15 & n) << 4 | o >> 2, f[u++] = (3 & o) << 6 | 63 & i;
                      return c
                  }

                  function bufferToString(e) {
                      var t, r = new Uint8Array(e),
                          n = "";
                      for (t = 0; t < r.length; t += 3) n += h[r[t] >> 2], n += h[(3 & r[t]) << 4 | r[t + 1] >> 4], n += h[(15 & r[t + 1]) << 2 | r[t + 2] >> 6], n += h[63 & r[t + 2]];
                      return r.length % 3 === 2 ? n = n.substring(0, n.length - 1) + "=" : r.length % 3 === 1 && (n = n.substring(0, n.length - 2) + "=="), n
                  }

                  function serialize(e, t) {
                      var r = "";
                      if (e && (r = B.call(e)), e && ("[object ArrayBuffer]" === r || e.buffer && "[object ArrayBuffer]" === B.call(e.buffer))) {
                          var n, o = g;
                          e instanceof ArrayBuffer ? (n = e, o += m) : (n = e.buffer, "[object Int8Array]" === r ? o += _ : "[object Uint8Array]" === r ? o += w : "[object Uint8ClampedArray]" === r ? o += E : "[object Int16Array]" === r ? o += x : "[object Uint16Array]" === r ? o += k : "[object Int32Array]" === r ? o += S : "[object Uint32Array]" === r ? o += A : "[object Float32Array]" === r ? o += O : "[object Float64Array]" === r ? o += T : t(new Error("Failed to get type for BinaryArray"))), t(o + bufferToString(n))
                      } else if ("[object Blob]" === r) {
                          var i = new FileReader;
                          i.onload = function() {
                              var r = d + e.type + "~" + bufferToString(this.result);
                              t(g + b + r)
                          }, i.readAsArrayBuffer(e)
                      } else try {
                          t(JSON.stringify(e))
                      } catch (r) {
                          console.error("Couldn't convert value into a JSON string: ", e), t(null, r)
                      }
                  }

                  function deserialize(e) {
                      if (e.substring(0, v) !== g) return JSON.parse(e);
                      var t, r = e.substring(j),
                          n = e.substring(v, j);
                      if (n === b && y.test(r)) {
                          var o = r.match(y);
                          t = o[1], r = r.substring(o[0].length)
                      }
                      var i = stringToBuffer(r);
                      switch (n) {
                          case m:
                              return i;
                          case b:
                              return createBlob([i], {
                                  type: t
                              });
                          case _:
                              return new Int8Array(i);
                          case w:
                              return new Uint8Array(i);
                          case E:
                              return new Uint8ClampedArray(i);
                          case x:
                              return new Int16Array(i);
                          case k:
                              return new Uint16Array(i);
                          case S:
                              return new Int32Array(i);
                          case A:
                              return new Uint32Array(i);
                          case O:
                              return new Float32Array(i);
                          case T:
                              return new Float64Array(i);
                          default:
                              throw new Error("Unkown type: " + n)
                      }
                  }

                  function createDbTable(e, t, r, n) {
                      e.executeSql("CREATE TABLE IF NOT EXISTS " + t.storeName + " (id INTEGER PRIMARY KEY, key unique, value)", [], r, n)
                  }

                  function _initStorage$1(e) {
                      var t = this,
                          r = {
                              db: null
                          };
                      if (e)
                          for (var n in e) r[n] = "string" !== typeof e[n] ? e[n].toString() : e[n];
                      var o = new i(function(e, n) {
                          try {
                              r.db = openDatabase(r.name, String(r.version), r.description, r.size)
                          } catch (e) {
                              return n(e)
                          }
                          r.db.transaction(function(o) {
                              createDbTable(o, r, function() {
                                  t._dbInfo = r, e()
                              }, function(e, t) {
                                  n(t)
                              })
                          }, n)
                      });
                      return r.serializer = C, o
                  }

                  function tryExecuteSql(e, t, r, n, o, i) {
                      e.executeSql(r, n, o, function(e, a) {
                          a.code === a.SYNTAX_ERR ? e.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name = ?", [name], function(e, s) {
                              s.rows.length ? i(e, a) : createDbTable(e, t, function() {
                                  e.executeSql(r, n, o, i)
                              }, i)
                          }, i) : i(e, a)
                      }, i)
                  }

                  function getItem$1(e, t) {
                      var r = this;
                      e = normalizeKey(e);
                      var n = new i(function(t, n) {
                          r.ready().then(function() {
                              var o = r._dbInfo;
                              o.db.transaction(function(r) {
                                  tryExecuteSql(r, o, "SELECT * FROM " + o.storeName + " WHERE key = ? LIMIT 1", [e], function(e, r) {
                                      var n = r.rows.length ? r.rows.item(0).value : null;
                                      n && (n = o.serializer.deserialize(n)), t(n)
                                  }, function(e, t) {
                                      n(t)
                                  })
                              })
                          }).catch(n)
                      });
                      return executeCallback(n, t), n
                  }

                  function iterate$1(e, t) {
                      var r = this,
                          n = new i(function(t, n) {
                              r.ready().then(function() {
                                  var o = r._dbInfo;
                                  o.db.transaction(function(r) {
                                      tryExecuteSql(r, o, "SELECT * FROM " + o.storeName, [], function(r, n) {
                                          for (var i = n.rows, a = i.length, s = 0; s < a; s++) {
                                              var u = i.item(s),
                                                  c = u.value;
                                              if (c && (c = o.serializer.deserialize(c)), void 0 !== (c = e(c, u.key, s + 1))) return void t(c)
                                          }
                                          t()
                                      }, function(e, t) {
                                          n(t)
                                      })
                                  })
                              }).catch(n)
                          });
                      return executeCallback(n, t), n
                  }

                  function _setItem(e, t, r, n) {
                      var o = this;
                      e = normalizeKey(e);
                      var a = new i(function(i, a) {
                          o.ready().then(function() {
                              void 0 === t && (t = null);
                              var s = t,
                                  u = o._dbInfo;
                              u.serializer.serialize(t, function(t, c) {
                                  c ? a(c) : u.db.transaction(function(r) {
                                      tryExecuteSql(r, u, "INSERT OR REPLACE INTO " + u.storeName + " (key, value) VALUES (?, ?)", [e, t], function() {
                                          i(s)
                                      }, function(e, t) {
                                          a(t)
                                      })
                                  }, function(t) {
                                      if (t.code === t.QUOTA_ERR) {
                                          if (n > 0) return void i(_setItem.apply(o, [e, s, r, n - 1]));
                                          a(t)
                                      }
                                  })
                              })
                          }).catch(a)
                      });
                      return executeCallback(a, r), a
                  }

                  function setItem$1(e, t, r) {
                      return _setItem.apply(this, [e, t, r, 1])
                  }

                  function removeItem$1(e, t) {
                      var r = this;
                      e = normalizeKey(e);
                      var n = new i(function(t, n) {
                          r.ready().then(function() {
                              var o = r._dbInfo;
                              o.db.transaction(function(r) {
                                  tryExecuteSql(r, o, "DELETE FROM " + o.storeName + " WHERE key = ?", [e], function() {
                                      t()
                                  }, function(e, t) {
                                      n(t)
                                  })
                              })
                          }).catch(n)
                      });
                      return executeCallback(n, t), n
                  }

                  function clear$1(e) {
                      var t = this,
                          r = new i(function(e, r) {
                              t.ready().then(function() {
                                  var n = t._dbInfo;
                                  n.db.transaction(function(t) {
                                      tryExecuteSql(t, n, "DELETE FROM " + n.storeName, [], function() {
                                          e()
                                      }, function(e, t) {
                                          r(t)
                                      })
                                  })
                              }).catch(r)
                          });
                      return executeCallback(r, e), r
                  }

                  function length$1(e) {
                      var t = this,
                          r = new i(function(e, r) {
                              t.ready().then(function() {
                                  var n = t._dbInfo;
                                  n.db.transaction(function(t) {
                                      tryExecuteSql(t, n, "SELECT COUNT(key) as c FROM " + n.storeName, [], function(t, r) {
                                          var n = r.rows.item(0).c;
                                          e(n)
                                      }, function(e, t) {
                                          r(t)
                                      })
                                  })
                              }).catch(r)
                          });
                      return executeCallback(r, e), r
                  }

                  function key$1(e, t) {
                      var r = this,
                          n = new i(function(t, n) {
                              r.ready().then(function() {
                                  var o = r._dbInfo;
                                  o.db.transaction(function(r) {
                                      tryExecuteSql(r, o, "SELECT key FROM " + o.storeName + " WHERE id = ? LIMIT 1", [e + 1], function(e, r) {
                                          var n = r.rows.length ? r.rows.item(0).key : null;
                                          t(n)
                                      }, function(e, t) {
                                          n(t)
                                      })
                                  })
                              }).catch(n)
                          });
                      return executeCallback(n, t), n
                  }

                  function keys$1(e) {
                      var t = this,
                          r = new i(function(e, r) {
                              t.ready().then(function() {
                                  var n = t._dbInfo;
                                  n.db.transaction(function(t) {
                                      tryExecuteSql(t, n, "SELECT key FROM " + n.storeName, [], function(t, r) {
                                          for (var n = [], o = 0; o < r.rows.length; o++) n.push(r.rows.item(o).key);
                                          e(n)
                                      }, function(e, t) {
                                          r(t)
                                      })
                                  })
                              }).catch(r)
                          });
                      return executeCallback(r, e), r
                  }

                  function getAllStoreNames(e) {
                      return new i(function(t, r) {
                          e.transaction(function(n) {
                              n.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name <> '__WebKitDatabaseInfoTable__'", [], function(r, n) {
                                  for (var o = [], i = 0; i < n.rows.length; i++) o.push(n.rows.item(i).name);
                                  t({
                                      db: e,
                                      storeNames: o
                                  })
                              }, function(e, t) {
                                  r(t)
                              })
                          }, function(e) {
                              r(e)
                          })
                      })
                  }

                  function dropInstance$1(e, t) {
                      t = getCallback.apply(this, arguments);
                      var r = this.config();
                      e = "function" !== typeof e && e || {}, e.name || (e.name = e.name || r.name, e.storeName = e.storeName || r.storeName);
                      var n, o = this;
                      return n = e.name ? new i(function(t) {
                          var n;
                          n = e.name === r.name ? o._dbInfo.db : openDatabase(e.name, "", "", 0), t(e.storeName ? {
                              db: n,
                              storeNames: [e.storeName]
                          } : getAllStoreNames(n))
                      }).then(function(e) {
                          return new i(function(t, r) {
                              e.db.transaction(function(n) {
                                  for (var o = [], a = 0, s = e.storeNames.length; a < s; a++) o.push(function(e) {
                                      return new i(function(t, r) {
                                          n.executeSql("DROP TABLE IF EXISTS " + e, [], function() {
                                              t()
                                          }, function(e, t) {
                                              r(t)
                                          })
                                      })
                                  }(e.storeNames[a]));
                                  i.all(o).then(function() {
                                      t()
                                  }).catch(function(e) {
                                      r(e)
                                  })
                              }, function(e) {
                                  r(e)
                              })
                          })
                      }) : i.reject("Invalid arguments"), executeCallback(n, t), n
                  }

                  function _getKeyPrefix(e, t) {
                      var r = e.name + "/";
                      return e.storeName !== t.storeName && (r += e.storeName + "/"), r
                  }

                  function checkIfLocalStorageThrows() {
                      try {
                          return localStorage.setItem("_localforage_support_test", !0), localStorage.removeItem("_localforage_support_test"), !1
                      } catch (e) {
                          return !0
                      }
                  }

                  function _isLocalStorageUsable() {
                      return !checkIfLocalStorageThrows() || localStorage.length > 0
                  }

                  function _initStorage$2(e) {
                      var t = this,
                          r = {};
                      if (e)
                          for (var n in e) r[n] = e[n];
                      return r.keyPrefix = _getKeyPrefix(e, t._defaultConfig), _isLocalStorageUsable() ? (t._dbInfo = r, r.serializer = C, i.resolve()) : i.reject()
                  }

                  function clear$2(e) {
                      var t = this,
                          r = t.ready().then(function() {
                              for (var e = t._dbInfo.keyPrefix, r = localStorage.length - 1; r >= 0; r--) {
                                  var n = localStorage.key(r);
                                  0 === n.indexOf(e) && localStorage.removeItem(n)
                              }
                          });
                      return executeCallback(r, e), r
                  }

                  function getItem$2(e, t) {
                      var r = this;
                      e = normalizeKey(e);
                      var n = r.ready().then(function() {
                          var t = r._dbInfo,
                              n = localStorage.getItem(t.keyPrefix + e);
                          return n && (n = t.serializer.deserialize(n)), n
                      });
                      return executeCallback(n, t), n
                  }

                  function iterate$2(e, t) {
                      var r = this,
                          n = r.ready().then(function() {
                              for (var t = r._dbInfo, n = t.keyPrefix, o = n.length, i = localStorage.length, a = 1, s = 0; s < i; s++) {
                                  var u = localStorage.key(s);
                                  if (0 === u.indexOf(n)) {
                                      var c = localStorage.getItem(u);
                                      if (c && (c = t.serializer.deserialize(c)), void 0 !== (c = e(c, u.substring(o), a++))) return c
                                  }
                              }
                          });
                      return executeCallback(n, t), n
                  }

                  function key$2(e, t) {
                      var r = this,
                          n = r.ready().then(function() {
                              var t, n = r._dbInfo;
                              try {
                                  t = localStorage.key(e)
                              } catch (e) {
                                  t = null
                              }
                              return t && (t = t.substring(n.keyPrefix.length)), t
                          });
                      return executeCallback(n, t), n
                  }

                  function keys$2(e) {
                      var t = this,
                          r = t.ready().then(function() {
                              for (var e = t._dbInfo, r = localStorage.length, n = [], o = 0; o < r; o++) {
                                  var i = localStorage.key(o);
                                  0 === i.indexOf(e.keyPrefix) && n.push(i.substring(e.keyPrefix.length))
                              }
                              return n
                          });
                      return executeCallback(r, e), r
                  }

                  function length$2(e) {
                      var t = this,
                          r = t.keys().then(function(e) {
                              return e.length
                          });
                      return executeCallback(r, e), r
                  }

                  function removeItem$2(e, t) {
                      var r = this;
                      e = normalizeKey(e);
                      var n = r.ready().then(function() {
                          var t = r._dbInfo;
                          localStorage.removeItem(t.keyPrefix + e)
                      });
                      return executeCallback(n, t), n
                  }

                  function setItem$2(e, t, r) {
                      var n = this;
                      e = normalizeKey(e);
                      var o = n.ready().then(function() {
                          void 0 === t && (t = null);
                          var r = t;
                          return new i(function(o, i) {
                              var a = n._dbInfo;
                              a.serializer.serialize(t, function(t, n) {
                                  if (n) i(n);
                                  else try {
                                      localStorage.setItem(a.keyPrefix + e, t), o(r)
                                  } catch (e) {
                                      "QuotaExceededError" !== e.name && "NS_ERROR_DOM_QUOTA_REACHED" !== e.name || i(e), i(e)
                                  }
                              })
                          })
                      });
                      return executeCallback(o, r), o
                  }

                  function dropInstance$2(e, t) {
                      if (t = getCallback.apply(this, arguments), e = "function" !== typeof e && e || {}, !e.name) {
                          var r = this.config();
                          e.name = e.name || r.name, e.storeName = e.storeName || r.storeName
                      }
                      var n, o = this;
                      return n = e.name ? new i(function(t) {
                          t(e.storeName ? _getKeyPrefix(e, o._defaultConfig) : e.name + "/")
                      }).then(function(e) {
                          for (var t = localStorage.length - 1; t >= 0; t--) {
                              var r = localStorage.key(t);
                              0 === r.indexOf(e) && localStorage.removeItem(r)
                          }
                      }) : i.reject("Invalid arguments"), executeCallback(n, t), n
                  }

                  function callWhenReady(e, t) {
                      e[t] = function() {
                          var r = arguments;
                          return e.ready().then(function() {
                              return e[t].apply(e, r)
                          })
                      }
                  }

                  function extend() {
                      for (var e = 1; e < arguments.length; e++) {
                          var t = arguments[e];
                          if (t)
                              for (var r in t) t.hasOwnProperty(r) && (L(t[r]) ? arguments[0][r] = t[r].slice() : arguments[0][r] = t[r])
                      }
                      return arguments[0]
                  }
                  var n = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function(e) {
                          return typeof e
                      } : function(e) {
                          return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                      },
                      o = function() {
                          try {
                              if ("undefined" !== typeof indexedDB) return indexedDB;
                              if ("undefined" !== typeof webkitIndexedDB) return webkitIndexedDB;
                              if ("undefined" !== typeof mozIndexedDB) return mozIndexedDB;
                              if ("undefined" !== typeof OIndexedDB) return OIndexedDB;
                              if ("undefined" !== typeof msIndexedDB) return msIndexedDB
                          } catch (e) {
                              return
                          }
                      }();
                  "undefined" === typeof Promise && e(3);
                  var i = Promise,
                      a = "local-forage-detect-blob-support",
                      s = void 0,
                      u = {},
                      c = Object.prototype.toString,
                      f = "readonly",
                      l = "readwrite",
                      p = {
                          _driver: "asyncStorage",
                          _initStorage: _initStorage,
                          _support: function() {
                              try {
                                  if (!o) return !1;
                                  var e = "undefined" !== typeof openDatabase && /(Safari|iPhone|iPad|iPod)/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent) && !/BlackBerry/.test(navigator.platform),
                                      t = "function" === typeof fetch && -1 !== fetch.toString().indexOf("[native code");
                                  return (!e || t) && "undefined" !== typeof indexedDB && "undefined" !== typeof IDBKeyRange
                              } catch (e) {
                                  return !1
                              }
                          }(),
                          iterate: iterate,
                          getItem: getItem,
                          setItem: setItem,
                          removeItem: removeItem,
                          clear: clear,
                          length: length,
                          key: key,
                          keys: keys,
                          dropInstance: dropInstance
                      },
                      h = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
                      d = "~~local_forage_type~",
                      y = /^~~local_forage_type~([^~]+)~/,
                      g = "__lfsc__:",
                      v = g.length,
                      m = "arbf",
                      b = "blob",
                      _ = "si08",
                      w = "ui08",
                      E = "uic8",
                      x = "si16",
                      S = "si32",
                      k = "ur16",
                      A = "ui32",
                      O = "fl32",
                      T = "fl64",
                      j = v + m.length,
                      B = Object.prototype.toString,
                      C = {
                          serialize: serialize,
                          deserialize: deserialize,
                          stringToBuffer: stringToBuffer,
                          bufferToString: bufferToString
                      },
                      I = {
                          _driver: "webSQLStorage",
                          _initStorage: _initStorage$1,
                          _support: function() {
                              return "function" === typeof openDatabase
                          }(),
                          iterate: iterate$1,
                          getItem: getItem$1,
                          setItem: setItem$1,
                          removeItem: removeItem$1,
                          clear: clear$1,
                          length: length$1,
                          key: key$1,
                          keys: keys$1,
                          dropInstance: dropInstance$1
                      },
                      R = {
                          _driver: "localStorageWrapper",
                          _initStorage: _initStorage$2,
                          _support: function() {
                              try {
                                  return "undefined" !== typeof localStorage && "setItem" in localStorage && !!localStorage.setItem
                              } catch (e) {
                                  return !1
                              }
                          }(),
                          iterate: iterate$2,
                          getItem: getItem$2,
                          setItem: setItem$2,
                          removeItem: removeItem$2,
                          clear: clear$2,
                          length: length$2,
                          key: key$2,
                          keys: keys$2,
                          dropInstance: dropInstance$2
                      },
                      P = function(e, t) {
                          return e === t || "number" === typeof e && "number" === typeof t && isNaN(e) && isNaN(t)
                      },
                      D = function(e, t) {
                          for (var r = e.length, n = 0; n < r;) {
                              if (P(e[n], t)) return !0;
                              n++
                          }
                          return !1
                      },
                      L = Array.isArray || function(e) {
                          return "[object Array]" === Object.prototype.toString.call(e)
                      },
                      N = {},
                      U = {},
                      F = {
                          INDEXEDDB: p,
                          WEBSQL: I,
                          LOCALSTORAGE: R
                      },
                      M = [F.INDEXEDDB._driver, F.WEBSQL._driver, F.LOCALSTORAGE._driver],
                      q = ["dropInstance"],
                      z = ["clear", "getItem", "iterate", "key", "keys", "length", "removeItem", "setItem"].concat(q),
                      W = {
                          description: "",
                          driver: M.slice(),
                          name: "localforage",
                          size: 4980736,
                          storeName: "keyvaluepairs",
                          version: 1
                      },
                      $ = function() {
                          function LocalForage(e) {
                              _classCallCheck(this, LocalForage);
                              for (var t in F)
                                  if (F.hasOwnProperty(t)) {
                                      var r = F[t],
                                          n = r._driver;
                                      this[t] = n, N[n] || this.defineDriver(r)
                                  }
                              this._defaultConfig = extend({}, W), this._config = extend({}, this._defaultConfig, e), this._driverSet = null, this._initDriver = null, this._ready = !1, this._dbInfo = null, this._wrapLibraryMethodsWithReady(), this.setDriver(this._config.driver).catch(function() {})
                          }
                          return LocalForage.prototype.config = function(e) {
                              if ("object" === ("undefined" === typeof e ? "undefined" : n(e))) {
                                  if (this._ready) return new Error("Can't call config() after localforage has been used.");
                                  for (var t in e) {
                                      if ("storeName" === t && (e[t] = e[t].replace(/\W/g, "_")), "version" === t && "number" !== typeof e[t]) return new Error("Database version must be a number.");
                                      this._config[t] = e[t]
                                  }
                                  return !("driver" in e && e.driver) || this.setDriver(this._config.driver)
                              }
                              return "string" === typeof e ? this._config[e] : this._config
                          }, LocalForage.prototype.defineDriver = function(e, t, r) {
                              var n = new i(function(t, r) {
                                  try {
                                      var n = e._driver,
                                          o = new Error("Custom driver not compliant; see https://mozilla.github.io/localForage/#definedriver");
                                      if (!e._driver) return void r(o);
                                      for (var a = z.concat("_initStorage"), s = 0, u = a.length; s < u; s++) {
                                          var c = a[s];
                                          if ((!D(q, c) || e[c]) && "function" !== typeof e[c]) return void r(o)
                                      }! function() {
                                          for (var t = 0, r = q.length; t < r; t++) {
                                              var n = q[t];
                                              e[n] || (e[n] = function(e) {
                                                  return function() {
                                                      var t = new Error("Method " + e + " is not implemented by the current driver"),
                                                          r = i.reject(t);
                                                      return executeCallback(r, arguments[arguments.length - 1]), r
                                                  }
                                              }(n))
                                          }
                                      }();
                                      var f = function(r) {
                                          N[n] && console.info("Redefining LocalForage driver: " + n), N[n] = e, U[n] = r, t()
                                      };
                                      "_support" in e ? e._support && "function" === typeof e._support ? e._support().then(f, r) : f(!!e._support) : f(!0)
                                  } catch (e) {
                                      r(e)
                                  }
                              });
                              return executeTwoCallbacks(n, t, r), n
                          }, LocalForage.prototype.driver = function() {
                              return this._driver || null
                          }, LocalForage.prototype.getDriver = function(e, t, r) {
                              var n = N[e] ? i.resolve(N[e]) : i.reject(new Error("Driver not found."));
                              return executeTwoCallbacks(n, t, r), n
                          }, LocalForage.prototype.getSerializer = function(e) {
                              var t = i.resolve(C);
                              return executeTwoCallbacks(t, e), t
                          }, LocalForage.prototype.ready = function(e) {
                              var t = this,
                                  r = t._driverSet.then(function() {
                                      return null === t._ready && (t._ready = t._initDriver()), t._ready
                                  });
                              return executeTwoCallbacks(r, e, e), r
                          }, LocalForage.prototype.setDriver = function(e, t, r) {
                              function setDriverToConfig() {
                                  n._config.driver = n.driver()
                              }

                              function extendSelfWithDriver(e) {
                                  return n._extend(e), setDriverToConfig(), n._ready = n._initStorage(n._config), n._ready
                              }

                              function initDriver(e) {
                                  return function() {
                                      function driverPromiseLoop() {
                                          for (; t < e.length;) {
                                              var r = e[t];
                                              return t++, n._dbInfo = null, n._ready = null, n.getDriver(r).then(extendSelfWithDriver).catch(driverPromiseLoop)
                                          }
                                          setDriverToConfig();
                                          var o = new Error("No available storage method found.");
                                          return n._driverSet = i.reject(o), n._driverSet
                                      }
                                      var t = 0;
                                      return driverPromiseLoop()
                                  }
                              }
                              var n = this;
                              L(e) || (e = [e]);
                              var o = this._getSupportedDrivers(e),
                                  a = null !== this._driverSet ? this._driverSet.catch(function() {
                                      return i.resolve()
                                  }) : i.resolve();
                              return this._driverSet = a.then(function() {
                                  var e = o[0];
                                  return n._dbInfo = null, n._ready = null, n.getDriver(e).then(function(e) {
                                      n._driver = e._driver, setDriverToConfig(), n._wrapLibraryMethodsWithReady(), n._initDriver = initDriver(o)
                                  })
                              }).catch(function() {
                                  setDriverToConfig();
                                  var e = new Error("No available storage method found.");
                                  return n._driverSet = i.reject(e), n._driverSet
                              }), executeTwoCallbacks(this._driverSet, t, r), this._driverSet
                          }, LocalForage.prototype.supports = function(e) {
                              return !!U[e]
                          }, LocalForage.prototype._extend = function(e) {
                              extend(this, e)
                          }, LocalForage.prototype._getSupportedDrivers = function(e) {
                              for (var t = [], r = 0, n = e.length; r < n; r++) {
                                  var o = e[r];
                                  this.supports(o) && t.push(o)
                              }
                              return t
                          }, LocalForage.prototype._wrapLibraryMethodsWithReady = function() {
                              for (var e = 0, t = z.length; e < t; e++) callWhenReady(this, z[e])
                          }, LocalForage.prototype.createInstance = function(e) {
                              return new LocalForage(e)
                          }, LocalForage
                      }(),
                      Y = new $;
                  t.exports = Y
              }, {
                  3: 3
              }]
          }, {}, [4])(4)
      })
  }).call(t, r(1))
}, function(e, t, r) {
  "use strict";

  function _asyncToGenerator(e) {
      return function() {
          var t = e.apply(this, arguments);
          return new Promise(function(e, r) {
              function step(n, o) {
                  try {
                      var i = t[n](o),
                          a = i.value
                  } catch (e) {
                      return void r(e)
                  }
                  if (!i.done) return Promise.resolve(a).then(function(e) {
                      step("next", e)
                  }, function(e) {
                      step("throw", e)
                  });
                  e(a)
              }
              return step("next")
          })
      }
  }
  r.d(t, "b", function() {
      return f
  }), r.d(t, "a", function() {
      return p
  }), r.d(t, "d", function() {
      return h
  }), r.d(t, "c", function() {
      return d
  });
  var n = r(0),
      o = r.n(n),
      i = r(2),
      a = (r.n(i), r(7)),
      s = (r.n(a), r(36)),
      u = r(71),
      c = function() {
          var e = _asyncToGenerator(o.a.mark(function _callee4(e, t) {
              var r;
              return o.a.wrap(function(n) {
                  for (;;) switch (n.prev = n.next) {
                      case 0:
                          if (!l[t]) {
                              n.next = 2;
                              break
                          }
                          return n.abrupt("return", l[t]);
                      case 2:
                          return n.next = 4, s.a("route/" + t + "/" + e);
                      case 4:
                          return r = n.sent, l[t] = r, setTimeout(function() {
                              delete l[t]
                          }, 27e5), n.abrupt("return", l[t]);
                      case 8:
                      case "end":
                          return n.stop()
                  }
              }, _callee4, this)
          }));
          return function(t, r) {
              return e.apply(this, arguments)
          }
      }(),
      f = function() {
          var e = _asyncToGenerator(o.a.mark(function _callee(e, t, r) {
              return o.a.wrap(function(n) {
                  for (;;) switch (n.prev = n.next) {
                      case 0:
                          return n.abrupt("return", s.a("devices/" + r + "/segments", {
                              from: e,
                              to: t
                          }));
                      case 1:
                      case "end":
                          return n.stop()
                  }
              }, _callee, this)
          }));
          return function(t, r, n) {
              return e.apply(this, arguments)
          }
      }(),
      l = {},
      p = (function() {
          var e = _asyncToGenerator(o.a.mark(function _callee2(e) {
              return o.a.wrap(function(t) {
                  for (;;) switch (t.prev = t.next) {
                      case 0:
                          return t.abrupt("return", c("files", e));
                      case 1:
                      case "end":
                          return t.stop()
                  }
              }, _callee2, this)
          }))
      }(), function() {
          var e = _asyncToGenerator(o.a.mark(function _callee3(e) {
              return o.a.wrap(function(t) {
                  for (;;) switch (t.prev = t.next) {
                      case 0:
                          return t.abrupt("return", c("log_urls", e));
                      case 1:
                      case "end":
                          return t.stop()
                  }
              }, _callee3, this)
          }))
      }(), function() {
          var e = _asyncToGenerator(o.a.mark(function _callee5(e) {
              var t;
              return o.a.wrap(function(r) {
                  for (;;) switch (r.prev = r.next) {
                      case 0:
                          return t = e || "me", r.abrupt("return", s.a(t + "/"));
                      case 2:
                      case "end":
                          return r.stop()
                  }
              }, _callee5, this)
          }));
          return function(t) {
              return e.apply(this, arguments)
          }
      }()),
      h = function() {
          var e = _asyncToGenerator(o.a.mark(function _callee6() {
              return o.a.wrap(function(e) {
                  for (;;) switch (e.prev = e.next) {
                      case 0:
                          return e.abrupt("return", s.a("me/devices/"));
                      case 1:
                      case "end":
                          return e.stop()
                  }
              }, _callee6, this)
          }));
          return function() {
              return e.apply(this, arguments)
          }
      }(),
      d = (function() {
          var e = _asyncToGenerator(o.a.mark(function _callee7(e, t) {
              return o.a.wrap(function(r) {
                  for (;;) switch (r.prev = r.next) {
                      case 0:
                          return r.abrupt("return", s.b("devices/" + e + "/", {
                              alias: t
                          }));
                      case 1:
                      case "end":
                          return r.stop()
                  }
              }, _callee7, this)
          }))
      }(), function() {
          var e = _asyncToGenerator(o.a.mark(function _callee8(e, t) {
              return o.a.wrap(function(r) {
                  for (;;) switch (r.prev = r.next) {
                      case 0:
                          return r.abrupt("return", s.c("devices/" + e + "/add_user", {
                              email: t
                          }));
                      case 1:
                      case "end":
                          return r.stop()
                  }
              }, _callee8, this)
          }))
      }(), function() {
          var e = _asyncToGenerator(o.a.mark(function _callee9(e) {
              return o.a.wrap(function(t) {
                  for (;;) switch (t.prev = t.next) {
                      case 0:
                          if (e = u.a.validate(e), !e.error) {
                              t.next = 3;
                              break
                          }
                          throw e.error;
                      case 3:
                          return e = e.value, t.abrupt("return", s.c("annotations/new", e));
                      case 5:
                      case "end":
                          return t.stop()
                  }
              }, _callee9, this)
          }))
      }(), function() {
          var e = _asyncToGenerator(o.a.mark(function _callee10(e, t) {
              return o.a.wrap(function(r) {
                  for (;;) switch (r.prev = r.next) {
                      case 0:
                          return r.abrupt("return", s.b("annotations/" + e, {
                              data: t
                          }));
                      case 1:
                      case "end":
                          return r.stop()
                  }
              }, _callee10, this)
          }))
      }(), function() {
          var e = _asyncToGenerator(o.a.mark(function _callee11(e, t, r) {
              return o.a.wrap(function(n) {
                  for (;;) switch (n.prev = n.next) {
                      case 0:
                          if (e = Number(e), t = Number(t), Number.isFinite(e)) {
                              n.next = 4;
                              break
                          }
                          throw new Error("Invalid start time");
                      case 4:
                          if (r.length) {
                              n.next = 6;
                              break
                          }
                          throw new Error("Invalid or empty dongleId");
                      case 6:
                          if (Number.isFinite(t)) {
                              n.next = 8;
                              break
                          }
                          throw new Error("Invalid end time");
                      case 8:
                          return n.abrupt("return", s.a("devices/" + r + "/annotations/", {
                              from: e,
                              to: t
                          }));
                      case 9:
                      case "end":
                          return n.stop()
                  }
              }, _callee11, this)
          }));
          return function(t, r, n) {
              return e.apply(this, arguments)
          }
      }());
  ! function() {
      var e = _asyncToGenerator(o.a.mark(function _callee12(e, t) {
          var r;
          return o.a.wrap(function(n) {
              for (;;) switch (n.prev = n.next) {
                  case 0:
                      return n.next = 2, s.d("auth/", {
                          access_token: e,
                          id_token: t
                      });
                  case 2:
                      r = n.sent, localStorage.authorization = JSON.parse(r).access_token;
                  case 4:
                  case "end":
                      return n.stop()
              }
          }, _callee12, this)
      }))
  }()
}, function(e, t, r) {
  "use strict";
  e.exports = function(e) {
      return encodeURIComponent(e).replace(/[!'()*]/g, function(e) {
          return "%" + e.charCodeAt(0).toString(16).toUpperCase()
      })
  }
}, function(e, t, r) {
  "use strict";

  function toObject(e) {
      if (null === e || void 0 === e) throw new TypeError("Object.assign cannot be called with null or undefined");
      return Object(e)
  }
  var n = Object.getOwnPropertySymbols,
      o = Object.prototype.hasOwnProperty,
      i = Object.prototype.propertyIsEnumerable;
  e.exports = function() {
      try {
          if (!Object.assign) return !1;
          var e = new String("abc");
          if (e[5] = "de", "5" === Object.getOwnPropertyNames(e)[0]) return !1;
          for (var t = {}, r = 0; r < 10; r++) t["_" + String.fromCharCode(r)] = r;
          if ("0123456789" !== Object.getOwnPropertyNames(t).map(function(e) {
                  return t[e]
              }).join("")) return !1;
          var n = {};
          return "abcdefghijklmnopqrst".split("").forEach(function(e) {
              n[e] = e
          }), "abcdefghijklmnopqrst" === Object.keys(Object.assign({}, n)).join("")
      } catch (e) {
          return !1
      }
  }() ? Object.assign : function(e, t) {
      for (var r, a, s = toObject(e), u = 1; u < arguments.length; u++) {
          r = Object(arguments[u]);
          for (var c in r) o.call(r, c) && (s[c] = r[c]);
          if (n) {
              a = n(r);
              for (var f = 0; f < a.length; f++) i.call(r, a[f]) && (s[a[f]] = r[a[f]])
          }
      }
      return s
  }
}, function(e, t, r) {
  function Client(e) {
      function Request(t, r, a) {
          t = t || "", s(r) && (a = r, r = {}), r = i(e.options, r), setQuery(r), setToken(r);
          var u = o(e.baseUrl, t);
          return n(u, r, responseHandler(a, {
              url: u,
              method: r.method
          }))
      }

      function setToken(t) {
          if (t.token || e.token) {
              t.headers = t.headers || {};
              var r = t.authorization || e.authorization || "Authorization",
                  n = t.token || e.token;
              (t.jwt || e.jwt) && (n = "Bearer " + n), t.headers[r] = n, delete t.token
          }
      }

      function responseHandler(t, r) {
          return function(n, o, i) {
              if (n) return t(n, null, i);
              if (c(i.statusCode)) return createError(o, i, function(e) {
                  t(e, null, i)
              });
              var a = r.parse || e.parse;
              o = s(a) ? a(o, i) : o, t(null, o, i)
          }
      }

      function configure(t) {
          a(e, t)
      }
      return e = e || {}, e = i(d, e), Request.configure = configure, Request.config = e, httpMethods(Request)
  }

  function setQuery(e) {
      var t = e.query;
      t && (e.query = ("string" === typeof t ? String : p)(t))
  }

  function createError(e, t, r) {
      var n = u(t.statusCode);
      if (!e) return r(n);
      if (e) {
          if (Array.isArray(e) && (e = e[0]), l(e)) return r(a(n, e));
          f(e, function(e, t) {
              if (e) return r(e);
              r(a(n, t))
          })
      }
  }

  function httpMethods(e) {
      return h.forEach(function(t) {
          e[t] = function(r, n, o) {
              return "function" === typeof n && (o = n, n = {}), n.method = t, e(r, n, o)
          }
      }), e
  }
  var n = r(37),
      o = r(47),
      i = r(13),
      a = r(14),
      s = r(3),
      u = r(48),
      c = r(15),
      f = r(51),
      l = r(52),
      p = r(53);
  e.exports = Client;
  var h = ["get", "post", "put", "patch", "head", "delete"],
      d = {
          baseUrl: "http://localhost:8000",
          jwt: !1,
          token: null,
          options: {}
      }
}, function(e, t) {
  function extend() {
      for (var e = {}, t = 0; t < arguments.length; t++) {
          var n = arguments[t];
          for (var o in n) r.call(n, o) && (e[o] = n[o])
      }
      return e
  }
  e.exports = extend;
  var r = Object.prototype.hasOwnProperty
}, function(e, t) {
  function extend(e) {
      for (var t = 1; t < arguments.length; t++) {
          var n = arguments[t];
          for (var o in n) r.call(n, o) && (e[o] = n[o])
      }
      return e
  }
  e.exports = extend;
  var r = Object.prototype.hasOwnProperty
}, function(e, t, r) {
  "use strict";
  e.exports = function(e) {
      return e < 200 || e >= 400
  }
}, function(e, t, r) {
  "use strict";

  function decode(e) {
      return decodeURIComponent(e.replace(/\+/g, " "))
  }

  function querystring(e) {
      for (var t, r = /([^=?&]+)=?([^&]*)/g, n = {}; t = r.exec(e);) {
          var o = decode(t[1]),
              i = decode(t[2]);
          o in n || (n[o] = i)
      }
      return n
  }

  function querystringify(e, t) {
      t = t || "";
      var r = [];
      "string" !== typeof t && (t = "?");
      for (var o in e) n.call(e, o) && r.push(encodeURIComponent(o) + "=" + encodeURIComponent(e[o]));
      return r.length ? t + r.join("&") : ""
  }
  var n = Object.prototype.hasOwnProperty;
  t.stringify = querystringify, t.parse = querystring
}, function(e, t, r) {
  "use strict";
  t.a = function(e, t) {
      function handle(r, n) {
          if (r) return 0 === r.statusCode && (r = new Error("There was an unexpected server error, please try again later.")), t(r);
          e(n)
      }
      return handle
  }
}, function(e, t, r) {
  "use strict";
  r.d(t, "a", function() {
      return s
  }), r.d(t, "d", function() {
      return u
  }), r.d(t, "b", function() {
      return c
  }), r.d(t, "c", function() {
      return f
  }), r.d(t, "e", function() {
      return p
  });
  var n = r(2),
      o = r.n(n),
      i = r(69),
      a = r.n(i),
      s = "https://api.commadotai.com/v1/",
      u = "https://www.googleapis.com/",
      c = "45471411055-ffgv404iin6vi94qv6g6hd8fb48hr4bf.apps.googleusercontent.com",
      f = "_9OMwDPbbx2JktznntXt-1Hs",
      l = "http://127.0.0.1";
  a.a.location && (l = a.a.location.origin);
  var p = l + "/auth/g/redirect",
      h = {
          type: "web_server",
          client_id: c,
          redirect_uri: p,
          response_type: "code",
          scope: "https://www.googleapis.com/auth/userinfo.email",
          prompt: "select_account"
      };
  ["https://accounts.google.com/o/oauth2/auth", o.a.stringify(h)].join("?")
}, function(e, t, r) {
  "use strict";
  var n = r(74),
      o = r(78),
      i = r(4),
      a = r.n(i),
      s = r(21),
      u = r.n(s),
      c = r(79),
      f = Object(n.a)(Object(o.a)(a.a.reducer, u.a.reducer, c.a.globalState));
  t.a = f
}, function(e, t) {
  e.exports = {
      start: function() {
          var e = new Date;
          return e.setHours(e.getHours() + 1, 0, 0, 0), new Date(e.getTime() - 12096e5).getTime()
      }(),
      end: function() {
          var e = new Date;
          return e.setHours(e.getHours() + 1, 0, 0, 0), e.getTime()
      }(),
      dongleId: null,
      route: !1,
      segment: 0,
      nextSegment: null,
      playSpeed: 0,
      offset: 0,
      startTime: Date.now(),
      segments: [],
      segmentData: null,
      loop: {
          startTime: null,
          duration: null
      },
      profile: null
  }
}, function(e, t, r) {
  function _toConsumableArray(e) {
      if (Array.isArray(e)) {
          for (var t = 0, r = Array(e.length); t < e.length; t++) r[t] = e[t];
          return r
      }
      return Array.from(e)
  }

  function reducer() {
      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : n,
          t = arguments[1];
      switch (t.type) {
          case a:
              e.segmentData = {
                  promise: t.promise,
                  start: t.start,
                  end: t.end,
                  dongleId: e.dongleId
              };
              break;
          case s:
              e.segmentData = t.data, e.segments = t.segments;
              break;
          case u:
              var r = !1;
              e.segments.forEach(function(e) {
                  e.route === t.route && e.events.forEach(function(e) {
                      e.time === t.event.time && e.type === t.event.type && (e.id = t.annotation.id, e.annotation = t.annotation, r = !0)
                  })
              })
      }
      var o = getCurrentSegment(e),
          i = getNextSegment(e);
      return o ? (e.route = o.route, e.segment = o.segment) : (e.route = !1, e.segment = 0), e.currentSegment = o, e.nextSegment = i, e.range = e.end - e.start, e
  }

  function updateSegments() {
      return {
          type: i
      }
  }

  function fetchSegmentMetadata(e, t, r) {
      return {
          type: a,
          start: e,
          end: t,
          promise: r
      }
  }

  function insertSegmentMetadata(e) {
      return {
          type: s,
          segments: segmentsFromMetadata(e),
          data: e
      }
  }

  function resolveAnnotation(e, t, r) {
      return {
          type: u,
          annotation: e,
          event: t,
          route: r
      }
  }

  function parseSegmentMetadata(e, t, r) {
      var n = 0,
          o = {};
      return t = t.map(function(t) {
          if (t.offset = Math.round(t.start_time_utc_millis) - e.start, o[t.canonical_route_name]) t.routeOffset = o[t.canonical_route_name];
          else {
              var i = Number(t.canonical_name.split("--")[2]);
              t.segment = i, o[t.canonical_route_name] = i > 0 ? t.offset - c * i : t.offset, t.routeOffset = o[t.canonical_route_name]
          }
          n = t.offset, t.duration = Math.round(t.end_time_utc_millis - t.start_time_utc_millis), t.events = JSON.parse(t.events_json) || [];
          var a = t.events.filter(function(e) {
              return "alert" === e.type && e.data && e.data.should_take_control
          });
          return t.events.forEach(function(n) {
              if (n.timestamp = t.start_time_utc_millis + n.offset_millis, n.canonical_segment_name = t.canonical_name, r.forEach(function(e) {
                      e.canonical_segment_name === n.canonical_segment_name && e.offset_millis === n.offset_millis && e.offset_nanos_part === n.offset_nanos && (n.id && console.error("Server returned more than one matching annotation-to-event", n, e), n.id = e.id, n.annotation = e)
                  }), n.data && n.data.is_planned) {
                  var o, i = a.reduce(function(e, t) {
                      var r = Math.abs(e.offset_millis - n.offset_millis);
                      return Math.abs(t.offset_millis - n.offset_millis) < r ? t : e
                  }, a[0]);
                  i ? o = i.data.alertText2 : (console.warn("Expected alert corresponding to planned disengagement", n), o = "Planned disengagement"), n.id = "planned_disengage_" + n.time, n.annotation = {
                      start_time_utc_millis: n.timestamp,
                      data: {
                          reason: o
                      },
                      offset_nanos_part: n.offset_nanos,
                      end_time_utc_millis: n.timestamp,
                      canonical_segment_name: n.canonical_segment_name,
                      dongle_id: e.dongleId,
                      type: n.type,
                      id: n.id,
                      offset_millis: n.offset_millis
                  }
              }
          }), t
      }), {
          start: e.start,
          dongleId: e.dongleId,
          end: e.end,
          segments: t
      }
  }

  function segmentsFromMetadata(e) {
      function finishSegment(e) {
          var t = null;
          if (e.hasVideo) {
              var r = e.videoAvailableBetweenOffsets[e.videoAvailableBetweenOffsets.length - 1] || [e.offset, e.offset + e.duration];
              e.videoAvailableBetweenOffsets = [].concat(_toConsumableArray(e.videoAvailableBetweenOffsets.slice(0, e.videoAvailableBetweenOffsets.length - 1)), [
                  [r[0], e.offset + e.duration]
              ])
          }
          e.events = e.events.sort(function(e, t) {
              return e.route_offset_millis === t.route_offset_millis ? e.route_offset_nanos - t.route_offset_nanos : e.route_offset_millis - t.route_offset_millis
          }), e.events.forEach(function(e) {
              switch (e.type) {
                  case "engage":
                      t = e;
                      break;
                  case "disengage":
                      t && (t.data = {
                          end_offset_nanos: e.offset_nanos,
                          end_offset_millis: e.offset_millis,
                          end_route_offset_nanos: e.route_offset_nanos,
                          end_route_offset_millis: e.route_offset_millis
                      })
              }
          })
      }
      var t = null,
          r = null,
          n = null,
          o = [];
      return e.segments.forEach(function(e) {
          if (e.url && 40 === e.proc_log) {
              var i = e.proc_dcamera >= 0,
                  a = 40 === e.proc_dcamera,
                  s = 40 === e.proc_camera;
              if (s && null === n && (n = e.offset), r = e.start_time_utc_millis, !t || t.route !== e.canonical_route_name) {
                  t && finishSegment(t);
                  var u = e.url,
                      f = u.split("/");
                  Number.isFinite(Number(f.pop())) && (u = f.join("/")), t = {
                      offset: e.offset - e.segment * c,
                      route: e.canonical_route_name,
                      startTime: e.start_time_utc_millis,
                      startCoord: [e.start_lng, e.start_lat],
                      duration: 0,
                      segments: 0,
                      url: u.replace("chffrprivate.blob.core.windows.net", "chffrprivate-vzn.azureedge.net"),
                      events: [],
                      videoAvailableBetweenOffsets: [],
                      hasVideo: s,
                      deviceType: e.devicetype,
                      hpgps: e.hpgps,
                      hasDriverCamera: i,
                      hasDriverCameraStream: a,
                      locStart: "",
                      locEnd: "",
                      distanceMiles: 0,
                      cameraStreamSegCount: 0,
                      driverCameraStreamSegCount: 0
                  }, o.push(t)
              }
              s || null === n || (t.videoAvailableBetweenOffsets.push([n, e.offset]), n = null), t.hasVideo = t.hasVideo || s, t.hasDriverCamera = t.hasDriverCamera || i, t.hasDriverCameraStream = t.hasDriverCameraStream || a, t.hpgps = t.hpgps || e.hpgps, t.duration = e.offset - t.offset + e.duration, t.segments = Math.max(t.segments, Number(e.canonical_name.split("--").pop()) + 1), t.events = t.events.concat(e.events), t.endCoord = [e.end_lng, e.end_lat], t.distanceMiles += e.length, t.cameraStreamSegCount += Math.floor(s), t.driverCameraStreamSegCount += Math.floor(a)
          }
      }), t && finishSegment(t), o
  }

  function hasSegmentMetadata(e) {
      return e.segmentData ? e.segmentData.segments ? e.dongleId !== e.segmentData.dongleId ? (console.log("Bad dongle id"), !1) : e.start < e.segmentData.start ? (console.log("Bad start offset"), !1) : e.end > e.segmentData.end ? (console.log("Bad end offset"), !1) : e.end > e.segmentData.end ? (console.log("Bad end offset"), !1) : e.start >= e.segmentData.start && e.end <= e.segmentData.end : (console.log("Still loading..."), !1) : (console.log("No segment data at all"), !1)
  }

  function hasCameraAtOffset(e, t) {
      return e.videoAvailableBetweenOffsets.some(function(e) {
          return t >= e[0] && t <= e[1]
      })
  }

  function getNextSegment(e, t) {
      if (void 0 === t && (t = o.currentOffset(e)), !e.segments) return null;
      for (var r = e.segments, n = 0, i = r.length; n < i; ++n) {
          var a = r[n];
          if (a.offset > t) return {
              url: a.url,
              route: a.route,
              segment: 0,
              routeOffset: a.offset,
              startOffset: a.offset,
              events: a.events,
              videoAvailableBetweenOffsets: a.videoAvailableBetweenOffsets,
              deviceType: a.deviceType,
              hpgps: a.hpgps,
              hasVideo: a.hasVideo,
              hasDriverCamera: a.hasDriverCamera,
              hasDriverCameraStream: a.hasDriverCameraStream,
              cameraStreamSegCount: a.cameraStreamSegCount,
              driverCameraStreamSegCount: a.driverCameraStreamSegCount,
              distanceMiles: a.distanceMiles
          };
          if (a.offset + a.duration > t) {
              var s = ~~((t - a.offset) / c);
              if (s + 1 < a.segments) return {
                  url: a.url,
                  route: a.route,
                  segment: s + 1,
                  routeOffset: a.offset,
                  startOffset: a.offset + (s + 1) * c,
                  duration: a.duration,
                  events: a.events,
                  deviceType: a.deviceType,
                  videoAvailableBetweenOffsets: a.videoAvailableBetweenOffsets,
                  hpgps: a.hpgps,
                  hasVideo: a.hasVideo,
                  hasDriverCamera: a.hasDriverCamera,
                  hasDriverCameraStream: a.hasDriverCameraStream,
                  cameraStreamSegCount: a.cameraStreamSegCount,
                  driverCameraStreamSegCount: a.driverCameraStreamSegCount,
                  distanceMiles: a.distanceMiles
              }
          }
      }
      return null
  }

  function getCurrentSegment(e, t) {
      if (void 0 === t && (t = o.currentOffset(e)), !e.segments) return null;
      for (var r = e.segments, n = 0, i = r.length; n < i; ++n) {
          var a = r[n];
          if (a.offset > t) break;
          if (a.offset + a.duration > t) {
              var s = Math.floor((t - a.offset) / c);
              return {
                  url: a.url,
                  route: a.route,
                  segment: s,
                  routeOffset: a.offset,
                  startOffset: a.offset + s * c,
                  duration: a.duration,
                  events: a.events,
                  deviceType: a.deviceType,
                  videoAvailableBetweenOffsets: a.videoAvailableBetweenOffsets,
                  hpgps: a.hpgps,
                  hasVideo: a.hasVideo,
                  hasDriverCamera: a.hasDriverCamera,
                  hasDriverCameraStream: a.hasDriverCameraStream,
                  cameraStreamSegCount: a.cameraStreamSegCount,
                  driverCameraStreamSegCount: a.driverCameraStreamSegCount,
                  distanceMiles: a.distanceMiles
              }
          }
      }
      return null
  }
  var n = r(20),
      o = r(4),
      i = "update_segments",
      a = "load_segment_metadata",
      s = "segment_metadata",
      u = "resolve_annotation",
      c = 6e4;
  e.exports = {
      getCurrentSegment: getCurrentSegment,
      getNextSegment: getNextSegment,
      hasSegmentMetadata: hasSegmentMetadata,
      parseSegmentMetadata: parseSegmentMetadata,
      hasCameraAtOffset: hasCameraAtOffset,
      updateSegments: updateSegments,
      fetchSegmentMetadata: fetchSegmentMetadata,
      insertSegmentMetadata: insertSegmentMetadata,
      resolveAnnotation: resolveAnnotation,
      SEGMENT_LENGTH: c,
      reducer: reducer
  }
}, function(e, t, r) {
  function close() {
      o.close()
  }

  function postMessage(e, t) {
      self.window === self ? o.postMessage(e, "*", t) : o.postMessage(e, t)
  }
  const n = r(23),
      o = self,
      i = {
          close: close,
          postMessage: postMessage
      };
  o.onmessage = function(e) {
      n.handleMessage(i, e)
  }, o.onmessageerror = function(e) {
      console.error("Msgh error!", e), close()
  }, postMessage({
      command: "state",
      data: n.getState()
  }), postMessage({
      command: "broadcastPort"
  }, [n.createBroadcastPort(o)])
}, function(e, t, r) {
  "use strict";
  Object.defineProperty(t, "__esModule", {
          value: !0
      }),
      function(e) {
          function _asyncToGenerator(e) {
              return function() {
                  var t = e.apply(this, arguments);
                  return new Promise(function(e, r) {
                      function step(n, o) {
                          try {
                              var i = t[n](o),
                                  a = i.value
                          } catch (e) {
                              return void r(e)
                          }
                          if (!i.done) return Promise.resolve(a).then(function(e) {
                              step("next", e)
                          }, function(e) {
                              step("throw", e)
                          });
                          e(a)
                      }
                      return step("next")
                  })
              }
          }

          function getState() {
              return E.a.getState()
          }

          function createBroadcastPort(t) {
              function sendData(r) {
                  var n = null;
                  n = 1 === r.data.length ? e.from(r.data) : e.concat(r.data), t.postMessage({
                      command: "data",
                      route: r.route,
                      segment: r.segment,
                      data: n.buffer
                  }, [n.buffer])
              }

              function handleExpire(e) {
                  t.postMessage(Object.assign({}, e, {
                      command: "expire"
                  }))
              }
              if (T(t).broadcastPort) return T(t).broadcastPort;
              var r = getState(),
                  n = null,
                  o = null,
                  i = null,
                  a = h()();
              if (a(O.listen(sendData)), a(w.b(handleExpire)), r.route) {
                  var s = w.a(r.route, r.segment);
                  s && s.getLog(function(e) {
                      return sendData({
                          route: r.route,
                          segment: r.segment,
                          data: e
                      })
                  })
              }
              return "function" === typeof MessageChannel ? (n = new MessageChannel, o = n.port1, i = n.port2, a(function() {
                  return n.port1.close()
              })) : o = t, a(A.listen(o.postMessage.bind(o))), T(t).broadcastPort = i, T(t).closePort = a, i
          }

          function close(e) {
              T(e).unlisten && T(e).unlisten(), T(e).broadcastChannel && T(e).broadcastChannel.port1.close(), e.close()
          }

          function seek(e, t) {
              E.a.dispatch(m.a.seek(t))
          }

          function pause(e) {
              E.a.dispatch(m.a.pause())
          }

          function play(e, t) {
              E.a.dispatch(m.a.play(t))
          }

          function resolve(e, t) {
              var r = t.annotation,
                  n = t.event,
                  o = t.route;
              E.a.dispatch(_.a.resolveAnnotation(r, n, o))
          }

          function selectDevice(e, t) {
              E.a.dispatch(Object(g.a)(t))
          }

          function updateDevice(e, t) {
              E.a.dispatch(Object(g.c)(t))
          }

          function selectTimeRange(e, t) {
              var r = t.start,
                  n = t.end;
              E.a.dispatch(Object(g.b)(r, n))
          }

          function selectLoop(e, t) {
              var r = t.startTime,
                  n = t.duration;
              E.a.dispatch(m.a.selectLoop(r, n))
          }

          function cachePort(e, t, r) {
              console.log("Was handed this port!", r), w.c(r[0])
          }

          function scheduleSegmentUpdate(e) {
              var t = 3e4,
                  r = m.a.currentOffset(e);
              if (j(e).stopTimer && (j(e).stopTimer(), j(e).stopTimer = null), e.nextSegment && (t = e.nextSegment.startOffset - r), e.currentSegment) {
                  var n = e.currentSegment.routeOffset + e.currentSegment.duration - r;
                  t = Math.min(n, t)
              }
              if (e.loop && e.loop.startTime) {
                  var o = e.start + r,
                      i = 1 + e.loop.startTime + e.loop.duration - o,
                      a = e.loop.startTime - e.start,
                      s = _.a.getCurrentSegment(e, a);
                  e.currentSegment && s && s.startOffset === e.currentSegment.startOffset || (t = Math.min(i, t))
              }
              t > 0 ? (console.log("Waiting", t, "for something to change..."), j(e).stopTimer = Object(f.timeout)(function() {
                  E.a.dispatch(_.a.updateSegments())
              }, t)) : console.log("There is not task i think its worth waiting for...", t)
          }

          function noop() {}
          r.d(t, "handleMessage", function() {
              return D
          }), t.getState = getState, t.createBroadcastPort = createBroadcastPort;
          var n = r(0),
              o = r.n(n),
              i = r(6),
              a = r.n(i),
              s = r(30),
              u = r.n(s),
              c = r(32),
              f = (r.n(c), r(7)),
              l = (r.n(f), r(8)),
              p = (r.n(l), r(34)),
              h = r.n(p),
              d = r(9),
              y = r(73),
              g = r(81),
              v = r(4),
              m = r.n(v),
              b = r(21),
              _ = r.n(b),
              w = r(82),
              E = r(19),
              x = function() {
                  var e = _asyncToGenerator(o.a.mark(function _callee2(e, t) {
                      return o.a.wrap(function(e) {
                          for (;;) switch (e.prev = e.next) {
                              case 0:
                                  return console.log(t), E.a.dispatch(Object(g.a)(t.dongleId)), e.next = 4, Promise.all([Object(y.a)(), C]);
                              case 4:
                                  return e.abrupt("return", "hello");
                              case 5:
                              case "end":
                                  return e.stop()
                          }
                      }, _callee2, this)
                  }));
                  return function(t, r) {
                      return e.apply(this, arguments)
                  }
              }(),
              S = function() {
                  var e = _asyncToGenerator(o.a.mark(function _callee3(e) {
                      var t, r, n, i, a;
                      return o.a.wrap(function(o) {
                          for (;;) switch (o.prev = o.next) {
                              case 0:
                                  if (e.dongleId) {
                                      o.next = 2;
                                      break
                                  }
                                  return o.abrupt("return");
                              case 2:
                                  if (!_.a.hasSegmentMetadata(e)) {
                                      o.next = 4;
                                      break
                                  }
                                  return o.abrupt("return", !0);
                              case 4:
                                  if (!I && !R) {
                                      o.next = 6;
                                      break
                                  }
                                  return o.abrupt("return");
                              case 6:
                                  return console.log("We need to update the segment metadata..."), t = e.dongleId, r = e.start, n = e.end, i = null, a = null, I = d.b(r, n, t), R = d.c(r, n, t), E.a.dispatch(_.a.fetchSegmentMetadata(r, n)), o.prev = 15, o.next = 18, I;
                              case 18:
                                  return i = o.sent, o.next = 21, R;
                              case 21:
                                  a = o.sent, o.next = 28;
                                  break;
                              case 24:
                                  return o.prev = 24, o.t0 = o.catch(15), console.error("Failure fetching segment metadata", o.t0.stack || o.t0), o.abrupt("return");
                              case 28:
                                  return o.prev = 28, I = null, R = null, o.finish(28);
                              case 32:
                                  if (e.start === r && e.end === n && e.dongleId === t) {
                                      o.next = 34;
                                      break
                                  }
                                  return o.abrupt("return", S(getState()));
                              case 34:
                                  i = _.a.parseSegmentMetadata(e, i, a), E.a.dispatch(_.a.insertSegmentMetadata(i));
                              case 36:
                              case "end":
                                  return o.stop()
                          }
                      }, _callee3, this, [
                          [15, 24, 28, 32]
                      ])
                  }));
                  return function(t) {
                      return e.apply(this, arguments)
                  }
              }(),
              k = function() {
                  var e = _asyncToGenerator(o.a.mark(function _callee4(e) {
                      var t;
                      return o.a.wrap(function(r) {
                          for (;;) switch (r.prev = r.next) {
                              case 0:
                                  if (L && (L(), L = null), t = null, !(Date.now() - e.startTime < 1e3)) {
                                      r.next = 5;
                                      break
                                  }
                                  return L = Object(f.timeout)(function() {
                                      return L = null, k(getState())
                                  }, 1100 - (Date.now() - e.startTime)), r.abrupt("return");
                              case 5:
                                  e.route && (t = w.a(e.route, e.segment, O.broadcast), t && t.start(), 0 !== e.segment && (t = w.a(e.route, e.segment, O.broadcast)) && t.start()), e.nextSegment && (t = w.a(e.nextSegment.route, e.nextSegment.segment, O.broadcast)) && t.start();
                              case 7:
                              case "end":
                                  return r.stop()
                          }
                      }, _callee4, this)
                  }));
                  return function(t) {
                      return e.apply(this, arguments)
                  }
              }(),
              A = a()(),
              O = a()(),
              T = u()(),
              j = u()(),
              B = null,
              C = new Promise(function(e, t) {
                  B = function() {
                      B = noop, e()
                  }
              }),
              I = null,
              R = null;
          scheduleSegmentUpdate(getState()), S(getState()), E.a.subscribe(function() {
              var e = getState();
              S(e), scheduleSegmentUpdate(e), k(e), A.broadcast({
                  command: "state",
                  data: e
              }), _.a.hasSegmentMetadata(e) && B()
          });
          var P = {
                  close: close,
                  play: play,
                  pause: pause,
                  seek: seek,
                  hello: x,
                  resolve: resolve,
                  selectDevice: selectDevice,
                  selectTimeRange: selectTimeRange,
                  selectLoop: selectLoop,
                  updateDevice: updateDevice,
                  cachePort: cachePort
              },
              D = function() {
                  var e = _asyncToGenerator(o.a.mark(function _callee(e, t) {
                      var r;
                      return o.a.wrap(function(n) {
                          for (;;) switch (n.prev = n.next) {
                              case 0:
                                  if (!t.data.command) {
                                      n.next = 10;
                                      break
                                  }
                                  if (P[t.data.command]) {
                                      n.next = 4;
                                      break
                                  }
                                  return console.error("Invalid command!", t.data), n.abrupt("return");
                              case 4:
                                  if (!(r = P[t.data.command](e, t.data.data, t.ports)) || !t.data.requestId) {
                                      n.next = 10;
                                      break
                                  }
                                  return n.next = 8, r;
                              case 8:
                                  r = n.sent, r && e.postMessage({
                                      requestId: t.data.requestId,
                                      command: "return-value",
                                      data: r
                                  });
                              case 10:
                              case "end":
                                  return n.stop()
                          }
                      }, _callee, this)
                  }));
                  return function(t, r) {
                      return e.apply(this, arguments)
                  }
              }(),
              L = null
      }.call(t, r(24).Buffer)
}, function(e, t, r) {
  "use strict";
  (function(e) {
      function kMaxLength() {
          return Buffer.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823
      }

      function createBuffer(e, t) {
          if (kMaxLength() < t) throw new RangeError("Invalid typed array length");
          return Buffer.TYPED_ARRAY_SUPPORT ? (e = new Uint8Array(t), e.__proto__ = Buffer.prototype) : (null === e && (e = new Buffer(t)), e.length = t), e
      }

      function Buffer(e, t, r) {
          if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) return new Buffer(e, t, r);
          if ("number" === typeof e) {
              if ("string" === typeof t) throw new Error("If encoding is specified then the first argument must be a string");
              return allocUnsafe(this, e)
          }
          return from(this, e, t, r)
      }

      function from(e, t, r, n) {
          if ("number" === typeof t) throw new TypeError('"value" argument must not be a number');
          return "undefined" !== typeof ArrayBuffer && t instanceof ArrayBuffer ? fromArrayBuffer(e, t, r, n) : "string" === typeof t ? fromString(e, t, r) : fromObject(e, t)
      }

      function assertSize(e) {
          if ("number" !== typeof e) throw new TypeError('"size" argument must be a number');
          if (e < 0) throw new RangeError('"size" argument must not be negative')
      }

      function alloc(e, t, r, n) {
          return assertSize(t), t <= 0 ? createBuffer(e, t) : void 0 !== r ? "string" === typeof n ? createBuffer(e, t).fill(r, n) : createBuffer(e, t).fill(r) : createBuffer(e, t)
      }

      function allocUnsafe(e, t) {
          if (assertSize(t), e = createBuffer(e, t < 0 ? 0 : 0 | checked(t)), !Buffer.TYPED_ARRAY_SUPPORT)
              for (var r = 0; r < t; ++r) e[r] = 0;
          return e
      }

      function fromString(e, t, r) {
          if ("string" === typeof r && "" !== r || (r = "utf8"), !Buffer.isEncoding(r)) throw new TypeError('"encoding" must be a valid string encoding');
          var n = 0 | byteLength(t, r);
          e = createBuffer(e, n);
          var o = e.write(t, r);
          return o !== n && (e = e.slice(0, o)), e
      }

      function fromArrayLike(e, t) {
          var r = t.length < 0 ? 0 : 0 | checked(t.length);
          e = createBuffer(e, r);
          for (var n = 0; n < r; n += 1) e[n] = 255 & t[n];
          return e
      }

      function fromArrayBuffer(e, t, r, n) {
          if (t.byteLength, r < 0 || t.byteLength < r) throw new RangeError("'offset' is out of bounds");
          if (t.byteLength < r + (n || 0)) throw new RangeError("'length' is out of bounds");
          return t = void 0 === r && void 0 === n ? new Uint8Array(t) : void 0 === n ? new Uint8Array(t, r) : new Uint8Array(t, r, n), Buffer.TYPED_ARRAY_SUPPORT ? (e = t, e.__proto__ = Buffer.prototype) : e = fromArrayLike(e, t), e
      }

      function fromObject(e, t) {
          if (Buffer.isBuffer(t)) {
              var r = 0 | checked(t.length);
              return e = createBuffer(e, r), 0 === e.length ? e : (t.copy(e, 0, 0, r), e)
          }
          if (t) {
              if ("undefined" !== typeof ArrayBuffer && t.buffer instanceof ArrayBuffer || "length" in t) return "number" !== typeof t.length || isnan(t.length) ? createBuffer(e, 0) : fromArrayLike(e, t);
              if ("Buffer" === t.type && i(t.data)) return fromArrayLike(e, t.data)
          }
          throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")
      }

      function checked(e) {
          if (e >= kMaxLength()) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + kMaxLength().toString(16) + " bytes");
          return 0 | e
      }

      function SlowBuffer(e) {
          return +e != e && (e = 0), Buffer.alloc(+e)
      }

      function byteLength(e, t) {
          if (Buffer.isBuffer(e)) return e.length;
          if ("undefined" !== typeof ArrayBuffer && "function" === typeof ArrayBuffer.isView && (ArrayBuffer.isView(e) || e instanceof ArrayBuffer)) return e.byteLength;
          "string" !== typeof e && (e = "" + e);
          var r = e.length;
          if (0 === r) return 0;
          for (var n = !1;;) switch (t) {
              case "ascii":
              case "latin1":
              case "binary":
                  return r;
              case "utf8":
              case "utf-8":
              case void 0:
                  return utf8ToBytes(e).length;
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                  return 2 * r;
              case "hex":
                  return r >>> 1;
              case "base64":
                  return base64ToBytes(e).length;
              default:
                  if (n) return utf8ToBytes(e).length;
                  t = ("" + t).toLowerCase(), n = !0
          }
      }

      function slowToString(e, t, r) {
          var n = !1;
          if ((void 0 === t || t < 0) && (t = 0), t > this.length) return "";
          if ((void 0 === r || r > this.length) && (r = this.length), r <= 0) return "";
          if (r >>>= 0, t >>>= 0, r <= t) return "";
          for (e || (e = "utf8");;) switch (e) {
              case "hex":
                  return hexSlice(this, t, r);
              case "utf8":
              case "utf-8":
                  return utf8Slice(this, t, r);
              case "ascii":
                  return asciiSlice(this, t, r);
              case "latin1":
              case "binary":
                  return latin1Slice(this, t, r);
              case "base64":
                  return base64Slice(this, t, r);
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                  return utf16leSlice(this, t, r);
              default:
                  if (n) throw new TypeError("Unknown encoding: " + e);
                  e = (e + "").toLowerCase(), n = !0
          }
      }

      function swap(e, t, r) {
          var n = e[t];
          e[t] = e[r], e[r] = n
      }

      function bidirectionalIndexOf(e, t, r, n, o) {
          if (0 === e.length) return -1;
          if ("string" === typeof r ? (n = r, r = 0) : r > 2147483647 ? r = 2147483647 : r < -2147483648 && (r = -2147483648), r = +r, isNaN(r) && (r = o ? 0 : e.length - 1), r < 0 && (r = e.length + r), r >= e.length) {
              if (o) return -1;
              r = e.length - 1
          } else if (r < 0) {
              if (!o) return -1;
              r = 0
          }
          if ("string" === typeof t && (t = Buffer.from(t, n)), Buffer.isBuffer(t)) return 0 === t.length ? -1 : arrayIndexOf(e, t, r, n, o);
          if ("number" === typeof t) return t &= 255, Buffer.TYPED_ARRAY_SUPPORT && "function" === typeof Uint8Array.prototype.indexOf ? o ? Uint8Array.prototype.indexOf.call(e, t, r) : Uint8Array.prototype.lastIndexOf.call(e, t, r) : arrayIndexOf(e, [t], r, n, o);
          throw new TypeError("val must be string, number or Buffer")
      }

      function arrayIndexOf(e, t, r, n, o) {
          function read(e, t) {
              return 1 === i ? e[t] : e.readUInt16BE(t * i)
          }
          var i = 1,
              a = e.length,
              s = t.length;
          if (void 0 !== n && ("ucs2" === (n = String(n).toLowerCase()) || "ucs-2" === n || "utf16le" === n || "utf-16le" === n)) {
              if (e.length < 2 || t.length < 2) return -1;
              i = 2, a /= 2, s /= 2, r /= 2
          }
          var u;
          if (o) {
              var c = -1;
              for (u = r; u < a; u++)
                  if (read(e, u) === read(t, -1 === c ? 0 : u - c)) {
                      if (-1 === c && (c = u), u - c + 1 === s) return c * i
                  } else -1 !== c && (u -= u - c), c = -1
          } else
              for (r + s > a && (r = a - s), u = r; u >= 0; u--) {
                  for (var f = !0, l = 0; l < s; l++)
                      if (read(e, u + l) !== read(t, l)) {
                          f = !1;
                          break
                      }
                  if (f) return u
              }
          return -1
      }

      function hexWrite(e, t, r, n) {
          r = Number(r) || 0;
          var o = e.length - r;
          n ? (n = Number(n)) > o && (n = o) : n = o;
          var i = t.length;
          if (i % 2 !== 0) throw new TypeError("Invalid hex string");
          n > i / 2 && (n = i / 2);
          for (var a = 0; a < n; ++a) {
              var s = parseInt(t.substr(2 * a, 2), 16);
              if (isNaN(s)) return a;
              e[r + a] = s
          }
          return a
      }

      function utf8Write(e, t, r, n) {
          return blitBuffer(utf8ToBytes(t, e.length - r), e, r, n)
      }

      function asciiWrite(e, t, r, n) {
          return blitBuffer(asciiToBytes(t), e, r, n)
      }

      function latin1Write(e, t, r, n) {
          return asciiWrite(e, t, r, n)
      }

      function base64Write(e, t, r, n) {
          return blitBuffer(base64ToBytes(t), e, r, n)
      }

      function ucs2Write(e, t, r, n) {
          return blitBuffer(utf16leToBytes(t, e.length - r), e, r, n)
      }

      function base64Slice(e, t, r) {
          return 0 === t && r === e.length ? n.fromByteArray(e) : n.fromByteArray(e.slice(t, r))
      }

      function utf8Slice(e, t, r) {
          r = Math.min(e.length, r);
          for (var n = [], o = t; o < r;) {
              var i = e[o],
                  a = null,
                  s = i > 239 ? 4 : i > 223 ? 3 : i > 191 ? 2 : 1;
              if (o + s <= r) {
                  var u, c, f, l;
                  switch (s) {
                      case 1:
                          i < 128 && (a = i);
                          break;
                      case 2:
                          u = e[o + 1], 128 === (192 & u) && (l = (31 & i) << 6 | 63 & u) > 127 && (a = l);
                          break;
                      case 3:
                          u = e[o + 1], c = e[o + 2], 128 === (192 & u) && 128 === (192 & c) && (l = (15 & i) << 12 | (63 & u) << 6 | 63 & c) > 2047 && (l < 55296 || l > 57343) && (a = l);
                          break;
                      case 4:
                          u = e[o + 1], c = e[o + 2], f = e[o + 3], 128 === (192 & u) && 128 === (192 & c) && 128 === (192 & f) && (l = (15 & i) << 18 | (63 & u) << 12 | (63 & c) << 6 | 63 & f) > 65535 && l < 1114112 && (a = l)
                  }
              }
              null === a ? (a = 65533, s = 1) : a > 65535 && (a -= 65536, n.push(a >>> 10 & 1023 | 55296), a = 56320 | 1023 & a), n.push(a), o += s
          }
          return decodeCodePointsArray(n)
      }

      function decodeCodePointsArray(e) {
          var t = e.length;
          if (t <= a) return String.fromCharCode.apply(String, e);
          for (var r = "", n = 0; n < t;) r += String.fromCharCode.apply(String, e.slice(n, n += a));
          return r
      }

      function asciiSlice(e, t, r) {
          var n = "";
          r = Math.min(e.length, r);
          for (var o = t; o < r; ++o) n += String.fromCharCode(127 & e[o]);
          return n
      }

      function latin1Slice(e, t, r) {
          var n = "";
          r = Math.min(e.length, r);
          for (var o = t; o < r; ++o) n += String.fromCharCode(e[o]);
          return n
      }

      function hexSlice(e, t, r) {
          var n = e.length;
          (!t || t < 0) && (t = 0), (!r || r < 0 || r > n) && (r = n);
          for (var o = "", i = t; i < r; ++i) o += toHex(e[i]);
          return o
      }

      function utf16leSlice(e, t, r) {
          for (var n = e.slice(t, r), o = "", i = 0; i < n.length; i += 2) o += String.fromCharCode(n[i] + 256 * n[i + 1]);
          return o
      }

      function checkOffset(e, t, r) {
          if (e % 1 !== 0 || e < 0) throw new RangeError("offset is not uint");
          if (e + t > r) throw new RangeError("Trying to access beyond buffer length")
      }

      function checkInt(e, t, r, n, o, i) {
          if (!Buffer.isBuffer(e)) throw new TypeError('"buffer" argument must be a Buffer instance');
          if (t > o || t < i) throw new RangeError('"value" argument is out of bounds');
          if (r + n > e.length) throw new RangeError("Index out of range")
      }

      function objectWriteUInt16(e, t, r, n) {
          t < 0 && (t = 65535 + t + 1);
          for (var o = 0, i = Math.min(e.length - r, 2); o < i; ++o) e[r + o] = (t & 255 << 8 * (n ? o : 1 - o)) >>> 8 * (n ? o : 1 - o)
      }

      function objectWriteUInt32(e, t, r, n) {
          t < 0 && (t = 4294967295 + t + 1);
          for (var o = 0, i = Math.min(e.length - r, 4); o < i; ++o) e[r + o] = t >>> 8 * (n ? o : 3 - o) & 255
      }

      function checkIEEE754(e, t, r, n, o, i) {
          if (r + n > e.length) throw new RangeError("Index out of range");
          if (r < 0) throw new RangeError("Index out of range")
      }

      function writeFloat(e, t, r, n, i) {
          return i || checkIEEE754(e, t, r, 4, 3.4028234663852886e38, -3.4028234663852886e38), o.write(e, t, r, n, 23, 4), r + 4
      }

      function writeDouble(e, t, r, n, i) {
          return i || checkIEEE754(e, t, r, 8, 1.7976931348623157e308, -1.7976931348623157e308), o.write(e, t, r, n, 52, 8), r + 8
      }

      function base64clean(e) {
          if (e = stringtrim(e).replace(s, ""), e.length < 2) return "";
          for (; e.length % 4 !== 0;) e += "=";
          return e
      }

      function stringtrim(e) {
          return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, "")
      }

      function toHex(e) {
          return e < 16 ? "0" + e.toString(16) : e.toString(16)
      }

      function utf8ToBytes(e, t) {
          t = t || 1 / 0;
          for (var r, n = e.length, o = null, i = [], a = 0; a < n; ++a) {
              if ((r = e.charCodeAt(a)) > 55295 && r < 57344) {
                  if (!o) {
                      if (r > 56319) {
                          (t -= 3) > -1 && i.push(239, 191, 189);
                          continue
                      }
                      if (a + 1 === n) {
                          (t -= 3) > -1 && i.push(239, 191, 189);
                          continue
                      }
                      o = r;
                      continue
                  }
                  if (r < 56320) {
                      (t -= 3) > -1 && i.push(239, 191, 189), o = r;
                      continue
                  }
                  r = 65536 + (o - 55296 << 10 | r - 56320)
              } else o && (t -= 3) > -1 && i.push(239, 191, 189);
              if (o = null, r < 128) {
                  if ((t -= 1) < 0) break;
                  i.push(r)
              } else if (r < 2048) {
                  if ((t -= 2) < 0) break;
                  i.push(r >> 6 | 192, 63 & r | 128)
              } else if (r < 65536) {
                  if ((t -= 3) < 0) break;
                  i.push(r >> 12 | 224, r >> 6 & 63 | 128, 63 & r | 128)
              } else {
                  if (!(r < 1114112)) throw new Error("Invalid code point");
                  if ((t -= 4) < 0) break;
                  i.push(r >> 18 | 240, r >> 12 & 63 | 128, r >> 6 & 63 | 128, 63 & r | 128)
              }
          }
          return i
      }

      function asciiToBytes(e) {
          for (var t = [], r = 0; r < e.length; ++r) t.push(255 & e.charCodeAt(r));
          return t
      }

      function utf16leToBytes(e, t) {
          for (var r, n, o, i = [], a = 0; a < e.length && !((t -= 2) < 0); ++a) r = e.charCodeAt(a), n = r >> 8, o = r % 256, i.push(o), i.push(n);
          return i
      }

      function base64ToBytes(e) {
          return n.toByteArray(base64clean(e))
      }

      function blitBuffer(e, t, r, n) {
          for (var o = 0; o < n && !(o + r >= t.length || o >= e.length); ++o) t[o + r] = e[o];
          return o
      }

      function isnan(e) {
          return e !== e
      }
      var n = r(25),
          o = r(26),
          i = r(27);
      t.Buffer = Buffer, t.SlowBuffer = SlowBuffer, t.INSPECT_MAX_BYTES = 50, Buffer.TYPED_ARRAY_SUPPORT = void 0 !== e.TYPED_ARRAY_SUPPORT ? e.TYPED_ARRAY_SUPPORT : function() {
          try {
              var e = new Uint8Array(1);
              return e.__proto__ = {
                  __proto__: Uint8Array.prototype,
                  foo: function() {
                      return 42
                  }
              }, 42 === e.foo() && "function" === typeof e.subarray && 0 === e.subarray(1, 1).byteLength
          } catch (e) {
              return !1
          }
      }(), t.kMaxLength = kMaxLength(), Buffer.poolSize = 8192, Buffer._augment = function(e) {
          return e.__proto__ = Buffer.prototype, e
      }, Buffer.from = function(e, t, r) {
          return from(null, e, t, r)
      }, Buffer.TYPED_ARRAY_SUPPORT && (Buffer.prototype.__proto__ = Uint8Array.prototype, Buffer.__proto__ = Uint8Array, "undefined" !== typeof Symbol && Symbol.species && Buffer[Symbol.species] === Buffer && Object.defineProperty(Buffer, Symbol.species, {
          value: null,
          configurable: !0
      })), Buffer.alloc = function(e, t, r) {
          return alloc(null, e, t, r)
      }, Buffer.allocUnsafe = function(e) {
          return allocUnsafe(null, e)
      }, Buffer.allocUnsafeSlow = function(e) {
          return allocUnsafe(null, e)
      }, Buffer.isBuffer = function(e) {
          return !(null == e || !e._isBuffer)
      }, Buffer.compare = function(e, t) {
          if (!Buffer.isBuffer(e) || !Buffer.isBuffer(t)) throw new TypeError("Arguments must be Buffers");
          if (e === t) return 0;
          for (var r = e.length, n = t.length, o = 0, i = Math.min(r, n); o < i; ++o)
              if (e[o] !== t[o]) {
                  r = e[o], n = t[o];
                  break
              }
          return r < n ? -1 : n < r ? 1 : 0
      }, Buffer.isEncoding = function(e) {
          switch (String(e).toLowerCase()) {
              case "hex":
              case "utf8":
              case "utf-8":
              case "ascii":
              case "latin1":
              case "binary":
              case "base64":
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                  return !0;
              default:
                  return !1
          }
      }, Buffer.concat = function(e, t) {
          if (!i(e)) throw new TypeError('"list" argument must be an Array of Buffers');
          if (0 === e.length) return Buffer.alloc(0);
          var r;
          if (void 0 === t)
              for (t = 0, r = 0; r < e.length; ++r) t += e[r].length;
          var n = Buffer.allocUnsafe(t),
              o = 0;
          for (r = 0; r < e.length; ++r) {
              var a = e[r];
              if (!Buffer.isBuffer(a)) throw new TypeError('"list" argument must be an Array of Buffers');
              a.copy(n, o), o += a.length
          }
          return n
      }, Buffer.byteLength = byteLength, Buffer.prototype._isBuffer = !0, Buffer.prototype.swap16 = function() {
          var e = this.length;
          if (e % 2 !== 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
          for (var t = 0; t < e; t += 2) swap(this, t, t + 1);
          return this
      }, Buffer.prototype.swap32 = function() {
          var e = this.length;
          if (e % 4 !== 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
          for (var t = 0; t < e; t += 4) swap(this, t, t + 3), swap(this, t + 1, t + 2);
          return this
      }, Buffer.prototype.swap64 = function() {
          var e = this.length;
          if (e % 8 !== 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
          for (var t = 0; t < e; t += 8) swap(this, t, t + 7), swap(this, t + 1, t + 6), swap(this, t + 2, t + 5), swap(this, t + 3, t + 4);
          return this
      }, Buffer.prototype.toString = function() {
          var e = 0 | this.length;
          return 0 === e ? "" : 0 === arguments.length ? utf8Slice(this, 0, e) : slowToString.apply(this, arguments)
      }, Buffer.prototype.equals = function(e) {
          if (!Buffer.isBuffer(e)) throw new TypeError("Argument must be a Buffer");
          return this === e || 0 === Buffer.compare(this, e)
      }, Buffer.prototype.inspect = function() {
          var e = "",
              r = t.INSPECT_MAX_BYTES;
          return this.length > 0 && (e = this.toString("hex", 0, r).match(/.{2}/g).join(" "), this.length > r && (e += " ... ")), "<Buffer " + e + ">"
      }, Buffer.prototype.compare = function(e, t, r, n, o) {
          if (!Buffer.isBuffer(e)) throw new TypeError("Argument must be a Buffer");
          if (void 0 === t && (t = 0), void 0 === r && (r = e ? e.length : 0), void 0 === n && (n = 0), void 0 === o && (o = this.length), t < 0 || r > e.length || n < 0 || o > this.length) throw new RangeError("out of range index");
          if (n >= o && t >= r) return 0;
          if (n >= o) return -1;
          if (t >= r) return 1;
          if (t >>>= 0, r >>>= 0, n >>>= 0, o >>>= 0, this === e) return 0;
          for (var i = o - n, a = r - t, s = Math.min(i, a), u = this.slice(n, o), c = e.slice(t, r), f = 0; f < s; ++f)
              if (u[f] !== c[f]) {
                  i = u[f], a = c[f];
                  break
              }
          return i < a ? -1 : a < i ? 1 : 0
      }, Buffer.prototype.includes = function(e, t, r) {
          return -1 !== this.indexOf(e, t, r)
      }, Buffer.prototype.indexOf = function(e, t, r) {
          return bidirectionalIndexOf(this, e, t, r, !0)
      }, Buffer.prototype.lastIndexOf = function(e, t, r) {
          return bidirectionalIndexOf(this, e, t, r, !1)
      }, Buffer.prototype.write = function(e, t, r, n) {
          if (void 0 === t) n = "utf8", r = this.length, t = 0;
          else if (void 0 === r && "string" === typeof t) n = t, r = this.length, t = 0;
          else {
              if (!isFinite(t)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
              t |= 0, isFinite(r) ? (r |= 0, void 0 === n && (n = "utf8")) : (n = r, r = void 0)
          }
          var o = this.length - t;
          if ((void 0 === r || r > o) && (r = o), e.length > 0 && (r < 0 || t < 0) || t > this.length) throw new RangeError("Attempt to write outside buffer bounds");
          n || (n = "utf8");
          for (var i = !1;;) switch (n) {
              case "hex":
                  return hexWrite(this, e, t, r);
              case "utf8":
              case "utf-8":
                  return utf8Write(this, e, t, r);
              case "ascii":
                  return asciiWrite(this, e, t, r);
              case "latin1":
              case "binary":
                  return latin1Write(this, e, t, r);
              case "base64":
                  return base64Write(this, e, t, r);
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                  return ucs2Write(this, e, t, r);
              default:
                  if (i) throw new TypeError("Unknown encoding: " + n);
                  n = ("" + n).toLowerCase(), i = !0
          }
      }, Buffer.prototype.toJSON = function() {
          return {
              type: "Buffer",
              data: Array.prototype.slice.call(this._arr || this, 0)
          }
      };
      var a = 4096;
      Buffer.prototype.slice = function(e, t) {
          var r = this.length;
          e = ~~e, t = void 0 === t ? r : ~~t, e < 0 ? (e += r) < 0 && (e = 0) : e > r && (e = r), t < 0 ? (t += r) < 0 && (t = 0) : t > r && (t = r), t < e && (t = e);
          var n;
          if (Buffer.TYPED_ARRAY_SUPPORT) n = this.subarray(e, t), n.__proto__ = Buffer.prototype;
          else {
              var o = t - e;
              n = new Buffer(o, void 0);
              for (var i = 0; i < o; ++i) n[i] = this[i + e]
          }
          return n
      }, Buffer.prototype.readUIntLE = function(e, t, r) {
          e |= 0, t |= 0, r || checkOffset(e, t, this.length);
          for (var n = this[e], o = 1, i = 0; ++i < t && (o *= 256);) n += this[e + i] * o;
          return n
      }, Buffer.prototype.readUIntBE = function(e, t, r) {
          e |= 0, t |= 0, r || checkOffset(e, t, this.length);
          for (var n = this[e + --t], o = 1; t > 0 && (o *= 256);) n += this[e + --t] * o;
          return n
      }, Buffer.prototype.readUInt8 = function(e, t) {
          return t || checkOffset(e, 1, this.length), this[e]
      }, Buffer.prototype.readUInt16LE = function(e, t) {
          return t || checkOffset(e, 2, this.length), this[e] | this[e + 1] << 8
      }, Buffer.prototype.readUInt16BE = function(e, t) {
          return t || checkOffset(e, 2, this.length), this[e] << 8 | this[e + 1]
      }, Buffer.prototype.readUInt32LE = function(e, t) {
          return t || checkOffset(e, 4, this.length), (this[e] | this[e + 1] << 8 | this[e + 2] << 16) + 16777216 * this[e + 3]
      }, Buffer.prototype.readUInt32BE = function(e, t) {
          return t || checkOffset(e, 4, this.length), 16777216 * this[e] + (this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3])
      }, Buffer.prototype.readIntLE = function(e, t, r) {
          e |= 0, t |= 0, r || checkOffset(e, t, this.length);
          for (var n = this[e], o = 1, i = 0; ++i < t && (o *= 256);) n += this[e + i] * o;
          return o *= 128, n >= o && (n -= Math.pow(2, 8 * t)), n
      }, Buffer.prototype.readIntBE = function(e, t, r) {
          e |= 0, t |= 0, r || checkOffset(e, t, this.length);
          for (var n = t, o = 1, i = this[e + --n]; n > 0 && (o *= 256);) i += this[e + --n] * o;
          return o *= 128, i >= o && (i -= Math.pow(2, 8 * t)), i
      }, Buffer.prototype.readInt8 = function(e, t) {
          return t || checkOffset(e, 1, this.length), 128 & this[e] ? -1 * (255 - this[e] + 1) : this[e]
      }, Buffer.prototype.readInt16LE = function(e, t) {
          t || checkOffset(e, 2, this.length);
          var r = this[e] | this[e + 1] << 8;
          return 32768 & r ? 4294901760 | r : r
      }, Buffer.prototype.readInt16BE = function(e, t) {
          t || checkOffset(e, 2, this.length);
          var r = this[e + 1] | this[e] << 8;
          return 32768 & r ? 4294901760 | r : r
      }, Buffer.prototype.readInt32LE = function(e, t) {
          return t || checkOffset(e, 4, this.length), this[e] | this[e + 1] << 8 | this[e + 2] << 16 | this[e + 3] << 24
      }, Buffer.prototype.readInt32BE = function(e, t) {
          return t || checkOffset(e, 4, this.length), this[e] << 24 | this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3]
      }, Buffer.prototype.readFloatLE = function(e, t) {
          return t || checkOffset(e, 4, this.length), o.read(this, e, !0, 23, 4)
      }, Buffer.prototype.readFloatBE = function(e, t) {
          return t || checkOffset(e, 4, this.length), o.read(this, e, !1, 23, 4)
      }, Buffer.prototype.readDoubleLE = function(e, t) {
          return t || checkOffset(e, 8, this.length), o.read(this, e, !0, 52, 8)
      }, Buffer.prototype.readDoubleBE = function(e, t) {
          return t || checkOffset(e, 8, this.length), o.read(this, e, !1, 52, 8)
      }, Buffer.prototype.writeUIntLE = function(e, t, r, n) {
          if (e = +e, t |= 0, r |= 0, !n) {
              checkInt(this, e, t, r, Math.pow(2, 8 * r) - 1, 0)
          }
          var o = 1,
              i = 0;
          for (this[t] = 255 & e; ++i < r && (o *= 256);) this[t + i] = e / o & 255;
          return t + r
      }, Buffer.prototype.writeUIntBE = function(e, t, r, n) {
          if (e = +e, t |= 0, r |= 0, !n) {
              checkInt(this, e, t, r, Math.pow(2, 8 * r) - 1, 0)
          }
          var o = r - 1,
              i = 1;
          for (this[t + o] = 255 & e; --o >= 0 && (i *= 256);) this[t + o] = e / i & 255;
          return t + r
      }, Buffer.prototype.writeUInt8 = function(e, t, r) {
          return e = +e, t |= 0, r || checkInt(this, e, t, 1, 255, 0), Buffer.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)), this[t] = 255 & e, t + 1
      }, Buffer.prototype.writeUInt16LE = function(e, t, r) {
          return e = +e, t |= 0, r || checkInt(this, e, t, 2, 65535, 0), Buffer.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e, this[t + 1] = e >>> 8) : objectWriteUInt16(this, e, t, !0), t + 2
      }, Buffer.prototype.writeUInt16BE = function(e, t, r) {
          return e = +e, t |= 0, r || checkInt(this, e, t, 2, 65535, 0), Buffer.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 8, this[t + 1] = 255 & e) : objectWriteUInt16(this, e, t, !1), t + 2
      }, Buffer.prototype.writeUInt32LE = function(e, t, r) {
          return e = +e, t |= 0, r || checkInt(this, e, t, 4, 4294967295, 0), Buffer.TYPED_ARRAY_SUPPORT ? (this[t + 3] = e >>> 24, this[t + 2] = e >>> 16, this[t + 1] = e >>> 8, this[t] = 255 & e) : objectWriteUInt32(this, e, t, !0), t + 4
      }, Buffer.prototype.writeUInt32BE = function(e, t, r) {
          return e = +e, t |= 0, r || checkInt(this, e, t, 4, 4294967295, 0), Buffer.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = 255 & e) : objectWriteUInt32(this, e, t, !1), t + 4
      }, Buffer.prototype.writeIntLE = function(e, t, r, n) {
          if (e = +e, t |= 0, !n) {
              var o = Math.pow(2, 8 * r - 1);
              checkInt(this, e, t, r, o - 1, -o)
          }
          var i = 0,
              a = 1,
              s = 0;
          for (this[t] = 255 & e; ++i < r && (a *= 256);) e < 0 && 0 === s && 0 !== this[t + i - 1] && (s = 1), this[t + i] = (e / a >> 0) - s & 255;
          return t + r
      }, Buffer.prototype.writeIntBE = function(e, t, r, n) {
          if (e = +e, t |= 0, !n) {
              var o = Math.pow(2, 8 * r - 1);
              checkInt(this, e, t, r, o - 1, -o)
          }
          var i = r - 1,
              a = 1,
              s = 0;
          for (this[t + i] = 255 & e; --i >= 0 && (a *= 256);) e < 0 && 0 === s && 0 !== this[t + i + 1] && (s = 1), this[t + i] = (e / a >> 0) - s & 255;
          return t + r
      }, Buffer.prototype.writeInt8 = function(e, t, r) {
          return e = +e, t |= 0, r || checkInt(this, e, t, 1, 127, -128), Buffer.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)), e < 0 && (e = 255 + e + 1), this[t] = 255 & e, t + 1
      }, Buffer.prototype.writeInt16LE = function(e, t, r) {
          return e = +e, t |= 0, r || checkInt(this, e, t, 2, 32767, -32768), Buffer.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e, this[t + 1] = e >>> 8) : objectWriteUInt16(this, e, t, !0), t + 2
      }, Buffer.prototype.writeInt16BE = function(e, t, r) {
          return e = +e, t |= 0, r || checkInt(this, e, t, 2, 32767, -32768), Buffer.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 8, this[t + 1] = 255 & e) : objectWriteUInt16(this, e, t, !1), t + 2
      }, Buffer.prototype.writeInt32LE = function(e, t, r) {
          return e = +e, t |= 0, r || checkInt(this, e, t, 4, 2147483647, -2147483648), Buffer.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e, this[t + 1] = e >>> 8, this[t + 2] = e >>> 16, this[t + 3] = e >>> 24) : objectWriteUInt32(this, e, t, !0), t + 4
      }, Buffer.prototype.writeInt32BE = function(e, t, r) {
          return e = +e, t |= 0, r || checkInt(this, e, t, 4, 2147483647, -2147483648), e < 0 && (e = 4294967295 + e + 1), Buffer.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = 255 & e) : objectWriteUInt32(this, e, t, !1), t + 4
      }, Buffer.prototype.writeFloatLE = function(e, t, r) {
          return writeFloat(this, e, t, !0, r)
      }, Buffer.prototype.writeFloatBE = function(e, t, r) {
          return writeFloat(this, e, t, !1, r)
      }, Buffer.prototype.writeDoubleLE = function(e, t, r) {
          return writeDouble(this, e, t, !0, r)
      }, Buffer.prototype.writeDoubleBE = function(e, t, r) {
          return writeDouble(this, e, t, !1, r)
      }, Buffer.prototype.copy = function(e, t, r, n) {
          if (r || (r = 0), n || 0 === n || (n = this.length), t >= e.length && (t = e.length), t || (t = 0), n > 0 && n < r && (n = r), n === r) return 0;
          if (0 === e.length || 0 === this.length) return 0;
          if (t < 0) throw new RangeError("targetStart out of bounds");
          if (r < 0 || r >= this.length) throw new RangeError("sourceStart out of bounds");
          if (n < 0) throw new RangeError("sourceEnd out of bounds");
          n > this.length && (n = this.length), e.length - t < n - r && (n = e.length - t + r);
          var o, i = n - r;
          if (this === e && r < t && t < n)
              for (o = i - 1; o >= 0; --o) e[o + t] = this[o + r];
          else if (i < 1e3 || !Buffer.TYPED_ARRAY_SUPPORT)
              for (o = 0; o < i; ++o) e[o + t] = this[o + r];
          else Uint8Array.prototype.set.call(e, this.subarray(r, r + i), t);
          return i
      }, Buffer.prototype.fill = function(e, t, r, n) {
          if ("string" === typeof e) {
              if ("string" === typeof t ? (n = t, t = 0, r = this.length) : "string" === typeof r && (n = r, r = this.length), 1 === e.length) {
                  var o = e.charCodeAt(0);
                  o < 256 && (e = o)
              }
              if (void 0 !== n && "string" !== typeof n) throw new TypeError("encoding must be a string");
              if ("string" === typeof n && !Buffer.isEncoding(n)) throw new TypeError("Unknown encoding: " + n)
          } else "number" === typeof e && (e &= 255);
          if (t < 0 || this.length < t || this.length < r) throw new RangeError("Out of range index");
          if (r <= t) return this;
          t >>>= 0, r = void 0 === r ? this.length : r >>> 0, e || (e = 0);
          var i;
          if ("number" === typeof e)
              for (i = t; i < r; ++i) this[i] = e;
          else {
              var a = Buffer.isBuffer(e) ? e : utf8ToBytes(new Buffer(e, n).toString()),
                  s = a.length;
              for (i = 0; i < r - t; ++i) this[i + t] = a[i % s]
          }
          return this
      };
      var s = /[^+\/0-9A-Za-z-_]/g
  }).call(t, r(1))
}, function(e, t, r) {
  "use strict";

  function getLens(e) {
      var t = e.length;
      if (t % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
      var r = e.indexOf("=");
      return -1 === r && (r = t), [r, r === t ? 0 : 4 - r % 4]
  }

  function byteLength(e) {
      var t = getLens(e),
          r = t[0],
          n = t[1];
      return 3 * (r + n) / 4 - n
  }

  function _byteLength(e, t, r) {
      return 3 * (t + r) / 4 - r
  }

  function toByteArray(e) {
      for (var t, r = getLens(e), n = r[0], a = r[1], s = new i(_byteLength(e, n, a)), u = 0, c = a > 0 ? n - 4 : n, f = 0; f < c; f += 4) t = o[e.charCodeAt(f)] << 18 | o[e.charCodeAt(f + 1)] << 12 | o[e.charCodeAt(f + 2)] << 6 | o[e.charCodeAt(f + 3)], s[u++] = t >> 16 & 255, s[u++] = t >> 8 & 255, s[u++] = 255 & t;
      return 2 === a && (t = o[e.charCodeAt(f)] << 2 | o[e.charCodeAt(f + 1)] >> 4, s[u++] = 255 & t), 1 === a && (t = o[e.charCodeAt(f)] << 10 | o[e.charCodeAt(f + 1)] << 4 | o[e.charCodeAt(f + 2)] >> 2, s[u++] = t >> 8 & 255, s[u++] = 255 & t), s
  }

  function tripletToBase64(e) {
      return n[e >> 18 & 63] + n[e >> 12 & 63] + n[e >> 6 & 63] + n[63 & e]
  }

  function encodeChunk(e, t, r) {
      for (var n, o = [], i = t; i < r; i += 3) n = (e[i] << 16 & 16711680) + (e[i + 1] << 8 & 65280) + (255 & e[i + 2]), o.push(tripletToBase64(n));
      return o.join("")
  }

  function fromByteArray(e) {
      for (var t, r = e.length, o = r % 3, i = [], a = 0, s = r - o; a < s; a += 16383) i.push(encodeChunk(e, a, a + 16383 > s ? s : a + 16383));
      return 1 === o ? (t = e[r - 1], i.push(n[t >> 2] + n[t << 4 & 63] + "==")) : 2 === o && (t = (e[r - 2] << 8) + e[r - 1], i.push(n[t >> 10] + n[t >> 4 & 63] + n[t << 2 & 63] + "=")), i.join("")
  }
  t.byteLength = byteLength, t.toByteArray = toByteArray, t.fromByteArray = fromByteArray;
  for (var n = [], o = [], i = "undefined" !== typeof Uint8Array ? Uint8Array : Array, a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", s = 0, u = a.length; s < u; ++s) n[s] = a[s], o[a.charCodeAt(s)] = s;
  o["-".charCodeAt(0)] = 62, o["_".charCodeAt(0)] = 63
}, function(e, t) {
  t.read = function(e, t, r, n, o) {
      var i, a, s = 8 * o - n - 1,
          u = (1 << s) - 1,
          c = u >> 1,
          f = -7,
          l = r ? o - 1 : 0,
          p = r ? -1 : 1,
          h = e[t + l];
      for (l += p, i = h & (1 << -f) - 1, h >>= -f, f += s; f > 0; i = 256 * i + e[t + l], l += p, f -= 8);
      for (a = i & (1 << -f) - 1, i >>= -f, f += n; f > 0; a = 256 * a + e[t + l], l += p, f -= 8);
      if (0 === i) i = 1 - c;
      else {
          if (i === u) return a ? NaN : 1 / 0 * (h ? -1 : 1);
          a += Math.pow(2, n), i -= c
      }
      return (h ? -1 : 1) * a * Math.pow(2, i - n)
  }, t.write = function(e, t, r, n, o, i) {
      var a, s, u, c = 8 * i - o - 1,
          f = (1 << c) - 1,
          l = f >> 1,
          p = 23 === o ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
          h = n ? 0 : i - 1,
          d = n ? 1 : -1,
          y = t < 0 || 0 === t && 1 / t < 0 ? 1 : 0;
      for (t = Math.abs(t), isNaN(t) || t === 1 / 0 ? (s = isNaN(t) ? 1 : 0, a = f) : (a = Math.floor(Math.log(t) / Math.LN2), t * (u = Math.pow(2, -a)) < 1 && (a--, u *= 2), t += a + l >= 1 ? p / u : p * Math.pow(2, 1 - l), t * u >= 2 && (a++, u /= 2), a + l >= f ? (s = 0, a = f) : a + l >= 1 ? (s = (t * u - 1) * Math.pow(2, o), a += l) : (s = t * Math.pow(2, l - 1) * Math.pow(2, o), a = 0)); o >= 8; e[r + h] = 255 & s, h += d, s /= 256, o -= 8);
      for (a = a << o | s, c += o; c > 0; e[r + h] = 255 & a, h += d, a /= 256, c -= 8);
      e[r + h - d] |= 128 * y
  }
}, function(e, t) {
  var r = {}.toString;
  e.exports = Array.isArray || function(e) {
      return "[object Array]" == r.call(e)
  }
}, function(e, t, r) {
  var n = function() {
          return this
      }() || Function("return this")(),
      o = n.regeneratorRuntime && Object.getOwnPropertyNames(n).indexOf("regeneratorRuntime") >= 0,
      i = o && n.regeneratorRuntime;
  if (n.regeneratorRuntime = void 0, e.exports = r(29), o) n.regeneratorRuntime = i;
  else try {
      delete n.regeneratorRuntime
  } catch (e) {
      n.regeneratorRuntime = void 0
  }
}, function(e, t) {
  ! function(t) {
      "use strict";

      function wrap(e, t, r, n) {
          var o = t && t.prototype instanceof Generator ? t : Generator,
              i = Object.create(o.prototype),
              a = new Context(n || []);
          return i._invoke = makeInvokeMethod(e, r, a), i
      }

      function tryCatch(e, t, r) {
          try {
              return {
                  type: "normal",
                  arg: e.call(t, r)
              }
          } catch (e) {
              return {
                  type: "throw",
                  arg: e
              }
          }
      }

      function Generator() {}

      function GeneratorFunction() {}

      function GeneratorFunctionPrototype() {}

      function defineIteratorMethods(e) {
          ["next", "throw", "return"].forEach(function(t) {
              e[t] = function(e) {
                  return this._invoke(t, e)
              }
          })
      }

      function AsyncIterator(e) {
          function invoke(t, r, n, i) {
              var a = tryCatch(e[t], e, r);
              if ("throw" !== a.type) {
                  var s = a.arg,
                      u = s.value;
                  return u && "object" === typeof u && o.call(u, "__await") ? Promise.resolve(u.__await).then(function(e) {
                      invoke("next", e, n, i)
                  }, function(e) {
                      invoke("throw", e, n, i)
                  }) : Promise.resolve(u).then(function(e) {
                      s.value = e, n(s)
                  }, i)
              }
              i(a.arg)
          }

          function enqueue(e, r) {
              function callInvokeWithMethodAndArg() {
                  return new Promise(function(t, n) {
                      invoke(e, r, t, n)
                  })
              }
              return t = t ? t.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg()
          }
          var t;
          this._invoke = enqueue
      }

      function makeInvokeMethod(e, t, r) {
          var n = l;
          return function(o, i) {
              if (n === h) throw new Error("Generator is already running");
              if (n === d) {
                  if ("throw" === o) throw i;
                  return doneResult()
              }
              for (r.method = o, r.arg = i;;) {
                  var a = r.delegate;
                  if (a) {
                      var s = maybeInvokeDelegate(a, r);
                      if (s) {
                          if (s === y) continue;
                          return s
                      }
                  }
                  if ("next" === r.method) r.sent = r._sent = r.arg;
                  else if ("throw" === r.method) {
                      if (n === l) throw n = d, r.arg;
                      r.dispatchException(r.arg)
                  } else "return" === r.method && r.abrupt("return", r.arg);
                  n = h;
                  var u = tryCatch(e, t, r);
                  if ("normal" === u.type) {
                      if (n = r.done ? d : p, u.arg === y) continue;
                      return {
                          value: u.arg,
                          done: r.done
                      }
                  }
                  "throw" === u.type && (n = d, r.method = "throw", r.arg = u.arg)
              }
          }
      }

      function maybeInvokeDelegate(e, t) {
          var n = e.iterator[t.method];
          if (n === r) {
              if (t.delegate = null, "throw" === t.method) {
                  if (e.iterator.return && (t.method = "return", t.arg = r, maybeInvokeDelegate(e, t), "throw" === t.method)) return y;
                  t.method = "throw", t.arg = new TypeError("The iterator does not provide a 'throw' method")
              }
              return y
          }
          var o = tryCatch(n, e.iterator, t.arg);
          if ("throw" === o.type) return t.method = "throw", t.arg = o.arg, t.delegate = null, y;
          var i = o.arg;
          return i ? i.done ? (t[e.resultName] = i.value, t.next = e.nextLoc, "return" !== t.method && (t.method = "next", t.arg = r), t.delegate = null, y) : i : (t.method = "throw", t.arg = new TypeError("iterator result is not an object"), t.delegate = null, y)
      }

      function pushTryEntry(e) {
          var t = {
              tryLoc: e[0]
          };
          1 in e && (t.catchLoc = e[1]), 2 in e && (t.finallyLoc = e[2], t.afterLoc = e[3]), this.tryEntries.push(t)
      }

      function resetTryEntry(e) {
          var t = e.completion || {};
          t.type = "normal", delete t.arg, e.completion = t
      }

      function Context(e) {
          this.tryEntries = [{
              tryLoc: "root"
          }], e.forEach(pushTryEntry, this), this.reset(!0)
      }

      function values(e) {
          if (e) {
              var t = e[a];
              if (t) return t.call(e);
              if ("function" === typeof e.next) return e;
              if (!isNaN(e.length)) {
                  var n = -1,
                      i = function next() {
                          for (; ++n < e.length;)
                              if (o.call(e, n)) return next.value = e[n], next.done = !1, next;
                          return next.value = r, next.done = !0, next
                      };
                  return i.next = i
              }
          }
          return {
              next: doneResult
          }
      }

      function doneResult() {
          return {
              value: r,
              done: !0
          }
      }
      var r, n = Object.prototype,
          o = n.hasOwnProperty,
          i = "function" === typeof Symbol ? Symbol : {},
          a = i.iterator || "@@iterator",
          s = i.asyncIterator || "@@asyncIterator",
          u = i.toStringTag || "@@toStringTag",
          c = "object" === typeof e,
          f = t.regeneratorRuntime;
      if (f) return void(c && (e.exports = f));
      f = t.regeneratorRuntime = c ? e.exports : {}, f.wrap = wrap;
      var l = "suspendedStart",
          p = "suspendedYield",
          h = "executing",
          d = "completed",
          y = {},
          g = {};
      g[a] = function() {
          return this
      };
      var v = Object.getPrototypeOf,
          m = v && v(v(values([])));
      m && m !== n && o.call(m, a) && (g = m);
      var b = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(g);
      GeneratorFunction.prototype = b.constructor = GeneratorFunctionPrototype, GeneratorFunctionPrototype.constructor = GeneratorFunction, GeneratorFunctionPrototype[u] = GeneratorFunction.displayName = "GeneratorFunction", f.isGeneratorFunction = function(e) {
          var t = "function" === typeof e && e.constructor;
          return !!t && (t === GeneratorFunction || "GeneratorFunction" === (t.displayName || t.name))
      }, f.mark = function(e) {
          return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, u in e || (e[u] = "GeneratorFunction")), e.prototype = Object.create(b), e
      }, f.awrap = function(e) {
          return {
              __await: e
          }
      }, defineIteratorMethods(AsyncIterator.prototype), AsyncIterator.prototype[s] = function() {
          return this
      }, f.AsyncIterator = AsyncIterator, f.async = function(e, t, r, n) {
          var o = new AsyncIterator(wrap(e, t, r, n));
          return f.isGeneratorFunction(t) ? o : o.next().then(function(e) {
              return e.done ? e.value : o.next()
          })
      }, defineIteratorMethods(b), b[u] = "Generator", b[a] = function() {
          return this
      }, b.toString = function() {
          return "[object Generator]"
      }, f.keys = function(e) {
          var t = [];
          for (var r in e) t.push(r);
          return t.reverse(),
              function next() {
                  for (; t.length;) {
                      var r = t.pop();
                      if (r in e) return next.value = r, next.done = !1, next
                  }
                  return next.done = !0, next
              }
      }, f.values = values, Context.prototype = {
          constructor: Context,
          reset: function(e) {
              if (this.prev = 0, this.next = 0, this.sent = this._sent = r, this.done = !1, this.delegate = null, this.method = "next", this.arg = r, this.tryEntries.forEach(resetTryEntry), !e)
                  for (var t in this) "t" === t.charAt(0) && o.call(this, t) && !isNaN(+t.slice(1)) && (this[t] = r)
          },
          stop: function() {
              this.done = !0;
              var e = this.tryEntries[0],
                  t = e.completion;
              if ("throw" === t.type) throw t.arg;
              return this.rval
          },
          dispatchException: function(e) {
              function handle(n, o) {
                  return a.type = "throw", a.arg = e, t.next = n, o && (t.method = "next", t.arg = r), !!o
              }
              if (this.done) throw e;
              for (var t = this, n = this.tryEntries.length - 1; n >= 0; --n) {
                  var i = this.tryEntries[n],
                      a = i.completion;
                  if ("root" === i.tryLoc) return handle("end");
                  if (i.tryLoc <= this.prev) {
                      var s = o.call(i, "catchLoc"),
                          u = o.call(i, "finallyLoc");
                      if (s && u) {
                          if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
                          if (this.prev < i.finallyLoc) return handle(i.finallyLoc)
                      } else if (s) {
                          if (this.prev < i.catchLoc) return handle(i.catchLoc, !0)
                      } else {
                          if (!u) throw new Error("try statement without catch or finally");
                          if (this.prev < i.finallyLoc) return handle(i.finallyLoc)
                      }
                  }
              }
          },
          abrupt: function(e, t) {
              for (var r = this.tryEntries.length - 1; r >= 0; --r) {
                  var n = this.tryEntries[r];
                  if (n.tryLoc <= this.prev && o.call(n, "finallyLoc") && this.prev < n.finallyLoc) {
                      var i = n;
                      break
                  }
              }
              i && ("break" === e || "continue" === e) && i.tryLoc <= t && t <= i.finallyLoc && (i = null);
              var a = i ? i.completion : {};
              return a.type = e, a.arg = t, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a)
          },
          complete: function(e, t) {
              if ("throw" === e.type) throw e.arg;
              return "break" === e.type || "continue" === e.type ? this.next = e.arg : "return" === e.type ? (this.rval = this.arg = e.arg, this.method = "return", this.next = "end") : "normal" === e.type && t && (this.next = t), y
          },
          finish: function(e) {
              for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                  var r = this.tryEntries[t];
                  if (r.finallyLoc === e) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y
              }
          },
          catch: function(e) {
              for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                  var r = this.tryEntries[t];
                  if (r.tryLoc === e) {
                      var n = r.completion;
                      if ("throw" === n.type) {
                          var o = n.arg;
                          resetTryEntry(r)
                      }
                      return o
                  }
              }
              throw new Error("illegal catch attempt")
          },
          delegateYield: function(e, t, n) {
              return this.delegate = {
                  iterator: values(e),
                  resultName: t,
                  nextLoc: n
              }, "next" === this.method && (this.arg = r), y
          }
      }
  }(function() {
      return this
  }() || Function("return this")())
}, function(e, t, r) {
  function createStore() {
      var e = {};
      return function(t) {
          if (("object" !== typeof t || null === t) && "function" !== typeof t) throw new Error("Weakmap-shim: Key must be object");
          var r = t.valueOf(e);
          return r && r.identity === e ? r : n(t, e)
      }
  }
  var n = r(31);
  e.exports = createStore
}, function(e, t) {
  function hiddenStore(e, t) {
      var r = {
              identity: t
          },
          n = e.valueOf;
      return Object.defineProperty(e, "valueOf", {
          value: function(e) {
              return e !== t ? n.apply(this, arguments) : r
          },
          writable: !0
      }), r
  }
  e.exports = hiddenStore
}, function(e, t) {
  e.exports = function(e, t, r) {
      function later() {
          var u = Date.now() - a;
          u < t && u >= 0 ? n = setTimeout(later, t - u) : (n = null, r || (s = e.apply(i, o), i = o = null))
      }
      var n, o, i, a, s;
      null == t && (t = 100);
      var u = function() {
          i = this, o = arguments, a = Date.now();
          var u = r && !n;
          return n || (n = setTimeout(later, t)), u && (s = e.apply(i, o), i = o = null), s
      };
      return u.clear = function() {
          n && (clearTimeout(n), n = null)
      }, u.flush = function() {
          n && (s = e.apply(i, o), i = o = null, clearTimeout(n), n = null)
      }, u
  }
}, function(e, t, r) {
  "use strict";
  e.exports = function(e) {
      if ("function" !== typeof e) throw new TypeError("Expected function, got: " + e)
  }
}, function(e, t) {
  function Collector() {
      function collectOrRun() {
          function removeFromQueue() {
              return n.map(function(t) {
                  for (var r = 0; r < e.length; r++)
                      if (e[r].fn === t) {
                          e[r].deleted = !0, e.splice(r, 1);
                          break
                      }
              })
          }
          if (0 === arguments.length) {
              var r = e.slice().filter(function(e) {
                  return !e.deleted
              });
              if (e = [], r = r.map(run), t.length) throw t;
              return r
          }
          var n = Array.prototype.slice.call(arguments);
          return e = e.concat(n.map(FnEntry)), removeFromQueue
      }

      function run(e) {
          try {
              return e.fn()
          } catch (e) {
              return t.push(e), e
          }
      }

      function FnEntry(e) {
          return this instanceof FnEntry ? (this.fn = e, this.deleted = !1, this) : new FnEntry(e)
      }
      var e = [],
          t = [];
      return collectOrRun
  }
  e.exports = Collector
}, function(e, t, r) {
  "use strict";

  function decodeComponents(e, t) {
      try {
          return decodeURIComponent(e.join(""))
      } catch (e) {}
      if (1 === e.length) return e;
      t = t || 1;
      var r = e.slice(0, t),
          n = e.slice(t);
      return Array.prototype.concat.call([], decodeComponents(r), decodeComponents(n))
  }

  function decode(e) {
      try {
          return decodeURIComponent(e)
      } catch (o) {
          for (var t = e.match(n), r = 1; r < t.length; r++) e = decodeComponents(t, r).join(""), t = e.match(n);
          return e
      }
  }

  function customDecodeURIComponent(e) {
      for (var t = {
              "%FE%FF": "\ufffd\ufffd",
              "%FF%FE": "\ufffd\ufffd"
          }, r = o.exec(e); r;) {
          try {
              t[r[0]] = decodeURIComponent(r[0])
          } catch (e) {
              var n = decode(r[0]);
              n !== r[0] && (t[r[0]] = n)
          }
          r = o.exec(e)
      }
      t["%C2"] = "\ufffd";
      for (var i = Object.keys(t), a = 0; a < i.length; a++) {
          var s = i[a];
          e = e.replace(new RegExp(s, "g"), t[s])
      }
      return e
  }
  var n = new RegExp("%[a-f0-9]{2}", "gi"),
      o = new RegExp("(%[a-f0-9]{2})+", "gi");
  e.exports = function(e) {
      if ("string" !== typeof e) throw new TypeError("Expected `encodedURI` to be of type `string`, got `" + typeof e + "`");
      try {
          return e = e.replace(/\+/g, " "), decodeURIComponent(e)
      } catch (t) {
          return customDecodeURIComponent(e)
      }
  }
}, function(e, t, r) {
  "use strict";

  function _asyncToGenerator(e) {
      return function() {
          var t = e.apply(this, arguments);
          return new Promise(function(e, r) {
              function step(n, o) {
                  try {
                      var i = t[n](o),
                          a = i.value
                  } catch (e) {
                      return void r(e)
                  }
                  if (!i.done) return Promise.resolve(a).then(function(e) {
                      step("next", e)
                  }, function(e) {
                      step("throw", e)
                  });
                  e(a)
              }
              return step("next")
          })
      }
  }

  function ensureInit() {
      return n || (n = h()), n
  }
  r.d(t, "a", function() {
      return y
  }), r.d(t, "c", function() {
      return g
  }), r.d(t, "d", function() {
      return v
  }), r.d(t, "b", function() {
      return m
  });
  var n, o = r(0),
      i = r.n(o),
      a = r(12),
      s = r.n(a),
      u = r(16),
      c = r.n(u),
      f = r(67),
      l = r(17),
      p = r(18),
      h = function() {
          var e = _asyncToGenerator(i.a.mark(function _callee() {
              var e, t;
              return i.a.wrap(function(r) {
                  for (;;) switch (r.prev = r.next) {
                      case 0:
                          return e = {
                              baseUrl: p.a,
                              jwt: !1
                          }, r.next = 3, Object(f.a)();
                      case 3:
                          t = r.sent, t && (e.token = "JWT " + t), d.configure(e);
                      case 6:
                      case "end":
                          return r.stop()
                  }
              }, _callee, this)
          }));
          return function() {
              return e.apply(this, arguments)
          }
      }(),
      d = s()(),
      y = function() {
          var e = _asyncToGenerator(i.a.mark(function _callee2(e, t) {
              return i.a.wrap(function(r) {
                  for (;;) switch (r.prev = r.next) {
                      case 0:
                          return r.next = 2, ensureInit();
                      case 2:
                          return r.abrupt("return", new Promise(function(r, n) {
                              d.get(e, {
                                  query: t,
                                  json: !0
                              }, Object(l.a)(r, n))
                          }));
                      case 3:
                      case "end":
                          return r.stop()
                  }
              }, _callee2, this)
          }));
          return function(t, r) {
              return e.apply(this, arguments)
          }
      }(),
      g = function() {
          var e = _asyncToGenerator(i.a.mark(function _callee3(e, t) {
              return i.a.wrap(function(r) {
                  for (;;) switch (r.prev = r.next) {
                      case 0:
                          return r.next = 2, ensureInit();
                      case 2:
                          return r.abrupt("return", new Promise(function(r, n) {
                              d.post(e, {
                                  body: t,
                                  json: !0
                              }, Object(l.a)(r, n))
                          }));
                      case 3:
                      case "end":
                          return r.stop()
                  }
              }, _callee3, this)
          }));
          return function(t, r) {
              return e.apply(this, arguments)
          }
      }(),
      v = function() {
          var e = _asyncToGenerator(i.a.mark(function _callee4(e, t) {
              return i.a.wrap(function(r) {
                  for (;;) switch (r.prev = r.next) {
                      case 0:
                          return r.next = 2, ensureInit();
                      case 2:
                          return r.abrupt("return", new Promise(function(r, n) {
                              d.post(e, {
                                  body: c.a.stringify(t),
                                  headers: {
                                      "Content-Type": "application/x-www-form-urlencoded"
                                  }
                              }, Object(l.a)(r, n))
                          }));
                      case 3:
                      case "end":
                          return r.stop()
                  }
              }, _callee4, this)
          }));
          return function(t, r) {
              return e.apply(this, arguments)
          }
      }(),
      m = function() {
          var e = _asyncToGenerator(i.a.mark(function _callee5(e, t) {
              return i.a.wrap(function(r) {
                  for (;;) switch (r.prev = r.next) {
                      case 0:
                          return r.next = 2, ensureInit();
                      case 2:
                          return r.abrupt("return", new Promise(function(r, n) {
                              d.patch(e, {
                                  body: t,
                                  json: !0
                              }, Object(l.a)(r, n))
                          }));
                      case 3:
                      case "end":
                          return r.stop()
                  }
              }, _callee5, this)
          }));
          return function(t, r) {
              return e.apply(this, arguments)
          }
      }()
}, function(e, t, r) {
  function xhrRequest(e, t, r) {
      if (!e || "string" !== typeof e) throw new TypeError("must specify a URL");
      if ("function" === typeof t && (r = t, t = {}), r && "function" !== typeof r) throw new TypeError("expected cb to be undefined or a function");
      r = r || c, t = t || {};
      var f = t.json ? "json" : "text";
      t = i({
          responseType: f
      }, t);
      var l = t.headers || {},
          p = (t.method || "GET").toUpperCase(),
          h = t.query;
      return h && ("string" !== typeof h && (h = n.stringify(h)), e = o(e, h)), "json" === t.responseType && a(l, "Accept", u), t.json && "GET" !== p && "HEAD" !== p && (a(l, "Content-Type", u), t.body = JSON.stringify(t.body)), t.method = p, t.url = e, t.headers = l, delete t.query, delete t.json, s(t, r)
  }
  var n = r(2),
      o = r(38),
      i = r(11),
      a = r(39),
      s = r(40),
      u = "application/json",
      c = function() {};
  e.exports = xhrRequest
}, function(e, t) {
  function urlSetQuery(e, t) {
      if (t) {
          t = t.trim().replace(/^(\?|#|&)/, ""), t = t ? "?" + t : t;
          var r = e.split(/[\?\#]/),
              n = r[0];
          t && /\:\/\/[^\/]*$/.test(n) && (n += "/");
          var o = e.match(/(\#.*)$/);
          e = n + t, o && (e += o[0])
      }
      return e
  }
  e.exports = urlSetQuery
}, function(e, t) {
  function ensureHeader(e, t, r) {
      var n = t.toLowerCase();
      e[t] || e[n] || (e[t] = r)
  }
  e.exports = ensureHeader
}, function(e, t, r) {
  function xhrRequest(e, t) {
      delete e.uri;
      var r = !1;
      "json" === e.responseType && (e.responseType = "text", r = !0);
      var a = n(e, function(n, a, s) {
              if (r && !n) try {
                  var u = a.rawRequest.responseText;
                  s = JSON.parse(u)
              } catch (e) {
                  n = e
              }
              a = o(e, a), n ? t(n, null, a) : t(n, s, a), t = i
          }),
          s = a.onabort;
      return a.onabort = function() {
          var e = s.apply(a, Array.prototype.slice.call(arguments));
          return t(new Error("XHR Aborted")), t = i, e
      }, a
  }
  var n = r(41),
      o = r(46),
      i = function() {};
  e.exports = xhrRequest
}, function(e, t, r) {
  "use strict";

  function isEmpty(e) {
      for (var t in e)
          if (e.hasOwnProperty(t)) return !1;
      return !0
  }

  function initParams(e, t, r) {
      var n = e;
      return o(t) ? (r = t, "string" === typeof e && (n = {
          uri: e
      })) : n = a(t, {
          uri: e
      }), n.callback = r, n
  }

  function createXHR(e, t, r) {
      return t = initParams(e, t, r), _createXHR(t)
  }

  function _createXHR(e) {
      function readystatechange() {
          4 === n.readyState && setTimeout(loadFunc, 0)
      }

      function getBody() {
          var e = void 0;
          if (e = n.response ? n.response : n.responseText || getXml(n), h) try {
              e = JSON.parse(e)
          } catch (e) {}
          return e
      }

      function errorFunc(e) {
          return clearTimeout(s), e instanceof Error || (e = new Error("" + (e || "Unknown XMLHttpRequest Error"))), e.statusCode = 0, r(e, d)
      }

      function loadFunc() {
          if (!a) {
              var t;
              clearTimeout(s), t = e.useXDR && void 0 === n.status ? 200 : 1223 === n.status ? 204 : n.status;
              var o = d,
                  f = null;
              return 0 !== t ? (o = {
                  body: getBody(),
                  statusCode: t,
                  method: c,
                  headers: {},
                  url: u,
                  rawRequest: n
              }, n.getAllResponseHeaders && (o.headers = i(n.getAllResponseHeaders()))) : f = new Error("Internal XMLHttpRequest Error"), r(f, o, o.body)
          }
      }
      if ("undefined" === typeof e.callback) throw new Error("callback argument missing");
      var t = !1,
          r = function(r, n, o) {
              t || (t = !0, e.callback(r, n, o))
          },
          n = e.xhr || null;
      n || (n = e.cors || e.useXDR ? new createXHR.XDomainRequest : new createXHR.XMLHttpRequest);
      var o, a, s, u = n.url = e.uri || e.url,
          c = n.method = e.method || "GET",
          f = e.body || e.data,
          l = n.headers = e.headers || {},
          p = !!e.sync,
          h = !1,
          d = {
              body: void 0,
              headers: {},
              statusCode: 0,
              method: c,
              url: u,
              rawRequest: n
          };
      if ("json" in e && !1 !== e.json && (h = !0, l.accept || l.Accept || (l.Accept = "application/json"), "GET" !== c && "HEAD" !== c && (l["content-type"] || l["Content-Type"] || (l["Content-Type"] = "application/json"), f = JSON.stringify(!0 === e.json ? f : e.json))), n.onreadystatechange = readystatechange, n.onload = loadFunc, n.onerror = errorFunc, n.onprogress = function() {}, n.onabort = function() {
              a = !0
          }, n.ontimeout = errorFunc, n.open(c, u, !p, e.username, e.password), p || (n.withCredentials = !!e.withCredentials), !p && e.timeout > 0 && (s = setTimeout(function() {
              if (!a) {
                  a = !0, n.abort("timeout");
                  var e = new Error("XMLHttpRequest timeout");
                  e.code = "ETIMEDOUT", errorFunc(e)
              }
          }, e.timeout)), n.setRequestHeader)
          for (o in l) l.hasOwnProperty(o) && n.setRequestHeader(o, l[o]);
      else if (e.headers && !isEmpty(e.headers)) throw new Error("Headers cannot be set on an XDomainRequest object");
      return "responseType" in e && (n.responseType = e.responseType), "beforeSend" in e && "function" === typeof e.beforeSend && e.beforeSend(n), n.send(f || null), n
  }

  function getXml(e) {
      try {
          if ("document" === e.responseType) return e.responseXML;
          var t = e.responseXML && "parsererror" === e.responseXML.documentElement.nodeName;
          if ("" === e.responseType && !t) return e.responseXML
      } catch (e) {}
      return null
  }

  function noop() {}
  var n = r(42),
      o = r(3),
      i = r(43),
      a = r(13);
  e.exports = createXHR, createXHR.XMLHttpRequest = n.XMLHttpRequest || noop, createXHR.XDomainRequest = "withCredentials" in new createXHR.XMLHttpRequest ? createXHR.XMLHttpRequest : n.XDomainRequest,
      function(e, t) {
          for (var r = 0; r < e.length; r++) t(e[r])
      }(["get", "put", "post", "patch", "head", "delete"], function(e) {
          createXHR["delete" === e ? "del" : e] = function(t, r, n) {
              return r = initParams(t, r, n), r.method = e.toUpperCase(), _createXHR(r)
          }
      })
}, function(e, t, r) {
  (function(t) {
      var r;
      r = "undefined" !== typeof window ? window : "undefined" !== typeof t ? t : "undefined" !== typeof self ? self : {}, e.exports = r
  }).call(t, r(1))
}, function(e, t, r) {
  var n = r(44),
      o = r(45),
      i = function(e) {
          return "[object Array]" === Object.prototype.toString.call(e)
      };
  e.exports = function(e) {
      if (!e) return {};
      var t = {};
      return o(n(e).split("\n"), function(e) {
          var r = e.indexOf(":"),
              o = n(e.slice(0, r)).toLowerCase(),
              a = n(e.slice(r + 1));
          "undefined" === typeof t[o] ? t[o] = a : i(t[o]) ? t[o].push(a) : t[o] = [t[o], a]
      }), t
  }
}, function(e, t) {
  function trim(e) {
      return e.replace(/^\s*|\s*$/g, "")
  }
  t = e.exports = trim, t.left = function(e) {
      return e.replace(/^\s*/, "")
  }, t.right = function(e) {
      return e.replace(/\s*$/, "")
  }
}, function(e, t, r) {
  function forEach(e, t, r) {
      if (!n(t)) throw new TypeError("iterator must be a function");
      arguments.length < 3 && (r = this), "[object Array]" === o.call(e) ? forEachArray(e, t, r) : "string" === typeof e ? forEachString(e, t, r) : forEachObject(e, t, r)
  }

  function forEachArray(e, t, r) {
      for (var n = 0, o = e.length; n < o; n++) i.call(e, n) && t.call(r, e[n], n, e)
  }

  function forEachString(e, t, r) {
      for (var n = 0, o = e.length; n < o; n++) t.call(r, e.charAt(n), n, e)
  }

  function forEachObject(e, t, r) {
      for (var n in e) i.call(e, n) && t.call(r, e[n], n, e)
  }
  var n = r(3);
  e.exports = forEach;
  var o = Object.prototype.toString,
      i = Object.prototype.hasOwnProperty
}, function(e, t) {
  function getResponse(e, t) {
      return t ? {
          statusCode: t.statusCode,
          headers: t.headers,
          method: e.method,
          url: e.url,
          rawRequest: t.rawRequest ? t.rawRequest : t
      } : null
  }
  e.exports = getResponse
}, function(e, t, r) {
  var n, o;
  ! function(i, a, s) {
      "undefined" !== typeof e && e.exports ? e.exports = s() : (n = s, void 0 !== (o = "function" === typeof n ? n.call(t, r, t, e) : n) && (e.exports = o))
  }(0, 0, function() {
      function normalize(e, t) {
          return e = e.replace(/:\//g, "://"), e = e.replace(/([^:\s])\/+/g, "$1/"), e = e.replace(/\/(\?|&|#[^!])/g, "$1"), e = e.replace(/(\?.+)\?/g, "$1&")
      }
      return function() {
          var e = arguments,
              t = {};
          return "object" === typeof arguments[0] && (e = arguments[0], t = arguments[1] || {}), normalize([].slice.call(e, 0).join("/"), t)
      }
  })
}, function(e, t, r) {
  "use strict";

  function createError(e) {
      var t = new Error(o[e] + " (" + e + ")");
      return t.statusCode = e, t
  }
  var n = r(49),
      o = r(50),
      i = r(15);
  e.exports = function(e) {
      return n("number" === typeof e, "expected http status number"), i(e) ? createError(e) : null
  }
}, function(e, t, r) {
  "use strict";
  e.exports = function(e, t) {
      if (!e) throw new Error(t || "Expected true, got " + e)
  }
}, function(e, t) {
  e.exports = {
      100: "Continue",
      101: "Switching Protocols",
      102: "Processing",
      200: "OK",
      201: "Created",
      202: "Accepted",
      203: "Non-Authoritative Information",
      204: "No Content",
      205: "Reset Content",
      206: "Partial Content",
      207: "Multi-Status",
      300: "Multiple Choices",
      301: "Moved Permanently",
      302: "Moved Temporarily",
      303: "See Other",
      304: "Not Modified",
      305: "Use Proxy",
      307: "Temporary Redirect",
      308: "Permanent Redirect",
      400: "Bad Request",
      401: "Unauthorized",
      402: "Payment Required",
      403: "Forbidden",
      404: "Not Found",
      405: "Method Not Allowed",
      406: "Not Acceptable",
      407: "Proxy Authentication Required",
      408: "Request Time-out",
      409: "Conflict",
      410: "Gone",
      411: "Length Required",
      412: "Precondition Failed",
      413: "Request Entity Too Large",
      414: "Request-URI Too Large",
      415: "Unsupported Media Type",
      416: "Requested Range Not Satisfiable",
      417: "Expectation Failed",
      418: "I'm a teapot",
      422: "Unprocessable Entity",
      423: "Locked",
      424: "Failed Dependency",
      425: "Unordered Collection",
      426: "Upgrade Required",
      428: "Precondition Required",
      429: "Too Many Requests",
      431: "Request Header Fields Too Large",
      500: "Internal Server Error",
      501: "Not Implemented",
      502: "Bad Gateway",
      503: "Service Unavailable",
      504: "Gateway Time-out",
      505: "HTTP Version Not Supported",
      506: "Variant Also Negotiates",
      507: "Insufficient Storage",
      509: "Bandwidth Limit Exceeded",
      510: "Not Extended",
      511: "Network Authentication Required"
  }
}, function(e, t) {
  function SafeParseCallback(e, t, r) {
      2 === arguments.length && (r = t, t = null);
      var n;
      try {
          n = JSON.parse(e, t)
      } catch (e) {
          return r(e)
      }
      r(null, n)
  }
  e.exports = SafeParseCallback
}, function(e, t, r) {
  "use strict";
  e.exports = function(e) {
      var t = typeof e;
      return null !== e && ("object" === t || "function" === t)
  }
}, function(e, t, r) {
  "use strict";
  var n = r(54),
      o = r(55),
      i = r(66);
  e.exports = i(o, n.stringify)
}, function(e, t, r) {
  "use strict";
  var n = r(10);
  t.extract = function(e) {
      return e.split("?")[1] || ""
  }, t.parse = function(e) {
      return "string" !== typeof e ? {} : (e = e.trim().replace(/^(\?|#|&)/, ""), e ? e.split("&").reduce(function(e, t) {
          var r = t.replace(/\+/g, " ").split("="),
              n = r.shift(),
              o = r.length > 0 ? r.join("=") : void 0;
          return n = decodeURIComponent(n), o = void 0 === o ? null : decodeURIComponent(o), e.hasOwnProperty(n) ? Array.isArray(e[n]) ? e[n].push(o) : e[n] = [e[n], o] : e[n] = o, e
      }, {}) : {})
  }, t.stringify = function(e) {
      return e ? Object.keys(e).sort().map(function(t) {
          var r = e[t];
          return void 0 === r ? "" : null === r ? t : Array.isArray(r) ? r.slice().sort().map(function(e) {
              return n(t) + "=" + n(e)
          }).join("&") : n(t) + "=" + n(r)
      }).filter(function(e) {
          return e.length > 0
      }).join("&") : ""
  }
}, function(e, t, r) {
  "use strict";

  function format(e) {
      return o(e, function(e, t, r) {
          var o = n(t) ? flatten : a;
          return s(e, o(r, t))
      }, {})
  }

  function flatten(e, t) {
      return i(t, function(t, r) {
          return [e + "[" + t + "]", u(r)]
      })
  }
  var n = r(56),
      o = r(57),
      i = r(60),
      a = r(61),
      s = r(14),
      u = r(62);
  e.exports = function(e) {
      return n(e) ? format(e) : e
  }
}, function(e, t, r) {
  "use strict";
  var n = Object.prototype.toString;
  e.exports = function(e) {
      var t;
      return "[object Object]" === n.call(e) && (null === (t = Object.getPrototypeOf(e)) || t === Object.getPrototypeOf({}))
  }
}, function(e, t, r) {
  "use strict";
  var n = r(58);
  e.exports = function(e, t, r, o) {
      var i = arguments.length > 2;
      return !e || Object.keys(e).length || i ? (n(e, function(e, n, a) {
          i ? r = t.call(o, r, e, n, a) : (r = e, i = !0)
      }), r) : null
  }
}, function(e, t, r) {
  "use strict";
  var n = r(59),
      o = Object.prototype.hasOwnProperty;
  e.exports = function(e, t, r) {
      n(e, function(n, i) {
          if (o.call(e, i)) return t.call(r, e[i], i, e)
      })
  }
}, function(e, t, r) {
  "use strict";
  e.exports = function(e, t, r) {
      for (var n in e)
          if (!1 === t.call(r, e[n], n, e)) break
  }
}, function(e, t, r) {
  "use strict";
  e.exports = function(e, t) {
      for (var r = {}, n = Object.keys(e), o = 0; o < n.length; o++) {
          var i = n[o],
              a = t(i, e[i], e);
          r[a[0]] = a[1]
      }
      return r
  }
}, function(e, t, r) {
  "use strict";
  e.exports = function(e, t) {
      var r = {};
      return r[e] = t, r
  }
}, function(e, t, r) {
  "use strict";

  function isJson(e) {
      return n(e) || Array.isArray(e)
  }

  function stringify(e) {
      return o(e, null, "")
  }
  var n = r(63),
      o = r(65);
  e.exports = function(e) {
      var t = isJson(e) ? stringify : String;
      return t(e)
  }
}, function(e, t, r) {
  "use strict";
  var n = r(64);
  e.exports = function(e) {
      return null != e && "object" === typeof e && !n(e)
  }
}, function(e, t) {
  e.exports = Array.isArray || function(e) {
      return "[object Array]" == Object.prototype.toString.call(e)
  }
}, function(e, t) {
  function stringify(e, t, r, n) {
      return JSON.stringify(e, serializer(t, n), r)
  }

  function serializer(e, t) {
      var r = [],
          n = [];
      return null == t && (t = function(e, t) {
              return r[0] === t ? "[Circular ~]" : "[Circular ~." + n.slice(0, r.indexOf(t)).join(".") + "]"
          }),
          function(o, i) {
              if (r.length > 0) {
                  var a = r.indexOf(this);
                  ~a ? r.splice(a + 1) : r.push(this), ~a ? n.splice(a, 1 / 0, o) : n.push(o), ~r.indexOf(i) && (i = t.call(this, o, i))
              } else r.push(i);
              return null == e ? i : e.call(this, o, i)
          }
  }
  t = e.exports = stringify, t.getSerialize = serializer
}, function(e, t, r) {
  "use strict";

  function valuePipe(e) {
      if (!e) throw new TypeError("At least one function is required");
      return Array.isArray(e) || (e = Array.prototype.slice.call(arguments)),
          function(t) {
              for (var r = 0; r < e.length; r++) t = e[r](t);
              return t
          }
  }
  e.exports = valuePipe
}, function(e, t, r) {
  "use strict";

  function _asyncToGenerator(e) {
      return function() {
          var t = e.apply(this, arguments);
          return new Promise(function(e, r) {
              function step(n, o) {
                  try {
                      var i = t[n](o),
                          a = i.value
                  } catch (e) {
                      return void r(e)
                  }
                  if (!i.done) return Promise.resolve(a).then(function(e) {
                      step("next", e)
                  }, function(e) {
                      step("throw", e)
                  });
                  e(a)
              }
              return step("next")
          })
      }
  }

  function getTokenInternal() {
      return "undefined" !== typeof localStorage && localStorage.authorization ? localStorage.authorization : null
  }
  r.d(t, "a", function() {
      return c
  });
  var n = r(0),
      o = r.n(n),
      i = r(8),
      a = r.n(i),
      s = (r(68), !1),
      u = !0,
      c = function() {
          var e = _asyncToGenerator(o.a.mark(function _callee() {
              var e;
              return o.a.wrap(function(t) {
                  for (;;) switch (t.prev = t.next) {
                      case 0:
                          if (e = getTokenInternal()) {
                              t.next = 11;
                              break
                          }
                          return t.prev = 2, t.next = 5, a.a.getItem("authorization");
                      case 5:
                          e = t.sent, t.next = 11;
                          break;
                      case 8:
                          t.prev = 8, t.t0 = t.catch(2), u = !1;
                      case 11:
                          if (!e) {
                              t.next = 16;
                              break
                          }
                          if (s = !0, !u) {
                              t.next = 16;
                              break
                          }
                          return t.next = 16, a.a.setItem("authorization", e);
                      case 16:
                          return t.abrupt("return", e);
                      case 17:
                      case "end":
                          return t.stop()
                  }
              }, _callee, this, [
                  [2, 8]
              ])
          }));
          return function() {
              return e.apply(this, arguments)
          }
      }()
}, function(e, t, r) {
  "use strict";

  function _asyncToGenerator(e) {
      return function() {
          var t = e.apply(this, arguments);
          return new Promise(function(e, r) {
              function step(n, o) {
                  try {
                      var i = t[n](o),
                          a = i.value
                  } catch (e) {
                      return void r(e)
                  }
                  if (!i.done) return Promise.resolve(a).then(function(e) {
                      step("next", e)
                  }, function(e) {
                      step("throw", e)
                  });
                  e(a)
              }
              return step("next")
          })
      }
  }
  var n = r(0),
      o = r.n(n),
      i = r(12),
      a = r.n(i),
      s = r(16),
      u = r.n(s),
      c = r(17),
      f = r(18),
      l = a()();
  l.configure({
      baseUrl: f.d,
      parse: JSON.parse
  });
  var p = function() {
      var e = _asyncToGenerator(o.a.mark(function _callee(e, t) {
          return o.a.wrap(function(r) {
              for (;;) switch (r.prev = r.next) {
                  case 0:
                      return r.abrupt("return", new Promise(function(r, n) {
                          l.post(e, {
                              body: u.a.stringify(t),
                              headers: {
                                  "Content-Type": "application/x-www-form-urlencoded"
                              }
                          }, Object(c.a)(r, n))
                      }));
                  case 1:
                  case "end":
                      return r.stop()
              }
          }, _callee, this)
      }));
      return function(t, r) {
          return e.apply(this, arguments)
      }
  }();
  (function() {
      var e = _asyncToGenerator(o.a.mark(function _callee2(e) {
          var t;
          return o.a.wrap(function(r) {
              for (;;) switch (r.prev = r.next) {
                  case 0:
                      return t = {
                          code: e,
                          client_id: f.b,
                          client_secret: f.c,
                          redirect_uri: f.e,
                          grant_type: "authorization_code"
                      }, r.abrupt("return", p("oauth2/v4/token/", t));
                  case 2:
                  case "end":
                      return r.stop()
              }
          }, _callee2, this)
      }))
  })(),
  function() {
      var e = _asyncToGenerator(o.a.mark(function _callee3(e, t) {
          var r, n, i;
          return o.a.wrap(function(o) {
              for (;;) switch (o.prev = o.next) {
                  case 0:
                      return r = a()(), r.configure({
                          baseUrl: f.a
                      }), n = new Promise(function(n, o) {
                          r.post("auth/", {
                              body: u.a.stringify({
                                  access_token: e,
                                  id_token: t
                              }),
                              headers: {
                                  "Content-Type": "application/x-www-form-urlencoded"
                              }
                          }, Object(c.a)(n, o))
                      }), o.next = 5, n;
                  case 5:
                      i = o.sent, localStorage.authorization = JSON.parse(i).access_token;
                  case 7:
                  case "end":
                      return o.stop()
              }
          }, _callee3, this)
      }))
  }()
}, function(e, t, r) {
  (function(t) {
      var n, o = "undefined" !== typeof t ? t : "undefined" !== typeof window ? window : {},
          i = r(70);
      "undefined" !== typeof document ? n = document : (n = o["__GLOBAL_DOCUMENT_CACHE@4"]) || (n = o["__GLOBAL_DOCUMENT_CACHE@4"] = i), e.exports = n
  }).call(t, r(1))
}, function(e, t) {}, function(e, t, r) {
  "use strict";
  r.d(t, "a", function() {
      return o
  });
  var n = r(72),
      o = n.object().keys({
          canonical_segment_name: n.string().required(),
          offset_nanos_part: n.number().required(),
          offset_millis: n.number().required(),
          start_time_utc_millis: n.number().required(),
          end_time_utc_millis: n.number().required(),
          type: n.string().required(),
          data: n.object().keys({
              reason: n.string().required(),
              comment: n.string().allow("").optional()
          })
      })
}, function(e, t, r) {
  ! function(t, r) {
      e.exports = r()
  }(0, function() {
      return function(e) {
          function __webpack_require__(r) {
              if (t[r]) return t[r].exports;
              var n = t[r] = {
                  i: r,
                  l: !1,
                  exports: {}
              };
              return e[r].call(n.exports, n, n.exports, __webpack_require__), n.l = !0, n.exports
          }
          var t = {};
          return __webpack_require__.m = e, __webpack_require__.c = t, __webpack_require__.i = function(e) {
              return e
          }, __webpack_require__.d = function(e, t, r) {
              __webpack_require__.o(e, t) || Object.defineProperty(e, t, {
                  configurable: !1,
                  enumerable: !0,
                  get: r
              })
          }, __webpack_require__.n = function(e) {
              var t = e && e.__esModule ? function() {
                  return e.default
              } : function() {
                  return e
              };
              return __webpack_require__.d(t, "a", t), t
          }, __webpack_require__.o = function(e, t) {
              return Object.prototype.hasOwnProperty.call(e, t)
          }, __webpack_require__.p = "", __webpack_require__(__webpack_require__.s = 32)
      }([function(e, t, r) {
          "use strict";
          (function(e, n) {
              var o = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function(e) {
                      return typeof e
                  } : function(e) {
                      return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                  },
                  i = r(17),
                  a = r(15),
                  s = r(37),
                  u = r(16),
                  c = r(18),
                  f = {};
              t.clone = function(r, n) {
                  if ("object" !== ("undefined" === typeof r ? "undefined" : o(r)) || null === r) return r;
                  n = n || new Map;
                  var i = n.get(r);
                  if (i) return i;
                  var a = void 0,
                      s = !1;
                  if (Array.isArray(r)) a = [], s = !0;
                  else if (e.isBuffer(r)) a = e.from(r);
                  else if (r instanceof Date) a = new Date(r.getTime());
                  else if (r instanceof RegExp) a = new RegExp(r);
                  else {
                      var u = Object.getPrototypeOf(r);
                      u && u.isImmutable ? a = r : (a = Object.create(u), s = !0)
                  }
                  if (n.set(r, a), s)
                      for (var c = Object.getOwnPropertyNames(r), f = 0; f < c.length; ++f) {
                          var l = c[f],
                              p = Object.getOwnPropertyDescriptor(r, l);
                          p && (p.get || p.set) ? Object.defineProperty(a, l, p) : a[l] = t.clone(r[l], n)
                      }
                  return a
              }, t.merge = function(r, n, i, a) {
                  if (t.assert(r && "object" === ("undefined" === typeof r ? "undefined" : o(r)), "Invalid target value: must be an object"), t.assert(null === n || void 0 === n || "object" === ("undefined" === typeof n ? "undefined" : o(n)), "Invalid source value: must be null, undefined, or an object"), !n) return r;
                  if (Array.isArray(n)) {
                      t.assert(Array.isArray(r), "Cannot merge array onto an object"), !1 === a && (r.length = 0);
                      for (var s = 0; s < n.length; ++s) r.push(t.clone(n[s]));
                      return r
                  }
                  for (var u = Object.keys(n), c = 0; c < u.length; ++c) {
                      var f = u[c];
                      if ("__proto__" !== f) {
                          var l = n[f];
                          l && "object" === ("undefined" === typeof l ? "undefined" : o(l)) ? !r[f] || "object" !== o(r[f]) || Array.isArray(r[f]) !== Array.isArray(l) || l instanceof Date || e.isBuffer(l) || l instanceof RegExp ? r[f] = t.clone(l) : t.merge(r[f], l, i, a) : null !== l && void 0 !== l ? r[f] = l : !1 !== i && (r[f] = l)
                      }
                  }
                  return r
              }, t.applyToDefaults = function(e, r, n) {
                  if (t.assert(e && "object" === ("undefined" === typeof e ? "undefined" : o(e)), "Invalid defaults value: must be an object"), t.assert(!r || !0 === r || "object" === ("undefined" === typeof r ? "undefined" : o(r)), "Invalid options value: must be true, falsy or an object"), !r) return null;
                  var i = t.clone(e);
                  return !0 === r ? i : t.merge(i, r, !0 === n, !1)
              }, t.cloneWithShallow = function(e, r) {
                  if (!e || "object" !== ("undefined" === typeof e ? "undefined" : o(e))) return e;
                  var n = f.store(e, r),
                      i = t.clone(e);
                  return f.restore(i, e, n), i
              }, f.store = function(e, r) {
                  for (var n = {}, o = 0; o < r.length; ++o) {
                      var i = r[o],
                          a = t.reach(e, i);
                      void 0 !== a && (n[i] = a, f.reachSet(e, i, void 0))
                  }
                  return n
              }, f.restore = function(e, t, r) {
                  for (var n = Object.keys(r), o = 0; o < n.length; ++o) {
                      var i = n[o];
                      f.reachSet(e, i, r[i]), f.reachSet(t, i, r[i])
                  }
              }, f.reachSet = function(e, t, r) {
                  for (var n = t.split("."), o = e, i = 0; i < n.length; ++i) {
                      var a = n[i];
                      i + 1 === n.length && (o[a] = r), o = o[a]
                  }
              }, t.applyToDefaultsWithShallow = function(e, r, n) {
                  if (t.assert(e && "object" === ("undefined" === typeof e ? "undefined" : o(e)), "Invalid defaults value: must be an object"), t.assert(!r || !0 === r || "object" === ("undefined" === typeof r ? "undefined" : o(r)), "Invalid options value: must be true, falsy or an object"), t.assert(n && Array.isArray(n), "Invalid keys"), !r) return null;
                  var i = t.cloneWithShallow(e, n);
                  if (!0 === r) return i;
                  var a = f.store(r, n);
                  return t.merge(i, r, !1, !1), f.restore(i, r, a), i
              }, t.deepEqual = function(r, n, i, a) {
                  i = i || {
                      prototype: !0
                  };
                  var s = "undefined" === typeof r ? "undefined" : o(r);
                  if (s !== ("undefined" === typeof n ? "undefined" : o(n))) return !1;
                  if ("object" !== s || null === r || null === n) return r === n ? 0 !== r || 1 / r === 1 / n : r !== r && n !== n;
                  if (a = a || [], -1 !== a.indexOf(r)) return !0;
                  if (a.push(r), Array.isArray(r)) {
                      if (!Array.isArray(n)) return !1;
                      if (!i.part && r.length !== n.length) return !1;
                      for (var u = 0; u < r.length; ++u) {
                          if (i.part) {
                              for (var c = !1, f = 0; f < n.length; ++f)
                                  if (t.deepEqual(r[u], n[f], i)) {
                                      c = !0;
                                      break
                                  }
                              return c
                          }
                          if (!t.deepEqual(r[u], n[u], i)) return !1
                      }
                      return !0
                  }
                  if (e.isBuffer(r)) {
                      if (!e.isBuffer(n)) return !1;
                      if (r.length !== n.length) return !1;
                      for (var l = 0; l < r.length; ++l)
                          if (r[l] !== n[l]) return !1;
                      return !0
                  }
                  if (r instanceof Date) return n instanceof Date && r.getTime() === n.getTime();
                  if (r instanceof RegExp) return n instanceof RegExp && r.toString() === n.toString();
                  if (i.prototype && Object.getPrototypeOf(r) !== Object.getPrototypeOf(n)) return !1;
                  var p = Object.getOwnPropertyNames(r);
                  if (!i.part && p.length !== Object.getOwnPropertyNames(n).length) return !1;
                  for (var h = 0; h < p.length; ++h) {
                      var d = p[h],
                          y = Object.getOwnPropertyDescriptor(r, d);
                      if (y.get) {
                          if (!t.deepEqual(y, Object.getOwnPropertyDescriptor(n, d), i, a)) return !1
                      } else if (!t.deepEqual(r[d], n[d], i, a)) return !1
                  }
                  return !0
              }, t.unique = function(e, t) {
                  var r = void 0;
                  if (t) {
                      r = [];
                      var n = new Set;
                      e.forEach(function(e) {
                          var o = e[t];
                          n.has(o) || (n.add(o), r.push(e))
                      })
                  } else r = Array.from(new Set(e));
                  return r
              }, t.mapToObject = function(e, t) {
                  if (!e) return null;
                  for (var r = {}, n = 0; n < e.length; ++n) t ? e[n][t] && (r[e[n][t]] = !0) : r[e[n]] = !0;
                  return r
              }, t.intersect = function(e, r, n) {
                  if (!e || !r) return [];
                  for (var o = [], i = Array.isArray(e) ? t.mapToObject(e) : e, a = {}, s = 0; s < r.length; ++s)
                      if (i[r[s]] && !a[r[s]]) {
                          if (n) return r[s];
                          o.push(r[s]), a[r[s]] = !0
                      }
                  return n ? null : o
              }, t.contain = function(e, r, n) {
                  var i = null;
                  "object" !== ("undefined" === typeof e ? "undefined" : o(e)) || "object" !== ("undefined" === typeof r ? "undefined" : o(r)) || Array.isArray(e) || Array.isArray(r) ? r = [].concat(r) : (i = r, r = Object.keys(r)), n = n || {}, t.assert("string" === typeof e || "object" === ("undefined" === typeof e ? "undefined" : o(e)), "Reference must be string or an object"), t.assert(r.length, "Values array cannot be empty");
                  var a = void 0,
                      s = void 0;
                  if (n.deep) {
                      a = t.deepEqual;
                      var u = n.hasOwnProperty("only"),
                          c = n.hasOwnProperty("part");
                      s = {
                          prototype: u ? n.only : !!c && !n.part,
                          part: u ? !n.only : !c || n.part
                      }
                  } else a = function(e, t) {
                      return e === t
                  };
                  for (var f = !1, l = new Array(r.length), p = 0; p < l.length; ++p) l[p] = 0;
                  if ("string" === typeof e) {
                      for (var h = "(", d = 0; d < r.length; ++d) {
                          var y = r[d];
                          t.assert("string" === typeof y, "Cannot compare string reference to non-string value"), h += (d ? "|" : "") + t.escapeRegex(y)
                      }
                      var g = new RegExp(h + ")", "g");
                      f = !!e.replace(g, function(e, t) {
                          var n = r.indexOf(t);
                          return ++l[n], ""
                      })
                  } else if (Array.isArray(e))
                      for (var v = 0; v < e.length; ++v) {
                          for (var m = !1, b = 0; b < r.length && !1 === m; ++b) m = a(r[b], e[v], s) && b;
                          !1 !== m ? ++l[m] : f = !0
                      } else
                          for (var _ = Object.getOwnPropertyNames(e), w = 0; w < _.length; ++w) {
                              var E = _[w],
                                  x = r.indexOf(E);
                              if (-1 !== x) {
                                  if (i && !a(i[E], e[E], s)) return !1;
                                  ++l[x]
                              } else f = !0
                          }
                  for (var S = !1, k = 0; k < l.length; ++k)
                      if (S = S || !!l[k], n.once && l[k] > 1 || !n.part && !l[k]) return !1;
                  return (!n.only || !f) && S
              }, t.flatten = function(e, r) {
                  for (var n = r || [], o = 0; o < e.length; ++o) Array.isArray(e[o]) ? t.flatten(e[o], n) : n.push(e[o]);
                  return n
              }, t.reach = function(e, r, n) {
                  if (!1 === r || null === r || "undefined" === typeof r) return e;
                  "string" === typeof(n = n || {}) && (n = {
                      separator: n
                  });
                  for (var i = r.split(n.separator || "."), a = e, s = 0; s < i.length; ++s) {
                      var u = i[s];
                      if ("-" === u[0] && Array.isArray(a) && (u = u.slice(1, u.length), u = a.length - u), !a || "object" !== ("undefined" === typeof a ? "undefined" : o(a)) && "function" !== typeof a || !(u in a) || "object" !== ("undefined" === typeof a ? "undefined" : o(a)) && !1 === n.functions) {
                          t.assert(!n.strict || s + 1 === i.length, "Missing segment", u, "in reach path ", r), t.assert("object" === ("undefined" === typeof a ? "undefined" : o(a)) || !0 === n.functions || "function" !== typeof a, "Invalid segment", u, "in reach path ", r), a = n.default;
                          break
                      }
                      a = a[u]
                  }
                  return a
              }, t.reachTemplate = function(e, r, n) {
                  return r.replace(/{([^}]+)}/g, function(r, o) {
                      var i = t.reach(e, o, n);
                      return void 0 === i || null === i ? "" : i
                  })
              }, t.formatStack = function(e) {
                  for (var t = [], r = 0; r < e.length; ++r) {
                      var n = e[r];
                      t.push([n.getFileName(), n.getLineNumber(), n.getColumnNumber(), n.getFunctionName(), n.isConstructor()])
                  }
                  return t
              }, t.formatTrace = function(e) {
                  for (var t = [], r = 0; r < e.length; ++r) {
                      var n = e[r];
                      t.push((n[4] ? "new " : "") + n[3] + " (" + n[0] + ":" + n[1] + ":" + n[2] + ")")
                  }
                  return t
              }, t.callStack = function(e) {
                  var r = Error.prepareStackTrace;
                  Error.prepareStackTrace = function(e, t) {
                      return t
                  };
                  var n = {};
                  Error.captureStackTrace(n, this);
                  var o = n.stack;
                  return Error.prepareStackTrace = r, t.formatStack(o).slice(1 + e)
              }, t.displayStack = function(e) {
                  var r = t.callStack(void 0 === e ? 1 : e + 1);
                  return t.formatTrace(r)
              }, t.abortThrow = !1, t.abort = function(e, r) {
                  if ("test" === n.env.NODE_ENV || !0 === t.abortThrow) throw new Error(e || "Unknown error");
                  var o = "";
                  r || (o = t.displayStack(1).join("\n\t")), console.log("ABORT: " + e + "\n\t" + o), n.exit(1)
              }, t.assert = function(e) {
                  if (!e) {
                      for (var r = arguments.length, n = Array(r > 1 ? r - 1 : 0), o = 1; o < r; o++) n[o - 1] = arguments[o];
                      if (1 === n.length && n[0] instanceof Error) throw n[0];
                      var a = n.filter(function(e) {
                          return "" !== e
                      }).map(function(e) {
                          return "string" === typeof e ? e : e instanceof Error ? e.message : t.stringify(e)
                      });
                      throw new i.AssertionError({
                          message: a.join(" ") || "Unknown error",
                          actual: !1,
                          expected: !0,
                          operator: "==",
                          stackStartFunction: t.assert
                      })
                  }
              }, t.Bench = function() {
                  this.ts = 0, this.reset()
              }, t.Bench.prototype.reset = function() {
                  this.ts = t.Bench.now()
              }, t.Bench.prototype.elapsed = function() {
                  return t.Bench.now() - this.ts
              }, t.Bench.now = function() {
                  var e = n.hrtime();
                  return 1e3 * e[0] + e[1] / 1e6
              }, t.escapeRegex = function(e) {
                  return e.replace(/[\^\$\.\*\+\-\?\=\!\:\|\\\/\(\)\[\]\{\}\,]/g, "\\$&")
              }, t.base64urlEncode = function(r, n) {
                  return t.assert("string" === typeof r || e.isBuffer(r), "value must be string or buffer"), (e.isBuffer(r) ? r : e.from(r, n || "binary")).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/\=/g, "")
              }, t.base64urlDecode = function(t, r) {
                  if ("string" !== typeof t) throw new Error("Value not a string");
                  if (!/^[\w\-]*$/.test(t)) throw new Error("Invalid character");
                  var n = e.from(t, "base64");
                  return "buffer" === r ? n : n.toString(r || "binary")
              }, t.escapeHeaderAttribute = function(e) {
                  return t.assert(/^[ \w\!#\$%&'\(\)\*\+,\-\.\/\:;<\=>\?@\[\]\^`\{\|\}~\"\\]*$/.test(e), "Bad attribute value (" + e + ")"), e.replace(/\\/g, "\\\\").replace(/\"/g, '\\"')
              }, t.escapeHtml = function(e) {
                  return c.escapeHtml(e)
              }, t.escapeJavaScript = function(e) {
                  return c.escapeJavaScript(e)
              }, t.escapeJson = function(e) {
                  return c.escapeJson(e)
              }, t.once = function(e) {
                  if (e._hoekOnce) return e;
                  var t = !1,
                      r = function() {
                          if (!t) {
                              t = !0;
                              for (var r = arguments.length, n = Array(r), o = 0; o < r; o++) n[o] = arguments[o];
                              e.apply(null, n)
                          }
                      };
                  return r._hoekOnce = !0, r
              }, t.isInteger = Number.isSafeInteger, t.ignore = function() {}, t.inherits = u.inherits, t.format = u.format, t.transform = function(e, r, n) {
                  t.assert(null === e || void 0 === e || "object" === ("undefined" === typeof e ? "undefined" : o(e)) || Array.isArray(e), "Invalid source object: must be null, undefined, an object, or an array");
                  var i = "object" === ("undefined" === typeof n ? "undefined" : o(n)) && null !== n ? n.separator || "." : ".";
                  if (Array.isArray(e)) {
                      for (var a = [], s = 0; s < e.length; ++s) a.push(t.transform(e[s], r, n));
                      return a
                  }
                  for (var u = {}, c = Object.keys(r), f = 0; f < c.length; ++f) {
                      var l = c[f],
                          p = l.split(i),
                          h = r[l];
                      t.assert("string" === typeof h, 'All mappings must be "." delineated strings');
                      for (var d = void 0, y = u; p.length > 1;) d = p.shift(), y[d] || (y[d] = {}), y = y[d];
                      d = p.shift(), y[d] = t.reach(e, h, n)
                  }
                  return u
              }, t.uniqueFilename = function(e, t) {
                  t = t ? "." !== t[0] ? "." + t : t : "", e = s.resolve(e);
                  var r = [Date.now(), n.pid, a.randomBytes(8).toString("hex")].join("-") + t;
                  return s.join(e, r)
              }, t.stringify = function() {
                  try {
                      for (var e = arguments.length, t = Array(e), r = 0; r < e; r++) t[r] = arguments[r];
                      return JSON.stringify.apply(null, t)
                  } catch (e) {
                      return "[Cannot display object: " + e.message + "]"
                  }
              }, t.shallow = function(e) {
                  for (var t = {}, r = Object.keys(e), n = 0; n < r.length; ++n) {
                      var o = r[n];
                      t[o] = e[o]
                  }
                  return t
              }, t.wait = function(e) {
                  return new Promise(function(t) {
                      return setTimeout(t, e)
                  })
              }, t.block = function() {
                  return new Promise(t.ignore)
              }
          }).call(t, r(3).Buffer, r(7))
      }, function(e, t, r) {
          "use strict";
          var n = r(0);
          t.create = function(e, t) {
              n.assert("string" === typeof e, "Invalid reference key:", e);
              var r = n.clone(t),
                  o = function ref(e, t) {
                      return n.reach(ref.isContext ? t.context : e, ref.key, r)
                  };
              return o.isContext = e[0] === (r && r.contextPrefix || "$"), o.key = o.isContext ? e.slice(1) : e, o.path = o.key.split(r && r.separator || "."), o.depth = o.path.length, o.root = o.path[0], o.isJoi = !0, o.toString = function() {
                  return (o.isContext ? "context:" : "ref:") + o.key
              }, o
          }, t.isRef = function(e) {
              return "function" === typeof e && e.isJoi
          }, t.push = function(e, r) {
              t.isRef(r) && !r.isContext && e.push(r.root)
          }
      }, function(e, t, r) {
          "use strict";

          function _classCallCheck(e, t) {
              if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
          }
          var n = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function(e) {
                  return typeof e
              } : function(e) {
                  return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
              },
              o = function() {
                  function defineProperties(e, t) {
                      for (var r = 0; r < t.length; r++) {
                          var n = t[r];
                          n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                      }
                  }
                  return function(e, t, r) {
                      return t && defineProperties(e.prototype, t), r && defineProperties(e, r), e
                  }
              }(),
              i = r(0),
              a = r(11),
              s = r(1),
              u = r(6),
              c = null,
              f = null,
              l = {
                  Set: r(9)
              };
          l.defaults = {
              abortEarly: !0,
              convert: !0,
              allowUnknown: !1,
              skipFunctions: !1,
              stripUnknown: !1,
              language: {},
              presence: "optional",
              strip: !1,
              noDefaults: !1,
              escapeHtml: !1
          }, e.exports = l.Any = function() {
              function _class() {
                  _classCallCheck(this, _class), f = f || r(4), this.isJoi = !0, this._type = "any", this._settings = null, this._valids = new l.Set, this._invalids = new l.Set, this._tests = [], this._refs = [], this._flags = {}, this._description = null, this._unit = null, this._notes = [], this._tags = [], this._examples = [], this._meta = [], this._inner = {}
              }
              return _class.prototype._init = function() {
                  return this
              }, _class.prototype.createError = function(e, t, r, n) {
                  var o = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : this._flags;
                  return u.create(e, t, r, n, o)
              }, _class.prototype.createOverrideError = function(e, t, r, n, o, i) {
                  return u.create(e, t, r, n, this._flags, o, i)
              }, _class.prototype.checkOptions = function(e) {
                  var t = r(21),
                      n = t.options.validate(e);
                  if (n.error) throw new Error(n.error.details[0].message)
              }, _class.prototype.clone = function() {
                  var e = Object.create(Object.getPrototypeOf(this));
                  e.isJoi = !0, e._currentJoi = this._currentJoi, e._type = this._type, e._settings = this._settings, e._baseType = this._baseType, e._valids = this._valids.slice(), e._invalids = this._invalids.slice(), e._tests = this._tests.slice(), e._refs = this._refs.slice(), e._flags = i.clone(this._flags), e._description = this._description, e._unit = this._unit, e._notes = this._notes.slice(), e._tags = this._tags.slice(), e._examples = this._examples.slice(), e._meta = this._meta.slice(), e._inner = {};
                  for (var t = Object.keys(this._inner), r = 0; r < t.length; ++r) {
                      var n = t[r];
                      e._inner[n] = this._inner[n] ? this._inner[n].slice() : null
                  }
                  return e
              }, _class.prototype.concat = function(e) {
                  i.assert(e instanceof l.Any, "Invalid schema object"), i.assert("any" === this._type || "any" === e._type || e._type === this._type, "Cannot merge type", this._type, "with another type:", e._type);
                  var t = this.clone();
                  if ("any" === this._type && "any" !== e._type) {
                      for (var r = e.clone(), n = ["_settings", "_valids", "_invalids", "_tests", "_refs", "_flags", "_description", "_unit", "_notes", "_tags", "_examples", "_meta", "_inner"], o = 0; o < n.length; ++o) r[n[o]] = t[n[o]];
                      t = r
                  }
                  t._settings = t._settings ? a.concat(t._settings, e._settings) : e._settings, t._valids.merge(e._valids, e._invalids), t._invalids.merge(e._invalids, e._valids), t._tests = t._tests.concat(e._tests), t._refs = t._refs.concat(e._refs), i.merge(t._flags, e._flags), t._description = e._description || t._description, t._unit = e._unit || t._unit, t._notes = t._notes.concat(e._notes), t._tags = t._tags.concat(e._tags), t._examples = t._examples.concat(e._examples), t._meta = t._meta.concat(e._meta);
                  for (var s = Object.keys(e._inner), u = "object" === t._type, c = 0; c < s.length; ++c) {
                      var f = s[c],
                          p = e._inner[f];
                      if (p) {
                          var h = t._inner[f];
                          if (h)
                              if (u && "children" === f) {
                                  for (var d = {}, y = 0; y < h.length; ++y) d[h[y].key] = y;
                                  for (var g = 0; g < p.length; ++g) {
                                      var v = p[g].key;
                                      d[v] >= 0 ? h[d[v]] = {
                                          key: v,
                                          schema: h[d[v]].schema.concat(p[g].schema)
                                      } : h.push(p[g])
                                  }
                              } else t._inner[f] = t._inner[f].concat(p);
                          else t._inner[f] = p.slice()
                      }
                  }
                  return t
              }, _class.prototype._test = function(e, t, r, n) {
                  var o = this.clone();
                  return o._tests.push({
                      func: r,
                      name: e,
                      arg: t,
                      options: n
                  }), o
              }, _class.prototype.options = function(e) {
                  i.assert(!e.context, "Cannot override context"), this.checkOptions(e);
                  var t = this.clone();
                  return t._settings = a.concat(t._settings, e), t
              }, _class.prototype.strict = function(e) {
                  var t = this.clone(),
                      r = void 0 !== e && !e;
                  return t._settings = a.concat(t._settings, {
                      convert: r
                  }), t
              }, _class.prototype.raw = function(e) {
                  var t = void 0 === e || e;
                  if (this._flags.raw === t) return this;
                  var r = this.clone();
                  return r._flags.raw = t, r
              }, _class.prototype.error = function(e) {
                  i.assert(e && (e instanceof Error || "function" === typeof e), "Must provide a valid Error object or a function");
                  var t = this.clone();
                  return t._flags.error = e, t
              }, _class.prototype.allow = function() {
                  for (var e = arguments.length, t = Array(e), r = 0; r < e; r++) t[r] = arguments[r];
                  var n = this.clone();
                  t = i.flatten(t);
                  for (var o = 0; o < t.length; ++o) {
                      var a = t[o];
                      i.assert(void 0 !== a, "Cannot call allow/valid/invalid with undefined"), n._invalids.remove(a), n._valids.add(a, n._refs)
                  }
                  return n
              }, _class.prototype.valid = function() {
                  var e = this.allow.apply(this, arguments);
                  return e._flags.allowOnly = !0, e
              }, _class.prototype.invalid = function() {
                  for (var e = arguments.length, t = Array(e), r = 0; r < e; r++) t[r] = arguments[r];
                  var n = this.clone();
                  t = i.flatten(t);
                  for (var o = 0; o < t.length; ++o) {
                      var a = t[o];
                      i.assert(void 0 !== a, "Cannot call allow/valid/invalid with undefined"), n._valids.remove(a), n._invalids.add(a, n._refs)
                  }
                  return n
              }, _class.prototype.required = function() {
                  if ("required" === this._flags.presence) return this;
                  var e = this.clone();
                  return e._flags.presence = "required", e
              }, _class.prototype.optional = function() {
                  if ("optional" === this._flags.presence) return this;
                  var e = this.clone();
                  return e._flags.presence = "optional", e
              }, _class.prototype.forbidden = function() {
                  if ("forbidden" === this._flags.presence) return this;
                  var e = this.clone();
                  return e._flags.presence = "forbidden", e
              }, _class.prototype.strip = function() {
                  if (this._flags.strip) return this;
                  var e = this.clone();
                  return e._flags.strip = !0, e
              }, _class.prototype.applyFunctionToChildren = function(e, t, r, n) {
                  if (e = [].concat(e), 1 !== e.length || "" !== e[0]) {
                      n = n ? n + "." : "";
                      var o = ("" === e[0] ? e.slice(1) : e).map(function(e) {
                          return n + e
                      });
                      throw new Error("unknown key(s) " + o.join(", "))
                  }
                  return this[t].apply(this, r)
              }, _class.prototype.default = function(e, t) {
                  "function" !== typeof e || s.isRef(e) || (!e.description && t && (e.description = t), this._flags.func || i.assert("string" === typeof e.description && e.description.length > 0, "description must be provided when default value is a function"));
                  var r = this.clone();
                  return r._flags.default = e, s.push(r._refs, e), r
              }, _class.prototype.empty = function(e) {
                  var t = this.clone();
                  return void 0 === e ? delete t._flags.empty : t._flags.empty = f.schema(this._currentJoi, e), t
              }, _class.prototype.when = function(e, t) {
                  i.assert(t && "object" === ("undefined" === typeof t ? "undefined" : n(t)), "Invalid options"), i.assert(void 0 !== t.then || void 0 !== t.otherwise, 'options must have at least one of "then" or "otherwise"');
                  var o = t.hasOwnProperty("then") ? this.concat(f.schema(this._currentJoi, t.then)) : void 0,
                      a = t.hasOwnProperty("otherwise") ? this.concat(f.schema(this._currentJoi, t.otherwise)) : void 0;
                  c = c || r(10);
                  var s = {
                      then: o,
                      otherwise: a
                  };
                  Object.prototype.hasOwnProperty.call(t, "is") && (s.is = t.is);
                  var u = c.when(e, s);
                  return u._flags.presence = "ignore", u._baseType = this, u
              }, _class.prototype.description = function(e) {
                  i.assert(e && "string" === typeof e, "Description must be a non-empty string");
                  var t = this.clone();
                  return t._description = e, t
              }, _class.prototype.notes = function(e) {
                  i.assert(e && ("string" === typeof e || Array.isArray(e)), "Notes must be a non-empty string or array");
                  var t = this.clone();
                  return t._notes = t._notes.concat(e), t
              }, _class.prototype.tags = function(e) {
                  i.assert(e && ("string" === typeof e || Array.isArray(e)), "Tags must be a non-empty string or array");
                  var t = this.clone();
                  return t._tags = t._tags.concat(e), t
              }, _class.prototype.meta = function(e) {
                  i.assert(void 0 !== e, "Meta cannot be undefined");
                  var t = this.clone();
                  return t._meta = t._meta.concat(e), t
              }, _class.prototype.example = function() {
                  i.assert(1 === arguments.length, "Missing example");
                  var e = arguments.length <= 0 ? void 0 : arguments[0],
                      t = this.clone();
                  return t._examples.push(e), t
              }, _class.prototype.unit = function(e) {
                  i.assert(e && "string" === typeof e, "Unit name must be a non-empty string");
                  var t = this.clone();
                  return t._unit = e, t
              }, _class.prototype._prepareEmptyValue = function(e) {
                  return "string" === typeof e && this._flags.trim ? e.trim() : e
              }, _class.prototype._validate = function(e, t, r, n) {
                  var o = this,
                      c = e;
                  t = t || {
                      key: "",
                      path: [],
                      parent: null,
                      reference: n
                  }, this._settings && (r = a.concat(r, this._settings));
                  var f = [],
                      p = function() {
                          var n = void 0;
                          if (void 0 !== e) n = o._flags.raw ? c : e;
                          else if (r.noDefaults) n = e;
                          else if (s.isRef(o._flags.default)) n = o._flags.default(t.parent, r);
                          else if ("function" !== typeof o._flags.default || o._flags.func && !o._flags.default.description) n = i.clone(o._flags.default);
                          else {
                              var a = void 0;
                              null !== t.parent && o._flags.default.length > 0 && (a = [i.clone(t.parent), r]);
                              var u = l._try(o._flags.default, a);
                              n = u.value, u.error && f.push(o.createError("any.default", {
                                  error: u.error
                              }, t, r))
                          }
                          if (f.length && "function" === typeof o._flags.error) {
                              var p = o._flags.error.call(o, f);
                              f = "string" === typeof p ? [o.createOverrideError("override", {
                                  reason: f
                              }, t, r, p)] : [].concat(p).map(function(e) {
                                  return e instanceof Error ? e : o.createOverrideError(e.type || "override", e.context, t, r, e.message, e.template)
                              })
                          }
                          return {
                              value: o._flags.strip ? void 0 : n,
                              finalValue: n,
                              errors: f.length ? f : null
                          }
                      };
                  if (this._coerce) {
                      var h = this._coerce.call(this, e, t, r);
                      if (h.errors) return e = h.value, f = f.concat(h.errors), p();
                      e = h.value
                  }
                  this._flags.empty && !this._flags.empty._validate(this._prepareEmptyValue(e), null, l.defaults).errors && (e = void 0);
                  var d = this._flags.presence || r.presence;
                  if ("optional" === d) {
                      if (void 0 === e) {
                          var y = this._flags.hasOwnProperty("default") && void 0 === this._flags.default;
                          if (!y || "object" !== this._type) return p();
                          e = {}
                      }
                  } else {
                      if ("required" === d && void 0 === e) return f.push(this.createError("any.required", null, t, r)), p();
                      if ("forbidden" === d) return void 0 === e ? p() : (f.push(this.createError("any.unknown", null, t, r)), p())
                  }
                  if (this._valids.has(e, t, r, this._flags.insensitive)) return p();
                  if (this._invalids.has(e, t, r, this._flags.insensitive) && (f.push(this.createError("" === e ? "any.empty" : "any.invalid", {
                          value: e,
                          invalids: this._invalids.values({
                              stripUndefined: !0
                          })
                      }, t, r)), r.abortEarly || void 0 === e)) return p();
                  if (this._base) {
                      var g = this._base.call(this, e, t, r);
                      if (g.errors) return e = g.value, f = f.concat(g.errors), p();
                      if (g.value !== e) {
                          if (e = g.value, this._valids.has(e, t, r, this._flags.insensitive)) return p();
                          if (this._invalids.has(e, t, r, this._flags.insensitive) && (f.push(this.createError("" === e ? "any.empty" : "any.invalid", {
                                  value: e,
                                  invalids: this._invalids.values({
                                      stripUndefined: !0
                                  })
                              }, t, r)), r.abortEarly)) return p()
                      }
                  }
                  if (this._flags.allowOnly && (f.push(this.createError("any.allowOnly", {
                          value: e,
                          valids: this._valids.values({
                              stripUndefined: !0
                          })
                      }, t, r)), r.abortEarly)) return p();
                  for (var v = 0; v < this._tests.length; ++v) {
                      var m = this._tests[v],
                          b = m.func.call(this, e, t, r);
                      if (b instanceof u.Err) {
                          if (f.push(b), r.abortEarly) return p()
                      } else e = b
                  }
                  return p()
              }, _class.prototype._validateWithOptions = function(e, t, r) {
                  t && this.checkOptions(t);
                  var n = a.concat(l.defaults, t),
                      o = this._validate(e, null, n),
                      i = u.process(o.errors, e);
                  return r ? r(i, o.value) : {
                      error: i,
                      value: o.value,
                      then: function(e, t) {
                          return i ? Promise.reject(i).catch(t) : Promise.resolve(o.value).then(e)
                      },
                      catch: function(e) {
                          return i ? Promise.reject(i).catch(e) : Promise.resolve(o.value)
                      }
                  }
              }, _class.prototype.validate = function(e, t, r) {
                  return "function" === typeof t ? this._validateWithOptions(e, null, t) : this._validateWithOptions(e, t, r)
              }, _class.prototype.describe = function() {
                  var e = this,
                      t = {
                          type: this._type
                      },
                      r = Object.keys(this._flags);
                  if (r.length)
                      if (["empty", "default", "lazy", "label"].some(function(t) {
                              return e._flags.hasOwnProperty(t)
                          })) {
                          t.flags = {};
                          for (var n = 0; n < r.length; ++n) {
                              var o = r[n];
                              "empty" === o ? t.flags[o] = this._flags[o].describe() : "default" === o ? s.isRef(this._flags[o]) ? t.flags[o] = this._flags[o].toString() : "function" === typeof this._flags[o] ? t.flags[o] = {
                                  description: this._flags[o].description,
                                  function: this._flags[o]
                              } : t.flags[o] = this._flags[o] : "lazy" === o || "label" === o || (t.flags[o] = this._flags[o])
                          }
                      } else t.flags = this._flags;
                  this._settings && (t.options = i.clone(this._settings)), this._baseType && (t.base = this._baseType.describe()), this._description && (t.description = this._description), this._notes.length && (t.notes = this._notes), this._tags.length && (t.tags = this._tags), this._meta.length && (t.meta = this._meta), this._examples.length && (t.examples = this._examples), this._unit && (t.unit = this._unit);
                  var a = this._valids.values();
                  a.length && (t.valids = a.map(function(e) {
                      return s.isRef(e) ? e.toString() : e
                  }));
                  var u = this._invalids.values();
                  u.length && (t.invalids = u.map(function(e) {
                      return s.isRef(e) ? e.toString() : e
                  })), t.rules = [];
                  for (var c = 0; c < this._tests.length; ++c) {
                      var f = this._tests[c],
                          l = {
                              name: f.name
                          };
                      void 0 !== f.arg && (l.arg = s.isRef(f.arg) ? f.arg.toString() : f.arg);
                      var p = f.options;
                      if (p) {
                          if (p.hasRef) {
                              l.arg = {};
                              for (var h = Object.keys(f.arg), d = 0; d < h.length; ++d) {
                                  var y = h[d],
                                      g = f.arg[y];
                                  l.arg[y] = s.isRef(g) ? g.toString() : g
                              }
                          }
                          "string" === typeof p.description ? l.description = p.description : "function" === typeof p.description && (l.description = p.description(l.arg))
                      }
                      t.rules.push(l)
                  }
                  t.rules.length || delete t.rules;
                  var v = this._getLabel();
                  return v && (t.label = v), t
              }, _class.prototype.label = function(e) {
                  i.assert(e && "string" === typeof e, "Label name must be a non-empty string");
                  var t = this.clone();
                  return t._flags.label = e, t
              }, _class.prototype._getLabel = function(e) {
                  return this._flags.label || e
              }, o(_class, [{
                  key: "schemaType",
                  get: function() {
                      return this._type
                  }
              }]), _class
          }(), l.Any.prototype.isImmutable = !0, l.Any.prototype.only = l.Any.prototype.equal = l.Any.prototype.valid, l.Any.prototype.disallow = l.Any.prototype.not = l.Any.prototype.invalid, l.Any.prototype.exist = l.Any.prototype.required, l._try = function(e, t) {
              var r = void 0,
                  n = void 0;
              try {
                  n = e.apply(null, t)
              } catch (e) {
                  r = e
              }
              return {
                  value: n,
                  error: r
              }
          }
      }, function(e, t, r) {
          "use strict";
          (function(e) {
              function kMaxLength() {
                  return Buffer.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823
              }

              function createBuffer(e, t) {
                  if (kMaxLength() < t) throw new RangeError("Invalid typed array length");
                  return Buffer.TYPED_ARRAY_SUPPORT ? (e = new Uint8Array(t), e.__proto__ = Buffer.prototype) : (null === e && (e = new Buffer(t)), e.length = t), e
              }

              function Buffer(e, t, r) {
                  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) return new Buffer(e, t, r);
                  if ("number" === typeof e) {
                      if ("string" === typeof t) throw new Error("If encoding is specified then the first argument must be a string");
                      return allocUnsafe(this, e)
                  }
                  return from(this, e, t, r)
              }

              function from(e, t, r, n) {
                  if ("number" === typeof t) throw new TypeError('"value" argument must not be a number');
                  return "undefined" !== typeof ArrayBuffer && t instanceof ArrayBuffer ? fromArrayBuffer(e, t, r, n) : "string" === typeof t ? fromString(e, t, r) : fromObject(e, t)
              }

              function assertSize(e) {
                  if ("number" !== typeof e) throw new TypeError('"size" argument must be a number');
                  if (e < 0) throw new RangeError('"size" argument must not be negative')
              }

              function alloc(e, t, r, n) {
                  return assertSize(t), t <= 0 ? createBuffer(e, t) : void 0 !== r ? "string" === typeof n ? createBuffer(e, t).fill(r, n) : createBuffer(e, t).fill(r) : createBuffer(e, t)
              }

              function allocUnsafe(e, t) {
                  if (assertSize(t), e = createBuffer(e, t < 0 ? 0 : 0 | checked(t)), !Buffer.TYPED_ARRAY_SUPPORT)
                      for (var r = 0; r < t; ++r) e[r] = 0;
                  return e
              }

              function fromString(e, t, r) {
                  if ("string" === typeof r && "" !== r || (r = "utf8"), !Buffer.isEncoding(r)) throw new TypeError('"encoding" must be a valid string encoding');
                  var n = 0 | byteLength(t, r);
                  e = createBuffer(e, n);
                  var o = e.write(t, r);
                  return o !== n && (e = e.slice(0, o)), e
              }

              function fromArrayLike(e, t) {
                  var r = t.length < 0 ? 0 : 0 | checked(t.length);
                  e = createBuffer(e, r);
                  for (var n = 0; n < r; n += 1) e[n] = 255 & t[n];
                  return e
              }

              function fromArrayBuffer(e, t, r, n) {
                  if (t.byteLength, r < 0 || t.byteLength < r) throw new RangeError("'offset' is out of bounds");
                  if (t.byteLength < r + (n || 0)) throw new RangeError("'length' is out of bounds");
                  return t = void 0 === r && void 0 === n ? new Uint8Array(t) : void 0 === n ? new Uint8Array(t, r) : new Uint8Array(t, r, n), Buffer.TYPED_ARRAY_SUPPORT ? (e = t, e.__proto__ = Buffer.prototype) : e = fromArrayLike(e, t), e
              }

              function fromObject(e, t) {
                  if (Buffer.isBuffer(t)) {
                      var r = 0 | checked(t.length);
                      return e = createBuffer(e, r), 0 === e.length ? e : (t.copy(e, 0, 0, r), e)
                  }
                  if (t) {
                      if ("undefined" !== typeof ArrayBuffer && t.buffer instanceof ArrayBuffer || "length" in t) return "number" !== typeof t.length || isnan(t.length) ? createBuffer(e, 0) : fromArrayLike(e, t);
                      if ("Buffer" === t.type && i(t.data)) return fromArrayLike(e, t.data)
                  }
                  throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")
              }

              function checked(e) {
                  if (e >= kMaxLength()) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + kMaxLength().toString(16) + " bytes");
                  return 0 | e
              }

              function SlowBuffer(e) {
                  return +e != e && (e = 0), Buffer.alloc(+e)
              }

              function byteLength(e, t) {
                  if (Buffer.isBuffer(e)) return e.length;
                  if ("undefined" !== typeof ArrayBuffer && "function" === typeof ArrayBuffer.isView && (ArrayBuffer.isView(e) || e instanceof ArrayBuffer)) return e.byteLength;
                  "string" !== typeof e && (e = "" + e);
                  var r = e.length;
                  if (0 === r) return 0;
                  for (var n = !1;;) switch (t) {
                      case "ascii":
                      case "latin1":
                      case "binary":
                          return r;
                      case "utf8":
                      case "utf-8":
                      case void 0:
                          return utf8ToBytes(e).length;
                      case "ucs2":
                      case "ucs-2":
                      case "utf16le":
                      case "utf-16le":
                          return 2 * r;
                      case "hex":
                          return r >>> 1;
                      case "base64":
                          return base64ToBytes(e).length;
                      default:
                          if (n) return utf8ToBytes(e).length;
                          t = ("" + t).toLowerCase(), n = !0
                  }
              }

              function slowToString(e, t, r) {
                  var n = !1;
                  if ((void 0 === t || t < 0) && (t = 0), t > this.length) return "";
                  if ((void 0 === r || r > this.length) && (r = this.length), r <= 0) return "";
                  if (r >>>= 0, t >>>= 0, r <= t) return "";
                  for (e || (e = "utf8");;) switch (e) {
                      case "hex":
                          return hexSlice(this, t, r);
                      case "utf8":
                      case "utf-8":
                          return utf8Slice(this, t, r);
                      case "ascii":
                          return asciiSlice(this, t, r);
                      case "latin1":
                      case "binary":
                          return latin1Slice(this, t, r);
                      case "base64":
                          return base64Slice(this, t, r);
                      case "ucs2":
                      case "ucs-2":
                      case "utf16le":
                      case "utf-16le":
                          return utf16leSlice(this, t, r);
                      default:
                          if (n) throw new TypeError("Unknown encoding: " + e);
                          e = (e + "").toLowerCase(), n = !0
                  }
              }

              function swap(e, t, r) {
                  var n = e[t];
                  e[t] = e[r], e[r] = n
              }

              function bidirectionalIndexOf(e, t, r, n, o) {
                  if (0 === e.length) return -1;
                  if ("string" === typeof r ? (n = r, r = 0) : r > 2147483647 ? r = 2147483647 : r < -2147483648 && (r = -2147483648), r = +r, isNaN(r) && (r = o ? 0 : e.length - 1), r < 0 && (r = e.length + r), r >= e.length) {
                      if (o) return -1;
                      r = e.length - 1
                  } else if (r < 0) {
                      if (!o) return -1;
                      r = 0
                  }
                  if ("string" === typeof t && (t = Buffer.from(t, n)), Buffer.isBuffer(t)) return 0 === t.length ? -1 : arrayIndexOf(e, t, r, n, o);
                  if ("number" === typeof t) return t &= 255, Buffer.TYPED_ARRAY_SUPPORT && "function" === typeof Uint8Array.prototype.indexOf ? o ? Uint8Array.prototype.indexOf.call(e, t, r) : Uint8Array.prototype.lastIndexOf.call(e, t, r) : arrayIndexOf(e, [t], r, n, o);
                  throw new TypeError("val must be string, number or Buffer")
              }

              function arrayIndexOf(e, t, r, n, o) {
                  function read(e, t) {
                      return 1 === i ? e[t] : e.readUInt16BE(t * i)
                  }
                  var i = 1,
                      a = e.length,
                      s = t.length;
                  if (void 0 !== n && ("ucs2" === (n = String(n).toLowerCase()) || "ucs-2" === n || "utf16le" === n || "utf-16le" === n)) {
                      if (e.length < 2 || t.length < 2) return -1;
                      i = 2, a /= 2, s /= 2, r /= 2
                  }
                  var u;
                  if (o) {
                      var c = -1;
                      for (u = r; u < a; u++)
                          if (read(e, u) === read(t, -1 === c ? 0 : u - c)) {
                              if (-1 === c && (c = u), u - c + 1 === s) return c * i
                          } else -1 !== c && (u -= u - c), c = -1
                  } else
                      for (r + s > a && (r = a - s), u = r; u >= 0; u--) {
                          for (var f = !0, l = 0; l < s; l++)
                              if (read(e, u + l) !== read(t, l)) {
                                  f = !1;
                                  break
                              }
                          if (f) return u
                      }
                  return -1
              }

              function hexWrite(e, t, r, n) {
                  r = Number(r) || 0;
                  var o = e.length - r;
                  n ? (n = Number(n)) > o && (n = o) : n = o;
                  var i = t.length;
                  if (i % 2 !== 0) throw new TypeError("Invalid hex string");
                  n > i / 2 && (n = i / 2);
                  for (var a = 0; a < n; ++a) {
                      var s = parseInt(t.substr(2 * a, 2), 16);
                      if (isNaN(s)) return a;
                      e[r + a] = s
                  }
                  return a
              }

              function utf8Write(e, t, r, n) {
                  return blitBuffer(utf8ToBytes(t, e.length - r), e, r, n)
              }

              function asciiWrite(e, t, r, n) {
                  return blitBuffer(asciiToBytes(t), e, r, n)
              }

              function latin1Write(e, t, r, n) {
                  return asciiWrite(e, t, r, n)
              }

              function base64Write(e, t, r, n) {
                  return blitBuffer(base64ToBytes(t), e, r, n)
              }

              function ucs2Write(e, t, r, n) {
                  return blitBuffer(utf16leToBytes(t, e.length - r), e, r, n)
              }

              function base64Slice(e, t, r) {
                  return 0 === t && r === e.length ? n.fromByteArray(e) : n.fromByteArray(e.slice(t, r))
              }

              function utf8Slice(e, t, r) {
                  r = Math.min(e.length, r);
                  for (var n = [], o = t; o < r;) {
                      var i = e[o],
                          a = null,
                          s = i > 239 ? 4 : i > 223 ? 3 : i > 191 ? 2 : 1;
                      if (o + s <= r) {
                          var u, c, f, l;
                          switch (s) {
                              case 1:
                                  i < 128 && (a = i);
                                  break;
                              case 2:
                                  u = e[o + 1], 128 === (192 & u) && (l = (31 & i) << 6 | 63 & u) > 127 && (a = l);
                                  break;
                              case 3:
                                  u = e[o + 1], c = e[o + 2], 128 === (192 & u) && 128 === (192 & c) && (l = (15 & i) << 12 | (63 & u) << 6 | 63 & c) > 2047 && (l < 55296 || l > 57343) && (a = l);
                                  break;
                              case 4:
                                  u = e[o + 1], c = e[o + 2], f = e[o + 3], 128 === (192 & u) && 128 === (192 & c) && 128 === (192 & f) && (l = (15 & i) << 18 | (63 & u) << 12 | (63 & c) << 6 | 63 & f) > 65535 && l < 1114112 && (a = l)
                          }
                      }
                      null === a ? (a = 65533, s = 1) : a > 65535 && (a -= 65536, n.push(a >>> 10 & 1023 | 55296), a = 56320 | 1023 & a), n.push(a), o += s
                  }
                  return decodeCodePointsArray(n)
              }

              function decodeCodePointsArray(e) {
                  var t = e.length;
                  if (t <= a) return String.fromCharCode.apply(String, e);
                  for (var r = "", n = 0; n < t;) r += String.fromCharCode.apply(String, e.slice(n, n += a));
                  return r
              }

              function asciiSlice(e, t, r) {
                  var n = "";
                  r = Math.min(e.length, r);
                  for (var o = t; o < r; ++o) n += String.fromCharCode(127 & e[o]);
                  return n
              }

              function latin1Slice(e, t, r) {
                  var n = "";
                  r = Math.min(e.length, r);
                  for (var o = t; o < r; ++o) n += String.fromCharCode(e[o]);
                  return n
              }

              function hexSlice(e, t, r) {
                  var n = e.length;
                  (!t || t < 0) && (t = 0), (!r || r < 0 || r > n) && (r = n);
                  for (var o = "", i = t; i < r; ++i) o += toHex(e[i]);
                  return o
              }

              function utf16leSlice(e, t, r) {
                  for (var n = e.slice(t, r), o = "", i = 0; i < n.length; i += 2) o += String.fromCharCode(n[i] + 256 * n[i + 1]);
                  return o
              }

              function checkOffset(e, t, r) {
                  if (e % 1 !== 0 || e < 0) throw new RangeError("offset is not uint");
                  if (e + t > r) throw new RangeError("Trying to access beyond buffer length")
              }

              function checkInt(e, t, r, n, o, i) {
                  if (!Buffer.isBuffer(e)) throw new TypeError('"buffer" argument must be a Buffer instance');
                  if (t > o || t < i) throw new RangeError('"value" argument is out of bounds');
                  if (r + n > e.length) throw new RangeError("Index out of range")
              }

              function objectWriteUInt16(e, t, r, n) {
                  t < 0 && (t = 65535 + t + 1);
                  for (var o = 0, i = Math.min(e.length - r, 2); o < i; ++o) e[r + o] = (t & 255 << 8 * (n ? o : 1 - o)) >>> 8 * (n ? o : 1 - o)
              }

              function objectWriteUInt32(e, t, r, n) {
                  t < 0 && (t = 4294967295 + t + 1);
                  for (var o = 0, i = Math.min(e.length - r, 4); o < i; ++o) e[r + o] = t >>> 8 * (n ? o : 3 - o) & 255
              }

              function checkIEEE754(e, t, r, n, o, i) {
                  if (r + n > e.length) throw new RangeError("Index out of range");
                  if (r < 0) throw new RangeError("Index out of range")
              }

              function writeFloat(e, t, r, n, i) {
                  return i || checkIEEE754(e, t, r, 4, 3.4028234663852886e38, -3.4028234663852886e38), o.write(e, t, r, n, 23, 4), r + 4
              }

              function writeDouble(e, t, r, n, i) {
                  return i || checkIEEE754(e, t, r, 8, 1.7976931348623157e308, -1.7976931348623157e308), o.write(e, t, r, n, 52, 8), r + 8
              }

              function base64clean(e) {
                  if (e = stringtrim(e).replace(s, ""), e.length < 2) return "";
                  for (; e.length % 4 !== 0;) e += "=";
                  return e
              }

              function stringtrim(e) {
                  return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, "")
              }

              function toHex(e) {
                  return e < 16 ? "0" + e.toString(16) : e.toString(16)
              }

              function utf8ToBytes(e, t) {
                  t = t || 1 / 0;
                  for (var r, n = e.length, o = null, i = [], a = 0; a < n; ++a) {
                      if ((r = e.charCodeAt(a)) > 55295 && r < 57344) {
                          if (!o) {
                              if (r > 56319) {
                                  (t -= 3) > -1 && i.push(239, 191, 189);
                                  continue
                              }
                              if (a + 1 === n) {
                                  (t -= 3) > -1 && i.push(239, 191, 189);
                                  continue
                              }
                              o = r;
                              continue
                          }
                          if (r < 56320) {
                              (t -= 3) > -1 && i.push(239, 191, 189), o = r;
                              continue
                          }
                          r = 65536 + (o - 55296 << 10 | r - 56320)
                      } else o && (t -= 3) > -1 && i.push(239, 191, 189);
                      if (o = null, r < 128) {
                          if ((t -= 1) < 0) break;
                          i.push(r)
                      } else if (r < 2048) {
                          if ((t -= 2) < 0) break;
                          i.push(r >> 6 | 192, 63 & r | 128)
                      } else if (r < 65536) {
                          if ((t -= 3) < 0) break;
                          i.push(r >> 12 | 224, r >> 6 & 63 | 128, 63 & r | 128)
                      } else {
                          if (!(r < 1114112)) throw new Error("Invalid code point");
                          if ((t -= 4) < 0) break;
                          i.push(r >> 18 | 240, r >> 12 & 63 | 128, r >> 6 & 63 | 128, 63 & r | 128)
                      }
                  }
                  return i
              }

              function asciiToBytes(e) {
                  for (var t = [], r = 0; r < e.length; ++r) t.push(255 & e.charCodeAt(r));
                  return t
              }

              function utf16leToBytes(e, t) {
                  for (var r, n, o, i = [], a = 0; a < e.length && !((t -= 2) < 0); ++a) r = e.charCodeAt(a), n = r >> 8, o = r % 256, i.push(o), i.push(n);
                  return i
              }

              function base64ToBytes(e) {
                  return n.toByteArray(base64clean(e))
              }

              function blitBuffer(e, t, r, n) {
                  for (var o = 0; o < n && !(o + r >= t.length || o >= e.length); ++o) t[o + r] = e[o];
                  return o
              }

              function isnan(e) {
                  return e !== e
              }
              var n = r(33),
                  o = r(34),
                  i = r(35);
              t.Buffer = Buffer, t.SlowBuffer = SlowBuffer, t.INSPECT_MAX_BYTES = 50, Buffer.TYPED_ARRAY_SUPPORT = void 0 !== e.TYPED_ARRAY_SUPPORT ? e.TYPED_ARRAY_SUPPORT : function() {
                  try {
                      var e = new Uint8Array(1);
                      return e.__proto__ = {
                          __proto__: Uint8Array.prototype,
                          foo: function() {
                              return 42
                          }
                      }, 42 === e.foo() && "function" === typeof e.subarray && 0 === e.subarray(1, 1).byteLength
                  } catch (e) {
                      return !1
                  }
              }(), t.kMaxLength = kMaxLength(), Buffer.poolSize = 8192, Buffer._augment = function(e) {
                  return e.__proto__ = Buffer.prototype, e
              }, Buffer.from = function(e, t, r) {
                  return from(null, e, t, r)
              }, Buffer.TYPED_ARRAY_SUPPORT && (Buffer.prototype.__proto__ = Uint8Array.prototype, Buffer.__proto__ = Uint8Array, "undefined" !== typeof Symbol && Symbol.species && Buffer[Symbol.species] === Buffer && Object.defineProperty(Buffer, Symbol.species, {
                  value: null,
                  configurable: !0
              })), Buffer.alloc = function(e, t, r) {
                  return alloc(null, e, t, r)
              }, Buffer.allocUnsafe = function(e) {
                  return allocUnsafe(null, e)
              }, Buffer.allocUnsafeSlow = function(e) {
                  return allocUnsafe(null, e)
              }, Buffer.isBuffer = function(e) {
                  return !(null == e || !e._isBuffer)
              }, Buffer.compare = function(e, t) {
                  if (!Buffer.isBuffer(e) || !Buffer.isBuffer(t)) throw new TypeError("Arguments must be Buffers");
                  if (e === t) return 0;
                  for (var r = e.length, n = t.length, o = 0, i = Math.min(r, n); o < i; ++o)
                      if (e[o] !== t[o]) {
                          r = e[o], n = t[o];
                          break
                      }
                  return r < n ? -1 : n < r ? 1 : 0
              }, Buffer.isEncoding = function(e) {
                  switch (String(e).toLowerCase()) {
                      case "hex":
                      case "utf8":
                      case "utf-8":
                      case "ascii":
                      case "latin1":
                      case "binary":
                      case "base64":
                      case "ucs2":
                      case "ucs-2":
                      case "utf16le":
                      case "utf-16le":
                          return !0;
                      default:
                          return !1
                  }
              }, Buffer.concat = function(e, t) {
                  if (!i(e)) throw new TypeError('"list" argument must be an Array of Buffers');
                  if (0 === e.length) return Buffer.alloc(0);
                  var r;
                  if (void 0 === t)
                      for (t = 0, r = 0; r < e.length; ++r) t += e[r].length;
                  var n = Buffer.allocUnsafe(t),
                      o = 0;
                  for (r = 0; r < e.length; ++r) {
                      var a = e[r];
                      if (!Buffer.isBuffer(a)) throw new TypeError('"list" argument must be an Array of Buffers');
                      a.copy(n, o), o += a.length
                  }
                  return n
              }, Buffer.byteLength = byteLength, Buffer.prototype._isBuffer = !0, Buffer.prototype.swap16 = function() {
                  var e = this.length;
                  if (e % 2 !== 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
                  for (var t = 0; t < e; t += 2) swap(this, t, t + 1);
                  return this
              }, Buffer.prototype.swap32 = function() {
                  var e = this.length;
                  if (e % 4 !== 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
                  for (var t = 0; t < e; t += 4) swap(this, t, t + 3), swap(this, t + 1, t + 2);
                  return this
              }, Buffer.prototype.swap64 = function() {
                  var e = this.length;
                  if (e % 8 !== 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
                  for (var t = 0; t < e; t += 8) swap(this, t, t + 7), swap(this, t + 1, t + 6), swap(this, t + 2, t + 5), swap(this, t + 3, t + 4);
                  return this
              }, Buffer.prototype.toString = function() {
                  var e = 0 | this.length;
                  return 0 === e ? "" : 0 === arguments.length ? utf8Slice(this, 0, e) : slowToString.apply(this, arguments)
              }, Buffer.prototype.equals = function(e) {
                  if (!Buffer.isBuffer(e)) throw new TypeError("Argument must be a Buffer");
                  return this === e || 0 === Buffer.compare(this, e)
              }, Buffer.prototype.inspect = function() {
                  var e = "",
                      r = t.INSPECT_MAX_BYTES;
                  return this.length > 0 && (e = this.toString("hex", 0, r).match(/.{2}/g).join(" "), this.length > r && (e += " ... ")), "<Buffer " + e + ">"
              }, Buffer.prototype.compare = function(e, t, r, n, o) {
                  if (!Buffer.isBuffer(e)) throw new TypeError("Argument must be a Buffer");
                  if (void 0 === t && (t = 0), void 0 === r && (r = e ? e.length : 0), void 0 === n && (n = 0), void 0 === o && (o = this.length), t < 0 || r > e.length || n < 0 || o > this.length) throw new RangeError("out of range index");
                  if (n >= o && t >= r) return 0;
                  if (n >= o) return -1;
                  if (t >= r) return 1;
                  if (t >>>= 0, r >>>= 0, n >>>= 0, o >>>= 0, this === e) return 0;
                  for (var i = o - n, a = r - t, s = Math.min(i, a), u = this.slice(n, o), c = e.slice(t, r), f = 0; f < s; ++f)
                      if (u[f] !== c[f]) {
                          i = u[f], a = c[f];
                          break
                      }
                  return i < a ? -1 : a < i ? 1 : 0
              }, Buffer.prototype.includes = function(e, t, r) {
                  return -1 !== this.indexOf(e, t, r)
              }, Buffer.prototype.indexOf = function(e, t, r) {
                  return bidirectionalIndexOf(this, e, t, r, !0)
              }, Buffer.prototype.lastIndexOf = function(e, t, r) {
                  return bidirectionalIndexOf(this, e, t, r, !1)
              }, Buffer.prototype.write = function(e, t, r, n) {
                  if (void 0 === t) n = "utf8", r = this.length, t = 0;
                  else if (void 0 === r && "string" === typeof t) n = t, r = this.length, t = 0;
                  else {
                      if (!isFinite(t)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
                      t |= 0, isFinite(r) ? (r |= 0, void 0 === n && (n = "utf8")) : (n = r, r = void 0)
                  }
                  var o = this.length - t;
                  if ((void 0 === r || r > o) && (r = o), e.length > 0 && (r < 0 || t < 0) || t > this.length) throw new RangeError("Attempt to write outside buffer bounds");
                  n || (n = "utf8");
                  for (var i = !1;;) switch (n) {
                      case "hex":
                          return hexWrite(this, e, t, r);
                      case "utf8":
                      case "utf-8":
                          return utf8Write(this, e, t, r);
                      case "ascii":
                          return asciiWrite(this, e, t, r);
                      case "latin1":
                      case "binary":
                          return latin1Write(this, e, t, r);
                      case "base64":
                          return base64Write(this, e, t, r);
                      case "ucs2":
                      case "ucs-2":
                      case "utf16le":
                      case "utf-16le":
                          return ucs2Write(this, e, t, r);
                      default:
                          if (i) throw new TypeError("Unknown encoding: " + n);
                          n = ("" + n).toLowerCase(), i = !0
                  }
              }, Buffer.prototype.toJSON = function() {
                  return {
                      type: "Buffer",
                      data: Array.prototype.slice.call(this._arr || this, 0)
                  }
              };
              var a = 4096;
              Buffer.prototype.slice = function(e, t) {
                  var r = this.length;
                  e = ~~e, t = void 0 === t ? r : ~~t, e < 0 ? (e += r) < 0 && (e = 0) : e > r && (e = r), t < 0 ? (t += r) < 0 && (t = 0) : t > r && (t = r), t < e && (t = e);
                  var n;
                  if (Buffer.TYPED_ARRAY_SUPPORT) n = this.subarray(e, t), n.__proto__ = Buffer.prototype;
                  else {
                      var o = t - e;
                      n = new Buffer(o, void 0);
                      for (var i = 0; i < o; ++i) n[i] = this[i + e]
                  }
                  return n
              }, Buffer.prototype.readUIntLE = function(e, t, r) {
                  e |= 0, t |= 0, r || checkOffset(e, t, this.length);
                  for (var n = this[e], o = 1, i = 0; ++i < t && (o *= 256);) n += this[e + i] * o;
                  return n
              }, Buffer.prototype.readUIntBE = function(e, t, r) {
                  e |= 0, t |= 0, r || checkOffset(e, t, this.length);
                  for (var n = this[e + --t], o = 1; t > 0 && (o *= 256);) n += this[e + --t] * o;
                  return n
              }, Buffer.prototype.readUInt8 = function(e, t) {
                  return t || checkOffset(e, 1, this.length), this[e]
              }, Buffer.prototype.readUInt16LE = function(e, t) {
                  return t || checkOffset(e, 2, this.length), this[e] | this[e + 1] << 8
              }, Buffer.prototype.readUInt16BE = function(e, t) {
                  return t || checkOffset(e, 2, this.length), this[e] << 8 | this[e + 1]
              }, Buffer.prototype.readUInt32LE = function(e, t) {
                  return t || checkOffset(e, 4, this.length), (this[e] | this[e + 1] << 8 | this[e + 2] << 16) + 16777216 * this[e + 3]
              }, Buffer.prototype.readUInt32BE = function(e, t) {
                  return t || checkOffset(e, 4, this.length), 16777216 * this[e] + (this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3])
              }, Buffer.prototype.readIntLE = function(e, t, r) {
                  e |= 0, t |= 0, r || checkOffset(e, t, this.length);
                  for (var n = this[e], o = 1, i = 0; ++i < t && (o *= 256);) n += this[e + i] * o;
                  return o *= 128, n >= o && (n -= Math.pow(2, 8 * t)), n
              }, Buffer.prototype.readIntBE = function(e, t, r) {
                  e |= 0, t |= 0, r || checkOffset(e, t, this.length);
                  for (var n = t, o = 1, i = this[e + --n]; n > 0 && (o *= 256);) i += this[e + --n] * o;
                  return o *= 128, i >= o && (i -= Math.pow(2, 8 * t)), i
              }, Buffer.prototype.readInt8 = function(e, t) {
                  return t || checkOffset(e, 1, this.length), 128 & this[e] ? -1 * (255 - this[e] + 1) : this[e]
              }, Buffer.prototype.readInt16LE = function(e, t) {
                  t || checkOffset(e, 2, this.length);
                  var r = this[e] | this[e + 1] << 8;
                  return 32768 & r ? 4294901760 | r : r
              }, Buffer.prototype.readInt16BE = function(e, t) {
                  t || checkOffset(e, 2, this.length);
                  var r = this[e + 1] | this[e] << 8;
                  return 32768 & r ? 4294901760 | r : r
              }, Buffer.prototype.readInt32LE = function(e, t) {
                  return t || checkOffset(e, 4, this.length), this[e] | this[e + 1] << 8 | this[e + 2] << 16 | this[e + 3] << 24
              }, Buffer.prototype.readInt32BE = function(e, t) {
                  return t || checkOffset(e, 4, this.length), this[e] << 24 | this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3]
              }, Buffer.prototype.readFloatLE = function(e, t) {
                  return t || checkOffset(e, 4, this.length), o.read(this, e, !0, 23, 4)
              }, Buffer.prototype.readFloatBE = function(e, t) {
                  return t || checkOffset(e, 4, this.length), o.read(this, e, !1, 23, 4)
              }, Buffer.prototype.readDoubleLE = function(e, t) {
                  return t || checkOffset(e, 8, this.length), o.read(this, e, !0, 52, 8)
              }, Buffer.prototype.readDoubleBE = function(e, t) {
                  return t || checkOffset(e, 8, this.length), o.read(this, e, !1, 52, 8)
              }, Buffer.prototype.writeUIntLE = function(e, t, r, n) {
                  if (e = +e, t |= 0, r |= 0, !n) {
                      checkInt(this, e, t, r, Math.pow(2, 8 * r) - 1, 0)
                  }
                  var o = 1,
                      i = 0;
                  for (this[t] = 255 & e; ++i < r && (o *= 256);) this[t + i] = e / o & 255;
                  return t + r
              }, Buffer.prototype.writeUIntBE = function(e, t, r, n) {
                  if (e = +e, t |= 0, r |= 0, !n) {
                      checkInt(this, e, t, r, Math.pow(2, 8 * r) - 1, 0)
                  }
                  var o = r - 1,
                      i = 1;
                  for (this[t + o] = 255 & e; --o >= 0 && (i *= 256);) this[t + o] = e / i & 255;
                  return t + r
              }, Buffer.prototype.writeUInt8 = function(e, t, r) {
                  return e = +e, t |= 0, r || checkInt(this, e, t, 1, 255, 0), Buffer.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)), this[t] = 255 & e, t + 1
              }, Buffer.prototype.writeUInt16LE = function(e, t, r) {
                  return e = +e, t |= 0, r || checkInt(this, e, t, 2, 65535, 0), Buffer.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e, this[t + 1] = e >>> 8) : objectWriteUInt16(this, e, t, !0), t + 2
              }, Buffer.prototype.writeUInt16BE = function(e, t, r) {
                  return e = +e, t |= 0, r || checkInt(this, e, t, 2, 65535, 0), Buffer.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 8, this[t + 1] = 255 & e) : objectWriteUInt16(this, e, t, !1), t + 2
              }, Buffer.prototype.writeUInt32LE = function(e, t, r) {
                  return e = +e, t |= 0, r || checkInt(this, e, t, 4, 4294967295, 0), Buffer.TYPED_ARRAY_SUPPORT ? (this[t + 3] = e >>> 24, this[t + 2] = e >>> 16, this[t + 1] = e >>> 8, this[t] = 255 & e) : objectWriteUInt32(this, e, t, !0), t + 4
              }, Buffer.prototype.writeUInt32BE = function(e, t, r) {
                  return e = +e, t |= 0, r || checkInt(this, e, t, 4, 4294967295, 0), Buffer.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = 255 & e) : objectWriteUInt32(this, e, t, !1), t + 4
              }, Buffer.prototype.writeIntLE = function(e, t, r, n) {
                  if (e = +e, t |= 0, !n) {
                      var o = Math.pow(2, 8 * r - 1);
                      checkInt(this, e, t, r, o - 1, -o)
                  }
                  var i = 0,
                      a = 1,
                      s = 0;
                  for (this[t] = 255 & e; ++i < r && (a *= 256);) e < 0 && 0 === s && 0 !== this[t + i - 1] && (s = 1), this[t + i] = (e / a >> 0) - s & 255;
                  return t + r
              }, Buffer.prototype.writeIntBE = function(e, t, r, n) {
                  if (e = +e, t |= 0, !n) {
                      var o = Math.pow(2, 8 * r - 1);
                      checkInt(this, e, t, r, o - 1, -o)
                  }
                  var i = r - 1,
                      a = 1,
                      s = 0;
                  for (this[t + i] = 255 & e; --i >= 0 && (a *= 256);) e < 0 && 0 === s && 0 !== this[t + i + 1] && (s = 1), this[t + i] = (e / a >> 0) - s & 255;
                  return t + r
              }, Buffer.prototype.writeInt8 = function(e, t, r) {
                  return e = +e, t |= 0, r || checkInt(this, e, t, 1, 127, -128), Buffer.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)), e < 0 && (e = 255 + e + 1), this[t] = 255 & e, t + 1
              }, Buffer.prototype.writeInt16LE = function(e, t, r) {
                  return e = +e, t |= 0, r || checkInt(this, e, t, 2, 32767, -32768), Buffer.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e, this[t + 1] = e >>> 8) : objectWriteUInt16(this, e, t, !0), t + 2
              }, Buffer.prototype.writeInt16BE = function(e, t, r) {
                  return e = +e, t |= 0, r || checkInt(this, e, t, 2, 32767, -32768), Buffer.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 8, this[t + 1] = 255 & e) : objectWriteUInt16(this, e, t, !1), t + 2
              }, Buffer.prototype.writeInt32LE = function(e, t, r) {
                  return e = +e, t |= 0, r || checkInt(this, e, t, 4, 2147483647, -2147483648), Buffer.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e, this[t + 1] = e >>> 8, this[t + 2] = e >>> 16, this[t + 3] = e >>> 24) : objectWriteUInt32(this, e, t, !0), t + 4
              }, Buffer.prototype.writeInt32BE = function(e, t, r) {
                  return e = +e, t |= 0, r || checkInt(this, e, t, 4, 2147483647, -2147483648), e < 0 && (e = 4294967295 + e + 1), Buffer.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = 255 & e) : objectWriteUInt32(this, e, t, !1), t + 4
              }, Buffer.prototype.writeFloatLE = function(e, t, r) {
                  return writeFloat(this, e, t, !0, r)
              }, Buffer.prototype.writeFloatBE = function(e, t, r) {
                  return writeFloat(this, e, t, !1, r)
              }, Buffer.prototype.writeDoubleLE = function(e, t, r) {
                  return writeDouble(this, e, t, !0, r)
              }, Buffer.prototype.writeDoubleBE = function(e, t, r) {
                  return writeDouble(this, e, t, !1, r)
              }, Buffer.prototype.copy = function(e, t, r, n) {
                  if (r || (r = 0), n || 0 === n || (n = this.length), t >= e.length && (t = e.length), t || (t = 0), n > 0 && n < r && (n = r), n === r) return 0;
                  if (0 === e.length || 0 === this.length) return 0;
                  if (t < 0) throw new RangeError("targetStart out of bounds");
                  if (r < 0 || r >= this.length) throw new RangeError("sourceStart out of bounds");
                  if (n < 0) throw new RangeError("sourceEnd out of bounds");
                  n > this.length && (n = this.length), e.length - t < n - r && (n = e.length - t + r);
                  var o, i = n - r;
                  if (this === e && r < t && t < n)
                      for (o = i - 1; o >= 0; --o) e[o + t] = this[o + r];
                  else if (i < 1e3 || !Buffer.TYPED_ARRAY_SUPPORT)
                      for (o = 0; o < i; ++o) e[o + t] = this[o + r];
                  else Uint8Array.prototype.set.call(e, this.subarray(r, r + i), t);
                  return i
              }, Buffer.prototype.fill = function(e, t, r, n) {
                  if ("string" === typeof e) {
                      if ("string" === typeof t ? (n = t, t = 0, r = this.length) : "string" === typeof r && (n = r, r = this.length), 1 === e.length) {
                          var o = e.charCodeAt(0);
                          o < 256 && (e = o)
                      }
                      if (void 0 !== n && "string" !== typeof n) throw new TypeError("encoding must be a string");
                      if ("string" === typeof n && !Buffer.isEncoding(n)) throw new TypeError("Unknown encoding: " + n)
                  } else "number" === typeof e && (e &= 255);
                  if (t < 0 || this.length < t || this.length < r) throw new RangeError("Out of range index");
                  if (r <= t) return this;
                  t >>>= 0, r = void 0 === r ? this.length : r >>> 0, e || (e = 0);
                  var i;
                  if ("number" === typeof e)
                      for (i = t; i < r; ++i) this[i] = e;
                  else {
                      var a = Buffer.isBuffer(e) ? e : utf8ToBytes(new Buffer(e, n).toString()),
                          s = a.length;
                      for (i = 0; i < r - t; ++i) this[i + t] = a[i % s]
                  }
                  return this
              };
              var s = /[^+\/0-9A-Za-z-_]/g
          }).call(t, r(5))
      }, function(e, t, r) {
          "use strict";
          var n = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function(e) {
                  return typeof e
              } : function(e) {
                  return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
              },
              o = r(0),
              i = r(1);
          t.schema = function(e, t) {
              return void 0 !== t && null !== t && "object" === ("undefined" === typeof t ? "undefined" : n(t)) ? t.isJoi ? t : Array.isArray(t) ? e.alternatives().try(t) : t instanceof RegExp ? e.string().regex(t) : t instanceof Date ? e.date().valid(t) : e.object().keys(t) : "string" === typeof t ? e.string().valid(t) : "number" === typeof t ? e.number().valid(t) : "boolean" === typeof t ? e.boolean().valid(t) : i.isRef(t) ? e.valid(t) : (o.assert(null === t, "Invalid schema content:", t), e.valid(null))
          }, t.ref = function(e) {
              return i.isRef(e) ? e : i.create(e)
          }
      }, function(e, t) {
          var r;
          r = function() {
              return this
          }();
          try {
              r = r || Function("return this")() || (0, eval)("this")
          } catch (e) {
              "object" === typeof window && (r = window)
          }
          e.exports = r
      }, function(e, t, r) {
          "use strict";

          function _classCallCheck(e, t) {
              if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
          }
          var n = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function(e) {
                  return typeof e
              } : function(e) {
                  return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
              },
              o = r(0),
              i = r(20),
              a = {
                  annotations: Symbol("joi-annotations")
              };
          a.stringify = function(e, r) {
              var o = "undefined" === typeof e ? "undefined" : n(e);
              if (null === e) return "null";
              if ("string" === o) return e;
              if (e instanceof t.Err || "function" === o || "symbol" === o) return e.toString();
              if ("object" === o) {
                  if (Array.isArray(e)) {
                      for (var i = "", s = 0; s < e.length; ++s) i = i + (i.length ? ", " : "") + a.stringify(e[s], r);
                      return r ? "[" + i + "]" : i
                  }
                  return e.toString()
              }
              return JSON.stringify(e)
          }, t.Err = function() {
              function _class(e, t, r, n, o, a, s) {
                  _classCallCheck(this, _class), this.isJoi = !0, this.type = e, this.context = t || {}, this.context.key = r.path[r.path.length - 1], this.context.label = r.key, this.path = r.path, this.options = n, this.flags = o, this.message = a, this.template = s;
                  var u = this.options.language;
                  this.flags.label ? this.context.label = this.flags.label : !u || "" !== this.context.label && null !== this.context.label || (this.context.label = u.root || i.errors.root)
              }
              return _class.prototype.toString = function() {
                  var e = this;
                  if (this.message) return this.message;
                  var t = void 0;
                  this.template && (t = this.template);
                  var r = this.options.language;
                  if (void 0 === (t = t || o.reach(r, this.type) || o.reach(i.errors, this.type))) return 'Error code "' + this.type + '" is not defined, your custom type is missing the correct language definition';
                  var n = o.reach(r, "messages.wrapArrays");
                  if ("boolean" !== typeof n && (n = i.errors.messages.wrapArrays), null === t) {
                      var s = a.stringify(this.context.reason, n);
                      return n ? s.slice(1, -1) : s
                  }
                  var u = /\{\{\!?label\}\}/.test(t),
                      c = t.length > 2 && "!" === t[0] && "!" === t[1];
                  if (c && (t = t.slice(2)), !u && !c) {
                      var f = o.reach(r, "key");
                      t = "string" === typeof f ? f + t : o.reach(i.errors, "key") + t
                  }
                  return t.replace(/\{\{(\!?)([^}]+)\}\}/g, function(t, r, i) {
                      var s = o.reach(e.context, i),
                          u = a.stringify(s, n);
                      return r && e.options.escapeHtml ? o.escapeHtml(u) : u
                  })
              }, _class
          }(), t.create = function(e, r, n, o, i, a, s) {
              return new t.Err(e, r, n, o, i, a, s)
          }, t.process = function(e, t) {
              if (!e || !e.length) return null;
              var r = "",
                  n = [],
                  o = function processErrors(e, t) {
                      for (var o = 0; o < e.length; ++o) {
                          var i = e[o];
                          if (i instanceof Error) return i;
                          if (i.flags.error && "function" !== typeof i.flags.error) return i.flags.error;
                          var a = void 0;
                          if (void 0 === t && (a = i.toString(), r = r + (r ? ". " : "") + a), i.context.reason && i.context.reason.length) {
                              var s = processErrors(i.context.reason, i.path);
                              if (s) return s
                          } else n.push({
                              message: a || i.toString(),
                              path: i.path,
                              type: i.type,
                              context: i.context
                          })
                      }
                  }(e);
              if (o) return o;
              var i = new Error(r);
              return i.isJoi = !0, i.name = "ValidationError", i.details = n, i._object = t, i.annotate = a.annotate, i
          }, a.safeStringify = function(e, t) {
              return JSON.stringify(e, a.serializer(), t)
          }, a.serializer = function() {
              var e = [],
                  t = [],
                  r = function(r, n) {
                      return t[0] === n ? "[Circular ~]" : "[Circular ~." + e.slice(0, t.indexOf(n)).join(".") + "]"
                  };
              return function(o, i) {
                  if (t.length > 0) {
                      var s = t.indexOf(this);
                      ~s ? (t.length = s + 1, e.length = s + 1, e[s] = o) : (t.push(this), e.push(o)), ~t.indexOf(i) && (i = r.call(this, o, i))
                  } else t.push(i);
                  if (i) {
                      var u = i[a.annotations];
                      if (u) {
                          if (Array.isArray(i)) {
                              for (var c = [], f = 0; f < i.length; ++f) u.errors[f] && c.push("_$idx$_" + u.errors[f].sort().join(", ") + "_$end$_"), c.push(i[f]);
                              i = c
                          } else {
                              for (var l = Object.keys(u.errors), p = 0; p < l.length; ++p) {
                                  var h = l[p];
                                  i[h + "_$key$_" + u.errors[h].sort().join(", ") + "_$end$_"] = i[h], i[h] = void 0
                              }
                              for (var d = Object.keys(u.missing), y = 0; y < d.length; ++y) {
                                  var g = d[y];
                                  i["_$miss$_" + g + "|" + u.missing[g] + "_$end$_"] = "__missing__"
                              }
                          }
                          return i
                      }
                  }
                  return i === 1 / 0 || i === -1 / 0 || Number.isNaN(i) || "function" === typeof i || "symbol" === ("undefined" === typeof i ? "undefined" : n(i)) ? "[" + i.toString() + "]" : i
              }
          }, a.annotate = function(e) {
              var t = e ? "" : "\x1b[31m",
                  r = e ? "" : "\x1b[41m",
                  i = e ? "" : "\x1b[0m";
              if ("object" !== n(this._object)) return this.details[0].message;
              for (var s = o.clone(this._object || {}), u = this.details.length - 1; u >= 0; --u)
                  for (var c = u + 1, f = this.details[u], l = f.path, p = s, h = 0;; ++h) {
                      var d = l[h];
                      if (p.isImmutable && (p = p.clone()), !(h + 1 < l.length && p[d] && "string" !== typeof p[d])) {
                          var y = p[a.annotations] = p[a.annotations] || {
                                  errors: {},
                                  missing: {}
                              },
                              g = p[d],
                              v = d || f.context.label;
                          void 0 !== g ? (y.errors[v] = y.errors[v] || [], y.errors[v].push(c)) : y.missing[v] = c;
                          break
                      }
                      p = p[d]
                  }
              var m = {
                      key: /_\$key\$_([, \d]+)_\$end\$_\"/g,
                      missing: /\"_\$miss\$_([^\|]+)\|(\d+)_\$end\$_\"\: \"__missing__\"/g,
                      arrayIndex: /\s*\"_\$idx\$_([, \d]+)_\$end\$_\",?\n(.*)/g,
                      specials: /"\[(NaN|Symbol.*|-?Infinity|function.*|\(.*)\]"/g
                  },
                  b = a.safeStringify(s, 2).replace(m.key, function(e, r) {
                      return '" ' + t + "[" + r + "]" + i
                  }).replace(m.missing, function(e, n, o) {
                      return r + '"' + n + '"' + i + t + " [" + o + "]: -- missing --" + i
                  }).replace(m.arrayIndex, function(e, r, n) {
                      return "\n" + n + " " + t + "[" + r + "]" + i
                  }).replace(m.specials, function(e, t) {
                      return t
                  });
              b = b + "\n" + t;
              for (var _ = 0; _ < this.details.length; ++_) {
                  b = b + "\n[" + (_ + 1) + "] " + this.details[_].message
              }
              return b += i
          }
      }, function(e, t) {
          function defaultSetTimout() {
              throw new Error("setTimeout has not been defined")
          }

          function defaultClearTimeout() {
              throw new Error("clearTimeout has not been defined")
          }

          function runTimeout(e) {
              if (r === setTimeout) return setTimeout(e, 0);
              if ((r === defaultSetTimout || !r) && setTimeout) return r = setTimeout, setTimeout(e, 0);
              try {
                  return r(e, 0)
              } catch (t) {
                  try {
                      return r.call(null, e, 0)
                  } catch (t) {
                      return r.call(this, e, 0)
                  }
              }
          }

          function runClearTimeout(e) {
              if (n === clearTimeout) return clearTimeout(e);
              if ((n === defaultClearTimeout || !n) && clearTimeout) return n = clearTimeout, clearTimeout(e);
              try {
                  return n(e)
              } catch (t) {
                  try {
                      return n.call(null, e)
                  } catch (t) {
                      return n.call(this, e)
                  }
              }
          }

          function cleanUpNextTick() {
              s && i && (s = !1, i.length ? a = i.concat(a) : u = -1, a.length && drainQueue())
          }

          function drainQueue() {
              if (!s) {
                  var e = runTimeout(cleanUpNextTick);
                  s = !0;
                  for (var t = a.length; t;) {
                      for (i = a, a = []; ++u < t;) i && i[u].run();
                      u = -1, t = a.length
                  }
                  i = null, s = !1, runClearTimeout(e)
              }
          }

          function Item(e, t) {
              this.fun = e, this.array = t
          }

          function noop() {}
          var r, n, o = e.exports = {};
          ! function() {
              try {
                  r = "function" === typeof setTimeout ? setTimeout : defaultSetTimout
              } catch (e) {
                  r = defaultSetTimout
              }
              try {
                  n = "function" === typeof clearTimeout ? clearTimeout : defaultClearTimeout
              } catch (e) {
                  n = defaultClearTimeout
              }
          }();
          var i, a = [],
              s = !1,
              u = -1;
          o.nextTick = function(e) {
              var t = new Array(arguments.length - 1);
              if (arguments.length > 1)
                  for (var r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
              a.push(new Item(e, t)), 1 !== a.length || s || runTimeout(drainQueue)
          }, Item.prototype.run = function() {
              this.fun.apply(null, this.array)
          }, o.title = "browser", o.browser = !0, o.env = {}, o.argv = [], o.version = "", o.versions = {}, o.on = noop, o.addListener = noop, o.once = noop, o.off = noop, o.removeListener = noop, o.removeAllListeners = noop, o.emit = noop, o.prependListener = noop, o.prependOnceListener = noop, o.listeners = function(e) {
              return []
          }, o.binding = function(e) {
              throw new Error("process.binding is not supported")
          }, o.cwd = function() {
              return "/"
          }, o.chdir = function(e) {
              throw new Error("process.chdir is not supported")
          }, o.umask = function() {
              return 0
          }
      }, function(e, t, r) {
          "use strict";

          function _defaults(e, t) {
              for (var r = Object.getOwnPropertyNames(t), n = 0; n < r.length; n++) {
                  var o = r[n],
                      i = Object.getOwnPropertyDescriptor(t, o);
                  i && i.configurable && void 0 === e[o] && Object.defineProperty(e, o, i)
              }
              return e
          }

          function _defineProperty(e, t, r) {
              return t in e ? Object.defineProperty(e, t, {
                  value: r,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0
              }) : e[t] = r, e
          }

          function _classCallCheck(e, t) {
              if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
          }

          function _possibleConstructorReturn(e, t) {
              if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              return !t || "object" !== typeof t && "function" !== typeof t ? e : t
          }

          function _inherits(e, t) {
              if ("function" !== typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
              e.prototype = Object.create(t && t.prototype, {
                  constructor: {
                      value: e,
                      enumerable: !1,
                      writable: !0,
                      configurable: !0
                  }
              }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : _defaults(e, t))
          }

          function _toConsumableArray(e) {
              if (Array.isArray(e)) {
                  for (var t = 0, r = Array(e.length); t < e.length; t++) r[t] = e[t];
                  return r
              }
              return Array.from(e)
          }
          var n = Object.assign || function(e) {
                  for (var t = 1; t < arguments.length; t++) {
                      var r = arguments[t];
                      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
                  }
                  return e
              },
              o = r(0),
              i = r(2),
              a = r(4),
              s = r(6),
              u = r(26),
              c = r(1),
              f = r(11),
              l = {
                  alternatives: r(10),
                  array: r(22),
                  boolean: r(24),
                  binary: r(23),
                  date: r(12),
                  func: r(25),
                  number: r(27),
                  object: r(13),
                  string: r(28)
              };
          l.callWithDefaults = function(e, t) {
              var r;
              return o.assert(this, "Must be invoked on a Joi instance."), this._defaults && (e = this._defaults(e)), e._currentJoi = this, (r = e)._init.apply(r, _toConsumableArray(t))
          }, l.root = function() {
              var e = new i,
                  t = e.clone();
              return i.prototype._currentJoi = t, t._currentJoi = t, t.any = function() {
                  for (var t = arguments.length, r = Array(t), n = 0; n < t; n++) r[n] = arguments[n];
                  return o.assert(0 === r.length, "Joi.any() does not allow arguments."), l.callWithDefaults.call(this, e, r)
              }, t.alternatives = t.alt = function() {
                  for (var e = arguments.length, t = Array(e), r = 0; r < e; r++) t[r] = arguments[r];
                  return l.callWithDefaults.call(this, l.alternatives, t)
              }, t.array = function() {
                  for (var e = arguments.length, t = Array(e), r = 0; r < e; r++) t[r] = arguments[r];
                  return o.assert(0 === t.length, "Joi.array() does not allow arguments."), l.callWithDefaults.call(this, l.array, t)
              }, t.boolean = t.bool = function() {
                  for (var e = arguments.length, t = Array(e), r = 0; r < e; r++) t[r] = arguments[r];
                  return o.assert(0 === t.length, "Joi.boolean() does not allow arguments."), l.callWithDefaults.call(this, l.boolean, t)
              }, t.binary = function() {
                  for (var e = arguments.length, t = Array(e), r = 0; r < e; r++) t[r] = arguments[r];
                  return o.assert(0 === t.length, "Joi.binary() does not allow arguments."), l.callWithDefaults.call(this, l.binary, t)
              }, t.date = function() {
                  for (var e = arguments.length, t = Array(e), r = 0; r < e; r++) t[r] = arguments[r];
                  return o.assert(0 === t.length, "Joi.date() does not allow arguments."), l.callWithDefaults.call(this, l.date, t)
              }, t.func = function() {
                  for (var e = arguments.length, t = Array(e), r = 0; r < e; r++) t[r] = arguments[r];
                  return o.assert(0 === t.length, "Joi.func() does not allow arguments."), l.callWithDefaults.call(this, l.func, t)
              }, t.number = function() {
                  for (var e = arguments.length, t = Array(e), r = 0; r < e; r++) t[r] = arguments[r];
                  return o.assert(0 === t.length, "Joi.number() does not allow arguments."), l.callWithDefaults.call(this, l.number, t)
              }, t.object = function() {
                  for (var e = arguments.length, t = Array(e), r = 0; r < e; r++) t[r] = arguments[r];
                  return l.callWithDefaults.call(this, l.object, t)
              }, t.string = function() {
                  for (var e = arguments.length, t = Array(e), r = 0; r < e; r++) t[r] = arguments[r];
                  return o.assert(0 === t.length, "Joi.string() does not allow arguments."), l.callWithDefaults.call(this, l.string, t)
              }, t.ref = function() {
                  return c.create.apply(c, arguments)
              }, t.isRef = function(e) {
                  return c.isRef(e)
              }, t.validate = function(r) {
                  var n, o = (n = (arguments.length <= 1 ? 0 : arguments.length - 1) - 1 + 1, arguments.length <= n ? void 0 : arguments[n]),
                      i = "function" === typeof o ? o : null,
                      a = (arguments.length <= 1 ? 0 : arguments.length - 1) - (i ? 1 : 0);
                  if (0 === a) return e.validate(r, i);
                  var s = 2 === a ? arguments.length <= 2 ? void 0 : arguments[2] : {};
                  return t.compile(arguments.length <= 1 ? void 0 : arguments[1])._validateWithOptions(r, s, i)
              }, t.describe = function() {
                  return (arguments.length ? t.compile(arguments.length <= 0 ? void 0 : arguments[0]) : e).describe()
              }, t.compile = function(e) {
                  try {
                      return a.schema(this, e)
                  } catch (e) {
                      throw e.hasOwnProperty("path") && (e.message = e.message + "(" + e.path + ")"), e
                  }
              }, t.assert = function(e, r, n) {
                  t.attempt(e, r, n)
              }, t.attempt = function(e, r, n) {
                  var o = t.validate(e, r),
                      i = o.error;
                  if (i) {
                      if (!n) throw "function" === typeof i.annotate && (i.message = i.annotate()), i;
                      if (!(n instanceof Error)) throw "function" === typeof i.annotate && (i.message = n + " " + i.annotate()), i;
                      throw n
                  }
                  return o.value
              }, t.reach = function(e, t) {
                  o.assert(e && e instanceof i, "you must provide a joi schema"), o.assert(Array.isArray(t) || "string" === typeof t, "path must be a string or an array of strings");
                  var r = "string" === typeof t ? t ? t.split(".") : [] : t.slice();
                  return function reach(e, t) {
                      if (!t.length) return e;
                      var r = e._inner.children;
                      if (r)
                          for (var n = t.shift(), o = 0; o < r.length; ++o) {
                              var i = r[o];
                              if (i.key === n) return reach(i.schema, t)
                          }
                  }(e, r)
              }, t.lazy = function(e) {
                  return u.set(e)
              }, t.defaults = function(e) {
                  var t = this;
                  o.assert("function" === typeof e, "Defaults must be a function");
                  var r = Object.create(this.any());
                  return r = e(r), o.assert(r && r instanceof this.constructor, "defaults() must return a schema"), n(r, this, r.clone()), r._defaults = function(r) {
                      return t._defaults && (r = t._defaults(r), o.assert(r instanceof t.constructor, "defaults() must return a schema")), r = e(r), o.assert(r instanceof t.constructor, "defaults() must return a schema"), r
                  }, r
              }, t.extend = function() {
                  for (var e = this, r = arguments.length, u = Array(r), p = 0; p < r; p++) u[p] = arguments[p];
                  var h = o.flatten(u);
                  o.assert(h.length > 0, "You need to provide at least one extension"), this.assert(h, t.extensionsSchema);
                  var d = Object.create(this.any());
                  n(d, this);
                  for (var y = 0; y < h.length; ++y) ! function(r) {
                      var u = h[r];
                      "function" === typeof u && (u = u(d)), e.assert(u, t.extensionSchema);
                      var p = (u.base || e.any()).clone(),
                          y = p.constructor,
                          g = function(e) {
                              function type() {
                                  _classCallCheck(this, type);
                                  var t = _possibleConstructorReturn(this, e.call(this));
                                  return u.base && n(t, p), t._type = u.name, u.language && (t._settings = f.concat(t._settings, {
                                      language: _defineProperty({}, u.name, u.language)
                                  })), t
                              }
                              return _inherits(type, e), type
                          }(y);
                      if (u.coerce && (g.prototype._coerce = function(e, t, r) {
                              if (y.prototype._coerce) {
                                  var n = y.prototype._coerce.call(this, e, t, r);
                                  if (n.errors) return n;
                                  e = n.value
                              }
                              var o = u.coerce.call(this, e, t, r);
                              return o instanceof s.Err ? {
                                  value: e,
                                  errors: o
                              } : {
                                  value: o
                              }
                          }), u.pre && (g.prototype._base = function(e, t, r) {
                              if (y.prototype._base) {
                                  var n = y.prototype._base.call(this, e, t, r);
                                  if (n.errors) return n;
                                  e = n.value
                              }
                              var o = u.pre.call(this, e, t, r);
                              return o instanceof s.Err ? {
                                  value: e,
                                  errors: o
                              } : {
                                  value: o
                              }
                          }), u.rules)
                          for (var v = 0; v < u.rules.length; ++v) ! function(t) {
                              var r = u.rules[t],
                                  n = r.params ? r.params instanceof i ? r.params._inner.children.map(function(e) {
                                      return e.key
                                  }) : Object.keys(r.params) : [],
                                  s = r.params ? a.schema(e, r.params) : null;
                              g.prototype[r.name] = function() {
                                  for (var e = arguments.length, t = Array(e), a = 0; a < e; a++) t[a] = arguments[a];
                                  if (t.length > n.length) throw new Error("Unexpected number of arguments");
                                  for (var u = !1, f = {}, l = 0; l < n.length; ++l) f[n[l]] = t[l], !u && c.isRef(t[l]) && (u = !0);
                                  s && (f = d.attempt(f, s));
                                  var p = void 0;
                                  if (r.validate) {
                                      var h = function(e, t, n) {
                                          return r.validate.call(this, f, e, t, n)
                                      };
                                      p = this._test(r.name, f, h, {
                                          description: r.description,
                                          hasRef: u
                                      })
                                  } else p = this.clone();
                                  if (r.setup) {
                                      var y = r.setup.call(p, f);
                                      void 0 !== y && (o.assert(y instanceof i, "Setup of extension Joi." + this._type + "()." + r.name + "() must return undefined or a Joi object"), p = y)
                                  }
                                  return p
                              }
                          }(v);
                      u.describe && (g.prototype.describe = function() {
                          var e = y.prototype.describe.call(this);
                          return u.describe.call(this, e)
                      });
                      var m = new g;
                      d[u.name] = function() {
                          for (var e = arguments.length, t = Array(e), r = 0; r < e; r++) t[r] = arguments[r];
                          return l.callWithDefaults.call(this, m, t)
                      }
                  }(y);
                  return d
              }, t.extensionSchema = l.object.keys({
                  base: l.object.type(i, "Joi object"),
                  name: l.string.required(),
                  coerce: l.func.arity(3),
                  pre: l.func.arity(3),
                  language: l.object,
                  describe: l.func.arity(1),
                  rules: l.array.items(l.object.keys({
                      name: l.string.required(),
                      setup: l.func.arity(1),
                      validate: l.func.arity(4),
                      params: [l.object.pattern(/.*/, l.object.type(i, "Joi object")), l.object.type(l.object.constructor, "Joi object")],
                      description: [l.string, l.func.arity(1)]
                  }).or("setup", "validate"))
              }).strict(), t.extensionsSchema = l.array.items([l.object, l.func.arity(1)]).strict(), t.version = r(36).version, t
          }, e.exports = l.root()
      }, function(e, t, r) {
          "use strict";
          (function(t) {
              function _toConsumableArray(e) {
                  if (Array.isArray(e)) {
                      for (var t = 0, r = Array(e.length); t < e.length; t++) r[t] = e[t];
                      return r
                  }
                  return Array.from(e)
              }

              function _classCallCheck(e, t) {
                  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
              }
              var n = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function(e) {
                      return typeof e
                  } : function(e) {
                      return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                  },
                  o = r(1),
                  i = {};
              i.extendedCheckForValue = function(e, r) {
                  var o = "undefined" === typeof e ? "undefined" : n(e);
                  if ("object" === o) {
                      if (e instanceof Date) return function(t) {
                          return t instanceof Date && e.getTime() === t.getTime()
                      };
                      if (t.isBuffer(e)) return function(r) {
                          return t.isBuffer(r) && e.length === r.length && e.toString("binary") === r.toString("binary")
                      }
                  } else if (r && "string" === o) {
                      var i = e.toLowerCase();
                      return function(e) {
                          return "string" === typeof e && i === e.toLowerCase()
                      }
                  }
                  return null
              }, e.exports = function() {
                  function InternalSet(e) {
                      _classCallCheck(this, InternalSet), this._set = new Set(e), this._hasRef = !1
                  }
                  return InternalSet.prototype.add = function(e, t) {
                      var r = o.isRef(e);
                      return !r && this.has(e, null, null, !1) ? this : (void 0 !== t && o.push(t, e), this._set.add(e), this._hasRef |= r, this)
                  }, InternalSet.prototype.merge = function(e, t) {
                      var r = !0,
                          n = !1,
                          o = void 0;
                      try {
                          for (var i, a = e._set[Symbol.iterator](); !(r = (i = a.next()).done); r = !0) {
                              var s = i.value;
                              this.add(s)
                          }
                      } catch (e) {
                          n = !0, o = e
                      } finally {
                          try {
                              !r && a.return && a.return()
                          } finally {
                              if (n) throw o
                          }
                      }
                      var u = !0,
                          c = !1,
                          f = void 0;
                      try {
                          for (var l, p = t._set[Symbol.iterator](); !(u = (l = p.next()).done); u = !0) {
                              var h = l.value;
                              this.remove(h)
                          }
                      } catch (e) {
                          c = !0, f = e
                      } finally {
                          try {
                              !u && p.return && p.return()
                          } finally {
                              if (c) throw f
                          }
                      }
                      return this
                  }, InternalSet.prototype.remove = function(e) {
                      return this._set.delete(e), this
                  }, InternalSet.prototype.has = function(e, t, r, n) {
                      if (!this._set.size) return !1;
                      var a = this._set.has(e);
                      if (a) return a;
                      var s = i.extendedCheckForValue(e, n);
                      if (!s) {
                          if (t && this._hasRef) {
                              var u = !0,
                                  c = !1,
                                  f = void 0;
                              try {
                                  for (var l, p = this._set[Symbol.iterator](); !(u = (l = p.next()).done); u = !0) {
                                      var h = l.value;
                                      if (o.isRef(h) && (h = h(t.reference || t.parent, r), e === h || Array.isArray(h) && h.includes(e))) return !0
                                  }
                              } catch (e) {
                                  c = !0, f = e
                              } finally {
                                  try {
                                      !u && p.return && p.return()
                                  } finally {
                                      if (c) throw f
                                  }
                              }
                          }
                          return !1
                      }
                      return this._has(e, t, r, s)
                  }, InternalSet.prototype._has = function(e, t, r, n) {
                      var i = !(!t || !this._hasRef),
                          a = function(t) {
                              return e === t || n(t)
                          },
                          s = !0,
                          u = !1,
                          c = void 0;
                      try {
                          for (var f, l = this._set[Symbol.iterator](); !(s = (f = l.next()).done); s = !0) {
                              var p = f.value;
                              if (i && o.isRef(p) && (p = p(t.reference || t.parent, r), Array.isArray(p))) {
                                  if (p.find(a)) return !0
                              } else if (a(p)) return !0
                          }
                      } catch (e) {
                          u = !0, c = e
                      } finally {
                          try {
                              !s && l.return && l.return()
                          } finally {
                              if (u) throw c
                          }
                      }
                      return !1
                  }, InternalSet.prototype.values = function(e) {
                      if (e && e.stripUndefined) {
                          var t = [],
                              r = !0,
                              n = !1,
                              o = void 0;
                          try {
                              for (var i, a = this._set[Symbol.iterator](); !(r = (i = a.next()).done); r = !0) {
                                  var s = i.value;
                                  void 0 !== s && t.push(s)
                              }
                          } catch (e) {
                              n = !0, o = e
                          } finally {
                              try {
                                  !r && a.return && a.return()
                              } finally {
                                  if (n) throw o
                              }
                          }
                          return t
                      }
                      return Array.from(this._set)
                  }, InternalSet.prototype.slice = function() {
                      var e = new InternalSet(this._set);
                      return e._hasRef = this._hasRef, e
                  }, InternalSet.prototype.concat = function(e) {
                      var t = new InternalSet([].concat(_toConsumableArray(this._set), _toConsumableArray(e._set)));
                      return t._hasRef = !!(this._hasRef | e._hasRef), t
                  }, InternalSet
              }()
          }).call(t, r(3).Buffer)
      }, function(e, t, r) {
          "use strict";

          function _defaults(e, t) {
              for (var r = Object.getOwnPropertyNames(t), n = 0; n < r.length; n++) {
                  var o = r[n],
                      i = Object.getOwnPropertyDescriptor(t, o);
                  i && i.configurable && void 0 === e[o] && Object.defineProperty(e, o, i)
              }
              return e
          }

          function _classCallCheck(e, t) {
              if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
          }

          function _possibleConstructorReturn(e, t) {
              if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              return !t || "object" !== typeof t && "function" !== typeof t ? e : t
          }

          function _inherits(e, t) {
              if ("function" !== typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
              e.prototype = Object.create(t && t.prototype, {
                  constructor: {
                      value: e,
                      enumerable: !1,
                      writable: !0,
                      configurable: !0
                  }
              }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : _defaults(e, t))
          }
          var n = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function(e) {
                  return typeof e
              } : function(e) {
                  return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
              },
              o = r(0),
              i = r(2),
              a = r(4),
              s = r(1),
              u = {};
          u.Alternatives = function(e) {
              function _class() {
                  _classCallCheck(this, _class);
                  var t = _possibleConstructorReturn(this, e.call(this));
                  return t._type = "alternatives", t._invalids.remove(null), t._inner.matches = [], t
              }
              return _inherits(_class, e), _class.prototype._init = function() {
                  return arguments.length ? this.try.apply(this, arguments) : this
              }, _class.prototype._base = function(e, t, r) {
                  for (var n = [], o = this._inner.matches.length, i = this._baseType, a = 0; a < o; ++a) {
                      var s = this._inner.matches[a];
                      if (s.schema) {
                          var u = s.schema._validate(e, t, r);
                          if (!u.errors) return u;
                          n = n.concat(u.errors)
                      } else {
                          var c = s.peek || s.is,
                              f = s.is ? s.ref(t.reference || t.parent, r) : e;
                          if (c._validate(f, null, r, t.parent).errors) {
                              if (s.otherwise) return s.otherwise._validate(e, t, r)
                          } else if (s.then) return s.then._validate(e, t, r);
                          if (a === o - 1 && i) return i._validate(e, t, r)
                      }
                  }
                  return n.length ? {
                      errors: this.createError("alternatives.child", {
                          reason: n
                      }, t, r)
                  } : {
                      errors: this.createError("alternatives.base", null, t, r)
                  }
              }, _class.prototype.try = function() {
                  for (var e = arguments.length, t = Array(e), r = 0; r < e; r++) t[r] = arguments[r];
                  t = o.flatten(t), o.assert(t.length, "Cannot add other alternatives without at least one schema");
                  for (var n = this.clone(), i = 0; i < t.length; ++i) {
                      var s = a.schema(this._currentJoi, t[i]);
                      s._refs.length && (n._refs = n._refs.concat(s._refs)), n._inner.matches.push({
                          schema: s
                      })
                  }
                  return n
              }, _class.prototype.when = function(e, t) {
                  var r = !1;
                  o.assert(s.isRef(e) || "string" === typeof e || (r = e instanceof i), "Invalid condition:", e), o.assert(t, "Missing options"), o.assert("object" === ("undefined" === typeof t ? "undefined" : n(t)), "Invalid options"), r ? o.assert(!t.hasOwnProperty("is"), '"is" can not be used with a schema condition') : o.assert(t.hasOwnProperty("is"), 'Missing "is" directive'), o.assert(void 0 !== t.then || void 0 !== t.otherwise, 'options must have at least one of "then" or "otherwise"');
                  var u = this.clone(),
                      c = void 0;
                  r || (c = a.schema(this._currentJoi, t.is), null !== t.is && (s.isRef(t.is) || t.is instanceof i) || (c = c.required()));
                  var f = {
                      ref: r ? null : a.ref(e),
                      peek: r ? e : null,
                      is: c,
                      then: void 0 !== t.then ? a.schema(this._currentJoi, t.then) : void 0,
                      otherwise: void 0 !== t.otherwise ? a.schema(this._currentJoi, t.otherwise) : void 0
                  };
                  return u._baseType && (f.then = f.then && u._baseType.concat(f.then), f.otherwise = f.otherwise && u._baseType.concat(f.otherwise)), r || (s.push(u._refs, f.ref), u._refs = u._refs.concat(f.is._refs)), f.then && f.then._refs && (u._refs = u._refs.concat(f.then._refs)), f.otherwise && f.otherwise._refs && (u._refs = u._refs.concat(f.otherwise._refs)), u._inner.matches.push(f), u
              }, _class.prototype.describe = function() {
                  for (var e = i.prototype.describe.call(this), t = [], r = 0; r < this._inner.matches.length; ++r) {
                      var n = this._inner.matches[r];
                      if (n.schema) t.push(n.schema.describe());
                      else {
                          var o = n.is ? {
                              ref: n.ref.toString(),
                              is: n.is.describe()
                          } : {
                              peek: n.peek.describe()
                          };
                          n.then && (o.then = n.then.describe()), n.otherwise && (o.otherwise = n.otherwise.describe()), t.push(o)
                      }
                  }
                  return e.alternatives = t, e
              }, _class
          }(i), e.exports = new u.Alternatives
      }, function(e, t, r) {
          "use strict";
          var n = Object.assign || function(e) {
                  for (var t = 1; t < arguments.length; t++) {
                      var r = arguments[t];
                      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
                  }
                  return e
              },
              o = r(0);
          t.concat = function(e, t) {
              if (!t) return e;
              for (var r = n({}, e), i = Object.keys(t), a = 0; a < i.length; ++a) {
                  var s = i[a];
                  "language" === s && r.hasOwnProperty(s) ? r[s] = o.applyToDefaults(r[s], t[s]) : r[s] = t[s]
              }
              return r
          }
      }, function(e, t, r) {
          "use strict";

          function _defaults(e, t) {
              for (var r = Object.getOwnPropertyNames(t), n = 0; n < r.length; n++) {
                  var o = r[n],
                      i = Object.getOwnPropertyDescriptor(t, o);
                  i && i.configurable && void 0 === e[o] && Object.defineProperty(e, o, i)
              }
              return e
          }

          function _classCallCheck(e, t) {
              if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
          }

          function _possibleConstructorReturn(e, t) {
              if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              return !t || "object" !== typeof t && "function" !== typeof t ? e : t
          }

          function _inherits(e, t) {
              if ("function" !== typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
              e.prototype = Object.create(t && t.prototype, {
                  constructor: {
                      value: e,
                      enumerable: !1,
                      writable: !0,
                      configurable: !0
                  }
              }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : _defaults(e, t))
          }
          var n = r(2),
              o = r(1),
              i = r(0),
              a = {};
          a.isoDate = /^(?:[-+]\d{2})?(?:\d{4}(?!\d{2}\b))(?:(-?)(?:(?:0[1-9]|1[0-2])(?:\1(?:[12]\d|0[1-9]|3[01]))?|W(?:[0-4]\d|5[0-2])(?:-?[1-7])?|(?:00[1-9]|0[1-9]\d|[12]\d{2}|3(?:[0-5]\d|6[1-6])))(?![T]$|[T][\d]+Z$)(?:[T\s](?:(?:(?:[01]\d|2[0-3])(?:(:?)[0-5]\d)?|24\:?00)(?:[.,]\d+(?!:))?)(?:\2[0-5]\d(?:[.,]\d+)?)?(?:[Z]|(?:[+-])(?:[01]\d|2[0-3])(?::?[0-5]\d)?)?)?)?$/, a.invalidDate = new Date(""), a.isIsoDate = function() {
              var e = a.isoDate.toString();
              return function(t) {
                  return t && t.toString() === e
              }
          }(), a.Date = function(e) {
              function _class() {
                  _classCallCheck(this, _class);
                  var t = _possibleConstructorReturn(this, e.call(this));
                  return t._type = "date", t
              }
              return _inherits(_class, e), _class.prototype._base = function(e, t, r) {
                  var n = {
                      value: r.convert && a.Date.toDate(e, this._flags.format, this._flags.timestamp, this._flags.multiplier) || e
                  };
                  if (n.value instanceof Date && !isNaN(n.value.getTime())) n.errors = null;
                  else if (r.convert) {
                      var o = void 0;
                      o = a.isIsoDate(this._flags.format) ? "isoDate" : this._flags.timestamp ? "timestamp." + this._flags.timestamp : "base", n.errors = this.createError("date." + o, null, t, r)
                  } else n.errors = this.createError("date.strict", null, t, r);
                  return n
              }, _class.toDate = function(e, t, r, n) {
                  if (e instanceof Date) return e;
                  if ("string" === typeof e || "number" === typeof e && !isNaN(e) && isFinite(e)) {
                      "string" === typeof e && /^[+-]?\d+(\.\d+)?$/.test(e) && (e = parseFloat(e));
                      var o = void 0;
                      if (o = t && a.isIsoDate(t) ? t.test(e) ? new Date(e) : a.invalidDate : r && n ? /^\s*$/.test(e) ? a.invalidDate : new Date(e * n) : new Date(e), !isNaN(o.getTime())) return o
                  }
                  return null
              }, _class.prototype.iso = function() {
                  if (this._flags.format === a.isoDate) return this;
                  var e = this.clone();
                  return e._flags.format = a.isoDate, e
              }, _class.prototype.timestamp = function() {
                  var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "javascript",
                      t = ["javascript", "unix"];
                  if (i.assert(t.includes(e), '"type" must be one of "' + t.join('", "') + '"'), this._flags.timestamp === e) return this;
                  var r = this.clone();
                  return r._flags.timestamp = e, r._flags.multiplier = "unix" === e ? 1e3 : 1, r
              }, _class.prototype._isIsoDate = function(e) {
                  return a.isoDate.test(e)
              }, _class
          }(n), a.compare = function(e, t) {
              return function(r) {
                  var n = "now" === r,
                      s = o.isRef(r);
                  return n || s || (r = a.Date.toDate(r)), i.assert(r, "Invalid date format"), this._test(e, r, function(o, i, u) {
                      var c = void 0;
                      if (n) c = Date.now();
                      else if (s) {
                          if (!(c = a.Date.toDate(r(i.reference || i.parent, u)))) return this.createError("date.ref", {
                              ref: r.key
                          }, i, u);
                          c = c.getTime()
                      } else c = r.getTime();
                      return t(o.getTime(), c) ? o : this.createError("date." + e, {
                          limit: new Date(c)
                      }, i, u)
                  })
              }
          }, a.Date.prototype.min = a.compare("min", function(e, t) {
              return e >= t
          }), a.Date.prototype.max = a.compare("max", function(e, t) {
              return e <= t
          }), a.Date.prototype.greater = a.compare("greater", function(e, t) {
              return e > t
          }), a.Date.prototype.less = a.compare("less", function(e, t) {
              return e < t
          }), e.exports = new a.Date
      }, function(e, t, r) {
          "use strict";

          function _defaults(e, t) {
              for (var r = Object.getOwnPropertyNames(t), n = 0; n < r.length; n++) {
                  var o = r[n],
                      i = Object.getOwnPropertyDescriptor(t, o);
                  i && i.configurable && void 0 === e[o] && Object.defineProperty(e, o, i)
              }
              return e
          }

          function _classCallCheck(e, t) {
              if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
          }

          function _possibleConstructorReturn(e, t) {
              if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              return !t || "object" !== typeof t && "function" !== typeof t ? e : t
          }

          function _inherits(e, t) {
              if ("function" !== typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
              e.prototype = Object.create(t && t.prototype, {
                  constructor: {
                      value: e,
                      enumerable: !1,
                      writable: !0,
                      configurable: !0
                  }
              }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : _defaults(e, t))
          }
          var n = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function(e) {
                  return typeof e
              } : function(e) {
                  return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
              },
              o = r(0),
              i = r(31),
              a = r(2),
              s = r(6),
              u = r(4),
              c = {};
          c.Object = function(e) {
              function _class() {
                  _classCallCheck(this, _class);
                  var t = _possibleConstructorReturn(this, e.call(this));
                  return t._type = "object", t._inner.children = null, t._inner.renames = [], t._inner.dependencies = [], t._inner.patterns = [], t
              }
              return _inherits(_class, e), _class.prototype._init = function() {
                  return arguments.length ? this.keys.apply(this, arguments) : this
              }, _class.prototype._base = function(e, t, r) {
                  var i = e,
                      a = [],
                      u = function() {
                          return {
                              value: i,
                              errors: a.length ? a : null
                          }
                      };
                  "string" === typeof e && r.convert && (e = c.safeParse(e));
                  var f = this._flags.func ? "function" : "object";
                  if (!e || ("undefined" === typeof e ? "undefined" : n(e)) !== f || Array.isArray(e)) return a.push(this.createError(f + ".base", null, t, r)), u();
                  if (!this._inner.renames.length && !this._inner.dependencies.length && !this._inner.children && !this._inner.patterns.length) return i = e, u();
                  if (i === e) {
                      "object" === f ? i = Object.create(Object.getPrototypeOf(e)) : (i = function() {
                          for (var t = arguments.length, r = Array(t), n = 0; n < t; n++) r[n] = arguments[n];
                          return e.apply(this, r)
                      }, i.prototype = o.clone(e.prototype));
                      for (var l = Object.keys(e), p = 0; p < l.length; ++p) i[l[p]] = e[l[p]]
                  } else i = e;
                  for (var h = {}, d = 0; d < this._inner.renames.length; ++d) {
                      var y = this._inner.renames[d];
                      if (y.isRegExp) {
                          for (var g = Object.keys(i), v = [], m = 0; m < g.length; ++m) y.from.test(g[m]) && v.push(g[m]);
                          var b = v.every(function(e) {
                              return void 0 === i[e]
                          });
                          if (y.options.ignoreUndefined && b) continue;
                          if (!y.options.multiple && h[y.to] && (a.push(this.createError("object.rename.regex.multiple", {
                                  from: v,
                                  to: y.to
                              }, t, r)), r.abortEarly)) return u();
                          if (Object.prototype.hasOwnProperty.call(i, y.to) && !y.options.override && !h[y.to] && (a.push(this.createError("object.rename.regex.override", {
                                  from: v,
                                  to: y.to
                              }, t, r)), r.abortEarly)) return u();
                          if (b ? delete i[y.to] : i[y.to] = i[v[v.length - 1]], h[y.to] = !0, !y.options.alias)
                              for (var _ = 0; _ < v.length; ++_) delete i[v[_]]
                      } else {
                          if (y.options.ignoreUndefined && void 0 === i[y.from]) continue;
                          if (!y.options.multiple && h[y.to] && (a.push(this.createError("object.rename.multiple", {
                                  from: y.from,
                                  to: y.to
                              }, t, r)), r.abortEarly)) return u();
                          if (Object.prototype.hasOwnProperty.call(i, y.to) && !y.options.override && !h[y.to] && (a.push(this.createError("object.rename.override", {
                                  from: y.from,
                                  to: y.to
                              }, t, r)), r.abortEarly)) return u();
                          void 0 === i[y.from] ? delete i[y.to] : i[y.to] = i[y.from], h[y.to] = !0, y.options.alias || delete i[y.from]
                      }
                  }
                  if (!this._inner.children && !this._inner.patterns.length && !this._inner.dependencies.length) return u();
                  var w = new Set(Object.keys(i));
                  if (this._inner.children) {
                      for (var E = [], x = 0; x < this._inner.children.length; ++x) {
                          var S = this._inner.children[x],
                              k = S.key,
                              A = i[k];
                          w.delete(k);
                          var O = {
                                  key: k,
                                  path: t.path.concat(k),
                                  parent: i,
                                  reference: t.reference
                              },
                              T = S.schema._validate(A, O, r);
                          if (T.errors) {
                              if (a.push(this.createError("object.child", {
                                      key: k,
                                      child: S.schema._getLabel(k),
                                      reason: T.errors
                                  }, O, r)), r.abortEarly) return u()
                          } else S.schema._flags.strip || void 0 === T.value && T.value !== A ? (E.push(k), i[k] = T.finalValue) : void 0 !== T.value && (i[k] = T.value)
                      }
                      for (var j = 0; j < E.length; ++j) delete i[E[j]]
                  }
                  if (w.size && this._inner.patterns.length) {
                      var B = !0,
                          C = !1,
                          I = void 0;
                      try {
                          for (var R, P = w[Symbol.iterator](); !(B = (R = P.next()).done); B = !0)
                              for (var D = R.value, L = {
                                      key: D,
                                      path: t.path.concat(D),
                                      parent: i,
                                      reference: t.reference
                                  }, N = i[D], U = 0; U < this._inner.patterns.length; ++U) {
                                  var F = this._inner.patterns[U];
                                  if (F.regex ? F.regex.test(D) : !F.schema.validate(D).error) {
                                      w.delete(D);
                                      var M = F.rule._validate(N, L, r);
                                      if (M.errors && (a.push(this.createError("object.child", {
                                              key: D,
                                              child: F.rule._getLabel(D),
                                              reason: M.errors
                                          }, L, r)), r.abortEarly)) return u();
                                      i[D] = M.value
                                  }
                              }
                      } catch (re) {
                          C = !0, I = re
                      } finally {
                          try {
                              !B && P.return && P.return()
                          } finally {
                              if (C) throw I
                          }
                      }
                  }
                  if (w.size && (this._inner.children || this._inner.patterns.length)) {
                      if (r.stripUnknown && !0 !== this._flags.allowUnknown || r.skipFunctions) {
                          var q = !!r.stripUnknown && (!0 === r.stripUnknown || !!r.stripUnknown.objects),
                              z = !0,
                              W = !1,
                              $ = void 0;
                          try {
                              for (var Y, H = w[Symbol.iterator](); !(z = (Y = H.next()).done); z = !0) {
                                  var G = Y.value;
                                  q ? (delete i[G], w.delete(G)) : "function" === typeof i[G] && w.delete(G)
                              }
                          } catch (re) {
                              W = !0, $ = re
                          } finally {
                              try {
                                  !z && H.return && H.return()
                              } finally {
                                  if (W) throw $
                              }
                          }
                      }
                      if (void 0 !== this._flags.allowUnknown ? !this._flags.allowUnknown : !r.allowUnknown) {
                          var J = !0,
                              X = !1,
                              V = void 0;
                          try {
                              for (var Q, Z = w[Symbol.iterator](); !(J = (Q = Z.next()).done); J = !0) {
                                  var K = Q.value;
                                  a.push(this.createError("object.allowUnknown", {
                                      child: K
                                  }, {
                                      key: K,
                                      path: t.path.concat(K)
                                  }, r, {}))
                              }
                          } catch (re) {
                              X = !0, V = re
                          } finally {
                              try {
                                  !J && Z.return && Z.return()
                              } finally {
                                  if (X) throw V
                              }
                          }
                      }
                  }
                  for (var ee = 0; ee < this._inner.dependencies.length; ++ee) {
                      var te = this._inner.dependencies[ee],
                          re = c[te.type].call(this, null !== te.key && i[te.key], te.peers, i, {
                              key: te.key,
                              path: null === te.key ? t.path : t.path.concat(te.key)
                          }, r);
                      if (re instanceof s.Err && (a.push(re), r.abortEarly)) return u()
                  }
                  return u()
              }, _class.prototype.keys = function(e) {
                  o.assert(null === e || void 0 === e || "object" === ("undefined" === typeof e ? "undefined" : n(e)), "Object schema must be a valid object"), o.assert(!e || !(e instanceof a), "Object schema cannot be a joi schema");
                  var t = this.clone();
                  if (!e) return t._inner.children = null, t;
                  var r = Object.keys(e);
                  if (!r.length) return t._inner.children = [], t;
                  var s = new i;
                  if (t._inner.children)
                      for (var c = 0; c < t._inner.children.length; ++c) {
                          var f = t._inner.children[c];
                          r.includes(f.key) || s.add(f, {
                              after: f._refs,
                              group: f.key
                          })
                      }
                  for (var l = 0; l < r.length; ++l) {
                      var p = r[l],
                          h = e[p];
                      try {
                          var d = u.schema(this._currentJoi, h);
                          s.add({
                              key: p,
                              schema: d
                          }, {
                              after: d._refs,
                              group: p
                          })
                      } catch (e) {
                          throw e.hasOwnProperty("path") ? e.path = p + "." + e.path : e.path = p, e
                      }
                  }
                  return t._inner.children = s.nodes, t
              }, _class.prototype.append = function(e) {
                  return null === e || void 0 === e || 0 === Object.keys(e).length ? this : this.keys(e)
              }, _class.prototype.unknown = function(e) {
                  var t = !1 !== e;
                  if (this._flags.allowUnknown === t) return this;
                  var r = this.clone();
                  return r._flags.allowUnknown = t, r
              }, _class.prototype.length = function(e) {
                  return o.assert(Number.isSafeInteger(e) && e >= 0, "limit must be a positive integer"), this._test("length", e, function(t, r, n) {
                      return Object.keys(t).length === e ? t : this.createError("object.length", {
                          limit: e
                      }, r, n)
                  })
              }, _class.prototype.min = function(e) {
                  return o.assert(Number.isSafeInteger(e) && e >= 0, "limit must be a positive integer"), this._test("min", e, function(t, r, n) {
                      return Object.keys(t).length >= e ? t : this.createError("object.min", {
                          limit: e
                      }, r, n)
                  })
              }, _class.prototype.max = function(e) {
                  return o.assert(Number.isSafeInteger(e) && e >= 0, "limit must be a positive integer"), this._test("max", e, function(t, r, n) {
                      return Object.keys(t).length <= e ? t : this.createError("object.max", {
                          limit: e
                      }, r, n)
                  })
              }, _class.prototype.pattern = function(e, t) {
                  var r = e instanceof RegExp;
                  o.assert(r || e instanceof a, "pattern must be a regex or schema"), o.assert(void 0 !== t, "Invalid rule"), r && (e = new RegExp(e.source, e.ignoreCase ? "i" : void 0));
                  try {
                      t = u.schema(this._currentJoi, t)
                  } catch (e) {
                      throw e.hasOwnProperty("path") && (e.message = e.message + "(" + e.path + ")"), e
                  }
                  var n = this.clone();
                  return r ? n._inner.patterns.push({
                      regex: e,
                      rule: t
                  }) : n._inner.patterns.push({
                      schema: e,
                      rule: t
                  }), n
              }, _class.prototype.schema = function() {
                  return this._test("schema", null, function(e, t, r) {
                      return e instanceof a ? e : this.createError("object.schema", null, t, r)
                  })
              }, _class.prototype.with = function(e, t) {
                  return o.assert(2 === arguments.length, "Invalid number of arguments, expected 2."), this._dependency("with", e, t)
              }, _class.prototype.without = function(e, t) {
                  return o.assert(2 === arguments.length, "Invalid number of arguments, expected 2."), this._dependency("without", e, t)
              }, _class.prototype.xor = function() {
                  for (var e = arguments.length, t = Array(e), r = 0; r < e; r++) t[r] = arguments[r];
                  return t = o.flatten(t), this._dependency("xor", null, t)
              }, _class.prototype.or = function() {
                  for (var e = arguments.length, t = Array(e), r = 0; r < e; r++) t[r] = arguments[r];
                  return t = o.flatten(t), this._dependency("or", null, t)
              }, _class.prototype.and = function() {
                  for (var e = arguments.length, t = Array(e), r = 0; r < e; r++) t[r] = arguments[r];
                  return t = o.flatten(t), this._dependency("and", null, t)
              }, _class.prototype.nand = function() {
                  for (var e = arguments.length, t = Array(e), r = 0; r < e; r++) t[r] = arguments[r];
                  return t = o.flatten(t), this._dependency("nand", null, t)
              }, _class.prototype.requiredKeys = function() {
                  for (var e = arguments.length, t = Array(e), r = 0; r < e; r++) t[r] = arguments[r];
                  return t = o.flatten(t), this.applyFunctionToChildren(t, "required")
              }, _class.prototype.optionalKeys = function() {
                  for (var e = arguments.length, t = Array(e), r = 0; r < e; r++) t[r] = arguments[r];
                  return t = o.flatten(t), this.applyFunctionToChildren(t, "optional")
              }, _class.prototype.forbiddenKeys = function() {
                  for (var e = arguments.length, t = Array(e), r = 0; r < e; r++) t[r] = arguments[r];
                  return t = o.flatten(t), this.applyFunctionToChildren(t, "forbidden")
              }, _class.prototype.rename = function(e, t, r) {
                  o.assert("string" === typeof e || e instanceof RegExp, "Rename missing the from argument"), o.assert("string" === typeof t, "Rename missing the to argument"), o.assert(t !== e, "Cannot rename key to same name:", e);
                  for (var n = 0; n < this._inner.renames.length; ++n) o.assert(this._inner.renames[n].from !== e, "Cannot rename the same key multiple times");
                  var i = this.clone();
                  return i._inner.renames.push({
                      from: e,
                      to: t,
                      options: o.applyToDefaults(c.renameDefaults, r || {}),
                      isRegExp: e instanceof RegExp
                  }), i
              }, _class.prototype.applyFunctionToChildren = function(e, t, r, n) {
                  e = [].concat(e), o.assert(e.length > 0, "expected at least one children");
                  var i = c.groupChildren(e),
                      a = void 0;
                  if ("" in i ? (a = this[t].apply(this, r), delete i[""]) : a = this.clone(), a._inner.children) {
                      n = n ? n + "." : "";
                      for (var s = 0; s < a._inner.children.length; ++s) {
                          var u = a._inner.children[s],
                              f = i[u.key];
                          f && (a._inner.children[s] = {
                              key: u.key,
                              _refs: u._refs,
                              schema: u.schema.applyFunctionToChildren(f, t, r, n + u.key)
                          }, delete i[u.key])
                      }
                  }
                  var l = Object.keys(i);
                  return o.assert(0 === l.length, "unknown key(s)", l.join(", ")), a
              }, _class.prototype._dependency = function(e, t, r) {
                  r = [].concat(r);
                  for (var n = 0; n < r.length; ++n) o.assert("string" === typeof r[n], e, "peers must be a string or array of strings");
                  var i = this.clone();
                  return i._inner.dependencies.push({
                      type: e,
                      key: t,
                      peers: r
                  }), i
              }, _class.prototype.describe = function(e) {
                  var t = a.prototype.describe.call(this);
                  if (t.rules)
                      for (var r = 0; r < t.rules.length; ++r) {
                          var i = t.rules[r];
                          i.arg && "object" === n(i.arg) && i.arg.schema && i.arg.ref && (i.arg = {
                              schema: i.arg.schema.describe(),
                              ref: i.arg.ref.toString()
                          })
                      }
                  if (this._inner.children && !e) {
                      t.children = {};
                      for (var s = 0; s < this._inner.children.length; ++s) {
                          var u = this._inner.children[s];
                          t.children[u.key] = u.schema.describe()
                      }
                  }
                  if (this._inner.dependencies.length && (t.dependencies = o.clone(this._inner.dependencies)), this._inner.patterns.length) {
                      t.patterns = [];
                      for (var c = 0; c < this._inner.patterns.length; ++c) {
                          var f = this._inner.patterns[c];
                          f.regex ? t.patterns.push({
                              regex: f.regex.toString(),
                              rule: f.rule.describe()
                          }) : t.patterns.push({
                              schema: f.schema.describe(),
                              rule: f.rule.describe()
                          })
                      }
                  }
                  return this._inner.renames.length > 0 && (t.renames = o.clone(this._inner.renames)), t
              }, _class.prototype.assert = function(e, t, r) {
                  e = u.ref(e), o.assert(e.isContext || e.depth > 1, "Cannot use assertions for root level references - use direct key rules instead"), r = r || "pass the assertion test";
                  try {
                      t = u.schema(this._currentJoi, t)
                  } catch (e) {
                      throw e.hasOwnProperty("path") && (e.message = e.message + "(" + e.path + ")"), e
                  }
                  var n = e.path[e.path.length - 1],
                      i = e.path.join(".");
                  return this._test("assert", {
                      schema: t,
                      ref: e
                  }, function(a, s, u) {
                      if (!t._validate(e(a), null, u, a).errors) return a;
                      var c = o.merge({}, s);
                      return c.key = n, c.path = e.path, this.createError("object.assert", {
                          ref: i,
                          message: r
                      }, c, u)
                  })
              }, _class.prototype.type = function(e) {
                  var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : e.name;
                  o.assert("function" === typeof e, "type must be a constructor function");
                  var r = {
                      name: t,
                      ctor: e
                  };
                  return this._test("type", r, function(t, n, o) {
                      return t instanceof e ? t : this.createError("object.type", {
                          type: r.name
                      }, n, o)
                  })
              }, _class
          }(a), c.safeParse = function(e) {
              try {
                  return JSON.parse(e)
              } catch (e) {}
              return e
          }, c.renameDefaults = {
              alias: !1,
              multiple: !1,
              override: !1
          }, c.groupChildren = function(e) {
              e.sort();
              for (var t = {}, r = 0; r < e.length; ++r) {
                  var n = e[r];
                  o.assert("string" === typeof n, "children must be strings");
                  var i = n.split(".")[0];
                  (t[i] = t[i] || []).push(n.substring(i.length + 1))
              }
              return t
          }, c.keysToLabels = function(e, t) {
              var r = e._inner.children;
              if (!r) return t;
              var n = function(e) {
                  var t = r.find(function(t) {
                      return t.key === e
                  });
                  return t ? t.schema._getLabel(e) : e
              };
              return Array.isArray(t) ? t.map(n) : n(t)
          }, c.with = function(e, t, r, n, o) {
              if (void 0 === e) return e;
              for (var i = 0; i < t.length; ++i) {
                  var a = t[i];
                  if (!Object.prototype.hasOwnProperty.call(r, a) || void 0 === r[a]) return this.createError("object.with", {
                      main: n.key,
                      mainWithLabel: c.keysToLabels(this, n.key),
                      peer: a,
                      peerWithLabel: c.keysToLabels(this, a)
                  }, n, o)
              }
              return e
          }, c.without = function(e, t, r, n, o) {
              if (void 0 === e) return e;
              for (var i = 0; i < t.length; ++i) {
                  var a = t[i];
                  if (Object.prototype.hasOwnProperty.call(r, a) && void 0 !== r[a]) return this.createError("object.without", {
                      main: n.key,
                      mainWithLabel: c.keysToLabels(this, n.key),
                      peer: a,
                      peerWithLabel: c.keysToLabels(this, a)
                  }, n, o)
              }
              return e
          }, c.xor = function(e, t, r, n, o) {
              for (var i = [], a = 0; a < t.length; ++a) {
                  var s = t[a];
                  Object.prototype.hasOwnProperty.call(r, s) && void 0 !== r[s] && i.push(s)
              }
              if (1 === i.length) return e;
              var u = {
                  peers: t,
                  peersWithLabels: c.keysToLabels(this, t)
              };
              return 0 === i.length ? this.createError("object.missing", u, n, o) : this.createError("object.xor", u, n, o)
          }, c.or = function(e, t, r, n, o) {
              for (var i = 0; i < t.length; ++i) {
                  var a = t[i];
                  if (Object.prototype.hasOwnProperty.call(r, a) && void 0 !== r[a]) return e
              }
              return this.createError("object.missing", {
                  peers: t,
                  peersWithLabels: c.keysToLabels(this, t)
              }, n, o)
          }, c.and = function(e, t, r, n, o) {
              for (var i = [], a = [], s = t.length, u = 0; u < s; ++u) {
                  var f = t[u];
                  Object.prototype.hasOwnProperty.call(r, f) && void 0 !== r[f] ? a.push(f) : i.push(f)
              }
              if (i.length !== s && a.length !== s) return this.createError("object.and", {
                  present: a,
                  presentWithLabels: c.keysToLabels(this, a),
                  missing: i,
                  missingWithLabels: c.keysToLabels(this, i)
              }, n, o)
          }, c.nand = function(e, t, r, n, i) {
              for (var a = [], s = 0; s < t.length; ++s) {
                  var u = t[s];
                  Object.prototype.hasOwnProperty.call(r, u) && void 0 !== r[u] && a.push(u)
              }
              var f = o.clone(t),
                  l = f.splice(0, 1)[0];
              return a.length === t.length ? this.createError("object.nand", {
                  main: l,
                  mainWithLabel: c.keysToLabels(this, l),
                  peers: f,
                  peersWithLabels: c.keysToLabels(this, f)
              }, n, i) : null
          }, e.exports = new c.Object
      }, function(e, t, r) {
          "use strict";
          var n = {
              rfc3986: {}
          };
          n.generate = function() {
              var e = "|";
              n.rfc3986.ipv4Cidr = "[0-9]|[1-2][0-9]|3[0-2]", n.rfc3986.ipv6Cidr = "(?:0?0?[0-9]|0?[1-9][0-9]|1[01][0-9]|12[0-8])";
              var t = "a-zA-Z0-9-\\._~",
                  r = "!\\$&'\\(\\)\\*\\+,;=",
                  o = t + "%0-9A-Fa-f" + r + ":@",
                  i = "[" + o + "]",
                  a = "(?:0?0?[0-9]|0?[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])";
              n.rfc3986.IPv4address = "(?:" + a + "\\.){3}" + a;
              var s = "[0-9A-Fa-f]{1,4}",
                  u = "(?:" + s + ":" + s + "|" + n.rfc3986.IPv4address + ")",
                  c = "(?:" + s + ":){6}" + u,
                  f = "::(?:" + s + ":){5}" + u,
                  l = "(?:" + s + ")?::(?:" + s + ":){4}" + u,
                  p = "(?:(?:" + s + ":){0,1}" + s + ")?::(?:" + s + ":){3}" + u,
                  h = "(?:(?:" + s + ":){0,2}" + s + ")?::(?:" + s + ":){2}" + u,
                  d = "(?:(?:" + s + ":){0,3}" + s + ")?::" + s + ":" + u,
                  y = "(?:(?:" + s + ":){0,4}" + s + ")?::" + u;
              n.rfc3986.IPv6address = "(?:" + c + e + f + e + l + e + p + e + h + e + d + e + y + e + "(?:(?:[0-9A-Fa-f]{1,4}:){0,5}[0-9A-Fa-f]{1,4})?::[0-9A-Fa-f]{1,4}" + e + "(?:(?:[0-9A-Fa-f]{1,4}:){0,6}[0-9A-Fa-f]{1,4})?::)", n.rfc3986.IPvFuture = "v[0-9A-Fa-f]+\\.[" + t + r + ":]+", n.rfc3986.scheme = "[a-zA-Z][a-zA-Z0-9+-\\.]*";
              var g = "\\[(?:" + n.rfc3986.IPv6address + e + n.rfc3986.IPvFuture + ")\\]",
                  v = "(?:" + g + e + n.rfc3986.IPv4address + e + "[a-zA-Z0-9-\\._~%0-9A-Fa-f!\\$&'\\(\\)\\*\\+,;=]{0,255})",
                  m = "(?:[a-zA-Z0-9-\\._~%0-9A-Fa-f!\\$&'\\(\\)\\*\\+,;=:]*@)?" + v + "(?::[0-9]*)?",
                  b = i + "+",
                  _ = "(?:\\/[a-zA-Z0-9-\\._~%0-9A-Fa-f!\\$&'\\(\\)\\*\\+,;=:@]*)*",
                  w = "\\/(?:" + b + _ + ")?";
              n.rfc3986.hierPart = "(?:(?:\\/\\/" + m + _ + ")" + e + w + e + "[a-zA-Z0-9-\\._~%0-9A-Fa-f!\\$&'\\(\\)\\*\\+,;=:@]+(?:\\/[a-zA-Z0-9-\\._~%0-9A-Fa-f!\\$&'\\(\\)\\*\\+,;=:@]*)*)", n.rfc3986.relativeRef = "(?:(?:\\/\\/" + m + _ + ")" + e + w + e + "[a-zA-Z0-9-\\._~%0-9A-Fa-f!\\$&'\\(\\)\\*\\+,;=@]+(?:\\/[a-zA-Z0-9-\\._~%0-9A-Fa-f!\\$&'\\(\\)\\*\\+,;=:@]*)*" + e + ")", n.rfc3986.query = "[" + o + "\\/\\?]*(?=#|$)", n.rfc3986.fragment = "[" + o + "\\/\\?]*"
          }, n.generate(), e.exports = n.rfc3986
      }, function(e, t) {}, function(e, t, r) {
          (function(e, n) {
              function inspect(e, r) {
                  var n = {
                      seen: [],
                      stylize: stylizeNoColor
                  };
                  return arguments.length >= 3 && (n.depth = arguments[2]), arguments.length >= 4 && (n.colors = arguments[3]), isBoolean(r) ? n.showHidden = r : r && t._extend(n, r), isUndefined(n.showHidden) && (n.showHidden = !1), isUndefined(n.depth) && (n.depth = 2), isUndefined(n.colors) && (n.colors = !1), isUndefined(n.customInspect) && (n.customInspect = !0), n.colors && (n.stylize = stylizeWithColor), formatValue(n, e, n.depth)
              }

              function stylizeWithColor(e, t) {
                  var r = inspect.styles[t];
                  return r ? "\x1b[" + inspect.colors[r][0] + "m" + e + "\x1b[" + inspect.colors[r][1] + "m" : e
              }

              function stylizeNoColor(e, t) {
                  return e
              }

              function arrayToHash(e) {
                  var t = {};
                  return e.forEach(function(e, r) {
                      t[e] = !0
                  }), t
              }

              function formatValue(e, r, n) {
                  if (e.customInspect && r && isFunction(r.inspect) && r.inspect !== t.inspect && (!r.constructor || r.constructor.prototype !== r)) {
                      var o = r.inspect(n, e);
                      return isString(o) || (o = formatValue(e, o, n)), o
                  }
                  var i = formatPrimitive(e, r);
                  if (i) return i;
                  var a = Object.keys(r),
                      s = arrayToHash(a);
                  if (e.showHidden && (a = Object.getOwnPropertyNames(r)), isError(r) && (a.indexOf("message") >= 0 || a.indexOf("description") >= 0)) return formatError(r);
                  if (0 === a.length) {
                      if (isFunction(r)) {
                          var u = r.name ? ": " + r.name : "";
                          return e.stylize("[Function" + u + "]", "special")
                      }
                      if (isRegExp(r)) return e.stylize(RegExp.prototype.toString.call(r), "regexp");
                      if (isDate(r)) return e.stylize(Date.prototype.toString.call(r), "date");
                      if (isError(r)) return formatError(r)
                  }
                  var c = "",
                      f = !1,
                      l = ["{", "}"];
                  if (isArray(r) && (f = !0, l = ["[", "]"]), isFunction(r)) {
                      c = " [Function" + (r.name ? ": " + r.name : "") + "]"
                  }
                  if (isRegExp(r) && (c = " " + RegExp.prototype.toString.call(r)), isDate(r) && (c = " " + Date.prototype.toUTCString.call(r)), isError(r) && (c = " " + formatError(r)), 0 === a.length && (!f || 0 == r.length)) return l[0] + c + l[1];
                  if (n < 0) return isRegExp(r) ? e.stylize(RegExp.prototype.toString.call(r), "regexp") : e.stylize("[Object]", "special");
                  e.seen.push(r);
                  var p;
                  return p = f ? formatArray(e, r, n, s, a) : a.map(function(t) {
                      return formatProperty(e, r, n, s, t, f)
                  }), e.seen.pop(), reduceToSingleString(p, c, l)
              }

              function formatPrimitive(e, t) {
                  if (isUndefined(t)) return e.stylize("undefined", "undefined");
                  if (isString(t)) {
                      var r = "'" + JSON.stringify(t).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
                      return e.stylize(r, "string")
                  }
                  return isNumber(t) ? e.stylize("" + t, "number") : isBoolean(t) ? e.stylize("" + t, "boolean") : isNull(t) ? e.stylize("null", "null") : void 0
              }

              function formatError(e) {
                  return "[" + Error.prototype.toString.call(e) + "]"
              }

              function formatArray(e, t, r, n, o) {
                  for (var i = [], a = 0, s = t.length; a < s; ++a) hasOwnProperty(t, String(a)) ? i.push(formatProperty(e, t, r, n, String(a), !0)) : i.push("");
                  return o.forEach(function(o) {
                      o.match(/^\d+$/) || i.push(formatProperty(e, t, r, n, o, !0))
                  }), i
              }

              function formatProperty(e, t, r, n, o, i) {
                  var a, s, u;
                  if (u = Object.getOwnPropertyDescriptor(t, o) || {
                          value: t[o]
                      }, u.get ? s = u.set ? e.stylize("[Getter/Setter]", "special") : e.stylize("[Getter]", "special") : u.set && (s = e.stylize("[Setter]", "special")), hasOwnProperty(n, o) || (a = "[" + o + "]"), s || (e.seen.indexOf(u.value) < 0 ? (s = isNull(r) ? formatValue(e, u.value, null) : formatValue(e, u.value, r - 1), s.indexOf("\n") > -1 && (s = i ? s.split("\n").map(function(e) {
                          return "  " + e
                      }).join("\n").substr(2) : "\n" + s.split("\n").map(function(e) {
                          return "   " + e
                      }).join("\n"))) : s = e.stylize("[Circular]", "special")), isUndefined(a)) {
                      if (i && o.match(/^\d+$/)) return s;
                      a = JSON.stringify("" + o), a.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/) ? (a = a.substr(1, a.length - 2), a = e.stylize(a, "name")) : (a = a.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'"), a = e.stylize(a, "string"))
                  }
                  return a + ": " + s
              }

              function reduceToSingleString(e, t, r) {
                  var n = 0;
                  return e.reduce(function(e, t) {
                      return n++, t.indexOf("\n") >= 0 && n++, e + t.replace(/\u001b\[\d\d?m/g, "").length + 1
                  }, 0) > 60 ? r[0] + ("" === t ? "" : t + "\n ") + " " + e.join(",\n  ") + " " + r[1] : r[0] + t + " " + e.join(", ") + " " + r[1]
              }

              function isArray(e) {
                  return Array.isArray(e)
              }

              function isBoolean(e) {
                  return "boolean" === typeof e
              }

              function isNull(e) {
                  return null === e
              }

              function isNullOrUndefined(e) {
                  return null == e
              }

              function isNumber(e) {
                  return "number" === typeof e
              }

              function isString(e) {
                  return "string" === typeof e
              }

              function isSymbol(e) {
                  return "symbol" === typeof e
              }

              function isUndefined(e) {
                  return void 0 === e
              }

              function isRegExp(e) {
                  return isObject(e) && "[object RegExp]" === objectToString(e)
              }

              function isObject(e) {
                  return "object" === typeof e && null !== e
              }

              function isDate(e) {
                  return isObject(e) && "[object Date]" === objectToString(e)
              }

              function isError(e) {
                  return isObject(e) && ("[object Error]" === objectToString(e) || e instanceof Error)
              }

              function isFunction(e) {
                  return "function" === typeof e
              }

              function isPrimitive(e) {
                  return null === e || "boolean" === typeof e || "number" === typeof e || "string" === typeof e || "symbol" === typeof e || "undefined" === typeof e
              }

              function objectToString(e) {
                  return Object.prototype.toString.call(e)
              }

              function pad(e) {
                  return e < 10 ? "0" + e.toString(10) : e.toString(10)
              }

              function timestamp() {
                  var e = new Date,
                      t = [pad(e.getHours()), pad(e.getMinutes()), pad(e.getSeconds())].join(":");
                  return [e.getDate(), s[e.getMonth()], t].join(" ")
              }

              function hasOwnProperty(e, t) {
                  return Object.prototype.hasOwnProperty.call(e, t)
              }
              var o = /%[sdj%]/g;
              t.format = function(e) {
                  if (!isString(e)) {
                      for (var t = [], r = 0; r < arguments.length; r++) t.push(inspect(arguments[r]));
                      return t.join(" ")
                  }
                  for (var r = 1, n = arguments, i = n.length, a = String(e).replace(o, function(e) {
                          if ("%%" === e) return "%";
                          if (r >= i) return e;
                          switch (e) {
                              case "%s":
                                  return String(n[r++]);
                              case "%d":
                                  return Number(n[r++]);
                              case "%j":
                                  try {
                                      return JSON.stringify(n[r++])
                                  } catch (e) {
                                      return "[Circular]"
                                  }
                              default:
                                  return e
                          }
                      }), s = n[r]; r < i; s = n[++r]) isNull(s) || !isObject(s) ? a += " " + s : a += " " + inspect(s);
                  return a
              }, t.deprecate = function(r, o) {
                  function deprecated() {
                      if (!i) {
                          if (n.throwDeprecation) throw new Error(o);
                          n.traceDeprecation ? console.trace(o) : console.error(o), i = !0
                      }
                      return r.apply(this, arguments)
                  }
                  if (isUndefined(e.process)) return function() {
                      return t.deprecate(r, o).apply(this, arguments)
                  };
                  if (!0 === n.noDeprecation) return r;
                  var i = !1;
                  return deprecated
              };
              var i, a = {};
              t.debuglog = function(e) {
                  if (isUndefined(i) && (i = n.env.NODE_DEBUG || ""), e = e.toUpperCase(), !a[e])
                      if (new RegExp("\\b" + e + "\\b", "i").test(i)) {
                          var r = n.pid;
                          a[e] = function() {
                              var n = t.format.apply(t, arguments);
                              console.error("%s %d: %s", e, r, n)
                          }
                      } else a[e] = function() {};
                  return a[e]
              }, t.inspect = inspect, inspect.colors = {
                  bold: [1, 22],
                  italic: [3, 23],
                  underline: [4, 24],
                  inverse: [7, 27],
                  white: [37, 39],
                  grey: [90, 39],
                  black: [30, 39],
                  blue: [34, 39],
                  cyan: [36, 39],
                  green: [32, 39],
                  magenta: [35, 39],
                  red: [31, 39],
                  yellow: [33, 39]
              }, inspect.styles = {
                  special: "cyan",
                  number: "yellow",
                  boolean: "yellow",
                  undefined: "grey",
                  null: "bold",
                  string: "green",
                  date: "magenta",
                  regexp: "red"
              }, t.isArray = isArray, t.isBoolean = isBoolean, t.isNull = isNull, t.isNullOrUndefined = isNullOrUndefined, t.isNumber = isNumber, t.isString = isString, t.isSymbol = isSymbol, t.isUndefined = isUndefined, t.isRegExp = isRegExp, t.isObject = isObject, t.isDate = isDate, t.isError = isError, t.isFunction = isFunction, t.isPrimitive = isPrimitive, t.isBuffer = r(40);
              var s = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
              t.log = function() {
                  console.log("%s - %s", timestamp(), t.format.apply(t, arguments))
              }, t.inherits = r(39), t._extend = function(e, t) {
                  if (!t || !isObject(t)) return e;
                  for (var r = Object.keys(t), n = r.length; n--;) e[r[n]] = t[r[n]];
                  return e
              }
          }).call(t, r(5), r(7))
      }, function(e, t, r) {
          "use strict";
          (function(t) {
              function compare(e, t) {
                  if (e === t) return 0;
                  for (var r = e.length, n = t.length, o = 0, i = Math.min(r, n); o < i; ++o)
                      if (e[o] !== t[o]) {
                          r = e[o], n = t[o];
                          break
                      }
                  return r < n ? -1 : n < r ? 1 : 0
              }

              function isBuffer(e) {
                  return t.Buffer && "function" === typeof t.Buffer.isBuffer ? t.Buffer.isBuffer(e) : !(null == e || !e._isBuffer)
              }

              function pToString(e) {
                  return Object.prototype.toString.call(e)
              }

              function isView(e) {
                  return !isBuffer(e) && ("function" === typeof t.ArrayBuffer && ("function" === typeof ArrayBuffer.isView ? ArrayBuffer.isView(e) : !!e && (e instanceof DataView || !!(e.buffer && e.buffer instanceof ArrayBuffer))))
              }

              function getName(e) {
                  if (n.isFunction(e)) {
                      if (a) return e.name;
                      var t = e.toString(),
                          r = t.match(u);
                      return r && r[1]
                  }
              }

              function truncate(e, t) {
                  return "string" === typeof e ? e.length < t ? e : e.slice(0, t) : e
              }

              function inspect(e) {
                  if (a || !n.isFunction(e)) return n.inspect(e);
                  var t = getName(e);
                  return "[Function" + (t ? ": " + t : "") + "]"
              }

              function getMessage(e) {
                  return truncate(inspect(e.actual), 128) + " " + e.operator + " " + truncate(inspect(e.expected), 128)
              }

              function fail(e, t, r, n, o) {
                  throw new s.AssertionError({
                      message: r,
                      actual: e,
                      expected: t,
                      operator: n,
                      stackStartFunction: o
                  })
              }

              function ok(e, t) {
                  e || fail(e, !0, t, "==", s.ok)
              }

              function _deepEqual(e, t, r, o) {
                  if (e === t) return !0;
                  if (isBuffer(e) && isBuffer(t)) return 0 === compare(e, t);
                  if (n.isDate(e) && n.isDate(t)) return e.getTime() === t.getTime();
                  if (n.isRegExp(e) && n.isRegExp(t)) return e.source === t.source && e.global === t.global && e.multiline === t.multiline && e.lastIndex === t.lastIndex && e.ignoreCase === t.ignoreCase;
                  if (null !== e && "object" === typeof e || null !== t && "object" === typeof t) {
                      if (isView(e) && isView(t) && pToString(e) === pToString(t) && !(e instanceof Float32Array || e instanceof Float64Array)) return 0 === compare(new Uint8Array(e.buffer), new Uint8Array(t.buffer));
                      if (isBuffer(e) !== isBuffer(t)) return !1;
                      o = o || {
                          actual: [],
                          expected: []
                      };
                      var i = o.actual.indexOf(e);
                      return -1 !== i && i === o.expected.indexOf(t) || (o.actual.push(e), o.expected.push(t), objEquiv(e, t, r, o))
                  }
                  return r ? e === t : e == t
              }

              function isArguments(e) {
                  return "[object Arguments]" == Object.prototype.toString.call(e)
              }

              function objEquiv(e, t, r, o) {
                  if (null === e || void 0 === e || null === t || void 0 === t) return !1;
                  if (n.isPrimitive(e) || n.isPrimitive(t)) return e === t;
                  if (r && Object.getPrototypeOf(e) !== Object.getPrototypeOf(t)) return !1;
                  var a = isArguments(e),
                      s = isArguments(t);
                  if (a && !s || !a && s) return !1;
                  if (a) return e = i.call(e), t = i.call(t), _deepEqual(e, t, r);
                  var u, f, l = c(e),
                      p = c(t);
                  if (l.length !== p.length) return !1;
                  for (l.sort(), p.sort(), f = l.length - 1; f >= 0; f--)
                      if (l[f] !== p[f]) return !1;
                  for (f = l.length - 1; f >= 0; f--)
                      if (u = l[f], !_deepEqual(e[u], t[u], r, o)) return !1;
                  return !0
              }

              function notDeepStrictEqual(e, t, r) {
                  _deepEqual(e, t, !0) && fail(e, t, r, "notDeepStrictEqual", notDeepStrictEqual)
              }

              function expectedException(e, t) {
                  if (!e || !t) return !1;
                  if ("[object RegExp]" == Object.prototype.toString.call(t)) return t.test(e);
                  try {
                      if (e instanceof t) return !0
                  } catch (e) {}
                  return !Error.isPrototypeOf(t) && !0 === t.call({}, e)
              }

              function _tryBlock(e) {
                  var t;
                  try {
                      e()
                  } catch (e) {
                      t = e
                  }
                  return t
              }

              function _throws(e, t, r, o) {
                  var i;
                  if ("function" !== typeof t) throw new TypeError('"block" argument must be a function');
                  "string" === typeof r && (o = r, r = null), i = _tryBlock(t), o = (r && r.name ? " (" + r.name + ")." : ".") + (o ? " " + o : "."), e && !i && fail(i, r, "Missing expected exception" + o);
                  var a = "string" === typeof o,
                      s = !e && n.isError(i),
                      u = !e && i && !r;
                  if ((s && a && expectedException(i, r) || u) && fail(i, r, "Got unwanted exception" + o), e && i && r && !expectedException(i, r) || !e && i) throw i
              }
              var n = r(16),
                  o = Object.prototype.hasOwnProperty,
                  i = Array.prototype.slice,
                  a = function() {
                      return "foo" === function() {}.name
                  }(),
                  s = e.exports = ok,
                  u = /\s*function\s+([^\(\s]*)\s*/;
              s.AssertionError = function(e) {
                  this.name = "AssertionError", this.actual = e.actual, this.expected = e.expected, this.operator = e.operator, e.message ? (this.message = e.message, this.generatedMessage = !1) : (this.message = getMessage(this), this.generatedMessage = !0);
                  var t = e.stackStartFunction || fail;
                  if (Error.captureStackTrace) Error.captureStackTrace(this, t);
                  else {
                      var r = new Error;
                      if (r.stack) {
                          var n = r.stack,
                              o = getName(t),
                              i = n.indexOf("\n" + o);
                          if (i >= 0) {
                              var a = n.indexOf("\n", i + 1);
                              n = n.substring(a + 1)
                          }
                          this.stack = n
                      }
                  }
              }, n.inherits(s.AssertionError, Error), s.fail = fail, s.ok = ok, s.equal = function(e, t, r) {
                  e != t && fail(e, t, r, "==", s.equal)
              }, s.notEqual = function(e, t, r) {
                  e == t && fail(e, t, r, "!=", s.notEqual)
              }, s.deepEqual = function(e, t, r) {
                  _deepEqual(e, t, !1) || fail(e, t, r, "deepEqual", s.deepEqual)
              }, s.deepStrictEqual = function(e, t, r) {
                  _deepEqual(e, t, !0) || fail(e, t, r, "deepStrictEqual", s.deepStrictEqual)
              }, s.notDeepEqual = function(e, t, r) {
                  _deepEqual(e, t, !1) && fail(e, t, r, "notDeepEqual", s.notDeepEqual)
              }, s.notDeepStrictEqual = notDeepStrictEqual, s.strictEqual = function(e, t, r) {
                  e !== t && fail(e, t, r, "===", s.strictEqual)
              }, s.notStrictEqual = function(e, t, r) {
                  e === t && fail(e, t, r, "!==", s.notStrictEqual)
              }, s.throws = function(e, t, r) {
                  _throws(!0, e, t, r)
              }, s.doesNotThrow = function(e, t, r) {
                  _throws(!1, e, t, r)
              }, s.ifError = function(e) {
                  if (e) throw e
              };
              var c = Object.keys || function(e) {
                  var t = [];
                  for (var r in e) o.call(e, r) && t.push(r);
                  return t
              }
          }).call(t, r(5))
      }, function(e, t, r) {
          "use strict";
          (function(e) {
              var r = {};
              t.escapeJavaScript = function(e) {
                  if (!e) return "";
                  for (var t = "", n = 0; n < e.length; ++n) {
                      var o = e.charCodeAt(n);
                      r.isSafe(o) ? t += e[n] : t += r.escapeJavaScriptChar(o)
                  }
                  return t
              }, t.escapeHtml = function(e) {
                  if (!e) return "";
                  for (var t = "", n = 0; n < e.length; ++n) {
                      var o = e.charCodeAt(n);
                      r.isSafe(o) ? t += e[n] : t += r.escapeHtmlChar(o)
                  }
                  return t
              }, t.escapeJson = function(e) {
                  if (!e) return "";
                  var t = void 0;
                  return e.replace(/[<>&\u2028\u2029]/g, function(e) {
                      return t = e.charCodeAt(0), 60 === t ? "\\u003c" : 62 === t ? "\\u003e" : 38 === t ? "\\u0026" : 8232 === t ? "\\u2028" : "\\u2029"
                  })
              }, r.escapeJavaScriptChar = function(t) {
                  if (t >= 256) return "\\u" + r.padLeft("" + t, 4);
                  var n = e.from(String.fromCharCode(t), "ascii").toString("hex");
                  return "\\x" + r.padLeft(n, 2)
              }, r.escapeHtmlChar = function(t) {
                  var n = r.namedHtml[t];
                  if ("undefined" !== typeof n) return n;
                  if (t >= 256) return "&#" + t + ";";
                  var o = e.from(String.fromCharCode(t), "ascii").toString("hex");
                  return "&#x" + r.padLeft(o, 2) + ";"
              }, r.padLeft = function(e, t) {
                  for (; e.length < t;) e = "0" + e;
                  return e
              }, r.isSafe = function(e) {
                  return "undefined" !== typeof r.safeCharCodes[e]
              }, r.namedHtml = {
                  38: "&amp;",
                  60: "&lt;",
                  62: "&gt;",
                  34: "&quot;",
                  160: "&nbsp;",
                  162: "&cent;",
                  163: "&pound;",
                  164: "&curren;",
                  169: "&copy;",
                  174: "&reg;"
              }, r.safeCharCodes = function() {
                  for (var e = {}, t = 32; t < 123; ++t)(t >= 97 || t >= 65 && t <= 90 || t >= 48 && t <= 57 || 32 === t || 46 === t || 44 === t || 45 === t || 58 === t || 95 === t) && (e[t] = null);
                  return e
              }()
          }).call(t, r(3).Buffer)
      }, function(e, t, r) {
          "use strict";
          (function(e) {
              var n = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function(e) {
                      return typeof e
                  } : function(e) {
                      return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                  },
                  o = r(38),
                  i = {
                      hasOwn: Object.prototype.hasOwnProperty,
                      indexOf: Array.prototype.indexOf,
                      defaultThreshold: 16,
                      maxIPv6Groups: 8,
                      categories: {
                          valid: 1,
                          dnsWarn: 7,
                          rfc5321: 15,
                          cfws: 31,
                          deprecated: 63,
                          rfc5322: 127,
                          error: 255
                      },
                      diagnoses: {
                          valid: 0,
                          rfc5321TLD: 9,
                          rfc5321TLDNumeric: 10,
                          rfc5321QuotedString: 11,
                          rfc5321AddressLiteral: 12,
                          cfwsComment: 17,
                          cfwsFWS: 18,
                          undesiredNonAscii: 25,
                          deprecatedLocalPart: 33,
                          deprecatedFWS: 34,
                          deprecatedQTEXT: 35,
                          deprecatedQP: 36,
                          deprecatedComment: 37,
                          deprecatedCTEXT: 38,
                          deprecatedIPv6: 39,
                          deprecatedCFWSNearAt: 49,
                          rfc5322Domain: 65,
                          rfc5322TooLong: 66,
                          rfc5322LocalTooLong: 67,
                          rfc5322DomainTooLong: 68,
                          rfc5322LabelTooLong: 69,
                          rfc5322DomainLiteral: 70,
                          rfc5322DomainLiteralOBSDText: 71,
                          rfc5322IPv6GroupCount: 72,
                          rfc5322IPv62x2xColon: 73,
                          rfc5322IPv6BadCharacter: 74,
                          rfc5322IPv6MaxGroups: 75,
                          rfc5322IPv6ColonStart: 76,
                          rfc5322IPv6ColonEnd: 77,
                          errExpectingDTEXT: 129,
                          errNoLocalPart: 130,
                          errNoDomain: 131,
                          errConsecutiveDots: 132,
                          errATEXTAfterCFWS: 133,
                          errATEXTAfterQS: 134,
                          errATEXTAfterDomainLiteral: 135,
                          errExpectingQPair: 136,
                          errExpectingATEXT: 137,
                          errExpectingQTEXT: 138,
                          errExpectingCTEXT: 139,
                          errBackslashEnd: 140,
                          errDotStart: 141,
                          errDotEnd: 142,
                          errDomainHyphenStart: 143,
                          errDomainHyphenEnd: 144,
                          errUnclosedQuotedString: 145,
                          errUnclosedComment: 146,
                          errUnclosedDomainLiteral: 147,
                          errFWSCRLFx2: 148,
                          errFWSCRLFEnd: 149,
                          errCRNoLF: 150,
                          errUnknownTLD: 160,
                          errDomainTooShort: 161
                      },
                      components: {
                          localpart: 0,
                          domain: 1,
                          literal: 2,
                          contextComment: 3,
                          contextFWS: 4,
                          contextQuotedString: 5,
                          contextQuotedPair: 6
                      }
                  };
              i.specials = function() {
                  var e = '()<>[]:;@\\,."',
                      t = new Array(256);
                  t.fill(!1);
                  for (var r = 0; r < e.length; ++r) t[e.codePointAt(r)] = !0;
                  return function(e) {
                      return t[e]
                  }
              }(), i.c0Controls = function() {
                  var e = new Array(256);
                  e.fill(!1);
                  for (var t = 0; t < 33; ++t) e[t] = !0;
                  return function(t) {
                      return e[t]
                  }
              }(), i.c1Controls = function() {
                  var e = new Array(256);
                  e.fill(!1);
                  for (var t = 127; t < 160; ++t) e[t] = !0;
                  return function(t) {
                      return e[t]
                  }
              }(), i.regex = {
                  ipV4: /\b(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)$/,
                  ipV6: /^[a-fA-F\d]{0,4}$/
              }, i.normalizeSupportsNul = "\0" === "\0".normalize("NFC"), i.nulNormalize = function(e) {
                  return e.split("\0").map(function(e) {
                      return e.normalize("NFC")
                  }).join("\0")
              }, i.normalize = function(e) {
                  return !i.normalizeSupportsNul && e.indexOf("\0") >= 0 ? i.nulNormalize(e) : e.normalize("NFC")
              }, i.checkIpV6 = function(e) {
                  return e.every(function(e) {
                      return i.regex.ipV6.test(e)
                  })
              }, i.validDomain = function(e, t) {
                  return t.tldBlacklist ? Array.isArray(t.tldBlacklist) ? -1 === i.indexOf.call(t.tldBlacklist, e) : !i.hasOwn.call(t.tldBlacklist, e) : Array.isArray(t.tldWhitelist) ? -1 !== i.indexOf.call(t.tldWhitelist, e) : i.hasOwn.call(t.tldWhitelist, e)
              }, t.validate = i.validate = function(t, r, a) {
                  r = r || {}, t = i.normalize(t), "function" === typeof r && (a = r, r = {}), "function" !== typeof a && (a = null);
                  var s = void 0,
                      u = void 0;
                  if ("number" === typeof r.errorLevel ? (s = !0, u = r.errorLevel) : (s = !!r.errorLevel, u = i.diagnoses.valid), r.tldWhitelist)
                      if ("string" === typeof r.tldWhitelist) r.tldWhitelist = [r.tldWhitelist];
                      else if ("object" !== n(r.tldWhitelist)) throw new TypeError("expected array or object tldWhitelist");
                  if (r.tldBlacklist)
                      if ("string" === typeof r.tldBlacklist) r.tldBlacklist = [r.tldBlacklist];
                      else if ("object" !== n(r.tldBlacklist)) throw new TypeError("expected array or object tldBlacklist");
                  if (r.minDomainAtoms && (r.minDomainAtoms !== (0 | +r.minDomainAtoms) || r.minDomainAtoms < 0)) throw new TypeError("expected positive integer minDomainAtoms");
                  var c = i.diagnoses.valid,
                      f = function(e) {
                          e > c && (c = e)
                      };
                  !(void 0 === r.allowUnicode || !!r.allowUnicode) && /[^\x00-\x7f]/.test(t) && f(i.diagnoses.undesiredNonAscii);
                  for (var l = {
                          now: i.components.localpart,
                          prev: i.components.localpart,
                          stack: [i.components.localpart]
                      }, p = "", h = {
                          local: "",
                          domain: ""
                      }, d = {
                          locals: [""],
                          domains: [""]
                      }, y = 0, g = 0, v = 0, m = void 0, b = !1, _ = !1, w = t.length, E = void 0, x = 0; x < w; x += E.length) {
                      switch (E = String.fromCodePoint(t.codePointAt(x)), l.now) {
                          case i.components.localpart:
                              switch (E) {
                                  case "(":
                                      0 === g ? f(0 === y ? i.diagnoses.cfwsComment : i.diagnoses.deprecatedComment) : (f(i.diagnoses.cfwsComment), _ = !0), l.stack.push(l.now), l.now = i.components.contextComment;
                                      break;
                                  case ".":
                                      0 === g ? f(0 === y ? i.diagnoses.errDotStart : i.diagnoses.errConsecutiveDots) : (_ && f(i.diagnoses.deprecatedLocalPart), _ = !1, g = 0, ++y, h.local += E, d.locals[y] = "");
                                      break;
                                  case '"':
                                      0 === g ? (f(0 === y ? i.diagnoses.rfc5321QuotedString : i.diagnoses.deprecatedLocalPart), h.local += E, d.locals[y] += E, g += e.byteLength(E, "utf8"), _ = !0, l.stack.push(l.now), l.now = i.components.contextQuotedString) : f(i.diagnoses.errExpectingATEXT);
                                      break;
                                  case "\r":
                                      if (w === ++x || "\n" !== t[x]) {
                                          f(i.diagnoses.errCRNoLF);
                                          break
                                      }
                                  case " ":
                                  case "\t":
                                      0 === g ? f(0 === y ? i.diagnoses.cfwsFWS : i.diagnoses.deprecatedFWS) : _ = !0, l.stack.push(l.now), l.now = i.components.contextFWS, p = E;
                                      break;
                                  case "@":
                                      if (1 !== l.stack.length) throw new Error("unexpected item on context stack");
                                      0 === h.local.length ? f(i.diagnoses.errNoLocalPart) : 0 === g ? f(i.diagnoses.errDotEnd) : e.byteLength(h.local, "utf8") > 64 ? f(i.diagnoses.rfc5322LocalTooLong) : l.prev !== i.components.contextComment && l.prev !== i.components.contextFWS || f(i.diagnoses.deprecatedCFWSNearAt), l.now = i.components.domain, l.stack[0] = i.components.domain, y = 0, g = 0, _ = !1;
                                      break;
                                  default:
                                      if (_) switch (l.prev) {
                                          case i.components.contextComment:
                                          case i.components.contextFWS:
                                              f(i.diagnoses.errATEXTAfterCFWS);
                                              break;
                                          case i.components.contextQuotedString:
                                              f(i.diagnoses.errATEXTAfterQS);
                                              break;
                                          default:
                                              throw new Error("more atext found where none is allowed, but unrecognized prev context: " + l.prev)
                                      } else l.prev = l.now, m = E.codePointAt(0), (i.specials(m) || i.c0Controls(m) || i.c1Controls(m)) && f(i.diagnoses.errExpectingATEXT), h.local += E, d.locals[y] += E, g += e.byteLength(E, "utf8")
                              }
                              break;
                          case i.components.domain:
                              switch (E) {
                                  case "(":
                                      0 === g ? f(0 === y ? i.diagnoses.deprecatedCFWSNearAt : i.diagnoses.deprecatedComment) : (_ = !0, f(i.diagnoses.cfwsComment)), l.stack.push(l.now), l.now = i.components.contextComment;
                                      break;
                                  case ".":
                                      var S = o.encode(d.domains[y]).length;
                                      0 === g ? f(0 === y ? i.diagnoses.errDotStart : i.diagnoses.errConsecutiveDots) : b ? f(i.diagnoses.errDomainHyphenEnd) : S > 63 && f(i.diagnoses.rfc5322LabelTooLong), _ = !1, g = 0, ++y, d.domains[y] = "", h.domain += E;
                                      break;
                                  case "[":
                                      0 === h.domain.length ? (_ = !0, g += e.byteLength(E, "utf8"), l.stack.push(l.now), l.now = i.components.literal, h.domain += E, d.domains[y] += E, h.literal = "") : f(i.diagnoses.errExpectingATEXT);
                                      break;
                                  case "\r":
                                      if (w === ++x || "\n" !== t[x]) {
                                          f(i.diagnoses.errCRNoLF);
                                          break
                                      }
                                  case " ":
                                  case "\t":
                                      0 === g ? f(0 === y ? i.diagnoses.deprecatedCFWSNearAt : i.diagnoses.deprecatedFWS) : (f(i.diagnoses.cfwsFWS), _ = !0), l.stack.push(l.now), l.now = i.components.contextFWS, p = E;
                                      break;
                                  default:
                                      if (_) switch (l.prev) {
                                          case i.components.contextComment:
                                          case i.components.contextFWS:
                                              f(i.diagnoses.errATEXTAfterCFWS);
                                              break;
                                          case i.components.literal:
                                              f(i.diagnoses.errATEXTAfterDomainLiteral);
                                              break;
                                          default:
                                              throw new Error("more atext found where none is allowed, but unrecognized prev context: " + l.prev)
                                      }
                                      m = E.codePointAt(0), b = !1, i.specials(m) || i.c0Controls(m) || i.c1Controls(m) ? f(i.diagnoses.errExpectingATEXT) : "-" === E ? (0 === g && f(i.diagnoses.errDomainHyphenStart), b = !0) : (m < 48 || m > 122 && m < 192 || m > 57 && m < 65 || m > 90 && m < 97) && f(i.diagnoses.rfc5322Domain), h.domain += E, d.domains[y] += E, g += e.byteLength(E, "utf8")
                              }
                              break;
                          case i.components.literal:
                              switch (E) {
                                  case "]":
                                      if (c < i.categories.deprecated) {
                                          var k = -1,
                                              A = h.literal,
                                              O = i.regex.ipV4.exec(A);
                                          if (O && 0 !== (k = O.index) && (A = A.slice(0, k) + "0:0"), 0 === k) f(i.diagnoses.rfc5321AddressLiteral);
                                          else if ("ipv6:" !== A.slice(0, 5).toLowerCase()) f(i.diagnoses.rfc5322DomainLiteral);
                                          else {
                                              var T = A.slice(5),
                                                  j = i.maxIPv6Groups,
                                                  B = T.split(":");
                                              k = T.indexOf("::"), ~k ? k !== T.lastIndexOf("::") ? f(i.diagnoses.rfc5322IPv62x2xColon) : (0 !== k && k !== T.length - 2 || ++j, B.length > j ? f(i.diagnoses.rfc5322IPv6MaxGroups) : B.length === j && f(i.diagnoses.deprecatedIPv6)) : B.length !== j && f(i.diagnoses.rfc5322IPv6GroupCount), f(":" === T[0] && ":" !== T[1] ? i.diagnoses.rfc5322IPv6ColonStart : ":" === T[T.length - 1] && ":" !== T[T.length - 2] ? i.diagnoses.rfc5322IPv6ColonEnd : i.checkIpV6(B) ? i.diagnoses.rfc5321AddressLiteral : i.diagnoses.rfc5322IPv6BadCharacter)
                                          }
                                      } else f(i.diagnoses.rfc5322DomainLiteral);
                                      h.domain += E, d.domains[y] += E, g += e.byteLength(E, "utf8"), l.prev = l.now, l.now = l.stack.pop();
                                      break;
                                  case "\\":
                                      f(i.diagnoses.rfc5322DomainLiteralOBSDText), l.stack.push(l.now), l.now = i.components.contextQuotedPair;
                                      break;
                                  case "\r":
                                      if (w === ++x || "\n" !== t[x]) {
                                          f(i.diagnoses.errCRNoLF);
                                          break
                                      }
                                  case " ":
                                  case "\t":
                                      f(i.diagnoses.cfwsFWS), l.stack.push(l.now), l.now = i.components.contextFWS, p = E;
                                      break;
                                  default:
                                      if (127 !== (m = E.codePointAt(0)) && i.c1Controls(m) || 0 === m || "[" === E) {
                                          f(i.diagnoses.errExpectingDTEXT);
                                          break
                                      }(i.c0Controls(m) || 127 === m) && f(i.diagnoses.rfc5322DomainLiteralOBSDText), h.literal += E, h.domain += E, d.domains[y] += E, g += e.byteLength(E, "utf8")
                              }
                              break;
                          case i.components.contextQuotedString:
                              switch (E) {
                                  case "\\":
                                      l.stack.push(l.now), l.now = i.components.contextQuotedPair;
                                      break;
                                  case "\r":
                                      if (w === ++x || "\n" !== t[x]) {
                                          f(i.diagnoses.errCRNoLF);
                                          break
                                      }
                                  case "\t":
                                      h.local += " ", d.locals[y] += " ", g += e.byteLength(E, "utf8"), f(i.diagnoses.cfwsFWS), l.stack.push(l.now), l.now = i.components.contextFWS, p = E;
                                      break;
                                  case '"':
                                      h.local += E, d.locals[y] += E, g += e.byteLength(E, "utf8"), l.prev = l.now, l.now = l.stack.pop();
                                      break;
                                  default:
                                      m = E.codePointAt(0), 127 !== m && i.c1Controls(m) || 0 === m || 10 === m ? f(i.diagnoses.errExpectingQTEXT) : (i.c0Controls(m) || 127 === m) && f(i.diagnoses.deprecatedQTEXT), h.local += E, d.locals[y] += E, g += e.byteLength(E, "utf8")
                              }
                              break;
                          case i.components.contextQuotedPair:
                              m = E.codePointAt(0), 127 !== m && i.c1Controls(m) ? f(i.diagnoses.errExpectingQPair) : (m < 31 && 9 !== m || 127 === m) && f(i.diagnoses.deprecatedQP), l.prev = l.now, l.now = l.stack.pop();
                              var C = "\\" + E;
                              switch (l.now) {
                                  case i.components.contextComment:
                                      break;
                                  case i.components.contextQuotedString:
                                      h.local += C, d.locals[y] += C, g += 2;
                                      break;
                                  case i.components.literal:
                                      h.domain += C, d.domains[y] += C, g += 2;
                                      break;
                                  default:
                                      throw new Error("quoted pair logic invoked in an invalid context: " + l.now)
                              }
                              break;
                          case i.components.contextComment:
                              switch (E) {
                                  case "(":
                                      l.stack.push(l.now), l.now = i.components.contextComment;
                                      break;
                                  case ")":
                                      l.prev = l.now, l.now = l.stack.pop();
                                      break;
                                  case "\\":
                                      l.stack.push(l.now), l.now = i.components.contextQuotedPair;
                                      break;
                                  case "\r":
                                      if (w === ++x || "\n" !== t[x]) {
                                          f(i.diagnoses.errCRNoLF);
                                          break
                                      }
                                  case " ":
                                  case "\t":
                                      f(i.diagnoses.cfwsFWS), l.stack.push(l.now), l.now = i.components.contextFWS, p = E;
                                      break;
                                  default:
                                      if (0 === (m = E.codePointAt(0)) || 10 === m || 127 !== m && i.c1Controls(m)) {
                                          f(i.diagnoses.errExpectingCTEXT);
                                          break
                                      }(i.c0Controls(m) || 127 === m) && f(i.diagnoses.deprecatedCTEXT)
                              }
                              break;
                          case i.components.contextFWS:
                              if ("\r" === p) {
                                  if ("\r" === E) {
                                      f(i.diagnoses.errFWSCRLFx2);
                                      break
                                  }++v > 1 ? f(i.diagnoses.deprecatedFWS) : v = 1
                              }
                              switch (E) {
                                  case "\r":
                                      w !== ++x && "\n" === t[x] || f(i.diagnoses.errCRNoLF);
                                      break;
                                  case " ":
                                  case "\t":
                                      break;
                                  default:
                                      "\r" === p && f(i.diagnoses.errFWSCRLFEnd), v = 0, l.prev = l.now, l.now = l.stack.pop(), --x
                              }
                              p = E;
                              break;
                          default:
                              throw new Error("unknown context: " + l.now)
                      }
                      if (c > i.categories.rfc5322) break
                  }
                  if (c < i.categories.rfc5322) {
                      var I = o.encode(h.domain).length;
                      if (l.now === i.components.contextQuotedString) f(i.diagnoses.errUnclosedQuotedString);
                      else if (l.now === i.components.contextQuotedPair) f(i.diagnoses.errBackslashEnd);
                      else if (l.now === i.components.contextComment) f(i.diagnoses.errUnclosedComment);
                      else if (l.now === i.components.literal) f(i.diagnoses.errUnclosedDomainLiteral);
                      else if ("\r" === E) f(i.diagnoses.errFWSCRLFEnd);
                      else if (0 === h.domain.length) f(i.diagnoses.errNoDomain);
                      else if (0 === g) f(i.diagnoses.errDotEnd);
                      else if (b) f(i.diagnoses.errDomainHyphenEnd);
                      else if (I > 255) f(i.diagnoses.rfc5322DomainTooLong);
                      else if (e.byteLength(h.local, "utf8") + I + 1 > 254) f(i.diagnoses.rfc5322TooLong);
                      else if (g > 63) f(i.diagnoses.rfc5322LabelTooLong);
                      else if (r.minDomainAtoms && d.domains.length < r.minDomainAtoms) f(i.diagnoses.errDomainTooShort);
                      else if (r.tldWhitelist || r.tldBlacklist) {
                          var R = d.domains[y];
                          i.validDomain(R, r) || f(i.diagnoses.errUnknownTLD)
                      }
                  }
                  if (c < i.categories.dnsWarn) {
                      d.domains[y].codePointAt(0) <= 57 && f(i.diagnoses.rfc5321TLDNumeric)
                  }
                  c < u && (c = i.diagnoses.valid);
                  var P = s ? c : c < i.defaultThreshold;
                  return a && a(P), P
              }, t.diagnoses = i.validate.diagnoses = function() {
                  for (var e = {}, t = Object.keys(i.diagnoses), r = 0; r < t.length; ++r) {
                      var n = t[r];
                      e[n] = i.diagnoses[n]
                  }
                  return e
              }(), t.normalize = i.normalize
          }).call(t, r(3).Buffer)
      }, function(e, t, r) {
          "use strict";
          t.errors = {
              root: "value",
              key: '"{{!label}}" ',
              messages: {
                  wrapArrays: !0
              },
              any: {
                  unknown: "is not allowed",
                  invalid: "contains an invalid value",
                  empty: "is not allowed to be empty",
                  required: "is required",
                  allowOnly: "must be one of {{valids}}",
                  default: "threw an error when running default method"
              },
              alternatives: {
                  base: "not matching any of the allowed alternatives",
                  child: null
              },
              array: {
                  base: "must be an array",
                  includes: "at position {{pos}} does not match any of the allowed types",
                  includesSingle: 'single value of "{{!label}}" does not match any of the allowed types',
                  includesOne: "at position {{pos}} fails because {{reason}}",
                  includesOneSingle: 'single value of "{{!label}}" fails because {{reason}}',
                  includesRequiredUnknowns: "does not contain {{unknownMisses}} required value(s)",
                  includesRequiredKnowns: "does not contain {{knownMisses}}",
                  includesRequiredBoth: "does not contain {{knownMisses}} and {{unknownMisses}} other required value(s)",
                  excludes: "at position {{pos}} contains an excluded value",
                  excludesSingle: 'single value of "{{!label}}" contains an excluded value',
                  min: "must contain at least {{limit}} items",
                  max: "must contain less than or equal to {{limit}} items",
                  length: "must contain {{limit}} items",
                  ordered: "at position {{pos}} fails because {{reason}}",
                  orderedLength: "at position {{pos}} fails because array must contain at most {{limit}} items",
                  ref: 'references "{{ref}}" which is not a positive integer',
                  sparse: "must not be a sparse array",
                  unique: "position {{pos}} contains a duplicate value"
              },
              boolean: {
                  base: "must be a boolean"
              },
              binary: {
                  base: "must be a buffer or a string",
                  min: "must be at least {{limit}} bytes",
                  max: "must be less than or equal to {{limit}} bytes",
                  length: "must be {{limit}} bytes"
              },
              date: {
                  base: "must be a number of milliseconds or valid date string",
                  format: "must be a string with one of the following formats {{format}}",
                  strict: "must be a valid date",
                  min: 'must be larger than or equal to "{{limit}}"',
                  max: 'must be less than or equal to "{{limit}}"',
                  less: 'must be less than "{{limit}}"',
                  greater: 'must be greater than "{{limit}}"',
                  isoDate: "must be a valid ISO 8601 date",
                  timestamp: {
                      javascript: "must be a valid timestamp or number of milliseconds",
                      unix: "must be a valid timestamp or number of seconds"
                  },
                  ref: 'references "{{ref}}" which is not a date'
              },
              function: {
                  base: "must be a Function",
                  arity: "must have an arity of {{n}}",
                  minArity: "must have an arity greater or equal to {{n}}",
                  maxArity: "must have an arity lesser or equal to {{n}}",
                  ref: "must be a Joi reference",
                  class: "must be a class"
              },
              lazy: {
                  base: "!!schema error: lazy schema must be set",
                  schema: "!!schema error: lazy schema function must return a schema"
              },
              object: {
                  base: "must be an object",
                  child: '!!child "{{!child}}" fails because {{reason}}',
                  min: "must have at least {{limit}} children",
                  max: "must have less than or equal to {{limit}} children",
                  length: "must have {{limit}} children",
                  allowUnknown: '!!"{{!child}}" is not allowed',
                  with: '!!"{{mainWithLabel}}" missing required peer "{{peerWithLabel}}"',
                  without: '!!"{{mainWithLabel}}" conflict with forbidden peer "{{peerWithLabel}}"',
                  missing: "must contain at least one of {{peersWithLabels}}",
                  xor: "contains a conflict between exclusive peers {{peersWithLabels}}",
                  or: "must contain at least one of {{peersWithLabels}}",
                  and: "contains {{presentWithLabels}} without its required peers {{missingWithLabels}}",
                  nand: '!!"{{mainWithLabel}}" must not exist simultaneously with {{peersWithLabels}}',
                  assert: '!!"{{ref}}" validation failed because "{{ref}}" failed to {{message}}',
                  rename: {
                      multiple: 'cannot rename child "{{from}}" because multiple renames are disabled and another key was already renamed to "{{to}}"',
                      override: 'cannot rename child "{{from}}" because override is disabled and target "{{to}}" exists',
                      regex: {
                          multiple: 'cannot rename children {{from}} because multiple renames are disabled and another key was already renamed to "{{to}}"',
                          override: 'cannot rename children {{from}} because override is disabled and target "{{to}}" exists'
                      }
                  },
                  type: 'must be an instance of "{{type}}"',
                  schema: "must be a Joi instance"
              },
              number: {
                  base: "must be a number",
                  min: "must be larger than or equal to {{limit}}",
                  max: "must be less than or equal to {{limit}}",
                  less: "must be less than {{limit}}",
                  greater: "must be greater than {{limit}}",
                  float: "must be a float or double",
                  integer: "must be an integer",
                  negative: "must be a negative number",
                  positive: "must be a positive number",
                  precision: "must have no more than {{limit}} decimal places",
                  ref: 'references "{{ref}}" which is not a number',
                  multiple: "must be a multiple of {{multiple}}",
                  port: "must be a valid port"
              },
              string: {
                  base: "must be a string",
                  min: "length must be at least {{limit}} characters long",
                  max: "length must be less than or equal to {{limit}} characters long",
                  length: "length must be {{limit}} characters long",
                  alphanum: "must only contain alpha-numeric characters",
                  token: "must only contain alpha-numeric and underscore characters",
                  regex: {
                      base: 'with value "{{!value}}" fails to match the required pattern: {{pattern}}',
                      name: 'with value "{{!value}}" fails to match the {{name}} pattern',
                      invert: {
                          base: 'with value "{{!value}}" matches the inverted pattern: {{pattern}}',
                          name: 'with value "{{!value}}" matches the inverted {{name}} pattern'
                      }
                  },
                  email: "must be a valid email",
                  uri: "must be a valid uri",
                  uriRelativeOnly: "must be a valid relative uri",
                  uriCustomScheme: "must be a valid uri with a scheme matching the {{scheme}} pattern",
                  isoDate: "must be a valid ISO 8601 date",
                  guid: "must be a valid GUID",
                  hex: "must only contain hexadecimal characters",
                  hexAlign: "hex decoded representation must be byte aligned",
                  base64: "must be a valid base64 string",
                  hostname: "must be a valid hostname",
                  normalize: "must be unicode normalized in the {{form}} form",
                  lowercase: "must only contain lowercase characters",
                  uppercase: "must only contain uppercase characters",
                  trim: "must not have leading or trailing whitespace",
                  creditCard: "must be a credit card",
                  ref: 'references "{{ref}}" which is not a number',
                  ip: "must be a valid ip address with a {{cidr}} CIDR",
                  ipVersion: "must be a valid ip address of one of the following versions {{version}} with a {{cidr}} CIDR"
              }
          }
      }, function(e, t, r) {
          "use strict";
          var n = r(8);
          t.options = n.object({
              abortEarly: n.boolean(),
              convert: n.boolean(),
              allowUnknown: n.boolean(),
              skipFunctions: n.boolean(),
              stripUnknown: [n.boolean(), n.object({
                  arrays: n.boolean(),
                  objects: n.boolean()
              }).or("arrays", "objects")],
              language: n.object(),
              presence: n.string().only("required", "optional", "forbidden", "ignore"),
              raw: n.boolean(),
              context: n.object(),
              strip: n.boolean(),
              noDefaults: n.boolean(),
              escapeHtml: n.boolean()
          }).strict()
      }, function(e, t, r) {
          "use strict";

          function _defaults(e, t) {
              for (var r = Object.getOwnPropertyNames(t), n = 0; n < r.length; n++) {
                  var o = r[n],
                      i = Object.getOwnPropertyDescriptor(t, o);
                  i && i.configurable && void 0 === e[o] && Object.defineProperty(e, o, i)
              }
              return e
          }

          function _classCallCheck(e, t) {
              if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
          }

          function _possibleConstructorReturn(e, t) {
              if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              return !t || "object" !== typeof t && "function" !== typeof t ? e : t
          }

          function _inherits(e, t) {
              if ("function" !== typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
              e.prototype = Object.create(t && t.prototype, {
                  constructor: {
                      value: e,
                      enumerable: !1,
                      writable: !0,
                      configurable: !0
                  }
              }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : _defaults(e, t))
          }
          var n = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function(e) {
                  return typeof e
              } : function(e) {
                  return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
              },
              o = r(2),
              i = r(4),
              a = r(1),
              s = r(0),
              u = {};
          u.fastSplice = function(e, t) {
              for (var r = t; r < e.length;) e[r++] = e[r];
              --e.length
          }, u.Array = function(e) {
              function _class() {
                  _classCallCheck(this, _class);
                  var t = _possibleConstructorReturn(this, e.call(this));
                  return t._type = "array", t._inner.items = [], t._inner.ordereds = [], t._inner.inclusions = [], t._inner.exclusions = [], t._inner.requireds = [], t._flags.sparse = !1, t
              }
              return _inherits(_class, e), _class.prototype._base = function(e, t, r) {
                  var n = {
                      value: e
                  };
                  "string" === typeof e && r.convert && u.safeParse(e, n);
                  var o = Array.isArray(n.value),
                      i = o;
                  if (r.convert && this._flags.single && !o && (n.value = [n.value], o = !0), !o) return n.errors = this.createError("array.base", null, t, r), n;
                  if ((this._inner.inclusions.length || this._inner.exclusions.length || this._inner.requireds.length || this._inner.ordereds.length || !this._flags.sparse) && (i && (n.value = n.value.slice(0)), n.errors = this._checkItems.call(this, n.value, i, t, r), n.errors && i && r.convert && this._flags.single)) {
                      var a = n.errors;
                      n.value = [n.value], n.errors = this._checkItems.call(this, n.value, i, t, r), n.errors && (n.errors = a, n.value = n.value[0])
                  }
                  return n
              }, _class.prototype._checkItems = function(e, t, r, n) {
                  for (var o = [], i = void 0, a = this._inner.requireds.slice(), s = this._inner.ordereds.slice(), c = this._inner.inclusions.concat(a), f = e.length, l = 0; l < f; ++l) {
                      i = !1;
                      var p = e[l],
                          h = !1,
                          d = t ? l : r.key,
                          y = t ? r.path.concat(l) : r.path,
                          g = {
                              key: d,
                              path: y,
                              parent: r.parent,
                              reference: r.reference
                          },
                          v = void 0;
                      if (this._flags.sparse || void 0 !== p) {
                          for (var m = 0; m < this._inner.exclusions.length; ++m)
                              if (v = this._inner.exclusions[m]._validate(p, g, {}), !v.errors) {
                                  if (o.push(this.createError(t ? "array.excludes" : "array.excludesSingle", {
                                          pos: l,
                                          value: p
                                      }, {
                                          key: r.key,
                                          path: g.path
                                      }, n)), i = !0, n.abortEarly) return o;
                                  s.shift();
                                  break
                              }
                          if (!i) {
                              if (this._inner.ordereds.length) {
                                  if (s.length > 0) {
                                      var b = s.shift();
                                      if (v = b._validate(p, g, n), v.errors) {
                                          if (o.push(this.createError("array.ordered", {
                                                  pos: l,
                                                  reason: v.errors,
                                                  value: p
                                              }, {
                                                  key: r.key,
                                                  path: g.path
                                              }, n)), n.abortEarly) return o
                                      } else if (b._flags.strip) u.fastSplice(e, l), --l, --f;
                                      else {
                                          if (!this._flags.sparse && void 0 === v.value) {
                                              if (o.push(this.createError("array.sparse", null, {
                                                      key: r.key,
                                                      path: g.path,
                                                      pos: l
                                                  }, n)), n.abortEarly) return o;
                                              continue
                                          }
                                          e[l] = v.value
                                      }
                                      continue
                                  }
                                  if (!this._inner.items.length) {
                                      if (o.push(this.createError("array.orderedLength", {
                                              pos: l,
                                              limit: this._inner.ordereds.length
                                          }, {
                                              key: r.key,
                                              path: g.path
                                          }, n)), n.abortEarly) return o;
                                      continue
                                  }
                              }
                              for (var _ = [], w = a.length, E = 0; E < w; ++E)
                                  if (v = _[E] = a[E]._validate(p, g, n), !v.errors) {
                                      if (e[l] = v.value, h = !0, u.fastSplice(a, E), --E, --w, !this._flags.sparse && void 0 === v.value && (o.push(this.createError("array.sparse", null, {
                                              key: r.key,
                                              path: g.path,
                                              pos: l
                                          }, n)), n.abortEarly)) return o;
                                      break
                                  }
                              if (!h) {
                                  var x = !!n.stripUnknown && (!0 === n.stripUnknown || !!n.stripUnknown.arrays);
                                  w = c.length;
                                  for (var S = 0; S < w; ++S) {
                                      var k = c[S],
                                          A = a.indexOf(k);
                                      if (-1 !== A) v = _[A];
                                      else if (v = k._validate(p, g, n), !v.errors) {
                                          k._flags.strip ? (u.fastSplice(e, l), --l, --f) : this._flags.sparse || void 0 !== v.value ? e[l] = v.value : (o.push(this.createError("array.sparse", null, {
                                              key: r.key,
                                              path: g.path,
                                              pos: l
                                          }, n)), i = !0), h = !0;
                                          break
                                      }
                                      if (1 === w) {
                                          if (x) {
                                              u.fastSplice(e, l), --l, --f, h = !0;
                                              break
                                          }
                                          if (o.push(this.createError(t ? "array.includesOne" : "array.includesOneSingle", {
                                                  pos: l,
                                                  reason: v.errors,
                                                  value: p
                                              }, {
                                                  key: r.key,
                                                  path: g.path
                                              }, n)), i = !0, n.abortEarly) return o;
                                          break
                                      }
                                  }
                                  if (!i && this._inner.inclusions.length && !h) {
                                      if (x) {
                                          u.fastSplice(e, l), --l, --f;
                                          continue
                                      }
                                      if (o.push(this.createError(t ? "array.includes" : "array.includesSingle", {
                                              pos: l,
                                              value: p
                                          }, {
                                              key: r.key,
                                              path: g.path
                                          }, n)), n.abortEarly) return o
                                  }
                              }
                          }
                      } else {
                          if (o.push(this.createError("array.sparse", null, {
                                  key: r.key,
                                  path: g.path,
                                  pos: l
                              }, n)), n.abortEarly) return o;
                          s.shift()
                      }
                  }
                  return a.length && this._fillMissedErrors.call(this, o, a, r, n), s.length && this._fillOrderedErrors.call(this, o, s, r, n), o.length ? o : null
              }, _class.prototype.describe = function() {
                  var e = o.prototype.describe.call(this);
                  if (this._inner.ordereds.length) {
                      e.orderedItems = [];
                      for (var t = 0; t < this._inner.ordereds.length; ++t) e.orderedItems.push(this._inner.ordereds[t].describe())
                  }
                  if (this._inner.items.length) {
                      e.items = [];
                      for (var r = 0; r < this._inner.items.length; ++r) e.items.push(this._inner.items[r].describe())
                  }
                  return e
              }, _class.prototype.items = function() {
                  for (var e = this, t = this.clone(), r = arguments.length, n = Array(r), o = 0; o < r; o++) n[o] = arguments[o];
                  return s.flatten(n).forEach(function(r, n) {
                      try {
                          r = i.schema(e._currentJoi, r)
                      } catch (e) {
                          throw e.hasOwnProperty("path") ? e.path = n + "." + e.path : e.path = n, e.message = e.message + "(" + e.path + ")", e
                      }
                      t._inner.items.push(r), "required" === r._flags.presence ? t._inner.requireds.push(r) : "forbidden" === r._flags.presence ? t._inner.exclusions.push(r.optional()) : t._inner.inclusions.push(r)
                  }), t
              }, _class.prototype.ordered = function() {
                  for (var e = this, t = this.clone(), r = arguments.length, n = Array(r), o = 0; o < r; o++) n[o] = arguments[o];
                  return s.flatten(n).forEach(function(r, n) {
                      try {
                          r = i.schema(e._currentJoi, r)
                      } catch (e) {
                          throw e.hasOwnProperty("path") ? e.path = n + "." + e.path : e.path = n, e.message = e.message + "(" + e.path + ")", e
                      }
                      t._inner.ordereds.push(r)
                  }), t
              }, _class.prototype.min = function(e) {
                  var t = a.isRef(e);
                  return s.assert(Number.isSafeInteger(e) && e >= 0 || t, "limit must be a positive integer or reference"), this._test("min", e, function(r, n, o) {
                      var i = void 0;
                      if (t) {
                          if (i = e(n.reference || n.parent, o), !(Number.isSafeInteger(i) && i >= 0)) return this.createError("array.ref", {
                              ref: e.key
                          }, n, o)
                      } else i = e;
                      return r.length >= i ? r : this.createError("array.min", {
                          limit: e,
                          value: r
                      }, n, o)
                  })
              }, _class.prototype.max = function(e) {
                  var t = a.isRef(e);
                  return s.assert(Number.isSafeInteger(e) && e >= 0 || t, "limit must be a positive integer or reference"), this._test("max", e, function(r, n, o) {
                      var i = void 0;
                      if (t) {
                          if (i = e(n.reference || n.parent, o), !(Number.isSafeInteger(i) && i >= 0)) return this.createError("array.ref", {
                              ref: e.key
                          }, n, o)
                      } else i = e;
                      return r.length <= i ? r : this.createError("array.max", {
                          limit: e,
                          value: r
                      }, n, o)
                  })
              }, _class.prototype.length = function(e) {
                  var t = a.isRef(e);
                  return s.assert(Number.isSafeInteger(e) && e >= 0 || t, "limit must be a positive integer or reference"), this._test("length", e, function(r, n, o) {
                      var i = void 0;
                      if (t) {
                          if (i = e(n.reference || n.parent, o), !(Number.isSafeInteger(i) && i >= 0)) return this.createError("array.ref", {
                              ref: e.key
                          }, n, o)
                      } else i = e;
                      return r.length === i ? r : this.createError("array.length", {
                          limit: e,
                          value: r
                      }, n, o)
                  })
              }, _class.prototype.unique = function(e) {
                  s.assert(void 0 === e || "function" === typeof e || "string" === typeof e, "comparator must be a function or a string");
                  var t = {};
                  return "string" === typeof e ? t.path = e : "function" === typeof e && (t.comparator = e), this._test("unique", t, function(e, r, o) {
                      for (var i = {
                              string: Object.create(null),
                              number: Object.create(null),
                              undefined: Object.create(null),
                              boolean: Object.create(null),
                              object: new Map,
                              function: new Map,
                              custom: new Map
                          }, a = t.comparator || s.deepEqual, u = 0; u < e.length; ++u) {
                          var c = t.path ? s.reach(e[u], t.path) : e[u],
                              f = t.comparator ? i.custom : i["undefined" === typeof c ? "undefined" : n(c)];
                          if (f)
                              if (f instanceof Map) {
                                  for (var l = f.entries(), p = void 0; !(p = l.next()).done;)
                                      if (a(p.value[0], c)) {
                                          var h = {
                                                  key: r.key,
                                                  path: r.path.concat(u),
                                                  parent: r.parent,
                                                  reference: r.reference
                                              },
                                              d = {
                                                  pos: u,
                                                  value: e[u],
                                                  dupePos: p.value[1],
                                                  dupeValue: e[p.value[1]]
                                              };
                                          return t.path && (d.path = t.path), this.createError("array.unique", d, h, o)
                                      }
                                  f.set(c, u)
                              } else {
                                  if (void 0 !== f[c]) {
                                      var y = {
                                              key: r.key,
                                              path: r.path.concat(u),
                                              parent: r.parent,
                                              reference: r.reference
                                          },
                                          g = {
                                              pos: u,
                                              value: e[u],
                                              dupePos: f[c],
                                              dupeValue: e[f[c]]
                                          };
                                      return t.path && (g.path = t.path), this.createError("array.unique", g, y, o)
                                  }
                                  f[c] = u
                              }
                      }
                      return e
                  })
              }, _class.prototype.sparse = function(e) {
                  var t = void 0 === e || !!e;
                  if (this._flags.sparse === t) return this;
                  var r = this.clone();
                  return r._flags.sparse = t, r
              }, _class.prototype.single = function(e) {
                  var t = void 0 === e || !!e;
                  if (this._flags.single === t) return this;
                  var r = this.clone();
                  return r._flags.single = t, r
              }, _class.prototype._fillMissedErrors = function(e, t, r, n) {
                  for (var o = [], i = 0, a = 0; a < t.length; ++a) {
                      var s = t[a]._getLabel();
                      s ? o.push(s) : ++i
                  }
                  o.length ? i ? e.push(this.createError("array.includesRequiredBoth", {
                      knownMisses: o,
                      unknownMisses: i
                  }, {
                      key: r.key,
                      path: r.path
                  }, n)) : e.push(this.createError("array.includesRequiredKnowns", {
                      knownMisses: o
                  }, {
                      key: r.key,
                      path: r.path
                  }, n)) : e.push(this.createError("array.includesRequiredUnknowns", {
                      unknownMisses: i
                  }, {
                      key: r.key,
                      path: r.path
                  }, n))
              }, _class.prototype._fillOrderedErrors = function(e, t, r, n) {
                  for (var o = [], i = 0; i < t.length; ++i) {
                      "required" === s.reach(t[i], "_flags.presence") && o.push(t[i])
                  }
                  o.length && this._fillMissedErrors.call(this, e, o, r, n)
              }, _class
          }(o), u.safeParse = function(e, t) {
              try {
                  var r = JSON.parse(e);
                  Array.isArray(r) && (t.value = r)
              } catch (e) {}
          }, e.exports = new u.Array
      }, function(e, t, r) {
          "use strict";
          (function(t) {
              function _defaults(e, t) {
                  for (var r = Object.getOwnPropertyNames(t), n = 0; n < r.length; n++) {
                      var o = r[n],
                          i = Object.getOwnPropertyDescriptor(t, o);
                      i && i.configurable && void 0 === e[o] && Object.defineProperty(e, o, i)
                  }
                  return e
              }

              function _classCallCheck(e, t) {
                  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
              }

              function _possibleConstructorReturn(e, t) {
                  if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                  return !t || "object" !== typeof t && "function" !== typeof t ? e : t
              }

              function _inherits(e, t) {
                  if ("function" !== typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                  e.prototype = Object.create(t && t.prototype, {
                      constructor: {
                          value: e,
                          enumerable: !1,
                          writable: !0,
                          configurable: !0
                      }
                  }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : _defaults(e, t))
              }
              var n = r(2),
                  o = r(0),
                  i = {};
              i.Binary = function(e) {
                  function _class() {
                      _classCallCheck(this, _class);
                      var t = _possibleConstructorReturn(this, e.call(this));
                      return t._type = "binary", t
                  }
                  return _inherits(_class, e), _class.prototype._base = function(e, r, n) {
                      var o = {
                          value: e
                      };
                      if ("string" === typeof e && n.convert) try {
                          o.value = t.from(e, this._flags.encoding)
                      } catch (e) {}
                      return o.errors = t.isBuffer(o.value) ? null : this.createError("binary.base", null, r, n), o
                  }, _class.prototype.encoding = function(e) {
                      if (o.assert(t.isEncoding(e), "Invalid encoding:", e), this._flags.encoding === e) return this;
                      var r = this.clone();
                      return r._flags.encoding = e, r
                  }, _class.prototype.min = function(e) {
                      return o.assert(Number.isSafeInteger(e) && e >= 0, "limit must be a positive integer"), this._test("min", e, function(t, r, n) {
                          return t.length >= e ? t : this.createError("binary.min", {
                              limit: e,
                              value: t
                          }, r, n)
                      })
                  }, _class.prototype.max = function(e) {
                      return o.assert(Number.isSafeInteger(e) && e >= 0, "limit must be a positive integer"), this._test("max", e, function(t, r, n) {
                          return t.length <= e ? t : this.createError("binary.max", {
                              limit: e,
                              value: t
                          }, r, n)
                      })
                  }, _class.prototype.length = function(e) {
                      return o.assert(Number.isSafeInteger(e) && e >= 0, "limit must be a positive integer"), this._test("length", e, function(t, r, n) {
                          return t.length === e ? t : this.createError("binary.length", {
                              limit: e,
                              value: t
                          }, r, n)
                      })
                  }, _class
              }(n), e.exports = new i.Binary
          }).call(t, r(3).Buffer)
      }, function(e, t, r) {
          "use strict";

          function _defaults(e, t) {
              for (var r = Object.getOwnPropertyNames(t), n = 0; n < r.length; n++) {
                  var o = r[n],
                      i = Object.getOwnPropertyDescriptor(t, o);
                  i && i.configurable && void 0 === e[o] && Object.defineProperty(e, o, i)
              }
              return e
          }

          function _classCallCheck(e, t) {
              if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
          }

          function _possibleConstructorReturn(e, t) {
              if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              return !t || "object" !== typeof t && "function" !== typeof t ? e : t
          }

          function _inherits(e, t) {
              if ("function" !== typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
              e.prototype = Object.create(t && t.prototype, {
                  constructor: {
                      value: e,
                      enumerable: !1,
                      writable: !0,
                      configurable: !0
                  }
              }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : _defaults(e, t))
          }
          var n = r(2),
              o = r(0),
              i = {
                  Set: r(9)
              };
          i.Boolean = function(e) {
              function _class() {
                  _classCallCheck(this, _class);
                  var t = _possibleConstructorReturn(this, e.call(this));
                  return t._type = "boolean", t._flags.insensitive = !0, t._inner.truthySet = new i.Set, t._inner.falsySet = new i.Set, t
              }
              return _inherits(_class, e), _class.prototype._base = function(e, t, r) {
                  var n = {
                      value: e
                  };
                  if ("string" === typeof e && r.convert) {
                      var o = this._flags.insensitive ? e.toLowerCase() : e;
                      n.value = "true" === o || "false" !== o && e
                  }
                  return "boolean" !== typeof n.value && (n.value = !!this._inner.truthySet.has(e, null, null, this._flags.insensitive) || !this._inner.falsySet.has(e, null, null, this._flags.insensitive) && e), n.errors = "boolean" === typeof n.value ? null : this.createError("boolean.base", null, t, r), n
              }, _class.prototype.truthy = function() {
                  for (var e = arguments.length, t = Array(e), r = 0; r < e; r++) t[r] = arguments[r];
                  var n = this.clone();
                  t = o.flatten(t);
                  for (var i = 0; i < t.length; ++i) {
                      var a = t[i];
                      o.assert(void 0 !== a, "Cannot call truthy with undefined"), n._inner.truthySet.add(a)
                  }
                  return n
              }, _class.prototype.falsy = function() {
                  for (var e = arguments.length, t = Array(e), r = 0; r < e; r++) t[r] = arguments[r];
                  var n = this.clone();
                  t = o.flatten(t);
                  for (var i = 0; i < t.length; ++i) {
                      var a = t[i];
                      o.assert(void 0 !== a, "Cannot call falsy with undefined"), n._inner.falsySet.add(a)
                  }
                  return n
              }, _class.prototype.insensitive = function(e) {
                  var t = void 0 === e || !!e;
                  if (this._flags.insensitive === t) return this;
                  var r = this.clone();
                  return r._flags.insensitive = t, r
              }, _class.prototype.describe = function() {
                  var e = n.prototype.describe.call(this);
                  return e.truthy = [!0].concat(this._inner.truthySet.values()), e.falsy = [!1].concat(this._inner.falsySet.values()), e
              }, _class
          }(n), e.exports = new i.Boolean
      }, function(e, t, r) {
          "use strict";

          function _defaults(e, t) {
              for (var r = Object.getOwnPropertyNames(t), n = 0; n < r.length; n++) {
                  var o = r[n],
                      i = Object.getOwnPropertyDescriptor(t, o);
                  i && i.configurable && void 0 === e[o] && Object.defineProperty(e, o, i)
              }
              return e
          }

          function _classCallCheck(e, t) {
              if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
          }

          function _possibleConstructorReturn(e, t) {
              if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              return !t || "object" !== typeof t && "function" !== typeof t ? e : t
          }

          function _inherits(e, t) {
              if ("function" !== typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
              e.prototype = Object.create(t && t.prototype, {
                  constructor: {
                      value: e,
                      enumerable: !1,
                      writable: !0,
                      configurable: !0
                  }
              }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : _defaults(e, t))
          }
          var n = r(0),
              o = r(13),
              i = r(1),
              a = {};
          a.Func = function(e) {
              function _class() {
                  _classCallCheck(this, _class);
                  var t = _possibleConstructorReturn(this, e.call(this));
                  return t._flags.func = !0, t
              }
              return _inherits(_class, e), _class.prototype.arity = function(e) {
                  return n.assert(Number.isSafeInteger(e) && e >= 0, "n must be a positive integer"), this._test("arity", e, function(t, r, n) {
                      return t.length === e ? t : this.createError("function.arity", {
                          n: e
                      }, r, n)
                  })
              }, _class.prototype.minArity = function(e) {
                  return n.assert(Number.isSafeInteger(e) && e > 0, "n must be a strict positive integer"), this._test("minArity", e, function(t, r, n) {
                      return t.length >= e ? t : this.createError("function.minArity", {
                          n: e
                      }, r, n)
                  })
              }, _class.prototype.maxArity = function(e) {
                  return n.assert(Number.isSafeInteger(e) && e >= 0, "n must be a positive integer"), this._test("maxArity", e, function(t, r, n) {
                      return t.length <= e ? t : this.createError("function.maxArity", {
                          n: e
                      }, r, n)
                  })
              }, _class.prototype.ref = function() {
                  return this._test("ref", null, function(e, t, r) {
                      return i.isRef(e) ? e : this.createError("function.ref", null, t, r)
                  })
              }, _class.prototype.class = function() {
                  return this._test("class", null, function(e, t, r) {
                      return /^\s*class\s/.test(e.toString()) ? e : this.createError("function.class", null, t, r)
                  })
              }, _class
          }(o.constructor), e.exports = new a.Func
      }, function(e, t, r) {
          "use strict";

          function _defaults(e, t) {
              for (var r = Object.getOwnPropertyNames(t), n = 0; n < r.length; n++) {
                  var o = r[n],
                      i = Object.getOwnPropertyDescriptor(t, o);
                  i && i.configurable && void 0 === e[o] && Object.defineProperty(e, o, i)
              }
              return e
          }

          function _classCallCheck(e, t) {
              if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
          }

          function _possibleConstructorReturn(e, t) {
              if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              return !t || "object" !== typeof t && "function" !== typeof t ? e : t
          }

          function _inherits(e, t) {
              if ("function" !== typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
              e.prototype = Object.create(t && t.prototype, {
                  constructor: {
                      value: e,
                      enumerable: !1,
                      writable: !0,
                      configurable: !0
                  }
              }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : _defaults(e, t))
          }
          var n = r(2),
              o = r(0),
              i = {};
          i.Lazy = function(e) {
              function _class() {
                  _classCallCheck(this, _class);
                  var t = _possibleConstructorReturn(this, e.call(this));
                  return t._type = "lazy", t
              }
              return _inherits(_class, e), _class.prototype._base = function(e, t, r) {
                  var o = {
                          value: e
                      },
                      i = this._flags.lazy;
                  if (!i) return o.errors = this.createError("lazy.base", null, t, r), o;
                  var a = i();
                  return a instanceof n ? a._validate(e, t, r) : (o.errors = this.createError("lazy.schema", null, t, r), o)
              }, _class.prototype.set = function(e) {
                  o.assert("function" === typeof e, "You must provide a function as first argument");
                  var t = this.clone();
                  return t._flags.lazy = e, t
              }, _class
          }(n), e.exports = new i.Lazy
      }, function(e, t, r) {
          "use strict";

          function _defaults(e, t) {
              for (var r = Object.getOwnPropertyNames(t), n = 0; n < r.length; n++) {
                  var o = r[n],
                      i = Object.getOwnPropertyDescriptor(t, o);
                  i && i.configurable && void 0 === e[o] && Object.defineProperty(e, o, i)
              }
              return e
          }

          function _classCallCheck(e, t) {
              if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
          }

          function _possibleConstructorReturn(e, t) {
              if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              return !t || "object" !== typeof t && "function" !== typeof t ? e : t
          }

          function _inherits(e, t) {
              if ("function" !== typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
              e.prototype = Object.create(t && t.prototype, {
                  constructor: {
                      value: e,
                      enumerable: !1,
                      writable: !0,
                      configurable: !0
                  }
              }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : _defaults(e, t))
          }
          var n = r(2),
              o = r(1),
              i = r(0),
              a = {
                  precisionRx: /(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/
              };
          a.Number = function(e) {
              function _class() {
                  _classCallCheck(this, _class);
                  var t = _possibleConstructorReturn(this, e.call(this));
                  return t._type = "number", t._invalids.add(1 / 0), t._invalids.add(-1 / 0), t
              }
              return _inherits(_class, e), _class.prototype._base = function(e, t, r) {
                  var n = {
                      errors: null,
                      value: e
                  };
                  if ("string" === typeof e && r.convert) {
                      var o = parseFloat(e);
                      n.value = isNaN(o) || !isFinite(e) ? NaN : o
                  }
                  var i = "number" === typeof n.value && !isNaN(n.value);
                  if (r.convert && "precision" in this._flags && i) {
                      var a = Math.pow(10, this._flags.precision);
                      n.value = Math.round(n.value * a) / a
                  }
                  return n.errors = i ? null : this.createError("number.base", null, t, r), n
              }, _class.prototype.multiple = function(e) {
                  var t = o.isRef(e);
                  return t || (i.assert("number" === typeof e && isFinite(e), "multiple must be a number"), i.assert(e > 0, "multiple must be greater than 0")), this._test("multiple", e, function(r, n, o) {
                      var i = t ? e(n.reference || n.parent, o) : e;
                      return !t || "number" === typeof i && isFinite(i) ? r % i === 0 ? r : this.createError("number.multiple", {
                          multiple: e,
                          value: r
                      }, n, o) : this.createError("number.ref", {
                          ref: e.key
                      }, n, o)
                  })
              }, _class.prototype.integer = function() {
                  return this._test("integer", void 0, function(e, t, r) {
                      return Number.isSafeInteger(e) ? e : this.createError("number.integer", {
                          value: e
                      }, t, r)
                  })
              }, _class.prototype.negative = function() {
                  return this._test("negative", void 0, function(e, t, r) {
                      return e < 0 ? e : this.createError("number.negative", {
                          value: e
                      }, t, r)
                  })
              }, _class.prototype.positive = function() {
                  return this._test("positive", void 0, function(e, t, r) {
                      return e > 0 ? e : this.createError("number.positive", {
                          value: e
                      }, t, r)
                  })
              }, _class.prototype.precision = function(e) {
                  i.assert(Number.isSafeInteger(e), "limit must be an integer"), i.assert(!("precision" in this._flags), "precision already set");
                  var t = this._test("precision", e, function(t, r, n) {
                      var o = t.toString().match(a.precisionRx);
                      return Math.max((o[1] ? o[1].length : 0) - (o[2] ? parseInt(o[2], 10) : 0), 0) <= e ? t : this.createError("number.precision", {
                          limit: e,
                          value: t
                      }, r, n)
                  });
                  return t._flags.precision = e, t
              }, _class.prototype.port = function() {
                  return this._test("port", void 0, function(e, t, r) {
                      return !Number.isSafeInteger(e) || e < 0 || e > 65535 ? this.createError("number.port", {
                          value: e
                      }, t, r) : e
                  })
              }, _class
          }(n), a.compare = function(e, t) {
              return function(r) {
                  var n = o.isRef(r),
                      a = "number" === typeof r && !isNaN(r);
                  return i.assert(a || n, "limit must be a number or reference"), this._test(e, r, function(o, i, a) {
                      var s = void 0;
                      if (n) {
                          if ("number" !== typeof(s = r(i.reference || i.parent, a)) || isNaN(s)) return this.createError("number.ref", {
                              ref: r.key
                          }, i, a)
                      } else s = r;
                      return t(o, s) ? o : this.createError("number." + e, {
                          limit: s,
                          value: o
                      }, i, a)
                  })
              }
          }, a.Number.prototype.min = a.compare("min", function(e, t) {
              return e >= t
          }), a.Number.prototype.max = a.compare("max", function(e, t) {
              return e <= t
          }), a.Number.prototype.greater = a.compare("greater", function(e, t) {
              return e > t
          }), a.Number.prototype.less = a.compare("less", function(e, t) {
              return e < t
          }), e.exports = new a.Number
      }, function(e, t, r) {
          "use strict";
          (function(t) {
              function _defaults(e, t) {
                  for (var r = Object.getOwnPropertyNames(t), n = 0; n < r.length; n++) {
                      var o = r[n],
                          i = Object.getOwnPropertyDescriptor(t, o);
                      i && i.configurable && void 0 === e[o] && Object.defineProperty(e, o, i)
                  }
                  return e
              }

              function _classCallCheck(e, t) {
                  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
              }

              function _possibleConstructorReturn(e, t) {
                  if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                  return !t || "object" !== typeof t && "function" !== typeof t ? e : t
              }

              function _inherits(e, t) {
                  if ("function" !== typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                  e.prototype = Object.create(t && t.prototype, {
                      constructor: {
                          value: e,
                          enumerable: !1,
                          writable: !0,
                          configurable: !0
                      }
                  }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : _defaults(e, t))
              }
              var n = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function(e) {
                      return typeof e
                  } : function(e) {
                      return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                  },
                  o = r(15),
                  i = r(0),
                  a = void 0,
                  s = r(2),
                  u = r(1),
                  c = r(12),
                  f = r(30),
                  l = r(29),
                  p = {
                      uriRegex: f.createUriRegex(),
                      ipRegex: l.createIpRegex(["ipv4", "ipv6", "ipvfuture"], "optional"),
                      guidBrackets: {
                          "{": "}",
                          "[": "]",
                          "(": ")",
                          "": ""
                      },
                      guidVersions: {
                          uuidv1: "1",
                          uuidv2: "2",
                          uuidv3: "3",
                          uuidv4: "4",
                          uuidv5: "5"
                      },
                      cidrPresences: ["required", "optional", "forbidden"],
                      normalizationForms: ["NFC", "NFD", "NFKC", "NFKD"]
                  };
              p.String = function(e) {
                  function _class() {
                      _classCallCheck(this, _class);
                      var t = _possibleConstructorReturn(this, e.call(this));
                      return t._type = "string", t._invalids.add(""), t
                  }
                  return _inherits(_class, e), _class.prototype._base = function(e, t, r) {
                      if ("string" === typeof e && r.convert) {
                          if (this._flags.normalize && (e = e.normalize(this._flags.normalize)), this._flags.case && (e = "upper" === this._flags.case ? e.toLocaleUpperCase() : e.toLocaleLowerCase()), this._flags.trim && (e = e.trim()), this._inner.replacements)
                              for (var n = 0; n < this._inner.replacements.length; ++n) {
                                  var o = this._inner.replacements[n];
                                  e = e.replace(o.pattern, o.replacement)
                              }
                          if (this._flags.truncate)
                              for (var i = 0; i < this._tests.length; ++i) {
                                  var a = this._tests[i];
                                  if ("max" === a.name) {
                                      e = e.slice(0, a.arg);
                                      break
                                  }
                              }
                          this._flags.byteAligned && e.length % 2 !== 0 && (e = "0" + e)
                      }
                      return {
                          value: e,
                          errors: "string" === typeof e ? null : this.createError("string.base", {
                              value: e
                          }, t, r)
                      }
                  }, _class.prototype.insensitive = function() {
                      if (this._flags.insensitive) return this;
                      var e = this.clone();
                      return e._flags.insensitive = !0, e
                  }, _class.prototype.creditCard = function() {
                      return this._test("creditCard", void 0, function(e, t, r) {
                          for (var n = e.length, o = 0, i = 1; n--;) {
                              var a = e.charAt(n) * i;
                              o += a - 9 * (a > 9), i ^= 3
                          }
                          return o % 10 === 0 && o > 0 ? e : this.createError("string.creditCard", {
                              value: e
                          }, t, r)
                      })
                  }, _class.prototype.regex = function(e, t) {
                      i.assert(e instanceof RegExp, "pattern must be a RegExp");
                      var r = {
                          pattern: new RegExp(e.source, e.ignoreCase ? "i" : void 0)
                      };
                      "string" === typeof t ? r.name = t : "object" === ("undefined" === typeof t ? "undefined" : n(t)) && (r.invert = !!t.invert, t.name && (r.name = t.name));
                      var o = ["string.regex", r.invert ? ".invert" : "", r.name ? ".name" : ".base"].join("");
                      return this._test("regex", r, function(e, t, n) {
                          return r.pattern.test(e) ^ r.invert ? e : this.createError(o, {
                              name: r.name,
                              pattern: r.pattern,
                              value: e
                          }, t, n)
                      })
                  }, _class.prototype.alphanum = function() {
                      return this._test("alphanum", void 0, function(e, t, r) {
                          return /^[a-zA-Z0-9]+$/.test(e) ? e : this.createError("string.alphanum", {
                              value: e
                          }, t, r)
                      })
                  }, _class.prototype.token = function() {
                      return this._test("token", void 0, function(e, t, r) {
                          return /^\w+$/.test(e) ? e : this.createError("string.token", {
                              value: e
                          }, t, r)
                      })
                  }, _class.prototype.email = function(e) {
                      return e && (i.assert("object" === ("undefined" === typeof e ? "undefined" : n(e)), "email options must be an object"), i.assert("undefined" === typeof e.checkDNS, "checkDNS option is not supported"), i.assert("undefined" === typeof e.tldWhitelist || "object" === n(e.tldWhitelist), "tldWhitelist must be an array or object"), i.assert("undefined" === typeof e.minDomainAtoms || Number.isSafeInteger(e.minDomainAtoms) && e.minDomainAtoms > 0, "minDomainAtoms must be a positive integer"), i.assert("undefined" === typeof e.errorLevel || "boolean" === typeof e.errorLevel || Number.isSafeInteger(e.errorLevel) && e.errorLevel >= 0, "errorLevel must be a non-negative integer or boolean")), this._test("email", e, function(t, n, o) {
                          a = a || r(19);
                          try {
                              var i = a.validate(t, e);
                              if (!0 === i || 0 === i) return t
                          } catch (e) {}
                          return this.createError("string.email", {
                              value: t
                          }, n, o)
                      })
                  }, _class.prototype.ip = function() {
                      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                          t = p.ipRegex;
                      i.assert("object" === ("undefined" === typeof e ? "undefined" : n(e)), "options must be an object"), e.cidr ? (i.assert("string" === typeof e.cidr, "cidr must be a string"), e.cidr = e.cidr.toLowerCase(), i.assert(i.contain(p.cidrPresences, e.cidr), "cidr must be one of " + p.cidrPresences.join(", ")), e.version || "optional" === e.cidr || (t = l.createIpRegex(["ipv4", "ipv6", "ipvfuture"], e.cidr))) : e.cidr = "optional";
                      var r = void 0;
                      if (e.version) {
                          Array.isArray(e.version) || (e.version = [e.version]), i.assert(e.version.length >= 1, "version must have at least 1 version specified"), r = [];
                          for (var o = 0; o < e.version.length; ++o) {
                              var a = e.version[o];
                              i.assert("string" === typeof a, "version at position " + o + " must be a string"), a = a.toLowerCase(), i.assert(l.versions[a], "version at position " + o + " must be one of " + Object.keys(l.versions).join(", ")), r.push(a)
                          }
                          r = i.unique(r), t = l.createIpRegex(r, e.cidr)
                      }
                      return this._test("ip", e, function(n, o, i) {
                          return t.test(n) ? n : r ? this.createError("string.ipVersion", {
                              value: n,
                              cidr: e.cidr,
                              version: r
                          }, o, i) : this.createError("string.ip", {
                              value: n,
                              cidr: e.cidr
                          }, o, i)
                      })
                  }, _class.prototype.uri = function(e) {
                      var t = "",
                          r = !1,
                          o = !1,
                          a = p.uriRegex;
                      if (e) {
                          if (i.assert("object" === ("undefined" === typeof e ? "undefined" : n(e)), "options must be an object"), e.scheme) {
                              i.assert(e.scheme instanceof RegExp || "string" === typeof e.scheme || Array.isArray(e.scheme), "scheme must be a RegExp, String, or Array"), Array.isArray(e.scheme) || (e.scheme = [e.scheme]), i.assert(e.scheme.length >= 1, "scheme must have at least 1 scheme specified");
                              for (var s = 0; s < e.scheme.length; ++s) {
                                  var u = e.scheme[s];
                                  i.assert(u instanceof RegExp || "string" === typeof u, "scheme at position " + s + " must be a RegExp or String"), t += t ? "|" : "", u instanceof RegExp ? t += u.source : (i.assert(/[a-zA-Z][a-zA-Z0-9+-\.]*/.test(u), "scheme at position " + s + " must be a valid scheme"), t += i.escapeRegex(u))
                              }
                          }
                          e.allowRelative && (r = !0), e.relativeOnly && (o = !0)
                      }
                      return (t || r || o) && (a = f.createUriRegex(t, r, o)), this._test("uri", e, function(e, r, n) {
                          return a.test(e) ? e : o ? this.createError("string.uriRelativeOnly", {
                              value: e
                          }, r, n) : t ? this.createError("string.uriCustomScheme", {
                              scheme: t,
                              value: e
                          }, r, n) : this.createError("string.uri", {
                              value: e
                          }, r, n)
                      })
                  }, _class.prototype.isoDate = function() {
                      return this._test("isoDate", void 0, function(e, t, r) {
                          if (c._isIsoDate(e)) {
                              if (!r.convert) return e;
                              var n = new Date(e);
                              if (!isNaN(n.getTime())) return n.toISOString()
                          }
                          return this.createError("string.isoDate", {
                              value: e
                          }, t, r)
                      })
                  }, _class.prototype.guid = function(e) {
                      var t = "";
                      if (e && e.version) {
                          Array.isArray(e.version) || (e.version = [e.version]), i.assert(e.version.length >= 1, "version must have at least 1 valid version specified");
                          for (var r = new Set, n = 0; n < e.version.length; ++n) {
                              var o = e.version[n];
                              i.assert("string" === typeof o, "version at position " + n + " must be a string"), o = o.toLowerCase();
                              var a = p.guidVersions[o];
                              i.assert(a, "version at position " + n + " must be one of " + Object.keys(p.guidVersions).join(", ")), i.assert(!r.has(a), "version at position " + n + " must not be a duplicate."), t += a, r.add(a)
                          }
                      }
                      var s = new RegExp("^([\\[{\\(]?)[0-9A-F]{8}([:-]?)[0-9A-F]{4}\\2?[" + (t || "0-9A-F") + "][0-9A-F]{3}\\2?[" + (t ? "89AB" : "0-9A-F") + "][0-9A-F]{3}\\2?[0-9A-F]{12}([\\]}\\)]?)$", "i");
                      return this._test("guid", e, function(e, t, r) {
                          var n = s.exec(e);
                          return n ? p.guidBrackets[n[1]] !== n[n.length - 1] ? this.createError("string.guid", {
                              value: e
                          }, t, r) : e : this.createError("string.guid", {
                              value: e
                          }, t, r)
                      })
                  }, _class.prototype.hex = function() {
                      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                      i.assert("object" === ("undefined" === typeof e ? "undefined" : n(e)), "hex options must be an object"), i.assert("undefined" === typeof e.byteAligned || "boolean" === typeof e.byteAligned, "byteAligned must be boolean");
                      var t = !0 === e.byteAligned,
                          r = /^[a-f0-9]+$/i,
                          o = this._test("hex", r, function(e, n, o) {
                              return r.test(e) ? t && e.length % 2 !== 0 ? this.createError("string.hexAlign", {
                                  value: e
                              }, n, o) : e : this.createError("string.hex", {
                                  value: e
                              }, n, o)
                          });
                      return t && (o._flags.byteAligned = !0), o
                  }, _class.prototype.base64 = function() {
                      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                      i.assert("object" === ("undefined" === typeof e ? "undefined" : n(e)), "base64 options must be an object"), i.assert("undefined" === typeof e.paddingRequired || "boolean" === typeof e.paddingRequired, "paddingRequired must be boolean");
                      var t = !1 === e.paddingRequired ? e.paddingRequired : e.paddingRequired || !0,
                          r = t ? /^(?:[A-Za-z0-9+\/]{4})*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=)?$/ : /^(?:[A-Za-z0-9+\/]{4})*(?:[A-Za-z0-9+\/]{2}(==)?|[A-Za-z0-9+\/]{3}=?)?$/;
                      return this._test("base64", r, function(e, t, n) {
                          return r.test(e) ? e : this.createError("string.base64", {
                              value: e
                          }, t, n)
                      })
                  }, _class.prototype.hostname = function() {
                      var e = /^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$/;
                      return this._test("hostname", void 0, function(t, r, n) {
                          return t.length <= 255 && e.test(t) || o.isIPv6(t) ? t : this.createError("string.hostname", {
                              value: t
                          }, r, n)
                      })
                  }, _class.prototype.normalize = function() {
                      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "NFC";
                      i.assert(i.contain(p.normalizationForms, e), "normalization form must be one of " + p.normalizationForms.join(", "));
                      var t = this._test("normalize", e, function(t, r, n) {
                          return n.convert || t === t.normalize(e) ? t : this.createError("string.normalize", {
                              value: t,
                              form: e
                          }, r, n)
                      });
                      return t._flags.normalize = e, t
                  }, _class.prototype.lowercase = function() {
                      var e = this._test("lowercase", void 0, function(e, t, r) {
                          return r.convert || e === e.toLocaleLowerCase() ? e : this.createError("string.lowercase", {
                              value: e
                          }, t, r)
                      });
                      return e._flags.case = "lower", e
                  }, _class.prototype.uppercase = function() {
                      var e = this._test("uppercase", void 0, function(e, t, r) {
                          return r.convert || e === e.toLocaleUpperCase() ? e : this.createError("string.uppercase", {
                              value: e
                          }, t, r)
                      });
                      return e._flags.case = "upper", e
                  }, _class.prototype.trim = function() {
                      var e = this._test("trim", void 0, function(e, t, r) {
                          return r.convert || e === e.trim() ? e : this.createError("string.trim", {
                              value: e
                          }, t, r)
                      });
                      return e._flags.trim = !0, e
                  }, _class.prototype.replace = function(e, t) {
                      "string" === typeof e && (e = new RegExp(i.escapeRegex(e), "g")), i.assert(e instanceof RegExp, "pattern must be a RegExp"), i.assert("string" === typeof t, "replacement must be a String");
                      var r = this.clone();
                      return r._inner.replacements || (r._inner.replacements = []), r._inner.replacements.push({
                          pattern: e,
                          replacement: t
                      }), r
                  }, _class.prototype.truncate = function(e) {
                      var t = void 0 === e || !!e;
                      if (this._flags.truncate === t) return this;
                      var r = this.clone();
                      return r._flags.truncate = t, r
                  }, _class
              }(s), p.compare = function(e, r) {
                  return function(n, o) {
                      var a = u.isRef(n);
                      return i.assert(Number.isSafeInteger(n) && n >= 0 || a, "limit must be a positive integer or reference"), i.assert(!o || t.isEncoding(o), "Invalid encoding:", o), this._test(e, n, function(t, i, s) {
                          var u = void 0;
                          if (a) {
                              if (u = n(i.reference || i.parent, s), !Number.isSafeInteger(u)) return this.createError("string.ref", {
                                  ref: n.key
                              }, i, s)
                          } else u = n;
                          return r(t, u, o) ? t : this.createError("string." + e, {
                              limit: u,
                              value: t,
                              encoding: o
                          }, i, s)
                      })
                  }
              }, p.String.prototype.min = p.compare("min", function(e, r, n) {
                  return (n ? t.byteLength(e, n) : e.length) >= r
              }), p.String.prototype.max = p.compare("max", function(e, r, n) {
                  return (n ? t.byteLength(e, n) : e.length) <= r
              }), p.String.prototype.length = p.compare("length", function(e, r, n) {
                  return (n ? t.byteLength(e, n) : e.length) === r
              }), p.String.prototype.uuid = p.String.prototype.guid, e.exports = new p.String
          }).call(t, r(3).Buffer)
      }, function(e, t, r) {
          "use strict";
          var n = r(14),
              o = {
                  Ip: {
                      cidrs: {
                          ipv4: {
                              required: "\\/(?:" + n.ipv4Cidr + ")",
                              optional: "(?:\\/(?:" + n.ipv4Cidr + "))?",
                              forbidden: ""
                          },
                          ipv6: {
                              required: "\\/" + n.ipv6Cidr,
                              optional: "(?:\\/" + n.ipv6Cidr + ")?",
                              forbidden: ""
                          },
                          ipvfuture: {
                              required: "\\/" + n.ipv6Cidr,
                              optional: "(?:\\/" + n.ipv6Cidr + ")?",
                              forbidden: ""
                          }
                      },
                      versions: {
                          ipv4: n.IPv4address,
                          ipv6: n.IPv6address,
                          ipvfuture: n.IPvFuture
                      }
                  }
              };
          o.Ip.createIpRegex = function(e, t) {
              for (var r = void 0, n = 0; n < e.length; ++n) {
                  var i = e[n];
                  r ? r += "|" + o.Ip.versions[i] + o.Ip.cidrs[i][t] : r = "^(?:" + o.Ip.versions[i] + o.Ip.cidrs[i][t]
              }
              return new RegExp(r + ")$")
          }, e.exports = o.Ip
      }, function(e, t, r) {
          "use strict";
          var n = r(14),
              o = {
                  Uri: {
                      createUriRegex: function(e, t, r) {
                          var o = n.scheme,
                              i = void 0;
                          if (r) i = "(?:" + n.relativeRef + ")";
                          else {
                              e && (o = "(?:" + e + ")");
                              var a = "(?:" + o + ":" + n.hierPart + ")";
                              i = t ? "(?:" + a + "|" + n.relativeRef + ")" : a
                          }
                          return new RegExp("^" + i + "(?:\\?" + n.query + ")?(?:#" + n.fragment + ")?$")
                      }
                  }
              };
          e.exports = o.Uri
      }, function(e, t, r) {
          "use strict";
          var n = r(0),
              o = {};
          e.exports = o.Topo = function() {
              this._items = [], this.nodes = []
          }, o.Topo.prototype.add = function(e, t) {
              var r = this;
              t = t || {};
              var o = [].concat(t.before || []),
                  i = [].concat(t.after || []),
                  a = t.group || "?",
                  s = t.sort || 0;
              n.assert(-1 === o.indexOf(a), "Item cannot come before itself:", a), n.assert(-1 === o.indexOf("?"), "Item cannot come before unassociated items"), n.assert(-1 === i.indexOf(a), "Item cannot come after itself:", a), n.assert(-1 === i.indexOf("?"), "Item cannot come after unassociated items"), [].concat(e).forEach(function(e, t) {
                  var n = {
                      seq: r._items.length,
                      sort: s,
                      before: o,
                      after: i,
                      group: a,
                      node: e
                  };
                  r._items.push(n)
              });
              var u = this._sort();
              return n.assert(!u, "item", "?" !== a ? "added into group " + a : "", "created a dependencies error"), this.nodes
          }, o.Topo.prototype.merge = function(e) {
              e = [].concat(e);
              for (var t = 0; t < e.length; ++t) {
                  var r = e[t];
                  if (r)
                      for (var i = 0; i < r._items.length; ++i) {
                          var a = n.shallow(r._items[i]);
                          this._items.push(a)
                      }
              }
              this._items.sort(o.mergeSort);
              for (var s = 0; s < this._items.length; ++s) this._items[s].seq = s;
              var u = this._sort();
              return n.assert(!u, "merge created a dependencies error"), this.nodes
          }, o.mergeSort = function(e, t) {
              return e.sort === t.sort ? 0 : e.sort < t.sort ? -1 : 1
          }, o.Topo.prototype._sort = function() {
              for (var e = {}, t = Object.create(null), r = Object.create(null), n = 0; n < this._items.length; ++n) {
                  var o = this._items[n],
                      i = o.seq,
                      a = o.group;
                  r[a] = r[a] || [], r[a].push(i), e[i] = o.before;
                  for (var s = o.after, u = 0; u < s.length; ++u) t[s[u]] = (t[s[u]] || []).concat(i)
              }
              for (var c = Object.keys(e), f = 0; f < c.length; ++f) {
                  for (var l = c[f], p = [], h = Object.keys(e[l]), d = 0; d < h.length; ++d) {
                      var y = e[l][h[d]];
                      r[y] = r[y] || [];
                      for (var g = 0; g < r[y].length; ++g) p.push(r[y][g])
                  }
                  e[l] = p
              }
              for (var v = Object.keys(t), m = 0; m < v.length; ++m) {
                  var b = v[m];
                  if (r[b])
                      for (var _ = 0; _ < r[b].length; ++_) {
                          var w = r[b][_];
                          e[w] = e[w].concat(t[b])
                      }
              }
              var E = void 0,
                  x = {};
              c = Object.keys(e);
              for (var S = 0; S < c.length; ++S) {
                  var k = c[S];
                  E = e[k];
                  for (var A = 0; A < E.length; ++A) x[E[A]] = (x[E[A]] || []).concat(k)
              }
              for (var O = {}, T = [], j = 0; j < this._items.length; ++j) {
                  var B = j;
                  if (x[j]) {
                      B = null;
                      for (var C = 0; C < this._items.length; ++C)
                          if (!0 !== O[C]) {
                              x[C] || (x[C] = []);
                              for (var I = x[C].length, R = 0, P = 0; P < I; ++P) O[x[C][P]] && ++R;
                              if (R === I) {
                                  B = C;
                                  break
                              }
                          }
                  }
                  null !== B && (O[B] = !0, T.push(B))
              }
              if (T.length !== this._items.length) return new Error("Invalid dependencies");
              for (var D = {}, L = 0; L < this._items.length; ++L) {
                  var N = this._items[L];
                  D[N.seq] = N
              }
              var U = [];
              this._items = T.map(function(e) {
                  var t = D[e];
                  return U.push(t.node), t
              }), this.nodes = U
          }
      }, function(e, t, r) {
          "use strict";
          var n = r(8);
          e.exports = n
      }, function(e, t, r) {
          "use strict";

          function placeHoldersCount(e) {
              var t = e.length;
              if (t % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
              return "=" === e[t - 2] ? 2 : "=" === e[t - 1] ? 1 : 0
          }

          function byteLength(e) {
              return 3 * e.length / 4 - placeHoldersCount(e)
          }

          function toByteArray(e) {
              var t, r, n, a, s, u = e.length;
              a = placeHoldersCount(e), s = new i(3 * u / 4 - a), r = a > 0 ? u - 4 : u;
              var c = 0;
              for (t = 0; t < r; t += 4) n = o[e.charCodeAt(t)] << 18 | o[e.charCodeAt(t + 1)] << 12 | o[e.charCodeAt(t + 2)] << 6 | o[e.charCodeAt(t + 3)], s[c++] = n >> 16 & 255, s[c++] = n >> 8 & 255, s[c++] = 255 & n;
              return 2 === a ? (n = o[e.charCodeAt(t)] << 2 | o[e.charCodeAt(t + 1)] >> 4, s[c++] = 255 & n) : 1 === a && (n = o[e.charCodeAt(t)] << 10 | o[e.charCodeAt(t + 1)] << 4 | o[e.charCodeAt(t + 2)] >> 2, s[c++] = n >> 8 & 255, s[c++] = 255 & n), s
          }

          function tripletToBase64(e) {
              return n[e >> 18 & 63] + n[e >> 12 & 63] + n[e >> 6 & 63] + n[63 & e]
          }

          function encodeChunk(e, t, r) {
              for (var n, o = [], i = t; i < r; i += 3) n = (e[i] << 16) + (e[i + 1] << 8) + e[i + 2], o.push(tripletToBase64(n));
              return o.join("")
          }

          function fromByteArray(e) {
              for (var t, r = e.length, o = r % 3, i = "", a = [], s = 0, u = r - o; s < u; s += 16383) a.push(encodeChunk(e, s, s + 16383 > u ? u : s + 16383));
              return 1 === o ? (t = e[r - 1], i += n[t >> 2], i += n[t << 4 & 63], i += "==") : 2 === o && (t = (e[r - 2] << 8) + e[r - 1], i += n[t >> 10], i += n[t >> 4 & 63], i += n[t << 2 & 63], i += "="), a.push(i), a.join("")
          }
          t.byteLength = byteLength, t.toByteArray = toByteArray, t.fromByteArray = fromByteArray;
          for (var n = [], o = [], i = "undefined" !== typeof Uint8Array ? Uint8Array : Array, a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", s = 0, u = a.length; s < u; ++s) n[s] = a[s], o[a.charCodeAt(s)] = s;
          o["-".charCodeAt(0)] = 62, o["_".charCodeAt(0)] = 63
      }, function(e, t) {
          t.read = function(e, t, r, n, o) {
              var i, a, s = 8 * o - n - 1,
                  u = (1 << s) - 1,
                  c = u >> 1,
                  f = -7,
                  l = r ? o - 1 : 0,
                  p = r ? -1 : 1,
                  h = e[t + l];
              for (l += p, i = h & (1 << -f) - 1, h >>= -f, f += s; f > 0; i = 256 * i + e[t + l], l += p, f -= 8);
              for (a = i & (1 << -f) - 1, i >>= -f, f += n; f > 0; a = 256 * a + e[t + l], l += p, f -= 8);
              if (0 === i) i = 1 - c;
              else {
                  if (i === u) return a ? NaN : 1 / 0 * (h ? -1 : 1);
                  a += Math.pow(2, n), i -= c
              }
              return (h ? -1 : 1) * a * Math.pow(2, i - n)
          }, t.write = function(e, t, r, n, o, i) {
              var a, s, u, c = 8 * i - o - 1,
                  f = (1 << c) - 1,
                  l = f >> 1,
                  p = 23 === o ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
                  h = n ? 0 : i - 1,
                  d = n ? 1 : -1,
                  y = t < 0 || 0 === t && 1 / t < 0 ? 1 : 0;
              for (t = Math.abs(t), isNaN(t) || t === 1 / 0 ? (s = isNaN(t) ? 1 : 0, a = f) : (a = Math.floor(Math.log(t) / Math.LN2), t * (u = Math.pow(2, -a)) < 1 && (a--, u *= 2), t += a + l >= 1 ? p / u : p * Math.pow(2, 1 - l), t * u >= 2 && (a++, u /= 2), a + l >= f ? (s = 0, a = f) : a + l >= 1 ? (s = (t * u - 1) * Math.pow(2, o), a += l) : (s = t * Math.pow(2, l - 1) * Math.pow(2, o), a = 0)); o >= 8; e[r + h] = 255 & s, h += d, s /= 256, o -= 8);
              for (a = a << o | s, c += o; c > 0; e[r + h] = 255 & a, h += d, a /= 256, c -= 8);
              e[r + h - d] |= 128 * y
          }
      }, function(e, t) {
          var r = {}.toString;
          e.exports = Array.isArray || function(e) {
              return "[object Array]" == r.call(e)
          }
      }, function(e, t) {
          e.exports = {
              _args: [
                  ["joi@13.4.0", "/Users/jeff/projects/joi-browser"]
              ],
              _development: !0,
              _from: "joi@13.4.0",
              _id: "joi@13.4.0",
              _inBundle: !1,
              _integrity: "sha512-JuK4GjEu6j7zr9FuVe2MAseZ6si/8/HaY0qMAejfDFHp7jcH4OKE937mIHM5VT4xDS0q7lpQbszbxKV9rm0yUg==",
              _location: "/joi",
              _phantomChildren: {},
              _requested: {
                  type: "version",
                  registry: !0,
                  raw: "joi@13.4.0",
                  name: "joi",
                  escapedName: "joi",
                  rawSpec: "13.4.0",
                  saveSpec: null,
                  fetchSpec: "13.4.0"
              },
              _requiredBy: ["#DEV:/"],
              _resolved: "https://registry.npmjs.org/joi/-/joi-13.4.0.tgz",
              _spec: "13.4.0",
              _where: "/Users/jeff/projects/joi-browser",
              bugs: {
                  url: "https://github.com/hapijs/joi/issues"
              },
              dependencies: {
                  hoek: "5.x.x",
                  isemail: "3.x.x",
                  topo: "3.x.x"
              },
              description: "Object schema validation",
              devDependencies: {
                  code: "5.x.x",
                  hapitoc: "1.x.x",
                  lab: "15.x.x"
              },
              engines: {
                  node: ">=8.9.0"
              },
              homepage: "https://github.com/hapijs/joi",
              keywords: ["hapi", "schema", "validation"],
              license: "BSD-3-Clause",
              main: "lib/index.js",
              name: "joi",
              repository: {
                  type: "git",
                  url: "git://github.com/hapijs/joi.git"
              },
              scripts: {
                  test: "lab -t 100 -a code -L",
                  "test-cov-html": "lab -r html -o coverage.html -a code",
                  "test-debug": "lab -a code",
                  toc: "hapitoc",
                  version: "npm run toc && git add API.md README.md"
              },
              version: "13.4.0"
          }
      }, function(e, t, r) {
          (function(e) {
              function normalizeArray(e, t) {
                  for (var r = 0, n = e.length - 1; n >= 0; n--) {
                      var o = e[n];
                      "." === o ? e.splice(n, 1) : ".." === o ? (e.splice(n, 1), r++) : r && (e.splice(n, 1), r--)
                  }
                  if (t)
                      for (; r--; r) e.unshift("..");
                  return e
              }

              function filter(e, t) {
                  if (e.filter) return e.filter(t);
                  for (var r = [], n = 0; n < e.length; n++) t(e[n], n, e) && r.push(e[n]);
                  return r
              }
              var r = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/,
                  n = function(e) {
                      return r.exec(e).slice(1)
                  };
              t.resolve = function() {
                  for (var t = "", r = !1, n = arguments.length - 1; n >= -1 && !r; n--) {
                      var o = n >= 0 ? arguments[n] : e.cwd();
                      if ("string" !== typeof o) throw new TypeError("Arguments to path.resolve must be strings");
                      o && (t = o + "/" + t, r = "/" === o.charAt(0))
                  }
                  return t = normalizeArray(filter(t.split("/"), function(e) {
                      return !!e
                  }), !r).join("/"), (r ? "/" : "") + t || "."
              }, t.normalize = function(e) {
                  var r = t.isAbsolute(e),
                      n = "/" === o(e, -1);
                  return e = normalizeArray(filter(e.split("/"), function(e) {
                      return !!e
                  }), !r).join("/"), e || r || (e = "."), e && n && (e += "/"), (r ? "/" : "") + e
              }, t.isAbsolute = function(e) {
                  return "/" === e.charAt(0)
              }, t.join = function() {
                  var e = Array.prototype.slice.call(arguments, 0);
                  return t.normalize(filter(e, function(e, t) {
                      if ("string" !== typeof e) throw new TypeError("Arguments to path.join must be strings");
                      return e
                  }).join("/"))
              }, t.relative = function(e, r) {
                  function trim(e) {
                      for (var t = 0; t < e.length && "" === e[t]; t++);
                      for (var r = e.length - 1; r >= 0 && "" === e[r]; r--);
                      return t > r ? [] : e.slice(t, r - t + 1)
                  }
                  e = t.resolve(e).substr(1), r = t.resolve(r).substr(1);
                  for (var n = trim(e.split("/")), o = trim(r.split("/")), i = Math.min(n.length, o.length), a = i, s = 0; s < i; s++)
                      if (n[s] !== o[s]) {
                          a = s;
                          break
                      }
                  for (var u = [], s = a; s < n.length; s++) u.push("..");
                  return u = u.concat(o.slice(a)), u.join("/")
              }, t.sep = "/", t.delimiter = ":", t.dirname = function(e) {
                  var t = n(e),
                      r = t[0],
                      o = t[1];
                  return r || o ? (o && (o = o.substr(0, o.length - 1)), r + o) : "."
              }, t.basename = function(e, t) {
                  var r = n(e)[2];
                  return t && r.substr(-1 * t.length) === t && (r = r.substr(0, r.length - t.length)), r
              }, t.extname = function(e) {
                  return n(e)[3]
              };
              var o = "b" === "ab".substr(-1) ? function(e, t, r) {
                  return e.substr(t, r)
              } : function(e, t, r) {
                  return t < 0 && (t = e.length + t), e.substr(t, r)
              }
          }).call(t, r(7))
      }, function(e, t, r) {
          (function(e, n) {
              var o;
              ! function(i) {
                  function error(e) {
                      throw new RangeError(_[e])
                  }

                  function map(e, t) {
                      for (var r = e.length, n = []; r--;) n[r] = t(e[r]);
                      return n
                  }

                  function mapDomain(e, t) {
                      var r = e.split("@"),
                          n = "";
                      return r.length > 1 && (n = r[0] + "@", e = r[1]), e = e.replace(b, "."), n + map(e.split("."), t).join(".")
                  }

                  function ucs2decode(e) {
                      for (var t, r, n = [], o = 0, i = e.length; o < i;) t = e.charCodeAt(o++), t >= 55296 && t <= 56319 && o < i ? (r = e.charCodeAt(o++), 56320 == (64512 & r) ? n.push(((1023 & t) << 10) + (1023 & r) + 65536) : (n.push(t), o--)) : n.push(t);
                      return n
                  }

                  function ucs2encode(e) {
                      return map(e, function(e) {
                          var t = "";
                          return e > 65535 && (e -= 65536, t += x(e >>> 10 & 1023 | 55296), e = 56320 | 1023 & e), t += x(e)
                      }).join("")
                  }

                  function basicToDigit(e) {
                      return e - 48 < 10 ? e - 22 : e - 65 < 26 ? e - 65 : e - 97 < 26 ? e - 97 : c
                  }

                  function digitToBasic(e, t) {
                      return e + 22 + 75 * (e < 26) - ((0 != t) << 5)
                  }

                  function adapt(e, t, r) {
                      var n = 0;
                      for (e = r ? E(e / h) : e >> 1, e += E(e / t); e > w * l >> 1; n += c) e = E(e / w);
                      return E(n + (w + 1) * e / (e + p))
                  }

                  function decode(e) {
                      var t, r, n, o, i, a, s, p, h, v, m = [],
                          b = e.length,
                          _ = 0,
                          w = y,
                          x = d;
                      for (r = e.lastIndexOf(g), r < 0 && (r = 0), n = 0; n < r; ++n) e.charCodeAt(n) >= 128 && error("not-basic"), m.push(e.charCodeAt(n));
                      for (o = r > 0 ? r + 1 : 0; o < b;) {
                          for (i = _, a = 1, s = c; o >= b && error("invalid-input"), p = basicToDigit(e.charCodeAt(o++)), (p >= c || p > E((u - _) / a)) && error("overflow"), _ += p * a, h = s <= x ? f : s >= x + l ? l : s - x, !(p < h); s += c) v = c - h, a > E(u / v) && error("overflow"), a *= v;
                          t = m.length + 1, x = adapt(_ - i, t, 0 == i), E(_ / t) > u - w && error("overflow"), w += E(_ / t), _ %= t, m.splice(_++, 0, w)
                      }
                      return ucs2encode(m)
                  }

                  function encode(e) {
                      var t, r, n, o, i, a, s, p, h, v, m, b, _, w, S, k = [];
                      for (e = ucs2decode(e), b = e.length, t = y, r = 0, i = d, a = 0; a < b; ++a)(m = e[a]) < 128 && k.push(x(m));
                      for (n = o = k.length, o && k.push(g); n < b;) {
                          for (s = u, a = 0; a < b; ++a)(m = e[a]) >= t && m < s && (s = m);
                          for (_ = n + 1, s - t > E((u - r) / _) && error("overflow"), r += (s - t) * _, t = s, a = 0; a < b; ++a)
                              if (m = e[a], m < t && ++r > u && error("overflow"), m == t) {
                                  for (p = r, h = c; v = h <= i ? f : h >= i + l ? l : h - i, !(p < v); h += c) S = p - v, w = c - v, k.push(x(digitToBasic(v + S % w, 0))), p = E(S / w);
                                  k.push(x(digitToBasic(p, 0))), i = adapt(r, _, n == o), r = 0, ++n
                              }++r, ++t
                      }
                      return k.join("")
                  }

                  function toUnicode(e) {
                      return mapDomain(e, function(e) {
                          return v.test(e) ? decode(e.slice(4).toLowerCase()) : e
                      })
                  }

                  function toASCII(e) {
                      return mapDomain(e, function(e) {
                          return m.test(e) ? "xn--" + encode(e) : e
                      })
                  }
                  var a = ("object" == typeof t && t && t.nodeType, "object" == typeof e && e && e.nodeType, "object" == typeof n && n);
                  var s, u = 2147483647,
                      c = 36,
                      f = 1,
                      l = 26,
                      p = 38,
                      h = 700,
                      d = 72,
                      y = 128,
                      g = "-",
                      v = /^xn--/,
                      m = /[^\x20-\x7E]/,
                      b = /[\x2E\u3002\uFF0E\uFF61]/g,
                      _ = {
                          overflow: "Overflow: input needs wider integers to process",
                          "not-basic": "Illegal input >= 0x80 (not a basic code point)",
                          "invalid-input": "Invalid input"
                      },
                      w = c - f,
                      E = Math.floor,
                      x = String.fromCharCode;
                  s = {
                      version: "1.4.1",
                      ucs2: {
                          decode: ucs2decode,
                          encode: ucs2encode
                      },
                      decode: decode,
                      encode: encode,
                      toASCII: toASCII,
                      toUnicode: toUnicode
                  }, void 0 !== (o = function() {
                      return s
                  }.call(t, r, t, e)) && (e.exports = o)
              }()
          }).call(t, r(41)(e), r(5))
      }, function(e, t) {
          "function" === typeof Object.create ? e.exports = function(e, t) {
              e.super_ = t, e.prototype = Object.create(t.prototype, {
                  constructor: {
                      value: e,
                      enumerable: !1,
                      writable: !0,
                      configurable: !0
                  }
              })
          } : e.exports = function(e, t) {
              e.super_ = t;
              var r = function() {};
              r.prototype = t.prototype, e.prototype = new r, e.prototype.constructor = e
          }
      }, function(e, t) {
          e.exports = function(e) {
              return e && "object" === typeof e && "function" === typeof e.copy && "function" === typeof e.fill && "function" === typeof e.readUInt8
          }
      }, function(e, t) {
          e.exports = function(e) {
              return e.webpackPolyfill || (e.deprecate = function() {}, e.paths = [], e.children || (e.children = []), Object.defineProperty(e, "loaded", {
                  enumerable: !0,
                  get: function() {
                      return e.l
                  }
              }), Object.defineProperty(e, "id", {
                  enumerable: !0,
                  get: function() {
                      return e.i
                  }
              }), e.webpackPolyfill = 1), e
          }
      }])
  })
}, function(e, t, r) {
  "use strict";

  function _asyncToGenerator(e) {
      return function() {
          var t = e.apply(this, arguments);
          return new Promise(function(e, r) {
              function step(n, o) {
                  try {
                      var i = t[n](o),
                          a = i.value
                  } catch (e) {
                      return void r(e)
                  }
                  if (!i.done) return Promise.resolve(a).then(function(e) {
                      step("next", e)
                  }, function(e) {
                      step("throw", e)
                  });
                  e(a)
              }
              return step("next")
          })
      }
  }
  var n = r(0),
      o = r.n(n),
      i = r(9),
      a = r(19),
      s = r(5);
  t.a = function() {
      function init() {
          return e.apply(this, arguments)
      }
      var e = _asyncToGenerator(o.a.mark(function _callee() {
          var e, t;
          return o.a.wrap(function(r) {
              for (;;) switch (r.prev = r.next) {
                  case 0:
                      return console.log("Fetching devices!"), e = i.d(), t = i.a(), r.next = 5, e;
                  case 5:
                      return e = r.sent, r.next = 8, t;
                  case 8:
                      t = r.sent, console.log("Device list:", e), a.a.dispatch({
                          type: s.d,
                          devices: e
                      }), a.a.dispatch({
                          type: s.a,
                          profile: t
                      });
                  case 12:
                  case "end":
                      return r.stop()
              }
          }, _callee, this)
      }));
      return init
  }()
}, function(e, t, r) {
  "use strict";

  function isPlainObject(e) {
      if ("object" !== ("undefined" === typeof e ? "undefined" : i(e)) || null === e) return !1;
      for (var t = e; null !== Object.getPrototypeOf(t);) t = Object.getPrototypeOf(t);
      return Object.getPrototypeOf(e) === t
  }

  function createStore(e, t, r) {
      function ensureCanMutateNextListeners() {
          f === c && (f = c.slice())
      }

      function getState() {
          if (l) throw new Error("You may not call store.getState() while the reducer is executing. The reducer has already received the state as an argument. Pass it down from the top reducer instead of reading it from the store.");
          return u
      }

      function subscribe(e) {
          if ("function" !== typeof e) throw new Error("Expected the listener to be a function.");
          if (l) throw new Error("You may not call store.subscribe() while the reducer is executing. If you would like to be notified after the store has been updated, subscribe from a component and invoke store.getState() in the callback to access the latest state. See https://redux.js.org/api-reference/store#subscribe(listener) for more details.");
          var t = !0;
          return ensureCanMutateNextListeners(), f.push(e),
              function() {
                  if (t) {
                      if (l) throw new Error("You may not unsubscribe from a store listener while the reducer is executing. See https://redux.js.org/api-reference/store#subscribe(listener) for more details.");
                      t = !1, ensureCanMutateNextListeners();
                      var r = f.indexOf(e);
                      f.splice(r, 1)
                  }
              }
      }

      function dispatch(e) {
          if (!isPlainObject(e)) throw new Error("Actions must be plain objects. Use custom middleware for async actions.");
          if ("undefined" === typeof e.type) throw new Error('Actions may not have an undefined "type" property. Have you misspelled a constant?');
          if (l) throw new Error("Reducers may not dispatch actions.");
          try {
              l = !0, u = s(u, e)
          } finally {
              l = !1
          }
          for (var t = c = f, r = 0; r < t.length; r++) {
              (0, t[r])()
          }
          return e
      }

      function replaceReducer(e) {
          if ("function" !== typeof e) throw new Error("Expected the nextReducer to be a function.");
          s = e, dispatch({
              type: o.REPLACE
          })
      }

      function observable() {
          var e, t = subscribe;
          return e = {
              subscribe: function(e) {
                  function observeState() {
                      e.next && e.next(getState())
                  }
                  if ("object" !== ("undefined" === typeof e ? "undefined" : i(e)) || null === e) throw new TypeError("Expected the observer to be an object.");
                  return observeState(), {
                      unsubscribe: t(observeState)
                  }
              }
          }, e[n.a] = function() {
              return this
          }, e
      }
      var a;
      if ("function" === typeof t && "undefined" === typeof r && (r = t, t = void 0), "undefined" !== typeof r) {
          if ("function" !== typeof r) throw new Error("Expected the enhancer to be a function.");
          return r(createStore)(e, t)
      }
      if ("function" !== typeof e) throw new Error("Expected the reducer to be a function.");
      var s = e,
          u = t,
          c = [],
          f = c,
          l = !1;
      return dispatch({
          type: o.INIT
      }), a = {
          dispatch: dispatch,
          subscribe: subscribe,
          getState: getState,
          replaceReducer: replaceReducer
      }, a[n.a] = observable, a
  }
  r.d(t, "a", function() {
      return createStore
  });
  var n = r(75),
      o = {
          INIT: "@@redux/INIT" + Math.random().toString(36).substring(7).split("").join("."),
          REPLACE: "@@redux/REPLACE" + Math.random().toString(36).substring(7).split("").join(".")
      },
      i = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function(e) {
          return typeof e
      } : function(e) {
          return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
      };
  Object.assign
}, function(e, t, r) {
  "use strict";
  (function(e, n) {
      var o, i = r(77);
      o = "undefined" !== typeof self ? self : "undefined" !== typeof window ? window : "undefined" !== typeof e ? e : n;
      var a = Object(i.a)(o);
      t.a = a
  }).call(t, r(1), r(76)(e))
}, function(e, t) {
  e.exports = function(e) {
      if (!e.webpackPolyfill) {
          var t = Object.create(e);
          t.children || (t.children = []), Object.defineProperty(t, "loaded", {
              enumerable: !0,
              get: function() {
                  return t.l
              }
          }), Object.defineProperty(t, "id", {
              enumerable: !0,
              get: function() {
                  return t.i
              }
          }), Object.defineProperty(t, "exports", {
              enumerable: !0
          }), t.webpackPolyfill = 1
      }
      return t
  }
}, function(e, t, r) {
  "use strict";

  function symbolObservablePonyfill(e) {
      var t, r = e.Symbol;
      return "function" === typeof r ? r.observable ? t = r.observable : (t = r("observable"), r.observable = t) : t = "@@observable", t
  }
  t.a = symbolObservablePonyfill
}, function(e, t, r) {
  "use strict";
  t.a = function() {
      for (var e = arguments.length, t = Array(e), r = 0; r < e; r++) t[r] = arguments[r];
      return function(e, r) {
          for (var n = arguments.length, o = Array(n > 2 ? n - 2 : 0), i = 2; i < n; i++) o[i - 2] = arguments[i];
          return t.reduce(function(e, t) {
              return t.apply(void 0, [e, r].concat(o))
          }, e)
      }
  }
}, function(e, t, r) {
  "use strict";
  var n = r(80),
      o = {
          globalState: n.a
      };
  t.a = o
}, function(e, t, r) {
  "use strict";

  function reducer() {
      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : initialState,
          t = arguments[1];
      switch (t.type) {
          case n.d:
              e.dongleId ? (e.device = t.devices.find(function(t) {
                  return t.dongle_id === e.dongleId
              }), e.device || (e.device = {
                  alias: null,
                  create_time: 1513041169,
                  device_type: "unknown",
                  dongle_id: "0000000000000000",
                  imei: "000000000000000",
                  is_owner: !1,
                  last_segment_utc_millis: null,
                  serial: "00000000"
              })) : (e.dongleId = t.devices[0].dongle_id, e.device = t.devices[0]), e.devices = t.devices;
              break;
          case n.b:
              e.dongleId = t.dongleId, e.devices && (e.device = e.devices.find(function(e) {
                  return e.dongle_id === t.dongleId
              })), e.segmentData && e.segmentData.dongleId !== e.dongleId && (e.segmentData = null, e.segments = []);
              break;
          case n.c:
              e.start = t.start, e.end = t.end, e.segmentData = null, e.segments = [];
              break;
          case n.a:
              e.profile = t.profile;
              break;
          case n.e:
              var r = e.devices.findIndex(function(e) {
                  return e.dongle_id === t.device.dongle_id
              });
              e.devices[r] = t.device, e.device = t.device;
              break;
          default:
              return e
      }
      return e
  }
  t.a = reducer;
  var n = r(5)
}, function(e, t, r) {
  "use strict";

  function updateDevice(e) {
      return {
          type: n.e,
          device: e
      }
  }

  function selectDevice(e) {
      return {
          type: n.b,
          dongleId: e
      }
  }

  function selectTimeRange(e, t) {
      return {
          type: n.c,
          start: e,
          end: t
      }
  }
  t.c = updateDevice, t.a = selectDevice, t.b = selectTimeRange;
  var n = r(5)
}, function(e, t, r) {
  "use strict";

  function setCachePort(e) {
      a && (a.onmessage = null), a = e, a.onmessage = handleMessage
  }

  function getEntry(e, t, r) {
      return c[e] || (c[e] = {}), c[e][t] = r, touch(e, t), {
          start: Object(i.partial)(start, e, t)
      }
  }

  function start(e, t) {
      a.postMessage({
          command: "start",
          data: {
              route: e,
              segment: t
          }
      })
  }

  function touch(e, t) {
      a.postMessage({
          command: "touch",
          data: {
              route: e,
              segment: t
          }
      })
  }

  function handleMessage(e) {
      switch (e.data.command) {
          case "expire":
              s.broadcast(e.data.data)
      }
  }
  r.d(t, "b", function() {
      return u
  }), t.c = setCachePort, t.a = getEntry;
  var n = r(6),
      o = r.n(n),
      i = r(83),
      a = (r.n(i), null),
      s = o()(),
      u = s.listen,
      c = {}
}, function(e, t) {
  function ap(e, t) {
      return function() {
          var r = [].slice.call(arguments),
              n = e.slice();
          return n.push.apply(n, r), t.apply(this, n)
      }
  }

  function pa(e, t) {
      return function() {
          var r = [].slice.call(arguments);
          return r.push.apply(r, e), t.apply(this, r)
      }
  }

  function apa(e, t, r) {
      return function() {
          return r.apply(this, e.concat.apply(e, arguments).concat(t))
      }
  }

  function partial(e) {
      return ap([].slice.call(arguments, 1), e)
  }

  function partialRight(e) {
      return pa([].slice.call(arguments, 1), e)
  }

  function curry(e) {
      return partial(partial, e)
  }
  t = e.exports = ap, t.pa = pa, t.apa = apa, t.partial = partial, t.partialRight = partialRight, t.curry = curry, t.curryRight = function(e) {
      return partial(partialRight, e)
  }
}]);