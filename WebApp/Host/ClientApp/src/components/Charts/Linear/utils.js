import moment from 'moment';
import round from 'lodash/round';

export const calcInterval = (from, to) => {
  const unixFrom = moment(from).unix();
  const unixTo = moment(to).unix();
  const unixInterval = unixTo - unixFrom;
  return { unixFrom, unixTo, unixInterval };
}
export const calcPoints = (from, to, count) => {
  const { unixFrom, unixTo, unixInterval } = calcInterval(from, to);
  const unixIntervalOffset = round(unixInterval / (count - 1));

  const intervals = [unixFrom];
  for (let i = 1; i <= count - 2; i += 1) {
    intervals.push(unixFrom + unixIntervalOffset * i);
  }
  intervals.push(unixTo);

  // если интервал более суток - выводим дату и время
  // LT - 11:21 AM
  // lll - Feb 13, 2020 11:21 AM
  const momentFormat = unixInterval > 86400 ? 'lll' : 'LT';

  return intervals.map(e => ({
    time: e,
    text: moment
      .unix(e)
      .format(momentFormat),
  }));
}

export const calcSections = (min, max, count) => {
  const interval = max - min;
  const intervalOffset = round(interval / (count - 1));

  const intervals = [min];
  for (let i = 1; i <= count - 2; i += 1) {
    intervals.push(min + intervalOffset * i);
  }
  intervals.push(max);

  return intervals;
};
