import { all, put, call, takeLatest } from 'redux-saga/effects';
import * as types from 'src/actions/types';
import Api from 'src/lib/api';
import history from 'src/routes/history';
import { PROJECTS } from 'src/constants/refs';
import { routeCodes } from 'src/routes';

/**
 * @description
 * CREATE project saga
 *
 * @param  {Object} props
 * @return {Function}
 * @public
 */
function* createProject (props) {
  const response = yield call(Api.post, PROJECTS, props.payload);

  if (!response.success) {
    yield put({ type: types.PROJECTS, payload: { error: response, loading: false } });
  } else {
    yield put({ type: types.PROJECTS, payload: { loading: false } });
    yield call(history.push, routeCodes.ADMIN_PROJECTS);
  }
}

/**
 * @description
 * READ projects saga
 *
 * @return {Function}
 * @public
 */
function* readProjects () {
  const response = yield call(Api.get, PROJECTS);

  if (!response.success) {
    yield put({ type: types.PROJECTS, payload: { error: response, loading: false } });
  } else {
    yield put({ type: types.PROJECTS, payload: { data: response.data, loading: false } });
  }
}

/**
 * @description
 * UPDATE project saga
 *
 * @param  {Object} props
 * @return {Function}
 * @public
 */
function* updateProject (props) {
  const response = yield call(Api.put, PROJECTS, props.payload);

  if (!response.success) {
    yield put({ type: types.PROJECTS, payload: { error: response, loading: false } });
  } else {
    yield put({ type: types.PROJECTS, payload: { loading: false } });
    yield call(history.push, routeCodes.ADMIN_PROJECTS);
  }
}

/**
 * @description
 * DELETE projects saga
 *
 * @param  {Object} props
 * @return {Function}
 * @public
 */
function* deleteProject (props) {
  const response = yield call(Api.delete, PROJECTS, props.payload);

  if (!response.success) {
    yield put({ type: types.PROJECTS, payload: { error: response, loading: false } });
  } else {
    yield call(readProjects);
  }
}

/**
 * @description
 * CREATE project watcher
 *
 * @return {Function}
 * @private
 */
function* watchProjectsCreate () {
  yield put({ type: types.PROJECTS, payload: { loading: true } });
  yield takeLatest(types.PROJECTS_CREATE, createProject);
}

/**
 * @description
 * READ projects watcher
 *
 * @return {Function}
 * @private
 */
function* watchProjectsRead () {
  yield put({ type: types.PROJECTS, payload: { loading: true } });
  yield takeLatest(types.PROJECTS_GET, readProjects);
}

/**
 * @description
 * UPDATE project watcher
 *
 * @return {Function}
 * @private
 */
function* watchProjectsUpdate () {
  yield put({ type: types.PROJECTS, payload: { loading: true } });
  yield takeLatest(types.PROJECTS_UPDATE, updateProject);
}

/**
 * @description
 * DELETE project watcher
 *
 * @return {Function}
 * @private
 */
function* watchProjectsDelete () {
  yield put({ type: types.PROJECTS, payload: { loading: true } });
  yield takeLatest(types.PROJECTS_DELETE, deleteProject);
}

/**
 * @description
 * Root projects saga
 *
 * @return {Function}
 * @public
 */
export default function* projectsSaga () {
  yield all([
    watchProjectsCreate(),
    watchProjectsRead(),
    watchProjectsUpdate(),
    watchProjectsDelete()
  ]);
}
