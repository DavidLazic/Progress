import { createReducer, createHandlers } from 'src/redux';
import * as types from 'src/actions/types';

const initState = {
  [types.SIDEBAR]: {
    active: true
  }
};

export default {
  sidebarReducer: createReducer(initState, createHandlers(Object.keys(initState)))
};
