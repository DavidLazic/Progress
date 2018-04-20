import * as types from 'src/actions/types';

export function getProjects () {
  return { type: types.PROJECTS_GET };
}

export function createProject (props) {
  return { type: types.PROJECTS_CREATE, payload: props };
}

export function updateProject (props) {
  return { type: types.PROJECTS_UPDATE, payload: props };
}

export function deleteProject (props) {
  return { type: types.PROJECTS_DELETE, payload: props };
}
