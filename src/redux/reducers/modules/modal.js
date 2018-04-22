import { createReducer, createHandlers } from 'src/redux';
import * as types from 'src/actions/types';

const initState = {
  [types.MODAL]: {
    active: false
  }
};

export default {
  modalReducer: createReducer(initState, createHandlers(Object.keys(initState)))
};
