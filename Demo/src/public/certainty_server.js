!(function(f, a, c) {
  let s,
    l = 256,
    p = 'random',
    d = c.pow(l, 6),
    g = c.pow(2, 52),
    y = 2 * g,
    h = l - 1;
  function n(n, t, r) {
    function e() {
      for (var n = u.g(6), t = d, r = 0; n < g;) {
        (n = (n + r) * l), (t *= l), (r = u.g(1));
      }
      for (; y <= n;) (n /= 2), (t /= 2), (r >>>= 1);
      return (n + r) / t;
    }
    var o = [],
      i = j(
        (function n(t, r) {
          let e,
            o = [],
            i = typeof t;
          if (r && i == 'object') {
            for (e in t) {
              try {
                o.push(n(t[e], r - 1));
              } catch (n) {}
            }
          }
          return o.length ? o : i == 'string' ? t : t + '\0';
        })(
          (t = t == 1 ? { entropy: !0 } : t || {}).entropy
            ? [ n, S(a) ]
            : n == null
              ? (function() {
                try {
                  let n;
                  return (
                    s && (n = s.randomBytes)
                      ? (n = n(l))
                      : ((n = new Uint8Array(l)),
                      (f.crypto || f.msCrypto).getRandomValues(n)),
                    S(n)
                  );
                } catch (n) {
                  const t = f.navigator,
                    r = t && t.plugins;
                  return [ +new Date(), f, r, f.screen, S(a) ];
                }
              })()
              : n,
          3
        ),
        o
      ),
      u = new m(o);
    return (
      (e.int32 = function() {
        return 0 | u.g(4);
      }),
      (e.quick = function() {
        return u.g(4) / 4294967296;
      }),
      (e.double = e),
      j(S(u.S), a),
      (
        t.pass ||
        r ||
        function(n, t, r, e) {
          return (
            e &&
              (e.S && v(e, u),
              (n.state = function() {
                return v(u, {});
              })),
            r ? ((c[p] = n), t) : n
          );
        }
      )(e, i, 'global' in t ? t.global : this == c, t.state)
    );
  }
  function m(n) {
    let t,
      r = n.length,
      u = this,
      e = 0,
      o = (u.i = u.j = 0),
      i = (u.S = []);
    for (r || (n = [ r++ ]); e < l;) i[e] = e++;
    for (e = 0; e < l; e++) {
      (i[e] = i[(o = h & (o + n[e % r] + (t = i[e])))]), (i[o] = t);
    }
    (u.g = function(n) {
      for (var t, r = 0, e = u.i, o = u.j, i = u.S; n--;) {
        (t = i[(e = h & (e + 1))]),
        (r = r * l + i[h & ((i[e] = i[(o = h & (o + t))]) + (i[o] = t))]);
      }
      return (u.i = e), (u.j = o), r;
    })(l);
  }
  function v(n, t) {
    return (t.i = n.i), (t.j = n.j), (t.S = n.S.slice()), t;
  }
  function j(n, t) {
    for (var r, e = n + '', o = 0; o < e.length;) {
      t[h & o] = h & ((r ^= 19 * t[h & o]) + e.charCodeAt(o++));
    }
    return S(t);
  }
  function S(n) {
    return String.fromCharCode.apply(0, n);
  }
  if ((j(c.random(), a), typeof module === 'object' && module.exports)) {
    module.exports = n;
    try {
      s = require('crypto');
    } catch (n) {}
  } else {
    typeof define === 'function' && define.amd
      ? define(function() {
        return n;
      })
      : (c['seed' + p] = n);
  }
})(typeof self !== 'undefined' ? self : this, [], Math);
Math.seedrandom('yrecord');

fetch('http://localhost:7001/records/update', {
  method: 'POST',
  headers: {
    'user-agent': 'vscode-restclient',
    'content-type': 'application/json',
    authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.dGVzdA.GfxRk-CtH6rXPrQstXkm8pkjEhPFO1h5kFEBciCZN48',
  },
  body: JSON.stringify({
    _id: '628b6d4f1fde64d672cf7769',
    startTime: Date.now(),
  }),
});

window.errorMap = {};
Error.prepareStackTrace = function(error, callSites) {
  return error.toString() + '\n' + callSites.map(callSite => {
    const path = '/' + callSite.getFileName().split('/').slice(3)
      .join('/');
    if (!(path in window.errorMap)) {
      window.errorMap[path] = [];
    }
    window.errorMap[path].push({ line: callSite.getLineNumber(), column: callSite.getColumnNumber() });

    return error.stack;
  }).join('\n');
};

