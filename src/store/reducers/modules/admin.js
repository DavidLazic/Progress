import { createReducer, createHandlers } from 'src/store';
import * as types from 'src/actions/types';

const initState = {
  [types.ADMIN_PROJECTS]: {
    data: null,
    loading: false,
    error: null
  }
};

export default {
  adminReducer: createReducer(initState, createHandlers(Object.keys(initState)))
};
