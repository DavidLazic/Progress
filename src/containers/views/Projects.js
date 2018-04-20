import React, { Component } from 'react';
import t from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from 'src/actions';
import * as types from 'src/actions/types';
import ProjectItem from 'src/components/project/Project.item';
import ProjectFilter from 'src/components/project/Project.filter';

@connect(state => ({
  Projects: state.projectsReducer[types.PROJECTS],
  Modal: state.modalReducer[types.MODAL]
}), dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch)
}))

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

    componentDidMount = () => this.props.actions.getProjects()

    onTransition = () => this.props.actions.modalToggle(true)

    render () {
      const classes = classNames({
        h__article: true,
        active: this.props.Modal.active
      });

      return (
        <article className={ classes }>
          <ProjectFilter />

          <div className="h__list">
            {
              this.props.Projects.data &&
                        this.props.Projects.data.map((project, index) => (
                          <ProjectItem
                            key={ project.id }
                            history={ this.props.history }
                            onTransition={ this.onTransition }
                            project={ { ...project, index } } />
                        ))
            }
          </div>
        </article>
      );
    }
}
