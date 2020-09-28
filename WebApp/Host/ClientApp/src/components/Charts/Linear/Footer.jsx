import React, {useContext} from 'react';
import moment from 'moment';
import round from 'lodash/round';
import {calcPoints} from './utils'

import LinearChartContext from './LinearChartContext';

export default ({footerHeight}) => {

  const {from, to, width, height, pointsCount, horizontalPadding} = useContext(LinearChartContext);

  const points = calcPoints(from, to, pointsCount);
  const lineOffset = (width - (horizontalPadding * 2)) / (points.length - 1);

  return (
    <svg>
      <rect
        x={0}
        y={height - footerHeight}
        width='100%'
        height={`${footerHeight}px`}
        style={{fill: '#f2f2f2'}}
      />
      {points.map((line, index) => {
        return (
          <text
            key={index.toString(36)}
            textAnchor='middle'
            x={lineOffset * index + horizontalPadding}
            y={height - footerHeight + 20}
            fill='#000'
            style={{pointerEvents: 'none', userSelect: 'none'}}
          >
            {line.text}
          </text>
        );
      })}
    </svg>
  );
};
