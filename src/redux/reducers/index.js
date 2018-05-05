import { combineReducers } from 'redux';
import authReducer from './modules/auth';
import projectsReducer from './modules/projects';
import sidebarReducer from './modules/sidebar';
import transitionReducer from './modules/transition';

export default combineReducers(Object.assign(
  authReducer,
  projectsReducer,
  sidebarReducer,
  transitionReducer
));
