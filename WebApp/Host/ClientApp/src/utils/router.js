import queryString from 'query-string';
import forEach from 'lodash/forEach';
import eq from 'lodash/eq';

export const updateHistory = (history, location, routeName, fieldName, value) => {
  let search = `?${fieldName}=${value}`;
  const queryParamArray = Object.entries(queryString.parse(location.search));
  forEach(queryParamArray, ([name, value]) => {
    if (!eq(name, fieldName)) {
      search += `&${name}=${value}`;
    }
  });

  history.push({ pathname: `${routeName}`, search });
}
