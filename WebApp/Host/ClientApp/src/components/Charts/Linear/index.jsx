import React from 'react';
import maxBy from 'lodash/maxBy';
import minBy from 'lodash/minBy';
import get from 'lodash/get';
import moment from 'moment';
import useMeasure from 'react-use/lib/useMeasure';

import LinearChartContext from './LinearChartContext'

import HorizontalLayout from './HorizontalLayout';
import VerticalLayout from './VerticalLayout';

const POINTS_COUNT = 20;
const SECTIONS_COUNT = 10;

const HORIZONTAL_PADDING = 30;
const FOOTER_HEIGHT = 30;

const VERTICAL_PADDING = 30;
const SECTION_HEIGHT = 30;

const CHART_HEIGHT = (SECTIONS_COUNT * SECTION_HEIGHT) + (VERTICAL_PADDING * 2) + FOOTER_HEIGHT;

export default ({ dataSource }) => {
  const from = get(minBy(dataSource, x => x.dt), 'dt', moment());
  const to = get(maxBy(dataSource, x => x.dt), 'dt', moment());
  const max = get(maxBy(dataSource, x => x.value), 'value', 10);
  const min = get(minBy(dataSource, x => x.value), 'value', 0);

  const [ref, { width, height }] = useMeasure();

  const contextValue = { from, to, max, min, width, height, pointsCount: POINTS_COUNT, horizontalPadding: HORIZONTAL_PADDING,
    sectionsCount: SECTIONS_COUNT, verticalPadding: VERTICAL_PADDING, sectionHeight: SECTION_HEIGHT,
    footerHeight: FOOTER_HEIGHT
  };

  return (
    <div ref={ref}>
      <LinearChartContext.Provider value={contextValue}>
        <svg key='linearChart' style={{ width: `${width}px`, height: `${CHART_HEIGHT}px` }}>
          <HorizontalLayout />
          <VerticalLayout />
        </svg>
      </LinearChartContext.Provider>
    </div>
  );
};
