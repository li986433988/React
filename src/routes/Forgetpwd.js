import React,{Component} from 'react';
import {connect} from 'dva';
import { routerRedux} from 'dva/router';
import {Getcode,Changepw} from '../services/home';
import {Button,InputItem,Toast} from 'antd-mobile';
import Title from '../components/Title';
import left from '../assets/return.png';
import styles from './style/Forgetpwd.less';
@connect(state => ({
   home: state.home
}))
export default class Forgetpwd extends Component {
    state={
        val:"获取验证码",
        codeflag:0,
        tel:"",
        code:"",
        pwd:""
    }
    returnGoBack=()=>{
        const {dispatch}=this.props;
        dispatch(
          routerRedux.goBack()
        )
    }
    InputPhone(val){
        this.setState({
            tel:val
        })
    }
    InputCode(val){
        this.setState({
            code:val
        })
    }
    Inputpwd(val){
        this.setState({
            pwd:val
        })
    }
    //获取验证码
    async codeClick(){
        let tel=this.state.tel;
        const mobile = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
        if(mobile.test(this.state.tel)){
            let fortime=60;
            const _this=this;
            const value =await Getcode({phone:tel});
            if(value.data.code==="ok"){
                _this.setState({
                    codeflag:1,
                })
                if(_this.state.codeflag){
                let secon=setInterval(function(){
                    _this.setState({
                    val:`${fortime--}s`
                    })
                    if(_this.state.codeflag===0||fortime<=-1){
                    clearInterval(secon);
                    _this.setState({
                        val:"再次获取",
                        codeflag:0
                    })
                    }
                },1000)
                }
            }else{
                Toast.offline(value.data.msg,1);
            }
        }else{
          Toast.offline("请输入11位手机号",1);
          return;
        }
    }
    //修改密码
    async Agent(){
        const {dispatch}=this.props;
        let phone=this.state.tel;
        let code=this.state.code;
        let pwd=this.state.pwd;
        const result=await Changepw({tel:phone,pwd:pwd,code:code})
        if(result.data.code==="ok"){
            Toast.success(result.data.msg,2,function(){
                dispatch(routerRedux.push('/login'))
            })
        }else{
            Toast.offline(result.data.msg,2)
        }
    }
    render(){
        const Titles ={
            bgcolor:"#5EBBF4",
            lbgimg:'url('+left+')',
            tit:"忘记密码",
            color:"#fff"
        }
        const {val}=this.state;
        return (
            <div className={styles.App}>
                <style>{`
                    .am-button{
                        width:80%;
                        height:1rem;
                        margin:.6rem auto 0;
                        color:#fff;
                        line-height:1rem;
                        font-size:.36rem;
                        background-color:#5EBBF4;
                        border-radius:.1rem;
                    }
                    .am-list-item.am-input-item,.am-list-item{
                        height:1rem;
                        min-height:1rem;
                    }
                    .am-list-item .am-input-label,.am-list-item .am-list-line .am-list-content,.am-textarea-label,.am-list-item .am-input-control input,.am-textarea-control textarea,.am-list-item .am-list-line .am-list-extra{
                        font-size:.3rem;
                        color:#333333;
                    }
                    .am-list-item,.am-list-item.am-input-item{
                        padding:0;
                        border-bottom:.01rem solid #EEEEEE;
                    }
                    .am-list-item .am-list-line{
                        padding:0 .2rem;
                    }
                    .am-list-item .am-list-line .am-list-extra{
                        flex-basis: 74%;
                    }
                    .am-list-item .am-input-extra{
                        max-height:.5rem;
                        line-height:.5rem;
                        color:#5ebbf4;
                    }
                `}</style>
                <Title {...Titles} leftFunc={()=>this.returnGoBack()}></Title>
                <div className={styles.main}>
                    <InputItem
                        type="number"
                        placeholder="请填写手机号"
                        clear
                        maxLength="11"
                        onChange={this.InputPhone.bind(this)}
                        >手机号</InputItem>
                    <InputItem
                        type="number"
                        placeholder="请输入验证码"
                        clear
                        maxLength="6"
                        extra={<div onClick={this.state.codeflag===0?()=>this.codeClick():()=>{}}>{val}</div>}
                        onChange={this.InputCode.bind(this)}
                        >验证码</InputItem>
                    <InputItem
                        type="password"
                        placeholder="请填写新密码"
                        clear
                        maxLength="11"
                        onChange={this.Inputpwd.bind(this)}
                        >新密码</InputItem>
                    <Button type="primary" onClick={()=>this.Agent()}>完成</Button>
                </div>
            </div>
        )
    }
}