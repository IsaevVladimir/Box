import React, {useContext} from 'react';
import LinearChartContext from './LinearChartContext';

import { calcSections } from './utils';

export default () => {
  const {width, height, max, min, sectionsCount, horizontalPadding, sectionHeight} = useContext(LinearChartContext);

  const sections = calcSections(min, max, sectionsCount);
  const lineOffset = (height - 30 - (horizontalPadding * 1)) / (sections.length - 1);

  return (
    <svg>
      {sections.map((line, index) => {
        return (
          <line
            key={index.toString(36)}
            x1={0}
            y1={lineOffset * index + horizontalPadding}
            x2={width}
            y2={lineOffset * index + horizontalPadding}
            style={{stroke: '#f0f0f0', strokeWidth: 1, strokeDasharray: '4, 1'}}
            shapeRendering="crispEdges"
          />
        );
      })}

      {sections.map((val, index) => {
        return (
          <text
            key={index.toString(36)}
            x={0}
            y={lineOffset * index + horizontalPadding + 4}
            fill='#000'
            style={{pointerEvents: 'none', userSelect: 'none'}}
          >
            {val}
          </text>
        );
      })}
    </svg>
  );
};
