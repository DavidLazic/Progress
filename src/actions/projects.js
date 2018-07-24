import * as types from 'src/actions/types';

export function projectsSet (props) {
  return { type: types.PROJECTS, payload: { data: props } };
}

export function projectsPeriods (props) {
  return { type: types.PROJECTS_PERIODS, payload: { data: props } };
}
