import * as types from 'src/actions/types';

export function setNavbar (props) {
  return { type: types.NAVBAR, payload: props };
}
