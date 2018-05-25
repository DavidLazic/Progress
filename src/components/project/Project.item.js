import React, { Component } from 'react';
import t from 'prop-types';
import { augmentComponent } from 'react-augment';
import { withNavigation, withTransition } from 'src/lib/decorators';
import { date } from 'src/lib/utils';

@augmentComponent([
  withNavigation,
  withTransition
])
export default class ProjectItem extends Component {

    static propTypes = {
      project: t.object.isRequired
    }

    getDuration = project =>
      date.getDuration(project.startTime, project.endTime)

    render () {
      const { project } = this.props;

      return (
        <div
          className="h__project"
          onClick={ this.onSelect }>

          <div className="h__project__title">
            <span>
              { project.title }
            </span>
            <div className="h__project__border"></div>
          </div>

          <div className="h__project__months">
            {
              this.getDuration(project) > 1
                ? `${date.getMonthName(project.startTime)} ${date.getYear(project.startTime)} - ${date.getMonthName(project.endTime)} ${date.getYear(project.endTime)}`
                : `${date.getMonthName(project.startTime)}`
            }
          </div>

          <div className="h__project__duration">
            { this.getDuration(project) }
            <div>
              { `month${this.getDuration(project) > 1 && 's' || ''}` }
            </div>
          </div>
        </div>
      );
    }
}
