import moment from 'moment';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const date = {
  toUnix: selected => moment(selected, 'MM/YY').unix().valueOf(),
  fromUnix: selected => moment.unix(selected),
  getYear: selected => moment.unix(selected).year(),
  getMonth: selected => moment.unix(selected).month(),
  getMonthName: selected => months[date.getMonth(selected)],
  getDuration: (startTime, endTime) => {
    const start = date.fromUnix(startTime);
    const end = date.fromUnix(endTime);
    return end.diff(start, 'months', true) + 1;
  },
  format: day => moment(day).format('MM/YY')
};
