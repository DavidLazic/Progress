import moment from 'moment';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export class Moment {

  static toDate = selected => moment(selected).startOf('month').valueOf()

  static fromDate = selected => moment(selected)

  static getYear = selected => moment(selected).year()

  static getMonth = selected => moment(selected).month()

  static getMonthName = selected => months[Moment.getMonth(selected)]

  static getDuration = (startTime, endTime) => {
    const start = Moment.fromDate(startTime);
    const end = Moment.fromDate(endTime);
    return end.diff(start, 'months', true) + 1;
  }

  static format = day => moment(day).format('MMM YYYY')
}

