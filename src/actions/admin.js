import * as types from 'src/actions/types';

export function projects (props) {
  return { type: types.ADMIN_PROJECTS, payload: { data: props } };
}
