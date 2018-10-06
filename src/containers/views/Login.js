import React, { Component } from 'react';
import t from 'prop-types';
import { connect } from 'react-redux';
import * as types from 'src/actions/types';
import firebase from 'src/firebase';
import { routes } from 'src/routes';
import { augmentComponent } from 'react-augment';
import { useNavigation } from 'src/lib/decorators';
import { FormLogin } from 'src/components/form';

@connect(state => ({
  Auth: state.authReducer[types.AUTH]
}))
@augmentComponent([
  useNavigation
])
class Login extends Component {

  static propTypes = {
    Auth: t.object.isRequired,
    navigate: t.func.isRequired
  }

  onLogin = ({ email, password }) => {
    this.props.navigate(routes.ADMIN_PROJECTS);
    firebase.auth().signInWithEmailAndPassword(email, password);
  }

  render () {
    return (
      <article className="h__section h__section--login">
        <FormLogin
          onSubmit={ this.onLogin }
          error={ this.props.Auth.error } />
      </article>
    );
  }
}

export default Login;
