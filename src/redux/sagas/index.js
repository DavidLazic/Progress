import { all } from 'redux-saga/effects';
import authSaga from './modules/auth';
import projectsSaga from './modules/projects';
import modalSaga from './modules/modal';

export default function* sagas () {
  yield all([
    authSaga(),
    projectsSaga(),
    modalSaga()
  ]);
}
