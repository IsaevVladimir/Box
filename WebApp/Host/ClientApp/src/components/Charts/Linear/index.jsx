import React from 'react';
import moment from 'moment';
import useMeasure from 'react-use/lib/useMeasure';

import LinearChartContext from './LinearChartContext'

import Footer from './Footer'
import Substrate from './Substrate';
import HorizontalLayout from './HorizontalLayout';

const POINTS_COUNT = 20;
const SECTIONS_COUNT = 10;

const HORIZONTAL_PADDING = 30;
const FOOTER_HEIGHT = 30;

const VERTICAL_PADDING = 30;
const SECTION_HEIGHT = 20;

const CHART_HEIGHT = 200;

export default ({ from = moment().add(-1, 'h'), to = moment() }) => {

  const [ref, { width, height }] = useMeasure();

  const contextValue = { from, to, width, height, pointsCount: POINTS_COUNT, horizontalPadding: HORIZONTAL_PADDING,
    sectionsCount: SECTIONS_COUNT, verticalPadding: VERTICAL_PADDING, sectionHeight: SECTION_HEIGHT
  };

  return (
    <div ref={ref}>
      <LinearChartContext.Provider value={contextValue}>
        <svg key='linearChart' style={{ width: `${width}px`, height: `${CHART_HEIGHT}px` }}>
          <HorizontalLayout />
          <Substrate />
          <Footer footerHeight={FOOTER_HEIGHT} />
        </svg>
      </LinearChartContext.Provider>
    </div>
  );
};
