import React, { useMemo } from 'react';
import useMeasure from 'react-use/lib/useMeasure';

import LinearChartContext from './LinearChartContext'
import { normalizeProps } from './utils'

import HorizontalLayout from './HorizontalLayout';
import VerticalLayout from './VerticalLayout';
import Series from './Series';

export default ({ dataSource }) => {
  const [ref, { width, height }] = useMeasure();

  const props = useMemo(() => {
    return normalizeProps(dataSource, width, height);
  }, [dataSource, width, height])

  return (
    <div ref={ref}>
      <LinearChartContext.Provider value={props}>
        <svg key='linearChart' style={{ width: '100%', height: `${props.height}px`, fontSize: 12 }}>
          <HorizontalLayout />
          <VerticalLayout />
          <Series />
        </svg>
      </LinearChartContext.Provider>
    </div>
  );
};
