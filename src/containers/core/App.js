import React, { Component, Fragment } from 'react';
import t from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from 'src/actions';
import { withRouter } from 'react-router';
import firebase from 'src/firebase';

import { Header, Login, Navbar } from 'src/components';


@connect(state => state, dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch)
}))
class App extends Component {

    static propTypes = {
      location: t.object,
      children: t.object,
      actions: t.object.isRequired
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
        <Fragment>
          <Header />

          <Login />

          <div className="h__section">
            <Navbar path={ this.props.location.pathname } />

            { this.props.children }
          </div>
        </Fragment>
      );
    }
}

export default withRouter(App);
