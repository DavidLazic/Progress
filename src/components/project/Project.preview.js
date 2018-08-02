import React, { Component } from 'react';
import t from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from 'src/actions';
import { augmentComponent } from 'react-augment';
import { useTransition, useNavigation } from 'src/lib/decorators';
import { routeCodes } from 'src/routes';

@connect(state => state, dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch)
}))
@augmentComponent([
  useNavigation,
  useTransition
])
class ProjectPreview extends Component {

  static propTypes = {
    actions: t.object.isRequired,
    onTransition: t.func.isRequired,

    id: t.string.isRequired,
    project: t.object.isRequired
  }

  onSelect = () => {
    this.props.actions.setTransition({ active: true, index: this.props.project.index });

    this.props.onTransition(`${routeCodes.PROJECTS}/${this.props.id}`, {
      id: this.props.id,
      data: this.props.project
    });
  }

  render () {
    const { project } = this.props;

    return (
      <div
        className="h__project__preview"
        onClick={ this.onSelect }>
        { project.title }
      </div>
    );
  }
}

export default ProjectPreview;
