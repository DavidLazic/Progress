import moment from 'moment';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const date = {
  toDate: selected => moment(selected).startOf('month').valueOf(),
  fromDate: selected => moment(selected),
  getYear: selected => moment(selected).year(),
  getMonth: selected => moment(selected).month(),
  getMonthName: selected => months[date.getMonth(selected)],
  getDuration: (startTime, endTime) => {
    const start = date.fromDate(startTime);
    const end = date.fromDate(endTime);
    return end.diff(start, 'months', true) + 1;
  },
  format: day => moment(day).format('MM/YY')
};
