import React, { Component } from 'react';
import t from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from 'src/actions';
import * as types from 'src/actions/types';

@connect(state => ({
  Sidebar: state.sidebarReducer[types.SIDEBAR]
}), dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch)
}))
export default class Header extends Component {

    static propTypes = {
      actions: t.object.isRequired,
      Sidebar: t.object.isRequired
    }

    onSidebarToggle = () => this.props.actions.setSidebar({ active: !this.props.Sidebar.active })

    render () {
      return (
        <div className="h__header">
          <button onClick={ this.onSidebarToggle }>Sidebar</button>
          <button>Login</button>
        </div>
      );
    }
}
