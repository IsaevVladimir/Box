import React from 'react';
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import isArray from 'lodash/isArray'
import get from 'lodash/get';

export default ({ coords, setValue }) => {
  const onClickHandler = (e) => {
    setValue(e.get("coords"));
  }

  return (
    <div>
      <YMaps>
        <Map
          style={{ width: '100%', height: '200px' }}
          defaultState={{ center: [55.75, 37.57], zoom: 9 }}
          onClick={onClickHandler}
        >
          {isArray(coords) && (
            <Placemark
              geometry={[get(coords, '[0]'), get(coords, '[1]')]}
            />
          )}
        </Map>
      </YMaps>
    </div>
  );
}
