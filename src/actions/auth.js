import * as types from 'src/actions/types';

export function setAuth (props) {
  return { type: types.AUTH, payload: props };
}
