import React, { Component, Fragment } from 'react';
import t from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from 'src/actions';
import { augmentComponent } from 'react-augment';
import { withNavigation } from 'src/lib/decorators';
import { routeCodes } from 'src/routes';

import { ProjectItem } from 'src/components/project';
import { AnimateGrow, AnimateDetails } from 'src/components/animate';

@augmentComponent([
  withNavigation
])
@connect(state => state, dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch)
}))
export default class Project extends Component {

    static propTypes = {
      actions: t.object.isRequired,
      location: t.object.isRequired,
      position: t.object,
      navigateDebounce: t.func
    }

    static defaultProps = {
      navigateDebounce: null,
      position: null
    }

    state = { active: false }

    componentDidMount = () =>
      setTimeout(() =>
        this.setState({ active: true }), 0)

    onBack = () =>
      this.setState({ active: false }, () => {
        this.props.actions.setTransition({ active: false, index: null });
        return this.props.navigateDebounce(routeCodes.PROJECTS, null, 275);
      })

    render () {
      const { id, data } = this.props.location.state;

      return (
        <Fragment>
          <AnimateGrow
            active={ this.state.active }
            position={ this.props.position } />

          <AnimateDetails
            active={ this.state.active }
            position={ this.props.position }
            onBack={ this.onBack } >
            <ProjectItem
              id={ id }
              project={ data } />
          </AnimateDetails>
        </Fragment>
      );
    }
}
