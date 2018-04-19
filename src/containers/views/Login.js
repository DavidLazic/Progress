import React, { Component } from 'react';
import t from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from 'actions';
import * as types from 'actions/types';
import muiThemeable from 'material-ui/styles/muiThemeable';
import FormLogin from 'components/form/Form.login';

@connect(state => ({
    Auth: state.authReducer[types.AUTH]
}), dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch)
}))
@muiThemeable()
export default class Login extends Component {

    static propTypes = {
        actions: t.object.isRequired,
        muiTheme: t.object.isRequired,
        Auth: t.object
    }

    static defaultProps = {
        Auth: {}
    }

    onLogin = props => this.props.actions.login(props);

    render () {
        return (
            <article
                className="h__article h__article--login"
                style={ { backgroundColor: this.props.muiTheme.palette.canvasColor } } >
                <FormLogin
                    onSubmit={ this.onLogin }
                    error={ this.props.Auth.error } />
            </article>
        );
    }
}
