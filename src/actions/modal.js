import * as types from 'src/actions/types';

export function modalToggle (props) {
  return { type: types.MODAL, payload: props };
}
