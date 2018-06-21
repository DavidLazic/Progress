import React, { Component } from 'react';
import t from 'prop-types';
import { ProjectsService } from 'src/lib/services';
import { FormProject } from 'src/components/form';
import MenuItem from 'material-ui/MenuItem';
import IconAdd from 'material-ui/svg-icons/av/playlist-add';
import IconProject from 'material-ui/svg-icons/file/create-new-folder';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import Dialog from 'material-ui/Dialog';

export default class AdminCreate extends Component {

  static propTypes = {
    onApply: t.func.isRequired
  }

  state = {
    active: false,
    type: null
  }

  reset () {
    return this.setState({
      active: false,
      type: null
    });
  }

  addProject = () => this.setState({ active: true, type: 'project' })

  onProjectCreate = project => {
    ProjectsService
      .onProjectCreate(project)
      .then(this.props.onApply);

    return this.reset();
  }

  render () {
    return (
      <section className="h__article-actions">
        <IconMenu
          iconButtonElement={
            <IconButton iconStyle={ { width: 36, height: 36 } }>
              <IconAdd />
            </IconButton>
          }
          targetOrigin={ {horizontal: 'right', vertical: 'top'} }
          anchorOrigin={ {horizontal: 'right', vertical: 'top'} }>
          <MenuItem onClick={ this.addProject } primaryText="Project" leftIcon={ <IconProject /> } />
        </IconMenu>

        {
          this.state.active &&
          this.state.type === 'project' &&
          <Dialog
            title="New Project"
            open={ true }
            autoScrollBodyContent={ true }>
            <FormProject
              prepopulate={ this.state.data }
              onSubmit={ this.onProjectCreate }
              onCancel={ () => this.reset() } />
          </Dialog>
        }
      </section>
    );
  }
}
