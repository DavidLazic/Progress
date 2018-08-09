import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import reducers from './reducers';
import DevTools from 'src/containers/core/DevTools';
import env from 'env';

const loggerMiddleware = createLogger({ predicate: () => env.name === 'development' });
const devToolsMiddleware = DevTools.instrument();

export function configStore (initialState) {
  const enhancer = env.name !== 'production' ?
    compose(
      applyMiddleware(
        loggerMiddleware
      ),
      devToolsMiddleware
    ) :
    compose(applyMiddleware(
      loggerMiddleware
    ));

  const store = createStore(reducers, initialState, enhancer);
  return store;
}
