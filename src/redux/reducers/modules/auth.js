import { createReducer, createHandlers } from 'src/redux';
import * as types from 'src/actions/types';

const initState = {
  [types.AUTH]: {
    data: null,
    loading: false,
    active: false,
    error: null
  }
};

export default {
  authReducer: createReducer(initState, createHandlers(Object.keys(initState)))
};
