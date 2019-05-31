import React,{Component} from 'react';
import {connect} from 'dva';
import { routerRedux} from 'dva/router';
import {loggedIn,Clearstatus} from '../utils/axios';
import {InputItem ,Toast,Button} from 'antd-mobile';
import {transformFileToDataUrl} from './Base64';
import * as Home from '../services/home';
import Title from '../components/Title';
import Uploadimg from '../components/Uploadimg';
import bgimg from '../assets/addimg.png';
import styles from './style/Compony.less';
@connect(state => ({
   home: state.home
}))
export default class Organ extends Component {
    state={
        imgs:[
            {tit:"第一步：请上传名片",bgimg:bgimg,con:"名片信息完整，名片信息清晰",srcimg:""},
            {tit:"第二步：请上传工牌",bgimg:bgimg,con:"工牌信息完整，工牌号码清晰",srcimg:""}
        ],
    }
    UNSAFE_componentWillMount() {
        const {dispatch}=this.props;
        let user=loggedIn();
        if(!user){
            dispatch(routerRedux.push('/login'))
        }
    }
    InputNumber(val){
        this.setState({
            number:val
        })
    }
    InputBank(val){
        this.setState({
            bank:val
        })
    }
    InputBranch(val){
        this.setState({
            branch:val
        })
    }
    InputWork(val){
        this.setState({
            work:val
        })
    }
    //图片上传
    Upload (event,index){
        transformFileToDataUrl(event.target, async (base64)=> {
            var formData = new FormData();
            formData.append("imgFile",base64);
            const result= await Home.Uploadimg(formData).then(response => response);
            if(result.data.code==="ok" && result.status===200){
                let arr=this.state.imgs;
                arr[index].srcimg=result.data.data;
                this.setState({
                    imgs:arr
                })
            }else{
                Toast.offline(result.data.msg,2)
            }
          });
    }
    //提交资料
    async Agentinfo(){
        const {dispatch}=this.props;
        let font=this.state.imgs[0].srcimg;
        let back=this.state.imgs[1].srcimg;
        let num=this.state.number;
        let bank=this.state.bank;
        let branch=this.state.branch;
        let work=this.state.work;
        const result=await Home.AgentOutfit({pic1:font,pic2:back,job_number:num,name:bank,department:branch,job:work}).then(response => response)
        if(result.data.code==="ok" && result.status===200){
            Clearstatus()
            Toast.success(result.data.msg,2,function(){
                dispatch(routerRedux.push('/'))
            })
        }else{
            Toast.offline(result.data.msg,2)
        }
    }
    render(){
        const Titles={
            bgcolor:"#fff",
            tit:"填写资料",
            color:"#333333"
        }
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
                    .am-list-item .am-input-control input{
                        text-align:right;
                    }
                    .am-list-item .am-input-control input::-webkit-input-placeholder{
                        text-align:right;
                    }
                    .am-list-item .am-list-line .am-list-extra{
                        flex-basis: 65%;
                    }
                    .am-list-item .am-input-label.am-input-label-5{
                        width:2rem;
                    }
                    .am-list-item .am-list-line .am-list-content,.am-list-item .am-input-label,.am-list-item .am-input-control input,.am-list-item .am-list-line .am-list-extra{
                        font-size:.25rem;
                        margin:0;
                    }
                    .extra{
                        display:flex;
                        height:.4rem;
                        justify-content:flex-end;
                        align-items:center;
                        color:#BBBBBB;
                    }
                    .extra img{
                        width:.15rem;
                        height:.25rem;
                        margin-left:.2rem;
                    }
                    .am-button{
                        width:90%;
                        height:.8rem;
                        margin:.8rem auto 0;
                        color:#fff;
                        line-height:.8rem;
                        font-size:.36rem;
                        background-color:#5EBBF4;
                        border-radius:.1rem;
                    }
                `}</style>
                <Title {...Titles}></Title>
                <div className={styles.main}>
                    <Uploadimg data={this.state.imgs} UploadImg={(val,index)=>this.Upload(val,index)}></Uploadimg>
                    <h2>银行机构基本信息</h2>
                    <InputItem
                        placeholder="请填写工号"
                        clear
                        maxLength="15"
                        onChange={this.InputNumber.bind(this)}
                        >工号</InputItem>
                    <InputItem
                        placeholder="请填写银行名称或机构名称"
                        clear
                        maxLength="20"
                        onChange={this.InputBank.bind(this)}
                        >银行名称或机构名称</InputItem>
                    <InputItem
                        placeholder="请输入所属部门"
                        clear
                        maxLength="15"
                        onChange={this.InputBranch.bind(this)}
                    >部门</InputItem>
                    <InputItem
                        placeholder="请输入所属职位"
                        clear
                        maxLength="15"
                        onChange={this.InputWork.bind(this)}
                    >职位</InputItem>
                    <Button type="primary" onClick={()=>this.Agentinfo()}>完成</Button>
                </div>
            </div>
        )
    }
}