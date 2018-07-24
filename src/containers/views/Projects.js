import React, { Component } from 'react';
import t from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from 'src/actions';
import * as types from 'src/actions/types';
import { Route } from 'react-router-dom';
import { routeCodes } from 'src/routes';

import { ProjectPreview, ProjectSidebar } from 'src/components/project';
import { Project } from 'src/containers/views';

@connect(state => ({
  Projects: state.projectsReducer[types.PROJECTS],
  Transition: state.transitionReducer[types.TRANSITION]
}), dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch)
}))
class Projects extends Component {

    static propTypes = {
      actions: t.object.isRequired,

      location: t.object,
      Projects: t.object,
      Transition: t.object.isRequired
    }

    static defaultProps = {
      location: {},
      Projects: null
    }

    onSetTransition = ({ index }) =>
      this.props.actions.setTransition({
        active: true,
        index
      })

    onPeriodChange = () => {

    }

    render () {
      const { location } = this.props;

      const inTransition = location.state && location.state.to === 'details';
      const position = inTransition && location.state.meta.from || {};

      return (
        <article className="h__article">

          <ProjectSidebar
            onPeriodChange={ this.onPeriodChange } />

          <div className="h__article__inner">
            {
              inTransition &&
              <Route
                path={ `${routeCodes.PROJECTS}/:id` }
                render={ props => <Project { ...props } position={ position } /> } />
            }

            <ul className="h__list h__list--honeycomb">
              {
                this.props.Projects.data &&
                Object
                  .keys(this.props.Projects.data)
                  .map((key, index) => (
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
          </div>

        </article>
      );
    }
}

export default Projects;
