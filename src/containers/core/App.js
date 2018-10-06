import React, { Component } from 'react';
import t from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from 'src/actions';
import { withRouter } from 'react-router';
import * as types from 'src/actions/types';
import firebase from 'src/firebase';
import { augmentComponent } from 'react-augment';
import { useNavigation } from 'src/lib/decorators';
import { routes } from 'src/routes';
import { Navbar } from 'src/components';

@connect(state => ({
  Auth: state.authReducer[types.AUTH]
}), dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch)
}))
@augmentComponent([
  useNavigation
])
class App extends Component {

  static propTypes = {
    actions: t.object.isRequired,
    navigate: t.func.isRequired,
    children: t.object,
    Auth: t.object.isRequired
  }

  static defaultProps = {
    children: null
  }

  componentDidMount () {
    firebase.auth().onAuthStateChanged(user =>
      this.props.actions.setAuth({ data: user }));
  }

  componentWillReceiveProps (props) {
    if ((props.Auth.data !== this.props.Auth.data)) {
      return !props.Auth.data
        ? props.navigate(routes.ROOT)
        : props.navigate(routes.ADMIN_PROJECTS);
    }
  }

  render () {
    const { data: user } = this.props.Auth;

    return (
      <div className="h__section">
        {
          user
          && (
            <Navbar Auth={ this.props.Auth } />
          )
        }

        { this.props.children }
      </div>
    );
  }
}

export default withRouter(App);
