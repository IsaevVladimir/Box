import {HubConnectionBuilder} from '@microsoft/signalr';
import isNil from 'lodash/isNil';
import isEmpty from 'lodash/isEmpty';
import noop from 'lodash/noop';

export const connectWrapper = async (url) => {
  return new HubConnectionBuilder().withUrl(url).withAutomaticReconnect().build()
}

export const actionWrapper = async (connection, action, props = {}) => {
  if (connection.connectionStarted) {
    try {
      if (isNil(props) || isEmpty(props)) {
        return await connection.invoke(action);
      } else {
        return await connection.invoke(action, ...Object.values(props));
      }
    } catch (e) {
      console.log('e', e);
      noop(e);
    }
  }
}
