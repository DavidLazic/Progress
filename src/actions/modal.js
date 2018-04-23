import * as types from 'src/actions/types';

export function setModal (props) {
  return { type: types.MODAL, payload: props };
}
