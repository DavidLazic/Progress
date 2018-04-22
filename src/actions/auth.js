import * as types from 'src/actions/types';

export function login (props) {
  return { type: types.AUTH, payload: props };
}
