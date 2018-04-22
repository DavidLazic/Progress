import React, { Component } from 'react';
import t from 'prop-types';
import { augmentComponent } from 'react-augment';
import { withNavigation, withTransition } from 'src/lib/decorators';
import { routeCodes } from 'src/routes';
import Utils from 'src/lib/utils';

@augmentComponent([
  withNavigation,
  withTransition
], {
  transition: { className: 'h__list-item h__list-item--projects' }
})
export default class ProjectItem extends Component {

    static propTypes = {
      project: t.object.isRequired,
      modifierClass: t.string,
      modal: t.bool,
      onChange: t.func.isRequired
    }

    static defaultProps = {
      modifierClass: '',
      modal: false
    }

    /**
     * @description
     * Get project duration in months
     *
     * @return {Number}
     * @private
     */
    getDuration = () => Utils.date.getDuration(this.props.project.startTime, this.props.project.endTime)

    /**
     * @description
     * On item select fn
     * Create dynamic route and forward item data
     *
     * @return {Function}
     * @private
     */
    onSelect = () => !this.props.modal &&
        this.props.onChange(`${routeCodes.PROJECTS}/${this.props.project.id}`, {
          data: this.props.project
        })

    render () {
      const { project } = this.props;

      return (
        <div
          className={ `h__project ${this.props.modifierClass}` }
          onClick={ this.onSelect }
          data-letter={ project.name.charAt(0) }>

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
