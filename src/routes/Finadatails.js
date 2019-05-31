import React,{Component} from 'react';
import {connect} from 'dva';
import { routerRedux} from 'dva/router';
import {loggedIn} from '../utils/axios';
import {Detailinfo,StopCollection,GetCollection,Agentlicai,GetVip,} from '../services/home';
import {Picker,Toast,Modal} from 'antd-mobile';
import Title from '../components/Title';
import Financing from '../components/Financing';
import left from '../assets/left.png';
import sec from '../assets/cosec.png';
import nosec from '../assets/conosec.png';
import styles from './style/Finadatails.less';
const alert = Modal.alert;
@connect(state => ({
   home: state.home
}))
export default class Finadatails extends Component {
    state={
        money:"",
        flag:false,
        visible:false,
        value:"",
        content:{},
        id:"",
        tels:[],
        vip:""
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
        const queryString = require('query-string');
        const {location}=this.props;
        if(location.search!==""){
            const parsed = queryString.parse(location.search);
            const res=await GetVip();
            const result=await Detailinfo(parsed.id)
            if(result.data.shou){
                this.setState({
                    status:true
                })
            }
            this.setState({
                content:result.data,
                id:parsed.id,
                tels:result.data.arr,
                vip:result.data.is_vip
            })
        }
    }
    returnGoBack=()=>{
        const {dispatch}=this.props;
        dispatch(
          routerRedux.goBack()
        )
    }
    
    modalclick(){
        this.setState({ visible: true })
    }
    Inputmoney(e){
        this.setState({
            money:e.target.value
        })
    }
    //收藏、取消收藏
    async secclick(val){
        let status=this.state.status;
        if(status){
            const result=await StopCollection({id:val,type:"false"})
            if(result.data.code==="ok"){
                this.setState({
                    status:false
                })
                Toast.success(result.data.msg,2)
            }
        }else{
            const result=await GetCollection({id:val,type:"false"})
            if(result.data.code==="ok"){
                Toast.success(result.data.msg,2)
                this.setState({
                    status:true
                })
            }
        }
    }
    //提交申请
    async Agent(){
        const {dispatch}=this.props;
        let max=this.state.content.buy_max*1;
        let min=this.state.content.buy_min*1;
        let money=this.state.money?this.state.money:"";
        let term=this.state.value?this.state.value[0].split("个月")[0]:"";
        let id=this.state.id;
        if(min>money){
            Toast.offline("额度范围不符合规范",2);
            return false;
        }else if(min<=money && money<=max){
            Toast.loading("加载中",1)
            const result=await Agentlicai({l_id:id,money:money,time:term})
            if(result.data.code==="ok"){
                Toast.success(result.data.msg,2,function(){
                    dispatch(routerRedux.push('/'))
                })
            }else{
                Toast.offline(result.data.msg,2)
            }
        }else{
            Toast.offline("额度范围不符合规范",2);
            return false;
        }
    }
    showAlert = () => {
        let img=this.state.content.kefu
        const {dispatch}=this.props;
        const alertInstance = alert('注册会员',<div>
            <img src={img} alt=""/>
            <h2>扫码添加客服微信咨询</h2>
        </div>, [
            { text: '下次再说', onPress:()=>{}},
            {
              text: '立即出发',
              onPress: () =>dispatch(routerRedux.push('/vipinfo'))
            },
        ])
    };
    render(){
        const Titles={
            bgcolor:"#fff",
            lbgimg:'url('+left+')',
            tit:"理财",
            color:"#333333"
        }
        const {content,status,tels,vip}=this.state;
        return (
            <div className={styles.App}>
                <style>{`
                    .context{
                        font-size:.3rem;
                        color:#888888;
                    }
                    .context >h2{
                        line-height:.6rem;
                    }
                    .am-modal-alert-content img{
                        width:100%;
                    }
                `}</style>
                <Title {...Titles} leftFunc={()=>this.returnGoBack()}></Title>
                <div className={styles.main}>
                    {/* <Financing data={content} modalclick={()=>this.modalclick()}></Financing> */}
                    <Financing data={content} money={this.state.money} term={this.state.value} type={false} change={(e)=>this.Inputmoney(e)} modalclick={()=>this.modalclick()}></Financing>
                    <div className={styles.condition}>
                        <h2>产品基本介绍</h2>
                        <div className={styles.conditionlist}>
                            <p>
                                {content.info}
                            </p>
                        </div>
                    </div>
                    <div className={styles.condition}>
                        <h2>交易规则</h2>
                        <div className={styles.conditionlist}>
                            <p>
                                {content.rule}
                            </p>
                        </div>
                    </div>
                    <div className={styles.teluser}>
                        <h2>详情咨询</h2>
                        {
                            tels.length>0?tels.map((item,index)=>
                                <div className={styles.contact} key={index}>
                                    <span>联系人:{item.name}</span>
                                    <span>Tel:{item.tel}</span>
                                    <a href={vip==1?`tel:${item.tel}`:"javascript:void(0);"} onClick={vip==1?()=>{}:()=>this.showAlert()}>立即咨询</a>
                                </div>
                            ):""
                        }
                    </div>
                </div>
                <div className={styles.bottombtn}>
                    <div className={styles.collection}>
                        <img src={status?sec:nosec} onClick={()=>this.secclick(content.id)} alt=""/>
                        <span>收藏</span>
                    </div>
                    <div className={styles.btn} onClick={vip==1?()=>this.Agent():()=>this.showAlert()}>立即申请</div>
                </div>
                <Picker
                    cols={1}
                    visible={this.state.visible}
                    data={content.yue}
                    onChange={v => this.setState({ value: v })}
                    onOk={() => this.setState({ visible: false })}
                    onDismiss={() => this.setState({ visible: false })}>
                </Picker>
            </div>
        )
    }
}