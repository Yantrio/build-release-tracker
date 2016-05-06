import { applyMiddleware,compose,  createStore as reduxCreateStore } from 'redux';
import reducers from './reducers';
import thunk from 'redux-thunk'

const middlewares = [];

// Add state logger
if (process.env.NODE_ENV !== 'production') {
  middlewares.push(require('redux-logger')());
}

export function createStore(state) {
  return reduxCreateStore(
    reducers,
    state,
    compose(
      applyMiddleware(thunk),
      window.devToolsExtension ? window.devToolsExtension() : undefined,
    )

  );
}

export let store = null;
export function getStore() { return store }
export function setAsCurrentStore(s) {
  store = s;
  if (process.env.NODE_ENV !== 'production'
    && typeof window !== 'undefined') {
    window.store = store;
  }
}
