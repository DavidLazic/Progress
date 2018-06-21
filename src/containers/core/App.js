import React, { Component } from 'react';
import t from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from 'src/actions';
import { withRouter } from 'react-router';
import * as types from 'src/actions/types';
import firebase from 'src/firebase';

import { Navbar } from 'src/components';

@connect(state => ({
  Auth: state.authReducer[types.AUTH]
}), dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch)
}))
class App extends Component {

  static propTypes = {
    actions: t.object.isRequired,

    location: t.object,
    children: t.object,
    Auth: t.object.isRequired
  }

  static defaultProps = {
    location: {},
    children: null
  }

  componentDidMount () {
    firebase.auth().onAuthStateChanged(user => this.props.actions.setAuth({ data: user }));
  }

  render () {
    return (
      <div className="h__section">
        <Navbar
          path={ this.props.location.pathname }
          Auth={ this.props.Auth } />

        { this.props.children }
      </div>
    );
  }
}

export default withRouter(App);
