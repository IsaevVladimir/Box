import filter from 'lodash/filter'
import isEmpty from 'lodash/isEmpty'
import indexOf from 'lodash/indexOf'

export const filterArrayBySearchValue = (data, searchValue, propNames) => {
  const isSearchAllFields = isEmpty(propNames); // нет списка пропсов ищем по всем полям
  return filter(data,dataItem => {
    let found = false;
    Object.entries(dataItem).forEach(([name, value]) => {
      const isFieldSearch = isSearchAllFields // есть ли фильтрация по полю
        || indexOf(propNames, name) !== -1; // принаджелит ли списку белому
      if (isFieldSearch && value && // есть ли фильтрация и значение
        String(value).toLowerCase().indexOf(searchValue.toLowerCase()) !== -1) {
        found = true;
      }
    });
    return found;
  });
};
