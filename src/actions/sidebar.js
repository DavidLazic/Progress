import * as types from 'src/actions/types';

export function setSidebar (props) {
  return { type: types.SIDEBAR, payload: props };
}
