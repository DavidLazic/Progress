import { db } from 'src/firebase';
import { Promise } from 'core-js';
import refs from 'src/constants/refs';

export class ServiceProjects {

  static transform = (project, type) => ({
    to: (key, value) =>
      Object.keys(project[type]).reduce((acc, entry) =>
        ({ ...acc, [`/${type}/${entry}/${key}`]: value}), {})
  })

  static differential = (project, tags, key) =>
    Object.keys(tags).reduce((acc, entry) =>
      project.tags && !project.tags[entry]
        ? { ...acc, [`/${refs.TAGS}/${entry}/${key}`]: null }
        : acc, {});

  static create = ({ project, key }) => ({
    [`/${refs.PROJECTS}/${key}`]: project,
    ...(project.tags ? ServiceProjects.transform(project, 'tags').to(key, true) : {}),
    ...(project.periods ? ServiceProjects.transform(project, 'periods').to(key, true) : {})
  })

  static edit = ({ project, key, tags, periods }) => ({
    [`/${refs.PROJECTS}/${key}`]: project,
    ...(tags ? ServiceProjects.differential(project, tags, key) : {}),
    ...(periods ? ServiceProjects.differential(project, periods, key) : {}),
    ...(project.tags ? ServiceProjects.transform(project, 'tags').to(key, true) : {}),
    ...(project.periods ? ServiceProjects.transform(project, 'periods').to(key, true) : {})
  })

  static delete = ({ project, key }) => ({
    [`/${refs.PROJECTS}/${key}`]: null,
    ...(project.tags ? ServiceProjects.transform(project, 'tags').to(key, null) : {}),
    ...(project.periods ? ServiceProjects.transform(project, 'periods').to(key, null) : {})
  })

  static onProjectsGet = data =>
    Promise.all(
      Object
        .keys(data)
        .map(id =>
          new Promise(resolve =>
            db
              .ref(`${refs.PROJECTS}/${id}`)
              .once('value', snapshot => resolve({
                id,
                ...snapshot.val()
              })))
        )
    )

  static onPeriodsGet = actions =>
    db
      .ref(refs.PERIODS)
      .on('value', snapshot =>
        actions.projectsPeriods(snapshot.val()))

  static onProjectCreate = project =>
    new Promise(resolve => {
      const { key } = db.ref(`/${refs.PROJECTS}`).push();
      const updates = ServiceProjects.create({ project, key });

      return resolve(updates);
    })

  static onProjectEdit = project =>
    new Promise(resolve => {
      const query = db.ref(`/${refs.PROJECTS}`).child(project.id);

      query.once('value', snapshot => {
        const { tags, periods } = snapshot.val();
        const updates = ServiceProjects.edit({ project, key: project.id, tags, periods });

        return resolve(updates);
      });
    })

  static onProjectDelete = project =>
    new Promise(resolve => {
      const updates = ServiceProjects.delete({ project, key: project.id });

      return resolve(updates);
    })

  static onApply = updates =>
    new Promise(resolve =>
      db.ref().update(updates)
        .then(() => resolve())
    )
}
