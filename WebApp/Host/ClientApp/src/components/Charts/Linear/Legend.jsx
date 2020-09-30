import React from 'react';
import map from 'lodash/map';
import noop from 'lodash/noop';
import includes from 'lodash/includes';

const LegendItem = ({id, name, color, hidden, onClick}) => {
  return (
    <div onClick={() => onClick(id)} >
      <div style={{backgroundColor: color, height: '20px', width: '20px', opacity: hidden ? '20%' : '100%'}}/>
      <span style={{ opacity: hidden ? '20%' : '100%' }} >{name}</span>
    </div>
  );
};

export default ({dataSource = [], hiddenElementsId = [], onClick = noop}) => {
  return map(dataSource, sourceItem => {
    const hidden = hiddenElementsId.length > 0 ? includes(hiddenElementsId, sourceItem.id) : false
    return <LegendItem {...sourceItem} hidden={hidden} onClick={onClick}/>
  });
};
