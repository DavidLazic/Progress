import React, { Component, Fragment } from 'react';
import t from 'prop-types';
import { Moment } from 'src/lib/utils';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import DatePicker from 'material-ui-pickers/DatePicker';

export default class Dates extends Component {

  static propTypes = {
    name: t.string.isRequired,
    index: t.number.isRequired,
    frame: t.object.isRequired,
    onChange: t.func.isRequired
  }

  onChange = type => selected =>
    this.props.onChange({
      ...this.props.frame,
      index: this.props.index,
      [type]: Moment.toDate(selected),
      period: Moment.getYear(selected)
    })

  render () {
    const { name, frame } = this.props;

    return (
      <Fragment>
        <div className="calendar">
          <div className="calendar__label">Start Date</div>
          <MuiPickersUtilsProvider utils={ MomentUtils }>
            <DatePicker
              name={ name }
              category="start"
              value={ new Date(frame.start) }
              onChange={ this.onChange('start') } />
          </MuiPickersUtilsProvider>
        </div>

        <div className="calendar">
          <div className="calendar__label">End Date</div>
          <MuiPickersUtilsProvider utils={ MomentUtils }>
            <DatePicker
              name={ name }
              category="end"
              value={ new Date(frame.end) }
              onChange={ this.onChange('end') } />
          </MuiPickersUtilsProvider>
        </div>
        <div className="calendar__divider"></div>
      </Fragment>
    );
  }
}
