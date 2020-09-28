import React, {useContext} from 'react';
import LinearChartContext from './LinearChartContext';

import { calcSections } from './utils';

export default () => {
  const {from, to, width, height, sectionsCount, verticalPadding, sectionHeight} = useContext(LinearChartContext);

  const sections = calcSections(10, 300, sectionsCount);
  const lineOffset = (height - (verticalPadding * 2)) / (sections.length - 1);

  return (
    <svg>
      {sections.map((line, index) => {
        return (
          <line
            key={index.toString(36)}
            x1={0}
            y1={lineOffset * index + verticalPadding}
            x2={20}
            y2={lineOffset * index + verticalPadding}
            style={{stroke: '#000', strokeWidth: 1}}
            shapeRendering="crispEdges"
          />
        );
      })}
    </svg>
  );
};
