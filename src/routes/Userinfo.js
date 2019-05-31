import React,{Component} from 'react';
import {connect} from 'dva';
import {Getuserinfo} from '../services/home';
import {loggedIn} from '../utils/axios';
import { routerRedux} from 'dva/router';
import {InputItem,List,Toast} from 'antd-mobile';
import * as Home from '../services/home';
import {transformFileToDataUrl} from './Base64';
import Title from '../components/Title';
import left from '../assets/left.png';
import styles from './style/Userinfo.less';
@connect(state => ({
   home: state.home
}))
export default class Userinfo extends Component {
    state={
        data:"",
        name:"",
        val:""
    }
    UNSAFE_componentWillMount() {
        const {dispatch}=this.props;
        let user=loggedIn();
        if(!user){
            dispatch(routerRedux.push('/login'))
        }
    }
    async componentDidMount(){
        Toast.loading("加载中",1)
        const result=await Getuserinfo().then(response => response);
        this.setState({
            data:result.data,
            val:result.data.identity
        })
    }
    returnGoBack=()=>{
        const {dispatch}=this.props;
        dispatch(
          routerRedux.goBack()
        )
    }
    InputName(val){
        this.setState({
            name:val
        })
    }
    //上传图片
    UploadImg(event){
        transformFileToDataUrl(event.target, async (base64)=> {
            var formData = new FormData();
            formData.append("imgFile",base64);
            const result= await Home.Uploadhead(formData).then(response => response);
            if(result.data.code==="ok" && result.status===200){
                let val = Object.assign({}, this.state.data, {avatarUrl: result.data.data })
                this.setState({
                    data:val
                })
            }else{
                Toast.offline(result.data.msg,2)
            }
          });
    }
    //修改昵称
    async editnickname(){
        let name=this.state.name;
        const result=await Home.Editnickname({nickName:name})
        const res=await Getuserinfo().then(response => response);
        this.setState({
            data:res.data
        })
    }
    real(){
        let val=this.state.val;
        const {dispatch}=this.props;
        if(val==1){
            dispatch(routerRedux.push('/organ'))
        }else if(val==2 || val==3){
            dispatch(routerRedux.push('/compony'))
        }
    }
    render(){
        const Titles={
            bgcolor:"#fff",
            tit:"我的信息",
            color:"#333333",
            lbgimg:'url('+left+')',
        }
        const {history}=this.props;
        const Item=List.Item;
        const {data}=this.state;
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
                    .am-list-item .am-input-label{
                        font-size:.3rem;
                    }
                    .am-list-item .am-input-control input{
                        padding-right:.5rem;
                    }
                    .am-list-item .am-input-control input::placeholder{
                        text-align:right;
                    }
                `}</style>
                <Title {...Titles} leftFunc={()=>this.returnGoBack()}></Title>
                <div className={styles.main}>
                    <h2>身份信息</h2>
                    <div className={styles.headimg}>
                        <span>头像</span>
                        <label className={styles.imgbox} htmlFor="imgbox" style={{background:`url(${data.avatarUrl}) center no-repeat`}}>
                            <input type="file" onChange={(event)=>this.UploadImg(event)} accept="image/*" id="imgbox"/>
                        </label>
                    </div>
                    <InputItem
                        placeholder={data.nickName?data.nickName:"请填写昵称"}
                        clear
                        maxLength="10"
                        ref="name"
                        onChange={this.InputName.bind(this)}
                        onBlur={()=>this.editnickname()}
                        >昵称</InputItem>
                    <InputItem
                        placeholder={data.tel}
                        editable={false}
                        >手机号</InputItem>
                    <h2>基本信息</h2>
                    <Item arrow="horizontal" onClick={() =>history.push('/mineinfo')}>个人信息</Item>
                    <Item extra={data.identity==0?"个人":(data.identity==1?"银行":(data.identity==2?"企业":"机构"))}>用户身份</Item>
                    <Item arrow="horizontal" extra={data.status==0?"未认证":(data.status==1?"已认证":(data.status==3?"认证失败":""))} onClick={data.status==1?()=>{}:() =>this.real()} style={data.identity==0?{display:'none'}:{display:'flex'}}>认证信息</Item>
                </div>
            </div>
        )
    }
}