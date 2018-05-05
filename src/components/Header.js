import React, { Component } from 'react';
import t from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from 'src/actions';
import { augmentComponent } from 'react-augment';
import { withSocket } from 'src/lib/decorators';
import * as types from 'src/actions/types';

import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import Menu from 'material-ui/svg-icons/navigation/menu';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

@augmentComponent([
  withSocket
])
@connect(state => ({
  Sidebar: state.sidebarReducer[types.SIDEBAR],
  Auth: state.authReducer[types.AUTH]
}), dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch)
}))
export default class Header extends Component {

    static propTypes = {
      actions: t.object.isRequired,
      Sidebar: t.object.isRequired,
      Auth: t.object.isRequired,
      onLogout: t.func.isRequired
    }

    onSidebarToggle = () => this.props.actions.setSidebar({ active: !this.props.Sidebar.active })

    onLogin = () => !this.props.Auth.active && this.props.actions.setAuth({ active: true })

    render () {
      return (
        <div className="h__header">

          <IconButton onClick={ this.onSidebarToggle }>
            <Menu className="h__icon h__icon--menu" />
          </IconButton>

          {
            this.props.Auth.data
              ? (
                <IconMenu
                  iconButtonElement={ <IconButton><MoreVertIcon /></IconButton> }
                  targetOrigin={ {horizontal: 'right', vertical: 'top'} }
                  anchorOrigin={ {horizontal: 'right', vertical: 'top'} }>
                  <MenuItem primaryText={ this.props.Auth.data.email } disabled />
                  <Divider />
                  <MenuItem onClick={ this.props.onLogout } primaryText="Sign out" />
                </IconMenu>
              )
              : <button className="h__header__btn" onClick={ this.onLogin }>Login</button>
          }
        </div>
      );
    }
}
