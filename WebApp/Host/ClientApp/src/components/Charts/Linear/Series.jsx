import React, {useContext} from 'react';
import map from 'lodash/map';

import LinearChartContext from './LinearChartContext';

export default () => {

  const { dataSource } = useContext(LinearChartContext);

  return (
    <svg>
      {map(dataSource, sourceItem => {
        return sourceItem.series.map((line, index) => {
          return (
            <line
              key={index.toString(36)}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              style={{stroke: sourceItem.color, strokeWidth: 2}}
              shapeRendering="crispEdges"
            />
          );
        })
      })}
    </svg>
  );
};
