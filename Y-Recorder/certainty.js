!(function (f, a, c) {
  var s,
    l = 256,
    p = "random",
    d = c.pow(l, 6),
    g = c.pow(2, 52),
    y = 2 * g,
    h = l - 1;
  function n(n, t, r) {
    function e() {
      for (var n = u.g(6), t = d, r = 0; n < g; )
        (n = (n + r) * l), (t *= l), (r = u.g(1));
      for (; y <= n; ) (n /= 2), (t /= 2), (r >>>= 1);
      return (n + r) / t;
    }
    var o = [],
      i = j(
        (function n(t, r) {
          var e,
            o = [],
            i = typeof t;
          if (r && "object" == i)
            for (e in t)
              try {
                o.push(n(t[e], r - 1));
              } catch (n) {}
          return o.length ? o : "string" == i ? t : t + "\0";
        })(
          (t = 1 == t ? { entropy: !0 } : t || {}).entropy
            ? [n, S(a)]
            : null == n
            ? (function () {
                try {
                  var n;
                  return (
                    s && (n = s.randomBytes)
                      ? (n = n(l))
                      : ((n = new Uint8Array(l)),
                        (f.crypto || f.msCrypto).getRandomValues(n)),
                    S(n)
                  );
                } catch (n) {
                  var t = f.navigator,
                    r = t && t.plugins;
                  return [+new Date(), f, r, f.screen, S(a)];
                }
              })()
            : n,
          3
        ),
        o
      ),
      u = new m(o);
    return (
      (e.int32 = function () {
        return 0 | u.g(4);
      }),
      (e.quick = function () {
        return u.g(4) / 4294967296;
      }),
      (e.double = e),
      j(S(u.S), a),
      (
        t.pass ||
        r ||
        function (n, t, r, e) {
          return (
            e &&
              (e.S && v(e, u),
              (n.state = function () {
                return v(u, {});
              })),
            r ? ((c[p] = n), t) : n
          );
        }
      )(e, i, "global" in t ? t.global : this == c, t.state)
    );
  }
  function m(n) {
    var t,
      r = n.length,
      u = this,
      e = 0,
      o = (u.i = u.j = 0),
      i = (u.S = []);
    for (r || (n = [r++]); e < l; ) i[e] = e++;
    for (e = 0; e < l; e++)
      (i[e] = i[(o = h & (o + n[e % r] + (t = i[e])))]), (i[o] = t);
    (u.g = function (n) {
      for (var t, r = 0, e = u.i, o = u.j, i = u.S; n--; )
        (t = i[(e = h & (e + 1))]),
          (r = r * l + i[h & ((i[e] = i[(o = h & (o + t))]) + (i[o] = t))]);
      return (u.i = e), (u.j = o), r;
    })(l);
  }
  function v(n, t) {
    return (t.i = n.i), (t.j = n.j), (t.S = n.S.slice()), t;
  }
  function j(n, t) {
    for (var r, e = n + "", o = 0; o < e.length; )
      t[h & o] = h & ((r ^= 19 * t[h & o]) + e.charCodeAt(o++));
    return S(t);
  }
  function S(n) {
    return String.fromCharCode.apply(0, n);
  }
  if ((j(c.random(), a), "object" == typeof module && module.exports)) {
    module.exports = n;
    try {
      s = require("crypto");
    } catch (n) {}
  } else
    "function" == typeof define && define.amd
      ? define(function () {
          return n;
        })
      : (c["seed" + p] = n);
})("undefined" != typeof self ? self : this, [], Math);
Math.seedrandom('yrecord');



//时间
(function(name, definition) {
  if (typeof define === 'function') { // AMD
    define(definition);
  } else if (typeof module !== 'undefined' && module.exports) { // Node.js
    module.exports = definition();
  } else { // Browser
    var timemachine = definition(),
      global = this,
      old = global[name];
    timemachine.noConflict = function() {
      global[name] = old;
      return timemachine;
    };
    global[name] = timemachine;
  }
})('yrecord_timer', function() {

  const OriginalDate = Date;
  const Timemachine = {
      timestamp: 0,
      tick: false,
      tickStartDate: null,
      keepTime: false,
      difference: 0,

      config: function(options) {
        this.timestamp = OriginalDate.parse(options.dateString) || options.timestamp || this.timestamp;
        this.difference = options.difference || this.difference;
        this.keepTime = options.keepTime || this.keepTime;
        this.tick = options.tick || this.tick;
        if (this.tick) {
          this.tickStartDate = new OriginalDate();
        }
        this._apply();
      },

      reset: function() {
        this.timestamp = 0;
        this.tick = false;
        this.tickStartDate = null;
        this.keepTime = false;
        this.difference = 0;
        Date = OriginalDate;
        Date.prototype = OriginalDate.prototype;
      },

      _apply: function() {
        var self = this;

        Date = function() {
          var date;
          if (self.keepTime) {
            date = new OriginalDate();
          } else if (arguments.length === 1) { 
            date = new OriginalDate(arguments[0]);
          } else if (arguments.length === 2) {
            date = new OriginalDate(arguments[0], arguments[1]);
          } else if (arguments.length === 3) {
            date = new OriginalDate(arguments[0], arguments[1], arguments[2]);
          } else if (arguments.length === 4) {
            date = new OriginalDate(arguments[0], arguments[1], arguments[2], arguments[3]);
          } else if (arguments.length === 5) {
            date = new OriginalDate(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]);
          } else if (arguments.length === 6) {
            date = new OriginalDate(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
          } else if (arguments.length === 7) {
            date = new OriginalDate(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6]);
          } else {
            date = new OriginalDate(self.timestamp);
          }

          if (arguments.length === 0) {
              var difference = self._getDifference();
              if (difference !== 0) {
                  date = new OriginalDate(date.getTime() + difference);
              }
          }

          return date;
        };

        Date.prototype = OriginalDate.prototype;
        Date.now = function() {
          var timestamp = self.keepTime ? OriginalDate.now() : self.timestamp;
          return timestamp + self._getDifference();
        };
        Date.OriginalDate = OriginalDate;
        Date.UTC = OriginalDate.UTC;
      },

      _getDifference: function() {
        var difference = this.difference;

        if (this.tick) {
          difference += OriginalDate.now() - this.tickStartDate.getTime();
        }

        return difference;
      },

    };

  Timemachine._apply();

  return Timemachine;

});

fetch("http://localhost:7001/records/getTime", {
  "method": "POST",
  "headers": {
    "user-agent": "vscode-restclient",
    "content-type": "application/json",
    "authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.dGVzdA.GfxRk-CtH6rXPrQstXkm8pkjEhPFO1h5kFEBciCZN48"
  },
  "body": JSON.stringify({
    "_id": "628b6d4f1fde64d672cf7769"
  })
})
.then(response => {
  response.text().then((res)=>{
    timeObj = JSON.parse(res);
    console.log(yrecord_timer)
    yrecord_timer.config({
      timestamp: Number(timeObj.data),
      tick:true,
    });
  });
})
.catch(err => {
  console.error(err);
});