import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import reducers from 'src/redux/reducers';
import createSagaMiddleware from 'redux-saga';
import sagas from 'src/redux/sagas';
import env from 'env';

const sagaMiddleware = createSagaMiddleware();
const loggerMiddleware = createLogger({ predicate: () => env.name === 'development' });

export function configStore (initialState) {
  const enhancer = compose(
    applyMiddleware(
      sagaMiddleware,
      loggerMiddleware
    )
  );

  const store = createStore(reducers, initialState, enhancer);
  sagaMiddleware.run(sagas);
  return store;
}
