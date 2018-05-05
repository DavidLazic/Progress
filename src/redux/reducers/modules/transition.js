import { createReducer, createHandlers } from 'src/redux';
import * as types from 'src/actions/types';

const initState = {
  [types.TRANSITION]: {
    active: false
  }
};

export default {
  transitionReducer: createReducer(initState, createHandlers(Object.keys(initState)))
};
