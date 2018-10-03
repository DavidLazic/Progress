import React, { Component } from 'react';
import t from 'prop-types';
import { ProjectsService } from 'src/lib/services';
import { FormProject } from 'src/components/form';
import { withStyles } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconAdd from '@material-ui/icons/PlaylistAdd';
import IconProject from '@material-ui/icons/CreateNewFolder';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import Dialog from '@material-ui/core/Dialog';

const styles = () => ({
  dialog: {
    minWidth: 680
  }
});

class AdminCreate extends Component {

  static propTypes = {
    onApply: t.func.isRequired,
    classes: t.object.isRequired
  }

  state = {
    active: false,
    type: null
  }

  reset () {
    return this.setState({
      active: false,
      type: null,
      el: null
    });
  }

  onMenuToggle = type => event =>
    this.setState({ el: type.active ? event.currentTarget : null })

  addProject = () => this.setState({ active: true, type: 'project' })

  onProjectCreate = project => {
    ProjectsService
      .onProjectCreate(project)
      .then(this.props.onApply);

    return this.reset();
  }

  render () {
    const { el } = this.state;
    const { classes } = this.props;

    return (
      <section className="h__article-actions">
        <IconButton onClick={ this.onMenuToggle({ active: true }) }>
          <IconAdd />
        </IconButton>

        <Menu
          id="simple-menu"
          anchorEl={ el }
          open={ Boolean(el) }
          onClose={ this.onMenuToggle({ active: false }) }>
          <MenuItem onClick={ this.addProject }>
            <ListItemIcon className={ classes.icon }>
              <IconProject />
            </ListItemIcon>
            <ListItemText classes={ { primary: classes.primary } } inset primary="Project" />
          </MenuItem>
        </Menu>

        {
          this.state.active
          && this.state.type === 'project'
          && (
            <Dialog
              PaperProps={ { classes: { root: classes.dialog } } }
              open>
              <FormProject
                prepopulate={ this.state.data }
                onSubmit={ this.onProjectCreate }
                onCancel={ () => this.reset() } />
            </Dialog>
          )
        }

      </section>
    );
  }
}

export default withStyles(styles)(AdminCreate);
