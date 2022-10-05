export function routeWrapper(config = {}) {
  const keys = Object.keys(config);
  const list = [];
  keys.forEach(key => {
    const { route, entry } = config[key];
    list.push({
      route,
      component: require(entry),
    });
  });
  return list;
}

