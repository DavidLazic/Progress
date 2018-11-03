import React, { Component } from 'react';
import t from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from 'src/actions';
import * as types from 'src/actions/types';
import { ServiceProjects } from 'src/lib/services';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { ProjectPreview, ProjectYear } from 'src/components/project';
import { FormProject } from 'src/components/form';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import IconAdd from '@material-ui/icons/NoteAdd';

const styles = theme => ({
  dialog: {
    minWidth: 680
  },
  button: {
    'marginLeft': theme.spacing.unit * 4,
    'background': `linear-gradient(to bottom right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    'color': '#fff',
    'width': 150,
    'height': 45,
    'textTransform': 'capitalize',
    '&:hover': {
      boxShadow: '0 1px 3px #999'
    }
  },
  btnIcon: {
    marginRight: theme.spacing.unit
  },
  input: {
    display: 'none'
  }
});

@connect(state => ({
  Projects: state.projectsReducer[types.PROJECTS],
  Periods: state.projectsReducer[types.PROJECTS_PERIODS]
}), dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch)
}))
class ViewProjects extends Component {

    static propTypes = {
      actions: t.object.isRequired,
      classes: t.object.isRequired,
      Projects: t.object.isRequired,
      Periods: t.object.isRequired
    }

    static getProjectIndex = index =>
      `${index + 1 > 9 ? '' : '0'}${index + 1}`

    state = {
      delete: false,
      edit: false,
      year: null,
      project: null
    }

    componentDidMount () {
      return this.onPeriodsGet();
    }

    reset = () =>
      this.setState({
        edit: false,
        delete: false,
        project: null
      })

    onPeriodsGet () {
      return ServiceProjects.onPeriodsGet(this.props.actions);
    }

    onProjectsGet = () =>
      ServiceProjects
        .onProjectsGet(this.props.Periods.data[this.state.year])
        .then(projects =>
          projects.length
          && this.props.actions.projectsSet(projects))

    onProjectAction = (action, project) => () =>
      this.setState({ [action]: true, project })

    projectAction = action => project =>
      ServiceProjects[`onProject${action}`](project)
        .then(ServiceProjects.onApply)
        .then(() => {
          this.reset();
          this.onProjectsGet();
        })

    onPeriodChange = year =>
      this.setState({ year }, () =>
        this.onProjectsGet())

    render () {
      const {
        classes,
        Projects
      } = this.props;

      const {
        project
      } = this.state;

      return (
        <article className="h__article">

          <div className="h__article__header">
            <div className="h__article__header-label">
              Projects
            </div>

            <div className="h__article__header-actions">
              <ProjectYear
                onPeriodChange={ this.onPeriodChange } />

              <Button
                onClick={ this.onProjectAction('edit', null) }
                className={ classes.button }>
                <IconAdd className={ classes.btnIcon } />
                <span>New</span>
              </Button>
            </div>
          </div>


          <div className="h__article__inner">

            <ul className="h__list h__grid">
              {
                Projects.data
                && Projects.data.length
                && Projects.data
                  .map((item, index) => (
                    <li
                      key={ index }
                      data-text={ ViewProjects.getProjectIndex(index) }>
                      <ProjectPreview
                        id={ item.id }
                        project={ item }
                        onProjectAction={ this.onProjectAction } />
                    </li>
                  ))
              }
            </ul>
          </div>

          {
            this.state.edit
            && (
              <Dialog
                PaperProps={ { classes: { root: classes.dialog } } }
                open>
                <FormProject
                  prepopulate={ project }
                  onSubmit={ this.projectAction(project ? 'Edit' : 'Create') }
                  onCancel={ this.reset } />
              </Dialog>
            )
          }

          {
            this.state.delete
            && (
              <Dialog open>
                <DialogTitle>Delete project</DialogTitle>
                <DialogContent>
                  { `Delete project "${project.title}"?` }
                </DialogContent>
                <DialogActions>
                  <Button onClick={ this.reset }>
                    Cancel
                  </Button>

                  <Button
                    color="primary"
                    onClick={ () => this.projectAction('Delete')(project) }>
                    Delete
                  </Button>
                </DialogActions>
              </Dialog>
            )
          }

        </article>
      );
    }
}

export default withStyles(styles)(ViewProjects);
