import 'babel-polyfill';
import dva from 'dva';
// import Loading from 'dva-loading';
import {
  message
} from 'antd';

import user from './models/user'
import check from './models/check/check'
import checkCategory from './models/check/checkCategory'
import setting from './models/setting'
import tableConnection from './models/table/tableConnection'
import row from './models/table/row'
import cell from './models/table/cell'

import './index.less';

// 1. Initialize
const app = dva({
  onError(err, dispatch) {
    if (err.resp) {
      message.error(err.resp.msg);
    } else if (err.srv) {
      message.error(err.srv.msg);
    } else {
      message.error(err);
    }
  }
});

// 2. Plugins
// app.use(Loading({
//   namespace: 'loading'
//   // effects: enable effects level loading state
// }));

// 3. Model

app.model(user);
app.model(setting);

// check
app.model(check);
app.model(checkCategory);


// table
app.model(tableConnection);
app.model(row);
app.model(cell);

// 4. Router
app.router(require('./router.jsx'));

// 5. Start
app.start('#root');
