import React from 'react';
import {Map, Placemark, YMaps} from 'react-yandex-maps';
import map from 'lodash/map';
import get from 'lodash/get';

export default ({ dataSource, currency, openModal }) => {

  const onMapClick = e => {
    openModal(null, e.get("coords"));
  }

  return (
    <YMaps>
      <Map style={{ width: '100%', height: '300px' }} defaultState={{ center: [55.75, 37.57], zoom: 9 }} onClick={onMapClick}>
        {map(dataSource, x => {
          return (
            <Placemark
              geometry={get(x, 'coordinates')}
              modules={['geoObject.addon.balloon']}
              properties={{
                balloonContentHeader: get(x, 'name'),
                balloonContentBody: `${get(x, 'price')} ${get(currency, get(x, 'currency'))}`,
                balloonContentFooter: get(x, 'payDt')
              }}
            />
          );
        })}
      </Map>
    </YMaps>
  );
}
