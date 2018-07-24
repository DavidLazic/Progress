import React, { Component } from 'react';
import t from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from 'src/actions';
import { augmentComponent } from 'react-augment';
import { useAdmin } from 'src/lib/decorators/socket';
import refs from 'src/constants/refs';
import * as types from 'src/actions/types';

import {
  AdminCreate,
  AdminProjects
} from 'src/components/admin';

@connect(state => ({
  Projects: state.adminReducer[types.ADMIN_PROJECTS]
}), dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch)
}))
@augmentComponent([
  useAdmin
], {
  socket: { refs: [refs.PROJECTS] }
})
class Admin extends Component {

  static propTypes = {
    Projects: t.object,
    onApply: t.func.isRequired
  }

  static defaultProps = {
    Projects: null
  }

  render () {
    return (
      <article className="h__article h__article--admin">
        <AdminCreate onApply={ this.props.onApply } />

        <AdminProjects
          Projects={ this.props.Projects }
          onApply={ this.props.onApply } />
      </article>
    );
  }
}

export default Admin;
