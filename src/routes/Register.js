import React,{Component} from 'react';
import {connect} from 'dva';
import { routerRedux} from 'dva/router';
import {Writestatus} from '../utils/axios';
import Title from '../components/Title';
import Tags from '../components/Tag';
import arrayTreeFilter from 'array-tree-filter';
import {Register,Getcode} from '../services/home';
import { List, InputItem , WhiteSpace,Toast,Picker,Button} from 'antd-mobile';
import refuse from '../assets/refuse.png';
import agree from '../assets/agree.png';
import left from '../assets/return.png';
import right from '../assets/right.png';
import styles from './style/Register.less';
const cityData  = require('../ssx');
@connect(state => ({
   home: state.home
}))
export default class Regiter extends Component {
    state={
        pickerValue: [],
        visible:false,
        val:"获取验证码",
        codeflag:0,
        sec:0,
        flag:false,
        phone:"",
        code:"",
        pwd:"",
        pwd2:"",
        qrcode:"",
        name:""
    }
    componentDidMount(){
        const queryString = require('query-string');
        const {location}=this.props;
        if(location.search!==""){
            const parsed = queryString.parse(location.search);
            if(parsed.code){
                this.setState({
                    qrcode:parsed.code
                })
            }   
        }
    }
    returnGoBack=()=>{
        const {dispatch}=this.props;
        dispatch(
          routerRedux.goBack()
        )
    }
    getSel() {
        const value =this.state.pickerValue;
        if (!value) {
          return '';
        }
        const treeChildren = arrayTreeFilter(cityData.globalData, (c, level) => c.value === value[level]);
        return treeChildren.map(v => v.label).join(',');
      }
    changeSec(val){
        if(val==this.state.sec){
            this.setState({
                sec:0
            })
        }else{
            this.setState({
                sec:val
            })
        }
    }
    onChange(){
        this.setState({
            flag:!this.state.flag
        })
    }
    InputName(val){
        this.setState({
            name:val
        })
    }
    InputPhone(val){
        this.setState({
            phone:val
        })
    }
    InputCode(val){
        this.setState({
            code:val
        })
    }
    InputUserpwd(val){
        this.setState({
            pwd:val
        })
    }
    InputUserpwd2(val){
        this.setState({
            pwd2:val
        })
    }
    Inputqrcode(val){
        this.setState({
            qrcode:val
        })
    }
    //获取验证码
    async codeClick(){
        let tel=this.state.phone;
        const mobile = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
        if(mobile.test(tel)){
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
    //注册
    async register(){
        const {dispatch}=this.props;
        const cityData = this.state.pickerValue;
        let type=this.state.sec;
        let name=this.state.name;
        let tel=this.state.phone;
        let code=this.state.code;
        let pwd=this.state.pwd;
        let pwd2=this.state.pwd2;
        let qrcode=this.state.qrcode;
        let flag=this.state.flag;
        let data=""
        if(cityData.length===2){
            const cityArr = (this.refs.cityInfo.props.extra+"").split(",");
            data = cityArr[0]+cityArr[1];
          }else if(cityData.length===3){
              const cityArr = (this.refs.cityInfo.props.extra+"").split(",");
              data= cityArr[0]+cityArr[1]+cityArr[2];
          }else{
              Toast.offline("请选择所在城市!",1);
              return;
        }
        if(name===""){
            Toast.offline("请输入姓名",2);
            return;
        }
        if(tel===""){
            Toast.offline("请输入手机号",2);
            return;
        }
        if(this.state.code===""){
            Toast.offline("请输入验证码",2);
            return;
        }
        if(pwd===""){
            Toast.offline("请输入密码",2);
            return;
        }
        if(pwd2===""){
            Toast.offline("请再次输入密码",1);
            return;
        }
        if(pwd!==pwd2){
            Toast.offline("两次密码输入不一致",2);
            return;
        }
        if(!flag){
            Toast.offline("请先阅读并同意服务协议",2);
            return;
        }
        const result=await Register({city:data,name:name,tel:tel,code:code,pwd:pwd,pwds:pwd2,identity:type,referral_code:qrcode}).then(response => response)
        if(result.data.code==="ok" && result.status===200){
            Writestatus(result.data.data)
            Toast.success(result.data.msg,2,function(){
                dispatch(routerRedux.push('/'))
            })
        }else{
            Toast.offline(result.data.msg,2)
        }
    }
    render(){
        const Titles={
            bgcolor:"#5EBBF4",
            lbgimg:'url('+left+')',
            tit:"快速注册",
            color:"#fff"
        }
        const Item=List.Item;
        const {val}=this.state;
        const tags=[
            {id:0,tit:"银行"},{id:1,tit:"企业"},{id:2,tit:"机构"}
        ]
        const {history}=this.props;
        return (
            <div className={styles.App}>
                <style>{`
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
                    .extra{
                        display:flex;
                        height:.4rem;
                        justify-content:flex-end;
                        align-items:center;
                        color:#319EE1;
                    }
                    .extra img{
                        width:.15rem;
                        height:.25rem;
                        margin-left:.1rem;
                    }
                    .getcode{
                        width:1.6rem;
                        height:.6rem;
                        background-color:#5EBBF4;
                        border-radius:.1rem;
                        text-align:center;
                        line-height:.6rem;
                        color:#fff;
                        font-size:.24rem;
                    }
                    .am-list-item .am-input-extra{
                        max-height:.6rem;
                    }
                    .am-whitespace.am-whitespace-xs{
                        height:.2rem;
                        background-color:#F6F6F6;
                    }
                    .status .am-list-line .am-list-extra{
                        flex-basis: 44%;
                    }
                    .am-button{
                        width:90%;
                        height:.8rem;
                        margin:.4rem auto 0;
                        color:#fff;
                        line-height:.8rem;
                        font-size:.36rem;
                        background-color:#5EBBF4;
                        border-radius:.1rem;
                    }
                `}</style>
                <Title {...Titles} leftFunc={()=>this.returnGoBack()}></Title>
                <div className={styles.main}>
                    <Picker
                        extra={<div className="extra" onClick={() => this.setState({ visible: true })}>
                            <span>选择城市</span>
                            <img src={right} alt="" />
                        </div>}
                        visible={this.state.visible}
                        data={cityData.globalData}
                        value={this.state.pickerValue}
                        onChange={v => this.setState({ pickerValue: v })}
                        onOk={() => this.setState({ visible: false })}
                        onDismiss={() => this.setState({ visible: false })}>
                        <List.Item ref="cityInfo" extra={this.getSel()} onClick={this.state.pickerValue?() => this.setState({ visible: true }):()=>{}} className="area">所在地区</List.Item>
                    </Picker>
                    <InputItem
                        placeholder="请输入中文姓名"
                        clear
                        maxLength="15"
                        onChange={this.InputName.bind(this)}
                        >姓名</InputItem>
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
                        className="code"
                        extra={<div className="getcode" onClick={this.state.codeflag===0?()=>this.codeClick():()=>{}}>{val}</div>}
                        onChange={this.InputCode.bind(this)}
                        >验证码</InputItem>
                    <InputItem
                        type="password"
                        placeholder="请输入密码"
                        clear
                        maxLength="16"
                        onChange={this.InputUserpwd.bind(this)}
                        >密码</InputItem>
                    <InputItem
                        type="password"
                        placeholder="请输入密码"
                        clear
                        maxLength="16"
                        onChange={this.InputUserpwd2.bind(this)}
                        >确认密码</InputItem>
                     <WhiteSpace size="xs" />
                     <Item className="status" extra={<Tags data={tags} sec={this.state.sec} style={{color:'#999999',border:".01rem solid #BBBBBB"}} click={(val)=>this.changeSec(val)} active={{color:'#fff',border:"0 none",backgroundColor:'#5EBBF4'}}></Tags>}>注册身份</Item>
                     <InputItem
                        type="number"
                        placeholder={this.state.qrcode?this.state.qrcode:"推荐码或手机号（可选）"}
                        editable={this.state.qrcode?false:true}
                        clear
                        maxLength="11"
                        onChange={this.Inputqrcode.bind(this)}
                        >推荐码</InputItem>
                    <Button type="primary" onClick={()=>this.register()}>注册</Button>
                    <div className={styles.agreement}>
                        <img src={this.state.flag?agree:refuse} onClick={()=>this.onChange()} alt=""/>同意<span onClick={()=>history.push('/agreement')} style={{color:'#5EBBF4',padding:0}} >《服务协议》</span>
                    </div>
                    <p style={{color:'#359DDC',textAlign:'right',marginRight:'.2rem'}} onClick={()=>history.push('/login')}>已注册，去登陆！</p>
                </div>
                
            </div>
        )
    }
}