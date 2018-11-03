import React, { Fragment } from 'react';
import t from 'prop-types';
import IconDelete from '@material-ui/icons/Delete';
import IconEdit from '@material-ui/icons/Edit';

export const ProjectPreview = props => (
  <Fragment>
    <div
      className="h__project-preview">
      { props.project.title }
    </div>

    <div className="h__project-actions">
      <IconEdit
        className="h__btn h__btn--action"
        onClick={ props.onProjectAction('edit', props.project) } />
      <IconDelete
        className="h__btn h__btn--action"
        onClick={ props.onProjectAction('delete', props.project) } />
    </div>
  </Fragment>
);

ProjectPreview.propTypes = {
  project: t.object.isRequired,
  onProjectAction: t.func.isRequired
};
