import { combineReducers } from 'redux';
import authReducer from './modules/auth';
import adminReducer from './modules/admin';
import projectsReducer from './modules/projects';
import transitionReducer from './modules/transition';

export default combineReducers(Object.assign(
  adminReducer,
  authReducer,
  projectsReducer,
  transitionReducer
));
