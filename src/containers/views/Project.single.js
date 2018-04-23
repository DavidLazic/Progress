import React, { Component } from 'react';
import t from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from 'src/actions';
import { augmentComponent } from 'react-augment';
import { withNavigation } from 'src/lib/decorators';
import classNames from 'classnames';
import Utils from 'src/lib/utils';
import { routeCodes } from 'src/routes';
import { ProjectItem } from 'src/components/project';
// import IconBack from 'material-ui/svg-icons/navigation/arrow-back';

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
      this.props.actions.setModal({ active: false });
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
    getDuration = project => Utils.date.getDuration(project.startTime, project.endTime)

    render () {
      const project = this.props.location.state.data;
      const classes = classNames({
        'h__modal': true,
        'h__modal--project': true,
        'h__modal--even': project.index % 2 !== 0,
        'active': this.state.active
      });

      return (
        <div className={ classes } style={ this.props.position }>
          <span className="h__modal-back" onClick={ this.onBack } >
            {/* <IconBack /> */}
          </span>

          <div className="h__modal-inner">
            <ProjectItem
              modal={ true }
              project={ project } />

            <div className="h__project__months">
              {
                this.getDuration(project) > 1 ?
                  `${Utils.date.getMonthName(project.startTime)} ${Utils.date.getYear(project.startTime)} - ${Utils.date.getMonthName(project.endTime)} ${Utils.date.getYear(project.endTime)}` :
                  `${Utils.date.getMonthName(project.startTime)}`
              }
            </div>

            <div className="h__project__duration">
              { this.getDuration(project) }
              <div>
                { `month${this.getDuration(project) > 1 && 's' || ''}` }
              </div>
            </div>
          </div>
        </div>
      );
    }
}
