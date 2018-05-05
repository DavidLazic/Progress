import React, { Fragment } from 'react';
import t from 'prop-types';
import { date } from 'src/lib/utils';

import DatePicker from 'material-ui/DatePicker';

const Dates = ({ name, index, frame, onChange }) => (
  <Fragment>
    <div className="calendar">
      <div className="calendar__label">Start Date</div>
      <DatePicker
        name={ name }
        category="start"
        value={ new Date(frame.start) }
        onChange={ (none, selected) =>
          onChange({
            ...frame,
            index,
            start: date.toDate(selected),
            period: date.getYear(selected)
          })
        } />
    </div>

    <div className="calendar">
      <div className="calendar__label">End Date</div>
      <DatePicker
        name={ name }
        category="end"
        value={ new Date(frame.end) }
        onChange={ (none, selected) =>
          onChange({
            ...frame,
            index,
            end: date.toDate(selected),
            period: date.getYear(selected)
          })
        } />
    </div>
    <div className="calendar__divider"></div>
  </Fragment>
);

Dates.propTypes = {
  name: t.string.isRequired,
  index: t.number.isRequired,
  frame: t.object.isRequired,
  onChange: t.func.isRequired
};

export default Dates;
