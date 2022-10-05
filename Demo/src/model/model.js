import { SPLITER, GLOBAL } from './const';
import { isNil, isEmptyArray } from './util';

export default class Model {
  static prefixPath(prefix, path) {
    if (!prefix) return path;
    return `${prefix}${SPLITER}${path}`;
  }

  // name为属性数组时，可以递归地获取最内层的值
  static getProperty(name, obj) {
    if (isNil(obj)) return null;
    if (!name) return obj;
    if (typeof name === 'string') {
      return obj[name];
    }
    if (name.length === 1) {
      return obj[name[0]];
    }
    const [ left, ...right ] = name;
    return Model.getProperty(right, obj[left]);
  }

  constructor(config = {}) {
    this.store = null;
    this.parent = null;
    this.children = {};
    this.path = config.namespace || '';

    this.initial = {};
    this.asyncs = {};
    this.reducers = {};
    this.init(config);
  }

  init(config = {}) {
    const { reducers = {}, asyncs = {}, initial = {}, setup } = config;
    this.reducers = {
      ...this.reducers,
      ...reducers,
      _reinit: () => this.getInitial(),
    };
    const injectedAsyncs = {
      ...asyncs,
      _setup: async (dispatch, getState, payload) => {
        try {
          if (setup) {
            await setup.call(this, dispatch, getState, payload);
          }
        } catch (err) {
          dispatch('setErr', err);
        }
      },
    };
    this.asyncs = {
      ...this.asyncs,
      ...this.enhanceAsyncs(injectedAsyncs),
      setErr(state, payload) {
        return {
          ...state,
          err: payload,
        };
      },
    };
    this.initial = { ...this.initial, ...initial };
    if (config.children) {
      config.children.forEach(child => this.addChild(child, child.path));
    }
  }

  enhanceAsyncs(asyncs) {
    if (!asyncs) return {};
    const res = {};
    Object.keys(asyncs).forEach(key => {
      if (this.reducers[key]) {
        throw new Error('the name of asyncs action could not be same with the reducer');
      }
      res[key] = asyncs[key].bind(this, this.dispatch.bind(this), this.getState.bind(this));
    });
    return res;
  }

  getInitial() {
    const initial = { ...this.initial };
    this.eachChild((child, key) => {
      initial[key] = child.getInitial();
    });
    return initial;
  }

  getChild(path) {
    return this.children[path];
  }

  addChild(child, path) {
    if (!path) {
      throw new Error('namespace is required in sub store');
    }
    if (this.children[path]) {
      throw new Error(`duplicate namespace '${path}' in store`);
    }
    child.parent = this;
    child.path = path;
    this.children[path] = child;
  }
  // 对每个child执行fnc(child,child.path)
  eachChild(func) {
    Object.keys(this.children).forEach(key => {
      func(this.children[key], key);
    });
  }

  getAsync(pathArr) {
    if (isEmptyArray(pathArr)) return null;
    const [ left, ...right ] = pathArr;
    if (right.length === 0) return this.asyncs[left];
    const child = this.getChild(left);
    return child.getAsync(right);
  }

  reducer(state, { pathArr, payload }) {
    const [ left, ...right ] = pathArr;
    if (isEmptyArray(right)) {
      if (this.reducers[left]) {
        return this.reducers[left](state, payload);
      }
      return state;
    }
    return {
      ...state,
      [left]: this.children[left].reducer(state[left], { pathArr: right, payload }),
    };
  }

  getState() {
    const state = this.parent ? this.parent.getState()[this.path] : this.store.getState();
    return state;
  }

  dispatch = (action, payload) => {
    if (typeof action === 'string') {
      action = { type: action, payload };
    }
    if (this.parent) {
      if (action.type.indexOf(GLOBAL) !== 0) {
        action.type = Model.prefixPath(this.path, action.type);
      }
      return this.parent.dispatch(action);
    }
    if (action.type.indexOf(GLOBAL) === 0) {
      action.type = action.type.slice(1);
    }
    return this.store.dispatch(action);
  }

  reinit() {
    this.dispatch({ type: '_reinit' });
  }
}
