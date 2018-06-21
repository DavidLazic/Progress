import firebase from 'src/firebase';
import { Promise } from 'core-js';

export class ProjectsService {

  static transform = (project, type) => ({
    to: (key, value) =>
      Object.keys(project[type]).reduce((acc, entry) =>
        ({ ...acc, [`/${type}/${entry}/${key}`]: value}), {})
  })

  static differential = (project, tags, key) =>
    Object.keys(tags).reduce((acc, entry) =>
      !project.tags[entry]
        ? { ...acc, [`/tags/${entry}/${key}`]: null }
        : acc, {});

  static create = ({ project, key }) => ({
    [`/projects/${key}`]: project,
    ...(project.tags ? ProjectsService.transform(project, 'tags').to(key, true) : {}),
    ...(project.periods ? ProjectsService.transform(project, 'periods').to(key, true) : {})
  })

  static edit = ({ project, key, tags, periods }) => ({
    [`/projects/${key}`]: project,
    ...ProjectsService.differential(project, tags, key),
    ...ProjectsService.differential(project, periods, key),
    ...(project.tags ? ProjectsService.transform(project, 'tags').to(key, true) : {}),
    ...(project.periods ? ProjectsService.transform(project, 'periods').to(key, true) : {})
  })

  static delete = ({ project, key }) => ({
    [`/projects/${key}`]: null,
    ...(project.tags ? ProjectsService.transform(project, 'tags').to(key, null) : {}),
    ...(project.periods ? ProjectsService.transform(project, 'periods').to(key, null) : {})
  })

  static onProjectCreate = project =>
    new Promise(resolve => {
      const { key } = firebase.database().ref('/projects').push();
      const updates = ProjectsService.create({ project, key });

      return resolve(updates);
    })

  static onProjectEdit = (key, project) =>
    new Promise(resolve => {
      const query = firebase.database().ref('/projects').child(key);

      query.once('value', snapshot => {
        const { tags, periods } = snapshot.val();
        const updates = ProjectsService.edit({ project, key, tags, periods });

        return resolve(updates);
      });
    })

  static onProjectDelete = (key, project) =>
    new Promise(resolve => {
      const updates = ProjectsService.delete({ project, key });

      return resolve(updates);
    })
}
