import { combineReducers } from 'redux';
import authReducer from './modules/auth';
import projectsReducer from './modules/projects';
import navbarReducer from './modules/navbar';
import transitionReducer from './modules/transition';

export default combineReducers(Object.assign(
  authReducer,
  projectsReducer,
  navbarReducer,
  transitionReducer
));
