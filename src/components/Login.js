import React, { Component, Fragment } from 'react';
import t from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from 'src/actions';
import firebase from 'src/firebase';

import { FormLogin } from 'src/components/form';
import Dialog from 'material-ui/Dialog';

@connect(state => state, dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch)
}))
class Login extends Component {

  static propTypes = {
    actions: t.object.isRequired,
    Auth: t.object.isRequired
  }

  onLogin = ({ email, password }) => {
    this.props.actions.setAuth({ active: false });
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  onLogout = () => firebase.auth().signOut()

  onLoginActivate = () => !this.props.Auth.active && this.props.actions.setAuth({ active: true })

  onLoginCancel = () => this.props.actions.setAuth({ active: false })

  render () {
    return this.props.Auth.data
      ? (
        <button
          type="button"
          onClick={ this.onLogout }>
          Logout
        </button>
      )
      :
      (
        <Fragment>
          <button
            type="button"
            onClick={ this.onLoginActivate }>
            Login
          </button>

          <Dialog
            open={ this.props.Auth.active }>
            <FormLogin
              onSubmit={ this.onLogin }
              onCancel={ this.onLoginCancel }
              error={ this.props.Auth.error } />
          </Dialog>
        </Fragment>
      );
  }
}

export default Login;
