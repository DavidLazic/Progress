import React, { Component } from 'react';
import t from 'prop-types';
import { augmentComponent } from 'react-augment';
import { withNavigation, withTransition } from 'src/lib/decorators';
import { routeCodes } from 'src/routes';
import { date } from 'src/lib/utils';

@augmentComponent([
  withNavigation,
  withTransition
], {
  transition: { className: 'h__list-item h__list-item--projects' }
})
export default class ProjectItem extends Component {

    static propTypes = {
      id: t.string.isRequired,
      project: t.object.isRequired,
      modifierClass: t.string,
      transition: t.bool,
      onChange: t.func.isRequired
    }

    static defaultProps = {
      modifierClass: '',
      transition: false
    }

    /**
     * @description
     * Get project duration in months
     *
     * @return {Number}
     * @private
     */
    getDuration = () => date.getDuration(this.props.project.startTime, this.props.project.endTime)

    /**
     * @description
     * On item select fn
     * Create dynamic route and forward item data
     *
     * @return {Function}
     * @private
     */
    onSelect = () => !this.props.transition &&
        this.props.onChange(`${routeCodes.PROJECTS}/${this.props.id}`, {
          id: this.props.id,
          data: this.props.project
        })

    render () {
      const { project } = this.props;

      return (
        <div
          className={ `h__project ${this.props.modifierClass}` }
          onClick={ this.onSelect }>

          <div className="h__project__title">
            <span>
              { project.name }
            </span>
            <div className="h__project__border"></div>
          </div>
        </div>
      );
    }
}
