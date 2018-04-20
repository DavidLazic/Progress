import React, { Component } from 'react';
import t from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from 'src/actions';
import * as types from 'src/actions/types';
import FormLogin from 'src/components/form/Form.login';

@connect(state => ({
  Auth: state.authReducer[types.AUTH]
}), dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch)
}))
export default class Login extends Component {

    static propTypes = {
      actions: t.object.isRequired,
      Auth: t.object
    }

    static defaultProps = {
      Auth: {}
    }

    onLogin = props => this.props.actions.login(props);

    render () {
      return (
        <article
          className="h__article h__article--login">
          <FormLogin
            onSubmit={ this.onLogin }
            error={ this.props.Auth.error } />
        </article>
      );
    }
}
