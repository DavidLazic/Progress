import * as types from 'src/actions/types';

export function setTransition (props) {
  return { type: types.TRANSITION, payload: props };
}
