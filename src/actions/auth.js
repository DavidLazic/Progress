import * as types from 'src/actions/types';

export function ping () {
  return { type: types.SESSION_USER_PING };
}

export function login (props) {
  return { type: types.SESSION_USER_LOGIN, payload: props };
}
