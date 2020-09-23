import React from 'react';
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import isArray from 'lodash/isArray'
import get from 'lodash/get';
import NormalizeFormItem from "../NormalizeFormItem";

export default ({ form, coords, setValue, initialValue }) => {
  const onClickHandler = (e) => {
    setValue(e.get("coords"));
  }

  return (
    <NormalizeFormItem form={form} label='Coordinates' fieldName='coordinates' initialValue={initialValue}>
      <YMaps>
        <Map
          style={{ width: '200px', height: '200px' }}
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
    </NormalizeFormItem>
  );
}
