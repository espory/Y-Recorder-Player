import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { SPLITER } from './const';
import Model from './model';

const defaultMiddlewares = [];

if (process.env.NODE_ENV !== 'production') {
  const loggerMiddleware = require('redux-logger').default;
  defaultMiddlewares.push(loggerMiddleware);
}

export default class Store {
  constructor(config = {}) {
    this.redux = null;
    this.model = new Model(config);
    this.model.store = this;
    this.middlewares = config.middlewares;
  }

  addModel(config) {
    if (config.namespace) {
      const model = new Model(config);
      this.model.addChild(model, config.namespace);
      return model;
    }
    this.model.init(config);
    return this.model;
  }

  reducer = (state, action) => {
    const { type, ...others } = action; // eslint-disable-line
    return this.model.reducer(state, { pathArr: action.type.split(SPLITER), ...others });
  }

  dispatch = (action, payload) => {
    if (typeof action === 'string') {
      action = { type: action, payload };
    }
    const { type } = action;
    const pathArr = type.split(SPLITER);
    const asyncFunc = this.model.getAsync(pathArr);
    if (asyncFunc) {
      return asyncFunc(action.payload);
    }
    this.redux.dispatch(action);
    return Promise.resolve();
  }

  getState() {
    return this.redux.getState();
  }

  start() {
    const { middlewares = [] } = this;
    const initial = this.model.getInitial();
    const composeEnhancers = composeWithDevTools({});
    this.redux = createStore(
      this.reducer, initial,
      composeEnhancers(applyMiddleware(...defaultMiddlewares, ...middlewares))
    );
  }
}
