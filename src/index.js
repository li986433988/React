import dva from 'dva';
import './index.css';
// const createHistory=require("history").createHashHistory;
// const app = dva({
// history: createHistory(),
// })
import { createBrowserHistory } from 'history';
const app = dva({
history: createBrowserHistory(),
})
app.router(require('./router').default);
app.start('#root');
