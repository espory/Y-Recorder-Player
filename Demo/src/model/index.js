import config from '../store';
import Store from './store';

const store = new Store(config);


export function getStore() {
  return store;
}
