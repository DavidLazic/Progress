import React, { Component, Fragment } from 'react';
import t from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from 'src/actions';
import { augmentComponent } from 'react-augment';
import { withSocket } from 'src/lib/decorators';
import refs from 'src/constants/refs';
import * as types from 'src/actions/types';
import { Route } from 'react-router-dom';
import { routeCodes } from 'src/routes';

import { FormProject } from 'src/components/form';
import { ProjectPreview } from 'src/components/project';
import { Create } from 'src/components';
import { Project } from 'src/containers/views';

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
      onCreateProject: t.func.isRequired,

      location: t.object,
      Projects: t.object,
      Transition: t.object.isRequired,
      Auth: t.object.isRequired
    }

    static defaultProps = {
      location: {},
      Projects: null
    }

    state = {
      create: false,
      snack: false
    }

    onSnackClose = () => this.setState({ snack: false })

    onSetTransition = ({ index }) => this.props.actions.setTransition({ active: true, index })

    onCreate = () => !this.state.create && this.setState({ create: true })

    onCancel = () => this.setState({ create: false })

    onSubmit = project =>
      this.setState({ create: false }, async () => {
        await this.props.onCreateProject(project);
        this.setState({ snack: true });
      })

    render () {
      const { location } = this.props;

      const inTransition = location.state && location.state.to === 'details';
      const position = inTransition && location.state.meta.from || {};

      return (
        <article className="h__article">

          {
            inTransition &&
            <Route
              path={ `${routeCodes.PROJECTS}/:id` }
              render={ props => <Project { ...props } position={ position } /> } />
          }

          {
            this.props.Auth.data && (
              <Fragment>
                <Create
                  onCreate={ this.onCreate }
                  open={ this.state.create }
                  type="Project">
                  <FormProject
                    onSubmit={ this.onSubmit }
                    onCancel={ this.onCancel } />
                </Create>

                <Snackbar
                  open={ this.state.snack }
                  message="Project created"
                  autoHideDuration={ 4000 }
                  onRequestClose={ this.onSnackClose } />
              </Fragment>
            )
          }

          <ul className="h__list h__list--honeycomb">
            {
              this.props.Projects.data &&
              Object.keys(this.props.Projects.data).map((key, index) => (
                <li
                  key={ key }
                  className={ classNames({
                    hex: true,
                    active: this.props.Transition.index === index
                  }) }>
                  <div className="hex__wrapper">
                    <ProjectPreview
                      id={ key }
                      project={ {
                        index,
                        ...this.props.Projects.data[key]
                      } } />
                  </div>
                </li>
              ))
            }
          </ul>
        </article>
      );
    }
}
