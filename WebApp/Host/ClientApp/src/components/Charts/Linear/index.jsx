import React, {useMemo, useState} from 'react';
import useMeasure from 'react-use/lib/useMeasure';
import includes from 'lodash/includes'
import filter from 'lodash/filter'

import LinearChartContext from './LinearChartContext'
import {normalizeProps} from './utils'

import HorizontalLayout from './HorizontalLayout';
import VerticalLayout from './VerticalLayout';
import Series from './Series';
import Legend from './Legend';

import styles from './index.less'

export default ({dataSource}) => {
  const [ref, {width, height}] = useMeasure();
  const [hiddenElementsId, setHiddenElementsId] = useState([]);

  const props = useMemo(() => {
    if (hiddenElementsId.length > 0) {
      const filteredDataSource = filter(dataSource, x => !includes(hiddenElementsId, x.id));
      return normalizeProps(filteredDataSource, width, height);
    } else
      return normalizeProps(dataSource, width, height);
  }, [dataSource, width, height, hiddenElementsId])

  const legendOnClick = (id) => {
    if (includes(hiddenElementsId, id)) {
      setHiddenElementsId([...filter(hiddenElementsId, x => x !== id)]);
    } else {
      setHiddenElementsId([...hiddenElementsId, id])
    }
  }

  return (
    <div>
      <LinearChartContext.Provider value={props}>
        <div ref={ref}>
          <svg key='linearChart' style={{width: '100%', height: `${props.height}px`, fontSize: 12}}>
            <HorizontalLayout/>
            <VerticalLayout/>
            <Series/>
          </svg>
        </div>
        <div className={styles.legendContainer} >
          <Legend onClick={legendOnClick} dataSource={dataSource} hiddenElementsId={hiddenElementsId}/>
        </div>
      </LinearChartContext.Provider>
    </div>
  );
};
