import React, { Component } from 'react';
import t from 'prop-types';
import { augmentComponent } from 'react-augment';
import { useNavigation, useTransition } from 'src/lib/decorators';
import { Moment } from 'src/lib/utils';

@augmentComponent([
  useNavigation,
  useTransition
])
class ProjectItem extends Component {

  static propTypes = {
    project: t.object.isRequired
  }

  getDuration = project =>
    Moment.getDuration(project.startTime, project.endTime)

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
              ? `${Moment.getMonthName(project.startTime)} ${Moment.getYear(project.startTime)} - ${Moment.getMonthName(project.endTime)} ${Moment.getYear(project.endTime)}`
              : `${Moment.getMonthName(project.startTime)}`
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

export default ProjectItem;
