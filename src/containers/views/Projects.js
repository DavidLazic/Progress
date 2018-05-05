import React, { Component } from 'react';
import t from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from 'src/actions';
import { augmentComponent } from 'react-augment';
import { withSocket } from 'src/lib/decorators';
import refs from 'src/constants/refs';
import * as types from 'src/actions/types';
import { ProjectItem } from 'src/components/project';
import { FormProject } from 'src/components/form';
import { Create } from 'src/components';
import { AnimateRipple } from 'src/components/animate';

import Snackbar from 'material-ui/Snackbar';

@connect(state => ({
  Auth: state.authReducer[types.AUTH],
  Projects: state.projectsReducer[types.PROJECTS],
  Transition: state.transitionReducer[types.TRANSITION]
}), dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch)
}))
@augmentComponent([
  withSocket
], {
  socket: { refs: [refs.PROJECTS] }
})
export default class Projects extends Component {

    static propTypes = {
      actions: t.object.isRequired,
      history: t.object.isRequired,
      onCreateProject: t.func.isRequired,
      Projects: t.object,
      Transition: t.object.isRequired,
      Auth: t.object.isRequired
    }

    static defaultProps = {
      Projects: null
    }

    state = {
      create: false,
      snack: false
    }

    onTransition = () => this.props.actions.setTransition({ active: true })

    onCreate = () => !this.state.create && this.setState({ create: true })

    onCancel = () => this.setState({ create: false })

    onSubmit = project =>
      this.setState({ create: false }, () =>
        this.props.onCreateProject(project)
          .then(() => this.setState({ snack: true })))

    render () {
      const classes = classNames({
        h__article: true,
        active: this.props.Transition.active
      });

      return (
        <article className={ classes }>
          {
            this.props.Auth.data &&
            <Create
              onCreate={ this.onCreate }
              open={ this.state.create }
              type="Project">
              <FormProject
                onSubmit={ this.onSubmit }
                onCancel={ this.onCancel } />
            </Create>
          }

          <Snackbar
            open={ this.state.snack }
            message="Project created"
            autoHideDuration={ 4000 }
            onRequestClose={ () => this.setState({ snack: false }) } />

          <div className="h__list">
            {
              this.props.Projects.data &&
              Object.keys(this.props.Projects.data).map((key, index) => (
                <AnimateRipple key={ key }>
                  <ProjectItem
                    id={ key }
                    history={ this.props.history }
                    onTransition={ this.onTransition }
                    project={ {
                      index,
                      ...this.props.Projects.data[key]
                    } } />
                </AnimateRipple>
              ))
            }
          </div>
        </article>
      );
    }
}
