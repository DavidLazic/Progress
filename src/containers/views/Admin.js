import React, { Component } from 'react';
import t from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from 'src/actions';
import { augmentComponent } from 'react-augment';
import { useSocket } from 'src/lib/decorators';
import refs from 'src/constants/refs';
import * as types from 'src/actions/types';

import {
  AdminCreate,
  AdminProjects
} from 'src/components/admin';

@connect(state => ({
  Projects: state.projectsReducer[types.PROJECTS]
}), dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch)
}))
@augmentComponent([
  useSocket
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
      <article className="h__article">
        <AdminCreate onApply={ this.props.onApply } />

        <AdminProjects
          Projects={ this.props.Projects }
          onApply={ this.props.onApply } />
      </article>
    );
  }
}

export default Admin;
