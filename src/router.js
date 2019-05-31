import React from 'react';
import {Router, Route, Switch } from 'dva/router';
import dynamic from 'dva/dynamic';

function RouterConfig({ history,app }) {
  // 首页
  const Index = dynamic({
    app,
    models: () => [
      import('./models/user'),
    ],
    component: () => import('./routes/Index'),
  });
  // 资讯
  const Information = dynamic({
    app,
    models: () => [
      import('./models/user'),
    ],
    component: () => import('./routes/Information'),
  });
  //咨询详情
  const Newsinfo = dynamic({
    app,
    models: () => [
      import('./models/user'),
    ],
    component: () => import('./routes/Newsinfo'),
  });
  // 个人中心
  const Mine = dynamic({
    app,
    models: () => [
      import('./models/user'),
    ],
    component: () => import('./routes/Mine'),
  });
  // 我的信息
  const Userinfo = dynamic({
    app,
    models: () => [
      import('./models/user'),
    ],
    component: () => import('./routes/Userinfo'),
  });
  // 登录
  const Login = dynamic({
    app,
    models: () => [
      import('./models/user'),
    ],
    component: () => import('./routes/Login'),
  });
  // 注册
  const Register = dynamic({
    app,
    models: () => [
      import('./models/user'),
    ],
    component: () => import('./routes/Register'),
  });
  // 忘记密码
  const Forgetpwd = dynamic({
    app,
    models: () => [
      import('./models/user'),
    ],
    component: () => import('./routes/Forgetpwd'),
  });
  // 个人用户填写资料
  const Personal = dynamic({
    app,
    models: () => [
      import('./models/user'),
    ],
    component: () => import('./routes/Personal'),
  });
  // 企业填写资料
  const Compony = dynamic({
    app,
    models: () => [
      import('./models/user'),
    ],
    component: () => import('./routes/Compony'),
  });
  // 机构填写资料
  const Organ = dynamic({
    app,
    models: () => [
      import('./models/user'),
    ],
    component: () => import('./routes/Organ'),
  });
  // 推荐好友
  const Recommend = dynamic({
    app,
    models: () => [
      import('./models/user'),
    ],
    component: () => import('./routes/Recommend'),
  });
  // 反馈
  const Feedback = dynamic({
    app,
    models: () => [
      import('./models/user'),
    ],
    component: () => import('./routes/Feedback'),
  });
  // 帮助中心
  const Help = dynamic({
    app,
    models: () => [
      import('./models/user'),
    ],
    component: () => import('./routes/Help'),
  });
  // 问题
  const Problem = dynamic({
    app,
    models: () => [
      import('./models/user'),
    ],
    component: () => import('./routes/Problem'),
  });
  // 问题类型
  const Probtype = dynamic({
    app,
    models: () => [
      import('./models/user'),
    ],
    component: () => import('./routes/Probtype'),
  });
  // 贷款详情
  const Loandetails = dynamic({
    app,
    models: () => [
      import('./models/user'),
    ],
    component: () => import('./routes/Loandetails'),
  });
  // 理财详情
  const Finadatails = dynamic({
    app,
    models: () => [
      import('./models/user'),
    ],
    component: () => import('./routes/Finadatails'),
  });
  // 上传产品
  const Uploaddetail = dynamic({
    app,
    models: () => [
      import('./models/user'),
    ],
    component: () => import('./routes/Uploaddetail'),
  });
  // 全部贷款、全部理财
  const Finance = dynamic({
    app,
    models: () => [
      import('./models/user'),
    ],
    component: () => import('./routes/Finance'),
  });
  // 我的贷款、我的理财
  const Myshop = dynamic({
    app,
    models: () => [
      import('./models/user'),
    ],
    component: () => import('./routes/Myshop'),
  });
  // 收藏
  const Collection = dynamic({
    app,
    models: () => [
      import('./models/user'),
    ],
    component: () => import('./routes/Collection'),
  });
  //个人信息
  const Mineinfo = dynamic({
    app,
    models: () => [
      import('./models/user'),
    ],
    component: () => import('./routes/Mineinfo'),
  });
  //会员说明
  const Vipinfo = dynamic({
    app,
    models: () => [
      import('./models/user'),
    ],
    component: () => import('./routes/Vipinfo'),
  });
  //成为会员
  const Tovip = dynamic({
    app,
    models: () => [
      import('./models/user'),
    ],
    component: () => import('./routes/Tovip'),
  });
  //服务协议
  const Agreement = dynamic({
    app,
    models: () => [
      import('./models/user'),
    ],
    component: () => import('./routes/Agreement'),
  });
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={Index} />
        {/* <Route path="/index" exact component={Index} /> */}
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/forget" exact component={Forgetpwd}/>
        <Route path="/personal" exact component={Personal} />
        <Route path="/compony" exact component={Compony} />
        <Route path="/organ" exact component={Organ} />
        <Route path="/information" exact component={Information} />
        <Route path="/mine" exact component={Mine} />
        <Route path="/userinfo" exact component={Userinfo} />
        <Route path="/recommend" exact component={Recommend} />
        <Route path="/feedback" exact component={Feedback} />
        <Route path="/help" exact component={Help} />
        <Route path="/problem" exact component={Problem}/>
        <Route path="/probtype" exact component={Probtype}/>
        <Route path="/loandetails" exact component={Loandetails}/>
        <Route path="/finadatails" exact component={Finadatails}/>
        <Route path="/upload" exact component={Uploaddetail}/>
        <Route path="/collection" exact component={Collection}/>
        <Route path="/finance" exact component={Finance}/>
        <Route path="/newsinfo" exact component={Newsinfo}/>
        <Route path="/myshop" exact component={Myshop}/>
        <Route path="/mineinfo" exact component={Mineinfo}/>
        <Route path="/vipinfo" exact component={Vipinfo}/>
        <Route path="/tovip" exact component={Tovip}/>
        <Route path="/agreement" exact component={Agreement}/>
      </Switch>
    </Router>
  );
}

export default RouterConfig;
