import React, { Component, Fragment } from 'react';
import t from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from 'src/actions';
import firebase from 'src/firebase';

import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import IconLogout from '@material-ui/icons/PowerSettingsNew';
import IconLogin from '@material-ui/icons/Fingerprint';

import { FormLogin } from 'src/components/form';

const styles = () => ({
  button: {
    color: '#b6b6b7'
  }
});

@connect(state => state, dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch)
}))
class Login extends Component {

  static propTypes = {
    classes: t.object.isRequired,
    actions: t.object.isRequired,
    Auth: t.object.isRequired
  }

  onLogin = ({ email, password }) => {
    this.props.actions.setAuth({ active: false });
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  onLogout = () =>
    firebase.auth().signOut()

  onLoginActivate = () =>
    !this.props.Auth.active
    && this.props.actions.setAuth({ active: true })

  onLoginCancel = () =>
    this.props.actions.setAuth({ active: false })

  render () {
    const { classes } = this.props;

    return this.props.Auth.data
      ? (
        <div
          className="h__navbar__button"
          onClick={ this.onLogout }>
          <IconLogout className={ classes.button } />
          <span>Logout</span>
        </div>
      )
      : (
        <Fragment>
          <div
            className="h__navbar__button"
            onClick={ this.onLoginActivate }>
            <IconLogin className={ classes.button } />
            <span>Login</span>
          </div>

          <Dialog open={ this.props.Auth.active }>
            <FormLogin
              open={ this.props.Auth.active }
              onSubmit={ this.onLogin }
              onCancel={ this.onLoginCancel }
              error={ this.props.Auth.error } />
          </Dialog>
        </Fragment>
      );
  }
}

export default withStyles(styles)(Login);
