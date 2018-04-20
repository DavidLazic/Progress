import { createReducer, createHandlers } from 'src/redux';
import * as types from 'src/actions/types';

const initState = {
  [types.AUTH]: {
    data: null,
    loading: false,
    error: null
  }
};

export const authReducer = createReducer(initState, createHandlers(Object.keys(initState)));
