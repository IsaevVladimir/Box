import React, { useMemo } from 'react';
import {YMaps, Map, Placemark} from 'react-yandex-maps';
import isArray from 'lodash/isArray'
import get from 'lodash/get';
import isNil from 'lodash/isNil';

const defaultLocationCoords = [55.75, 37.57];

export default ({ value, onChange }) => {

  const onClickHandler = (e) => {
    if (!onChange) return;
    onChange(e.get("coords"));
  }

  const center = useMemo(() => {
    return isNil(value) ? defaultLocationCoords : value;
  }, [value]);

  return (
    <YMaps>
      <Map
        style={{ width: '100%', height: '200px' }}
        defaultState={{ center, zoom: 9 }}
        onClick={onClickHandler}
      >
        {isArray(value) && (
          <Placemark
            geometry={[get(value, '[0]'), get(value, '[1]')]}
          />
        )}
      </Map>
    </YMaps>
  );
}
