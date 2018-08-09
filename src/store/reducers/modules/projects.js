import { createReducer, createHandlers } from 'src/store';
import * as types from 'src/actions/types';

const initState = {
  [types.PROJECTS]: {
    data: null,
    loading: false,
    error: null
  },
  [types.PROJECTS_PERIODS]: {
    data: null,
    loading: false,
    error: null
  }
};

export default {
  projectsReducer: createReducer(initState, createHandlers(Object.keys(initState)))
};
