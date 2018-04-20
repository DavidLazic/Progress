import { createReducer, createHandlers } from 'src/lib/redux';
import * as types from 'src/actions/types';

const initState = {
  [types.MODAL]: {
    data: null,
    loading: false,
    active: false,
    error: null
  }
};

export const modalReducer = createReducer(initState, createHandlers(Object.keys(initState)));
