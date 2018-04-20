import { all, put, takeLatest } from 'redux-saga/effects';
import * as types from 'src/actions/types';

/**
 * @description
 * Modal toggle saga
 *
 * @param {Object} props
 * @return {Function}
 * @public
 */
function* modalToggle (props) {
  yield put({ type: types.MODAL, payload: { loading: false, active: props.payload } });
}

/**
 * @description
 * Ping watcher
 *
 * @return {Function}
 * @private
 */
function* watchToggle () {
  yield put({ type: types.MODAL, payload: { loading: true } });
  yield takeLatest(types.MODAL_TOGGLE, modalToggle);
}

/**
 * @description
 * Root modal saga
 *
 * @return {Function}
 * @public
 */
export default function* modalSaga () {
  yield all([
    watchToggle()
  ]);
}
