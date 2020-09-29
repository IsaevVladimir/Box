import React, {useContext} from 'react';
import LinearChartContext from './LinearChartContext';

export default () => {
  const { horizontalPoints } = useContext(LinearChartContext);

  return (
    <svg>
      {horizontalPoints.map((line, index) => {
        return (
          <line
            key={index.toString(36)}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            style={{stroke: '#f0f0f0', strokeWidth: 1, strokeDasharray: '4, 1'}}
            shapeRendering="crispEdges"
          />
        );
      })}

      {horizontalPoints.map((line, index) => {
        return (
          <text
            key={index.toString(36)}
            x={line.x}
            y={line.y}
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
