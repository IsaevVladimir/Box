import moment from 'moment';
import round from 'lodash/round';
import reverse from 'lodash/reverse';
import get from 'lodash/get';
import minBy from 'lodash/minBy';
import maxBy from 'lodash/maxBy';
import map from 'lodash/map';
import orderBy from 'lodash/orderBy';
import forEach from 'lodash/forEach';

const HORIZONTAL_POINTS_COUNT = 15;
const VERTICAL_POINTS_COUNT = 10;

const HORIZONTAL_PADDING = 30;
const VERTICAL_PADDING = 30;

const POINT_HEIGHT = 20;
const CHART_HEIGHT = VERTICAL_POINTS_COUNT * POINT_HEIGHT + (VERTICAL_PADDING * 2);

const calcInterval = (from, to) => {
  const unixFrom = moment(from).unix();
  const unixTo = moment(to).unix();
  const unixInterval = unixTo - unixFrom;
  return {unixFrom, unixTo, unixInterval};
}
const calcHorizontalPoints = (from, to, width, height) => {
  const {unixFrom, unixTo, unixInterval} = calcInterval(from, to);
  const unixIntervalOffset = round(unixInterval / (HORIZONTAL_POINTS_COUNT - 1));

  const intervals = [unixFrom];
  for (let i = 1; i <= HORIZONTAL_POINTS_COUNT - 2; i += 1) {
    intervals.push(unixFrom + unixIntervalOffset * i);
  }
  intervals.push(unixTo);

  const lineOffset = (width - (HORIZONTAL_PADDING * 2)) / (intervals.length - 1);

  // если интервал более суток - выводим дату и время
  // LT - 11:21 AM
  // lll - Feb 13, 2020 11:21 AM
  const momentFormat = unixInterval > 86400 ? 'lll' : 'LT';
  return intervals.map((e, index) => ({
    x1: lineOffset * index + HORIZONTAL_PADDING,
    y1: VERTICAL_PADDING,
    x2: lineOffset * index + HORIZONTAL_PADDING,
    y2: height - VERTICAL_PADDING,
    x: lineOffset * index + HORIZONTAL_PADDING,
    y: CHART_HEIGHT,
    text: moment
      .unix(e)
      .format(momentFormat)
  }));
}
const calcVerticalPoints = (min, max, width, height) => {
  const interval = max - min;
  const intervalOffset = round(interval / (VERTICAL_POINTS_COUNT - 1));

  const intervals = [min];
  for (let i = 1; i <= VERTICAL_POINTS_COUNT - 2; i += 1) {
    intervals.push(min + intervalOffset * i);
  }
  intervals.push(max);

  const lineOffset = (height - (VERTICAL_PADDING * 2)) / (intervals.length - 1);
  return reverse(intervals).map((e, index) => ({
    x1: HORIZONTAL_PADDING,
    y1: lineOffset * index + VERTICAL_PADDING,
    x2: width - HORIZONTAL_PADDING,
    y2: lineOffset * index + VERTICAL_PADDING,
    x: 0,
    y: lineOffset * index + VERTICAL_PADDING + 4,
    text: e
  }));
};

const normalizeSeries = (series) => {
  return map(series, (s, i) => {
      if (i !== series.length - 1) {
        const nextSeries = series[i + 1];
        s.x2 = nextSeries.x1;
        s.y2 = nextSeries.y1;
        return s;
      }
      return s;
    }
  );
}

const calcSeries = (dataSource, width, height, max, min, from, to) => {
  const verticalIntervalOffset = (height - (VERTICAL_PADDING * 2)) / (max - min);
  const horizontalIntervalOffset = (width - (HORIZONTAL_PADDING * 2)) / (moment(to).unix() - moment(from).unix());

  return map(dataSource, sourceItem => {
    const orderedSeries = orderBy(sourceItem.series, [x => moment(x.dt).unix()], ['asc'])
    const rawSeries = map(orderedSeries, (e) => {
      const avgX = (horizontalIntervalOffset * (moment(e.dt).unix() - moment(from).unix())) + HORIZONTAL_PADDING;
      const avgY = height - (verticalIntervalOffset * (e.value - min)) - VERTICAL_PADDING;
      return { x1: avgX, y1: avgY, x2: avgX, y2: avgY }
    });
    return {
      series: normalizeSeries(rawSeries),
      color: sourceItem.color,
      name: sourceItem.name,
      id: sourceItem.id
    };
  })
};

export const normalizeProps = (dataSource, width, height) => {
  const dtValues = [];
  const values = [];
  forEach(dataSource, x => {
    dtValues.push(...map(get(x, 'series', []), c => c.dt));
    values.push(...map(get(x, 'series', []), c => c.value));
  })

  const from = minBy(dtValues);
  const to = maxBy(dtValues);
  const min = minBy(values);
  const max = maxBy(values);

  const verticalPoints = calcVerticalPoints(min, max, width, height);
  const horizontalPoints = calcHorizontalPoints(from, to, width, height);
  const calculatedSeries = calcSeries(dataSource, width, height, max, min, from, to);
  return { horizontalPoints, verticalPoints, dataSource: calculatedSeries, height: CHART_HEIGHT };
};
