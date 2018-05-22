import { createReducer, createHandlers } from 'src/redux';
import * as types from 'src/actions/types';

const initState = {
  [types.NAVBAR]: {
    active: true
  }
};

export default {
  navbarReducer: createReducer(initState, createHandlers(Object.keys(initState)))
};
