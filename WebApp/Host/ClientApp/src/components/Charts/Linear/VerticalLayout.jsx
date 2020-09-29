import React, {useContext} from 'react';
import {calcPoints} from './utils'

import LinearChartContext from './LinearChartContext';

export default () => {

  const {from, to, width, height, pointsCount, verticalPadding, footerHeight} = useContext(LinearChartContext);

  const points = calcPoints(from, to, pointsCount);
  const lineOffset = (width - (verticalPadding * 2)) / (points.length - 1);

  return (
    <svg>
      {points.map((line, index) => {
        return (
          <line
            key={index.toString(36)}
            x1={lineOffset * index + verticalPadding}
            y1={0}
            x2={lineOffset * index + verticalPadding}
            y2={height}
            style={{stroke: '#f0f0f0', strokeWidth: 1}}
            shapeRendering="crispEdges"
          />
        );
      })}

      {points.map((line, index) => {
        return (
          <text
            key={index.toString(36)}
            textAnchor='middle'
            x={lineOffset * index + verticalPadding}
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
