import React, { Component, Fragment } from 'react';
import t from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from 'src/actions';
import { withRouter } from 'react-router';
import { Route } from 'react-router-dom';
import { routeCodes } from 'src/routes';
import firebase from 'src/firebase';
import * as types from 'src/actions/types';

import { Sidebar, Header, Login } from 'src/components';
import { Project } from 'src/containers/views';

@connect(state => ({
  Sidebar: state.sidebarReducer[types.SIDEBAR]
}), dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch)
}))
class App extends Component {

    static propTypes = {
      location: t.object,
      children: t.object,
      actions: t.object.isRequired,
      Sidebar: t.object.isRequired
    }

    static defaultProps = {
      location: {},
      children: null
    }

    componentDidMount () {
      firebase.auth().onAuthStateChanged(user => this.props.actions.setAuth({ data: user }));
    }

    render () {
      const { location } = this.props;

      const transition = location.state && location.state.to === 'transition';
      const position = transition && location.state.meta.from || {};

      return (
        <Fragment>
          <Header />

          <Login />

          <div className={ classNames({
            'h__article': true,
            'h__article--menu-open': this.props.Sidebar.active
          }) }>
            <Sidebar path={ this.props.location.pathname } />

            <section className="h__pusher">
              { this.props.children }

              {
                transition &&
                <Route
                  path={ `${routeCodes.PROJECTS}/:id` }
                  render={ props =>
                    <Project { ...props } position={ position } />
                  } />
              }
            </section>
          </div>
        </Fragment>
      );
    }
}

export default withRouter(App);
