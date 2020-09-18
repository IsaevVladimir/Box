import {parse, stringify} from 'query-string';
import isNil from 'lodash/isNil';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';
import unset from 'lodash/unset';
import startsWith from 'lodash/startsWith';
import isArray from 'lodash/isArray';
import isNumber from 'lodash/isNumber';
import moment from 'moment';


/**
 * Обновление браузерной строки с пропсами
 * @param history
 * @param prevSearch
 * @param routeName
 * @param fieldName
 * @param value
 */
export const historyUpdate = (history, prevSearch, routeName, fieldName, value) => {
  const params = isNil(prevSearch) || isEmpty(prevSearch) ? {} : parseQueryParams(prevSearch);
  const search = stringifyToQueryParams({...params, [fieldName]: clone(value)});
  history.push({pathname: `${routeName}`, search});
}

/**
 * Сериализация объекта в строку QeuryParams с указанием исходного типа, для дальнейшей десериализации
 * @param props
 * @returns {string}
 */
export const stringifyToQueryParams = (props) => {
  convertProperties(props);
  return stringify(props);
}

/**
 * Десериализация строки QueryParams в объект с конвертацией в исходный тип данных
 * @param queryString
 * @returns {Object}
 */
export const parseQueryParams = (queryString) => {
  const props = parse(queryString);
  reverseConvertProperties(props);
  return props;
}


const convertProperties = (props) => {
  mapProps(props, ([name, value]) => {
    convertProperty(props, name, value);
  });
}
const convertProperty = (props, name, value) => {
  if (isArray(value)) {
    let convertedNamePrefix;
    map(value, (arrayValue, index) => {
      if (moment.isMoment(arrayValue)) {
        props[name].splice(index, index + 1, arrayValue.format());
        convertedNamePrefix = 'moment_';
      }
      if (isNumber(arrayValue)) {
        props[name].splice(index, index + 1, arrayValue);
        convertedNamePrefix = 'number_'
      }
      return arrayValue;
    });
    if (!isNil(convertedNamePrefix)) {
      props[`${convertedNamePrefix}${name}`] = [...props[name]];
      delete props[name];
    }
  }
  if (moment.isMoment(value)) {
    props[`moment_${name}`] = value.format();
    unset(props, name);
  }
  if (isNumber(value)) {
    props[`number_${name}`] = value;
    unset(props, name);
  }
}

const reverseConvertProperties = (props) => {
  mapProps(props, ([name, value]) => {
    reverseConvertProperty(props, name, value);
  });
}
const reverseConvertProperty = (props, name, value) => {
  let converted = false;
  if (isArray(value)) {
    map(value, (arrayValue, index) => {
      if (startsWith(name, 'moment_')) {
        value[index] = moment(arrayValue);
        converted = true;
      }
      if (startsWith(name, 'number_')) {
        value[index] = Number(arrayValue);
        converted = true;
      }
    });
    if (converted) {
      props[removePrefix(name, 'moment_')] = [...props[name]];
      delete props[name];
    }
  }
  if (!converted && startsWith(name, 'moment_')) {
    props[removePrefix(name, 'moment_')] = moment(value);
    unset(props, name);
  }
  if (!converted && startsWith(name, 'number_')) {
    props[removePrefix(name, 'number_')] = Number(value);
    unset(props, name);
  }
}


const mapProps = (props, iteratee) => map(Object.entries(props), iteratee);
const removePrefix = (sourceString, prefix) => sourceString.slice(prefix.length);
const clone = (obj) => {
  if (null == obj || "object" != typeof obj) return obj;
  const copy = obj.constructor();
  for (const attr in obj) {
    if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
  }
  return copy;
}
