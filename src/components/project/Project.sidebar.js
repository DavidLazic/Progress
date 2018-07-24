import React, { Component } from 'react';
import t from 'prop-types';
import classNames from 'classnames';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from 'src/actions';
import * as types from 'src/actions/types';
import refs from 'src/constants/refs';

import { AnimateRipple } from 'src/components/animate';

@connect(state => ({
  Periods: state.projectsReducer[types.PROJECTS_PERIODS]
}), dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch)
}))
class ProjectSidebar extends Component {

  static propTypes = {
    actions: t.object.isRequired,
    Periods: t.object,
    onPeriodChange: t.func
  }

  static defaultProps = {
    Periods: {},
    onPeriodChange: null
  }

  constructor (props) {
    super(props);
    this.state = {
      active: 0
    };
  }

  componentDidMount () {
    firebase
      .database()
      .ref(refs.PERIODS)
      .once('value', snapshot =>
        this.props.actions.projectsPeriods(snapshot.val()));
  }

  onPeriodChange = active =>
    this.setState({ active }, () =>
      this.props.onPeriodChange(active))

  render () {

    return (
      <div className="h__sidebar">
        <ul className="h__sidebar__list">
          {
            this.props.Periods.data &&
            Object
              .keys(this.props.Periods.data)
              .reverse()
              .map((key, index) => (
                <li
                  key={ key }
                  className={ classNames({
                    'h__sidebar__list-item': true,
                    'active': this.state.active === index
                  }) }
                  onClick={ () => this.onPeriodChange(index) }>
                  <AnimateRipple>
                    <button>
                      { key }
                    </button>
                  </AnimateRipple>
                </li>
              ))
          }
        </ul>
      </div>
    );
  }
}

export default ProjectSidebar;
