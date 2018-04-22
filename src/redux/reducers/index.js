import { combineReducers } from 'redux';
import authReducer from './modules/auth';
import projectsReducer from './modules/projects';
import modalReducer from './modules/modal';

export default combineReducers(Object.assign(
  authReducer,
  projectsReducer,
  modalReducer
));
