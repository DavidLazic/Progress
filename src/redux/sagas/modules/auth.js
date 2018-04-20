import { all, put, call, takeLatest } from 'redux-saga/effects';
import * as types from 'src/actions/types';
import Api from 'src/lib/api';
import history from 'src/routes/history';
import storage from 'src/constants/localStorage';
import { AUTH } from 'src/constants/refs';
import { routeCodes } from 'src/routes';

/**
 * @description
 * Ping saga
 *
 * @return {Function}
 * @public
 */
function* ping () {
  const response = yield call(Api.get, AUTH);

  if (!response.success) {
    yield put({ type: types.AUTH, payload: { error: response, loading: false } });
    yield call(history.push, routeCodes.ROOT);
  } else {
    yield put({ type: types.AUTH, payload: { data: { [types.SESSION_USER]: response.data }, loading: false } });
    yield call(history.push, routeCodes.ADMIN_PROJECTS);
  }
}

/**
 * @description
 * Login saga
 *
 * @param  {Object} props
 * @return {Function}
 * @public
 */
function* login (props) {
  const response = yield call(Api.post, AUTH, props.payload);

  if (!response.success) {
    yield put({ type: types.AUTH, payload: { error: response, loading: false } });
  } else {
    yield put({ type: types.AUTH, payload: { data: { [types.SESSION_TOKEN]: response.data } } });
    localStorage.setItem(storage.TOKEN, response.data);
    yield call(ping);
  }
}

/**
 * @description
 * Ping watcher
 *
 * @return {Function}
 * @private
 */
function* watchPing () {
  yield put({ type: types.AUTH, payload: { loading: true } });
  yield takeLatest(types.SESSION_USER_PING, ping);
}

/**
 * @description
 * Login watcher
 *
 * @return {Function}
 * @private
 */
function* watchLogin () {
  yield put({ type: types.AUTH, payload: { loading: true } });
  yield takeLatest(types.SESSION_USER_LOGIN, login);
}

/**
 * @description
 * Root auth saga
 *
 * @return {Function}
 * @public
 */
export default function* authSaga () {
  yield all([
    watchPing(),
    watchLogin()
  ]);
}
