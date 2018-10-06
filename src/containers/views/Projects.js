import React, { Component } from 'react';
import t from 'prop-types';
import firebase from 'firebase';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from 'src/actions';
import { augmentComponent } from 'react-augment';
import { useSocket } from 'src/lib/decorators';
import * as types from 'src/actions/types';
import refs from 'src/constants/refs';
import { Route } from 'react-router-dom';
import { routes } from 'src/routes';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { ProjectPreview, ProjectYear } from 'src/components/project';
import { Project } from 'src/containers/views';
import IconAdd from '@material-ui/icons/CreateNewFolder';

const styles = theme => ({
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
  Periods: state.projectsReducer[types.PROJECTS_PERIODS],
  Transition: state.transitionReducer[types.TRANSITION]
}), dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch)
}))
@augmentComponent([
  useSocket
], {
  socket: { refs: [refs.PROJECTS] }
})
class Projects extends Component {

    static propTypes = {
      actions: t.object.isRequired,
      Projects: t.object.isRequired,
      location: t.object.isRequired,
      Periods: t.object,
      Transition: t.object.isRequired
    }

    static defaultProps = {
      Periods: {}
    }

    static getProjectIndex = index =>
      `${index + 1 > 9 ? '' : '0'}${index + 1}`

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
        data.length
        && this.props.actions.projectsSet(data))

    onSetTransition = ({ index }) =>
      this.props.actions.setTransition({
        active: true,
        index
      })

    onPeriodChange = active =>
      this.setState({ active }, () =>
        this.getProjects())

    render () {
      const { location, classes } = this.props;

      const inTransition = location.state && location.state.to === 'details';
      const position = inTransition && location.state.meta.from || {};

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
                className={ classes.button }>
                <IconAdd className={ classes.btnIcon } />
                <span>New</span>
              </Button>
            </div>
          </div>


          <div className="h__article__inner">
            {
              inTransition
              && (
                <Route
                  path={ `${routes.PROJECTS}/:id` }
                  render={ props => <Project { ...props } position={ position } /> } />
              )
            }

            <ul className="h__list h__grid">
              {
                this.props.Projects.data
                && this.props.Projects.data.length
                && this.props.Projects.data
                  .map((project, index) => (
                    <li
                      key={ index }
                      data-text={ Projects.getProjectIndex(index) }
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

export default withStyles(styles)(Projects);
