import * as types from 'src/actions/types';

export function projects (props) {
  return { type: types.PROJECTS, payload: { data: props } };
}
