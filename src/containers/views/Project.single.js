import React, { Component } from 'react';
import t from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from 'src/actions';
import { augmentComponent } from 'react-augment';
import { withNavigation } from 'src/lib/decorators';
import classNames from 'classnames';
import { date } from 'src/lib/utils';
import { routeCodes } from 'src/routes';
import { ProjectItem } from 'src/components/project';

import IconBack from 'material-ui/svg-icons/navigation/arrow-back';

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

    constructor (props) {
      super(props);
      this.state = { active: false };
    }

    componentDidMount = () => setTimeout(() => this.setState({ active: true }), 0)

    onBack = () => this.setState({ active: false }, () => {
      this.props.actions.setTransition({ active: false });
      return this.props.navigateDebounce(routeCodes.PROJECTS, null, 475);
    })

    /**
     * @description
     * Get project duration in months
     *
     * @param  {Object} project
     * @return {Number}
     * @private
     */
    getDuration = project => date.getDuration(project.startTime, project.endTime)

    render () {
      const { id, data } = this.props.location.state;
      const classes = classNames({
        'h__transition': true,
        'h__transition--project': true,
        'active': this.state.active
      });

      return (
        <div className={ classes } style={ this.props.position }>
          <span className="h__transition-back" onClick={ this.onBack } >
            <IconBack />
          </span>

          <div className="h__transition-inner">
            <ProjectItem
              transition={ true }
              id={ id }
              project={ data } />

            <div className="h__project__months">
              {
                this.getDuration(data) > 1 ?
                  `${date.getMonthName(data.startTime)} ${date.getYear(data.startTime)} - ${date.getMonthName(data.endTime)} ${date.getYear(data.endTime)}` :
                  `${date.getMonthName(data.startTime)}`
              }
            </div>

            <div className="h__project__duration">
              { this.getDuration(data) }
              <div>
                { `month${this.getDuration(data) > 1 && 's' || ''}` }
              </div>
            </div>
          </div>
        </div>
      );
    }
}
