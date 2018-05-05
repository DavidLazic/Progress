import React, { Component } from 'react';
import t from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from 'src/actions';
import { augmentComponent } from 'react-augment';
import { withSocket } from 'src/lib/decorators';
import * as types from 'src/actions/types';

import { FormLogin } from 'src/components/form';
import Dialog from 'material-ui/Dialog';

@augmentComponent([
  withSocket
])
@connect(state => ({
  Auth: state.authReducer[types.AUTH]
}), dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch)
}))
export default class Login extends Component {

    static propTypes = {
      actions: t.object.isRequired,
      Auth: t.object.isRequired,
      onLogin: t.func.isRequired
    }

    onLogin = props => {
      this.props.actions.setAuth({ active: false });
      return this.props.onLogin(props);
    }

    onCancel = () => this.props.actions.setAuth({ active: false })

    render () {
      return (
        <Dialog
          open={ this.props.Auth.active }>
          <FormLogin
            onSubmit={ this.onLogin }
            onCancel={ this.onCancel }
            error={ this.props.Auth.error } />
        </Dialog>
      );
    }
}
