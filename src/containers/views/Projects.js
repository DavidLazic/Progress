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
import { AnimateBubble } from 'src/components/animate';

@connect(state => ({
  Projects: state.projectsReducer[types.PROJECTS],
  Modal: state.modalReducer[types.MODAL]
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
      Projects: t.object,
      Modal: t.object
    }

    static defaultProps = {
      Projects: null,
      Modal: null
    }

    onTransition = () => this.props.actions.modalToggle({ active: true })

    render () {
      const classes = classNames({
        h__article: true,
        active: this.props.Modal.active
      });

      return (
        <article className={ classes }>
          <div className="h__list">
            {
              this.props.Projects.data &&
              Object.keys(this.props.Projects.data).map((key, index) => (
                <AnimateBubble key={ key }>
                  <ProjectItem
                    history={ this.props.history }
                    onTransition={ this.onTransition }
                    project={ { ...this.props.Projects.data[key], index } } />
                </AnimateBubble>
              ))
            }
          </div>
        </article>
      );
    }
}
