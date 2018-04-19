import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import reducers from 'redux/reducers';
import createSagaMiddleware from 'redux-saga';
import sagas from 'redux/sagas';

const sagaMiddleware = createSagaMiddleware();
const loggerMiddleware = createLogger({ predicate: () => process.env.NODE_ENV === 'development' });

export function configStore (initialState) {
  const enhancer = process.env.NODE_ENV !== 'production' ?
    compose(
      applyMiddleware(
        sagaMiddleware,
        loggerMiddleware
      ),
    ) :
    compose(applyMiddleware(
      sagaMiddleware,
      loggerMiddleware
    ));

  const store = createStore(reducers, initialState, enhancer);
  sagaMiddleware.run(sagas);
  return store;
}
