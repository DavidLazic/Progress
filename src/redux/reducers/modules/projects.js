import { createReducer, createHandlers } from 'src/redux';
import * as types from 'src/actions/types';

const initState = {
  [types.PROJECTS]: {
    data: null,
    loading: false,
    error: null
  }
};

export const projectsReducer = createReducer(initState, createHandlers(Object.keys(initState)));
