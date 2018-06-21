import React, { Component } from 'react';
import t from 'prop-types';
import { ProjectsService } from 'src/lib/services';
import { AdminTable } from 'src/components/admin';

export default class AdminProjects extends Component {

  static propTypes = {
    Projects: t.object,
    onApply: t.func.isRequired
  }

  static defaultProps = {
    Projects: null
  }

  onProjectEdit = (id, project) =>
    ProjectsService
      .onProjectEdit(id, project)
      .then(this.props.onApply)

  onProjectDelete = (id, project) =>
    ProjectsService
      .onProjectDelete(id, project)
      .then(this.props.onApply)

  render () {
    return (
      <AdminTable
        type="Project"
        loading={ this.props.Projects.loading }
        data={ this.props.Projects.data }
        onEdit={ this.onProjectEdit }
        onDelete={ this.onProjectDelete }
        error={ this.props.Projects.error } />
    );
  }
}
