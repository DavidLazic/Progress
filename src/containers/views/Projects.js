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

    onSnackClose = () => this.setState({ snack: false })

    onCreate = () => !this.state.create && this.setState({ create: true })

    onCancel = () => this.setState({ create: false })

    onSubmit = project =>
      this.setState({ create: false }, async () => {
        await this.props.onCreateProject(project);
        this.setState({ snack: true });
      })

    render () {
      return (
        <article className="h__article">

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
            onRequestClose={ this.onSnackClose } />

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
                    <ProjectItem
                      id={ key }
                      history={ this.props.history }
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
