import React, { Component, Fragment } from 'react';
import t from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from 'src/actions';
import { augmentComponent } from 'react-augment';
import { useSocket } from 'src/lib/decorators';
import refs from 'src/constants/refs';
import * as types from 'src/actions/types';

import { AdminTable, AdminNew } from 'src/components/admin';
import { FormProject } from 'src/components/form';

import Snackbar from 'material-ui/Snackbar';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

@connect(state => ({
  Projects: state.projectsReducer[types.PROJECTS]
}), dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch)
}))
@augmentComponent([
  useSocket
], {
  socket: { refs: [refs.PROJECTS] }
})
export default class Admin extends Component {

  static propTypes = {
    Projects: t.object,
    onProjectCreate: t.func.isRequired,
    onProjectDelete: t.func.isRequired
  }

  static defaultProps = {
    Projects: null
  }

  state = {
    create: false,
    type: null,
    snack: false
  }

  onSnackClose = () => this.setState({ snack: false })

  onCancel = () => this.setState({ create: false, type: null })

  onSubmit = project =>
    this.setState({ create: false, type: null }, async () => {
      await this.props.onProjectCreate(project);
      this.setState({ snack: true });
    })

  onProjectCreate = () => !this.state.create &&
    this.setState({ create: true, type: 'project' })

  onProjectEdit = () => {

  }

  render () {
    return (
      <article className="h__article">
        <IconMenu
          iconButtonElement={ <IconButton><MoreVertIcon /></IconButton> }
          targetOrigin={ {horizontal: 'right', vertical: 'top'} }
          anchorOrigin={ {horizontal: 'right', vertical: 'top'} }>
          <MenuItem onClick={ this.onProjectCreate } primaryText="Project" />
        </IconMenu>

        {
          this.state.create &&
          this.state.type === 'project' &&
          <Fragment>
            <AdminNew
              open={ this.state.create }
              type="Project">
              <FormProject
                onSubmit={ this.onSubmit }
                onCancel={ this.onCancel } />
            </AdminNew>

            <Snackbar
              open={ this.state.snack }
              message="Project created"
              autoHideDuration={ 4000 }
              onRequestClose={ this.onSnackClose } />
          </Fragment>
        }

        <AdminTable
          loading={ this.props.Projects.loading }
          data={ this.props.Projects.data }
          onEdit={ this.onProjectEdit }
          onDelete={ this.props.onProjectDelete }
          error={ this.props.Projects.error } />
      </article>
    );
  }
}
