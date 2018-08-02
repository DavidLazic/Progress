import React, { Component } from 'react';
import t from 'prop-types';
import firebase from 'firebase';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from 'src/actions';
import * as types from 'src/actions/types';
import refs from 'src/constants/refs';
import { Route } from 'react-router-dom';
import { routeCodes } from 'src/routes';

import { ProjectPreview, ProjectYear } from 'src/components/project';
import { Project } from 'src/containers/views';

@connect(state => ({
  Projects: state.projectsReducer[types.PROJECTS],
  Periods: state.projectsReducer[types.PROJECTS_PERIODS],
  Transition: state.transitionReducer[types.TRANSITION]
}), dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch)
}))
class Projects extends Component {

    static propTypes = {
      actions: t.object.isRequired,

      location: t.object,
      Projects: t.object,
      Periods: t.object,
      Transition: t.object.isRequired
    }

    static defaultProps = {
      location: {},
      Projects: {},
      Periods: {}
    }

    constructor (props) {
      super(props);
      this.state = {
        active: null
      };
    }

    getProjects = () =>
      Promise.all(
        Object
          .keys(this.props.Periods.data[this.state.active])
          .map(id =>
            new Promise(resolve =>
              firebase
                .database()
                .ref(`${refs.PROJECTS}/${id}`)
                .once('value', snapshot => resolve({
                  id,
                  ...snapshot.val()
                })))
          )
      ).then(data =>
        data.length &&
        this.props.actions.projectsSet(data))

    onSetTransition = ({ index }) =>
      this.props.actions.setTransition({
        active: true,
        index
      })

    onPeriodChange = active =>
      this.setState({ active }, () =>
        this.getProjects())

    render () {
      const { location } = this.props;

      const inTransition = location.state && location.state.to === 'details';
      const position = inTransition && location.state.meta.from || {};

      return (
        <article className="h__article">

          <div className="h__article__actions">
            <span>Projects</span>

            <ProjectYear
              onPeriodChange={ this.onPeriodChange } />
          </div>


          <div className="h__article__inner">
            {
              inTransition &&
              <Route
                path={ `${routeCodes.PROJECTS}/:id` }
                render={ props => <Project { ...props } position={ position } /> } />
            }

            <ul className="h__list h__grid">
              {
                this.props.Projects.data &&
                this.props.Projects.data.length &&
                this.props.Projects.data
                  .map((project, index) => (
                    <li
                      key={ index }
                      className={ classNames({
                        active: this.props.Transition.index === index
                      }) }>
                      <ProjectPreview
                        id={ project.id }
                        project={ {
                          index,
                          ...project
                        } } />
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
