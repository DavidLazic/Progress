import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import DevTools from 'src/containers/core/DevTools';
import env from 'env';
import reducers from './reducers';

const loggerMiddleware = createLogger({ predicate: () => env.name === 'development' });
const devToolsMiddleware = DevTools.instrument();

export function configStore (initialState) {
  const enhancer = env.name !== 'production'
    ? compose(
      applyMiddleware(
        loggerMiddleware
      ),
      devToolsMiddleware
    )
    : compose(applyMiddleware(
      loggerMiddleware
    ));

  const store = createStore(reducers, initialState, enhancer);
  return store;
}
