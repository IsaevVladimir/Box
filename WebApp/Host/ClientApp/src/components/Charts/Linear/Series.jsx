import React, {useContext} from 'react';

import LinearChartContext from './LinearChartContext';

export default () => {

  const { series } = useContext(LinearChartContext);

  return (
    <svg>
      {series.map((line, index) => {
        return (
          <line
            key={index.toString(36)}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            style={{stroke: 'red', strokeWidth: 1}}
            shapeRendering="crispEdges"
          />
        );
      })}
    </svg>
  );
};
