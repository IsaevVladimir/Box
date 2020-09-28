import React, {useContext} from 'react';
import {calcPoints} from './utils';

import LinearChartContext from './LinearChartContext';

export default () => {
  const {from, to, width, height, pointsCount, horizontalPadding} = useContext(LinearChartContext);

  const points = calcPoints(from, to, pointsCount);
  const lineOffset = (width - (horizontalPadding * 2)) / (points.length - 1);

  return (
    <svg>
      {points.map((line, index) => {
        return (
          <line
            key={index.toString(36)}
            x1={lineOffset * index + horizontalPadding}
            y1={0}
            x2={lineOffset * index + horizontalPadding}
            y2={height}
            style={{stroke: '#f0f0f0', strokeWidth: 1}}
            shapeRendering="crispEdges"
          />
        );
      })}
    </svg>
  );
}
