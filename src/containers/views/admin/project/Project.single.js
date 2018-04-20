import React, { Component } from 'react';
import t from 'prop-types';
import { augmentComponent } from 'react-augment';
import HOC from 'src/lib/decorators';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from 'src/actions';
import * as types from 'src/actions/types';
import FormProject from 'src/components/form/Form.project';

@connect(state => ({
  Projects: state.projectsReducer[types.PROJECTS]
}), dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch)
}))
@augmentComponent([
  HOC.useNavigation
])
export default class AdminProject extends Component {

    static propTypes = {
      location: t.object.isRequired,
      actions: t.object.isRequired,
      Projects: t.object
    }

    static defaultProps = {
      Projects: {}
    }

    /**
     * @description
     * On project form submit fn
     * Create or update project based on "location.state" property
     * through which an already existing project is being forwarded
     *
     * @return {Function}
     * @private
     */
    onSubmit = form =>
      this.props.location.state ?
        this.props.actions.updateProject(form) :
        this.props.actions.createProject(form)

    render () {
      return (
        <article className="h__article h__article--admin">
          <FormProject
            prepopulate={ this.props.location.state || null }
            onSubmit={ this.onSubmit }
            error={ this.props.Projects.error } />
        </article>
      );
    }
}
