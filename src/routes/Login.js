import React,{Component} from 'react';
import {connect} from 'dva';
import { routerRedux} from 'dva/router';
import {Writestatus} from '../utils/axios';
import {Login} from '../services/home';
import {Button,Toast} from 'antd-mobile';
import logo from '../assets/icon.png';
import bgimg from '../assets/bgimg.png';
import icon01 from '../assets/user.png';
import icon02 from '../assets/pwd.png';
import styles from './style/Login.less';
@connect(state => ({
   home: state.home
}))
export default class Index extends Component {
    state={
        phone:"",
        pwd:""
    }
    Inputphone(eve){
        this.setState({
            phone:eve.target.value
        })
    }
    Inputpwd(eve){
        this.setState({
            pwd:eve.target.value
        })
    }
    //登录
    async Login(){
        const {dispatch}=this.props;
        let tel=this.state.phone;
        let pwd=this.state.pwd;
        const result=await Login({tel:tel,pwd:pwd});
        if(result.data.code==="ok"){
            Toast.success(result.data.msg,2,function(){
                Writestatus(result.data.data.tokens)
                dispatch(routerRedux.push('/'))
            })
        }else{
            Toast.offline(result.data.msg,2)
        }
    }
    render(){
        const {history}=this.props;
        return (
            <div className={styles.App} style={{background:`url(${bgimg}) center no-repeat`,backgroundSize:'cover'}}>
                <style>{`
                    .am-button{
                        width:100%;
                        height:1rem;
                        margin:.6rem auto 0;
                        color:#fff;
                        line-height:1rem;
                        font-size:.36rem;
                        background-color:#5EBBF4;
                        border-radius:.1rem;
                    }
                `}</style>
                <div className={styles.logo} style={{background:`url(${logo}) center no-repeat`,backgroundSize:'100%'}}>
                </div>
                <label htmlFor="phone">
                    <div className={styles.imgbox}>
                        <img src={icon01} alt=""/>
                    </div>
                    <input type="tel" maxLength={11} onChange={this.Inputphone.bind(this)} placeholder="手机号" id="phone"/>
                </label>
                <label htmlFor="pwd">
                    <div className={styles.imgbox}>
                        <img src={icon02} alt=""/>
                    </div>
                    <input type="password" onChange={this.Inputpwd.bind(this)} placeholder="密码" id="pwd"/>
                </label>
                <Button type="primary" onClick={()=>this.Login()}>登录</Button>
                <p onClick={()=>history.push('/forget')}>忘记密码?</p>
                <div className={styles.register} onClick={()=>history.push('/register')}>快速注册</div>
            </div>
        )
    }
}