
const whiteRs = [ /^records/ ];
const channel = new BroadcastChannel('y_record');
const formatUrl = url => {
  return url.split('/').slice(3).join('/')
    .split('?')[0];
};
const fetchEvent = ({ url, method = 'POST', body = {} }) => {
  return fetch(url, {
    method,
    headers: {
      'user-agent': 'vscode-restclient',
      'content-type': 'application/json',
      authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.dGVzdA.GfxRk-CtH6rXPrQstXkm8pkjEhPFO1h5kFEBciCZN48',
    },
    body: JSON.stringify({ _id: '628b6d4f1fde64d672cf7769', ...body }),
  });
};

let fetchRecordMap = {};
channel.onmessage = ev => {
  console.log(ev);
  switch (ev.data) {
    case 'clear':
      fetchRecordMap = {};
      // fetchEvent({ url: 'http://localhost:7001/records/clear' });
      break;
    case 'upload':
      fetchEvent({ url: 'http://localhost:7001/records/update', body: {
        fetchRecord: fetchRecordMap,
      } });
      break;
    default:
      break;
  }
};

self.addEventListener('install', event => {
  event.waitUntil(fetchEvent({ url: 'http://localhost:7001/records/clear' }));
});

self.addEventListener('fetch', function(event) {
  // console.log(event.request.url, self.location.origin);
  event.respondWith((async () => {
    try {
      const requestUrl = formatUrl(event.request.url);
      console.log(requestUrl);
      const response = await fetch(event.request);
      const content = await response.clone().text();
      const headersJson = Object.fromEntries(response.headers.entries());
      const contentType = headersJson['content-type'];
      if (!contentType || whiteRs.some(r => r.test(requestUrl))) {
        return response; // 不透明fetch 无法被捕获
      }
      // 只缓存 request
      if ([ 'text/html', 'application/json' ].some(s => contentType.includes(s))) {
        if (requestUrl in fetchRecordMap) {
          fetchRecordMap[requestUrl].push({ headers: headersJson, content, time: Date.now() });
        } else {
          fetchRecordMap[requestUrl] = [{ headers: headersJson, content, time: Date.now() }];
        }
      }
      return response;
    } catch (e) {
      console.log(e);
    }
  })());


});
