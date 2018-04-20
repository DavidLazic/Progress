import { combineReducers } from 'redux';
import * as authReducer from './modules/auth';
import * as projectsReducer from './modules/projects';
import * as modalReducer from './modules/modal';

export default combineReducers(Object.assign(
  authReducer,
  projectsReducer,
  modalReducer
));
