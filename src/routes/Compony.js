import React,{Component} from 'react';
import {connect} from 'dva';
import { routerRedux} from 'dva/router';
import {loggedIn,Clearstatus} from '../utils/axios';
import * as Home from '../services/home';
import arrayTreeFilter from 'array-tree-filter';
import { List, InputItem ,Toast,Picker,Button} from 'antd-mobile';
import {transformFileToDataUrl} from './Base64';
import Title from '../components/Title';
import Uploadimg from '../components/Uploadimg';
import font from '../assets/font.png';
import back from '../assets/back.png';
import idinfo from '../assets/idinfo.png';
import styles from './style/Compony.less';
const cityData  = require('../ssx');
@connect(state => ({
   home: state.home
}))
export default class Compony extends Component {
    state={
        imgs:[
            {id:0,tit:"第一步：请上传身份证正面照",bgimg:font,con:"身份证完整，身份证号清晰",srcimg:""},
            {id:1,tit:"第二步：请上传身份证反面照",bgimg:back,con:"身份证完整，身份证号清晰",srcimg:""},
            {id:2,tit:"第三步：请上传营业执照",bgimg:idinfo,con:"营业执照完整，营业执照号清晰",srcimg:""}
        ],
        visible:false,
        address:[],
        detail:"",
        work:"",
        income:"",
        tex:""
    }
    UNSAFE_componentWillMount() {
        const {dispatch}=this.props;
        let user=loggedIn();
        if(!user){
            dispatch(routerRedux.push('/login'))
        }
    }
    InputDetail(val){
        this.setState({
            detail:val
        })
    }
    InputWork(val){
        this.setState({
            work:val
        })  
    }
    InputIncome(val){
        this.setState({
            income:val
        })  
    }
    InputTex(val){
        this.setState({
            tex:val
        })  
    }
    getSel() {
        const value =this.state.address;
        if (!value) {
          return '';
        }
        const treeChildren = arrayTreeFilter(cityData.globalData, (c, level) => c.value === value[level]);
        return treeChildren.map(v => v.label).join(',');
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
        const cityData = this.state.address;
        let font=this.state.imgs[0].srcimg;
        let back=this.state.imgs[1].srcimg;
        let idinfo=this.state.imgs[2].srcimg;
        let arrress="";
        let detail=this.state.detail;
        let work=this.state.work;
        let income=this.state.income;
        let tex=this.state.tex;
        if(cityData.length===2){
            const cityArr = (this.refs.cityInfo.props.extra+"").split(",");
            arrress = cityArr[0]+cityArr[1];
        }else if(cityData.length===3){
            const cityArr = (this.refs.cityInfo.props.extra+"").split(",");
            arrress= cityArr[0]+cityArr[1]+cityArr[2];
        }
        const data=await Home.AgentCompony({pic1:font,pic2:back,pic3:idinfo,area:arrress,address:detail,service:work,year_income:income,year_tax:tex}).then(response => response);
        if(data.data.code==="ok" && data.status===200){
            Clearstatus()
            Toast.success(data.data.msg,2,function(){
                dispatch(routerRedux.push('/'))
            })
        }else{
            Toast.offline(data.data.msg,2)
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
                    <h2>企业基本信息</h2>
                    <Picker
                        visible={this.state.visible}
                        data={cityData.globalData}
                        value={this.state.address}
                        onChange={v => this.setState({ address: v })}
                        onOk={() => this.setState({ visible: false })}
                        onDismiss={() => this.setState({ visible: false })}>
                        <List.Item ref="cityInfo" arrow="horizontal" extra={this.getSel()} onClick={() => this.setState({ visible: true })} >住宅地址</List.Item>
                    </Picker>
                    <InputItem
                        placeholder="无需重复填写省/市/区县"
                        clear
                        maxLength="20"
                        onChange={this.InputDetail.bind(this)}
                        >详细地址</InputItem>
                    <InputItem
                        placeholder="请输入主营业务"
                        clear
                        maxLength="15"
                        onChange={this.InputWork.bind(this)}
                        >主营业务</InputItem>
                    <InputItem
                        type="number"
                        placeholder="请填写年收入"
                        clear
                        maxLength="15"
                        extra="万元"
                        onChange={this.InputIncome.bind(this)}
                    >企业年收入</InputItem>
                    <InputItem
                        type="number"
                        placeholder="(选填)"
                        clear
                        maxLength="15"
                        extra="万元"
                        onChange={this.InputTex.bind(this)}
                    >企业年税</InputItem>
                    <Button type="primary" onClick={()=>this.Agentinfo()}>完成</Button>
                </div>
            </div>
        )
    }
}