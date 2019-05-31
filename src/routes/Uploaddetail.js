import React,{Component} from 'react';
import {connect} from 'dva';
import { routerRedux} from 'dva/router';
import {loggedIn} from '../utils/axios';
import * as Home from '../services/home';
import { List, InputItem , TextareaItem,Toast,Picker,Button} from 'antd-mobile';
import Title from '../components/Title';
import {transformFileToDataUrl} from './Base64';
import bgimg from '../assets/load.png';
import left from '../assets/left.png';
import styles from './style/Uploaddetail.less';
const Tags=(props)=>{
    const data=props.data;
    return (
      <div className={styles.tags}>
        {
            data.map((item,index)=>(
                <span key={index} className={props.sec===index?styles.active:""} onClick={()=>props.click(index)}>{item.tit}</span>
            ))
        }
      </div>
    );
}
@connect(state => ({
   home: state.home
}))
export default class Uploaddetail extends Component {
    state={
        tab:true,
        sec:0,
        pickerValue:[],
        title:"",
        info:"",
        rate:"",
        minsection:"",
        maxsection:"",
        minmonth:"",
        maxmonth:"",
        oncerate:"",
        text1:"",
        text2:"",
        text3:"",
        logo:""
    }
    UNSAFE_componentWillMount() {
        const {dispatch}=this.props;
        let user=loggedIn();
        if(!user){
            dispatch(routerRedux.push('/login'))
        }
    }
    InputTitle(val){
        this.setState({
            title:val
        })
    }
    InputInfo(val){
        this.setState({
            info:val
        })
    }
    Inputrate(val){
        this.setState({
            rate:val
        })
    }
    MinSection(e){
        this.setState({
            minsection:e.target.value
        })
    }
    MaxSection(e){
        this.setState({
            maxsection:e.target.value
        })
    }
    Minmonth(e){
        this.setState({
            minmonth:e.target.value
        })
    }
    Maxmonth(e){
        this.setState({
            maxmonth:e.target.value
        })
    }
    Inputoncerate(val){
        this.setState({
            oncerate:val
        })
    }

    Teaxtarea1(val){
        this.setState({
            text1:val
        })
    }
    Teaxtarea2(val){
        this.setState({
            text2:val
        })
    }
    Teaxtarea3(val){
        this.setState({
            text3:val
        })
    }
    returnGoBack=()=>{
        const {dispatch}=this.props;
        dispatch(
          routerRedux.goBack()
        )
    }
    secclick(val){
        this.setState({
            sec:val
        })
    }
    //图片上传
    Upload (event,index){
        transformFileToDataUrl(event.target, async (base64)=> {
            var formData = new FormData();
            formData.append("imgFile",base64);
            const result= await Home.Uploadimg(formData).then(response => response);
            if(result.data.code==="ok" && result.status===200){
                this.setState({
                    logo:result.data.data
                })
            }else{
                Toast.offline(result.data.msg,2)
            }
        });
    }
    //贷款理财切换
    Tabclick(val){
        this.Clearinfo()
        if(val){
            this.setState({
                tab:true
            })
        }else{
            this.setState({
                tab:false
            })
        }
    }
    //贷款上传
    async Agentloan(){
        let tit=this.state.title;
        let info=this.state.info;
        let val=this.state.pickerValue[0];
        let min1=this.state.minsection;
        let max1=this.state.maxsection;
        let min2=this.state.minmonth;
        let max2=this.state.maxmonth;
        let rate=this.state.rate;
        let oncerate=this.state.oncerate;
        let text1=this.state.text1;
        let text2=this.state.text2;
        let text3=this.state.text3;
        let logo=this.state.logo;
        const data=await Home.Getshopinfo({title:tit,content:info,is_diya:val,limit_min:min1,limit_max:max1,term_min:min2,term_max:max2,poundage:rate,different:text1,condition:text2,material:text3,logo:logo,rate:oncerate})
        if(data.data.code==="ok" && data.status===200){
            Toast.success(data.data.msg,2,()=>this.Clearinfo())
        }else{
            Toast.offline(data.data.msg,2,()=>this.Clearinfo())
        }
    }
    //理财上传
    async Agentfinanc(){
        let tit=this.state.title;
        let info=this.state.info;
        let min1=this.state.minsection;
        let max1=this.state.maxsection;
        let min2=this.state.minmonth;
        let max2=this.state.maxmonth;
        let rate=this.state.rate;
        let text1=this.state.text1;
        let text2=this.state.text2;
        let sec=this.state.sec;
        let logo=this.state.logo;
        const data=await Home.Agentshopinfo({title:tit,content:info,buy_min:min1,buy_max:max1,time_min:min2,time_max:max2,year:rate,type:sec,info:text1,rule:text2,logo:logo})
        if(data.data.code==="ok" && data.status===200){
            Toast.success(data.data.msg,2,()=>this.Clearinfo())
        }else{
            Toast.offline(data.data.msg,2)
        }
    }
    //清除信息
    Clearinfo(){
        this.refs.tit.state.value=""
        this.refs.info.state.value=""
        this.refs.rate.state.value=""
        this.refs.oncerate.state.value=""
        this.refs.text1.state.value=""
        this.refs.text2.state.value=""
        this.refs.text3.state.value=""
        this.setState({
            pickerValue:[],
            title:"",
            info:"",
            rate:"",
            minsection:"",
            maxsection:"",
            minmonth:"",
            maxmonth:"",
            oncerate:"",
            text1:"",
            text2:"",
            text3:"",
            logo:"",
            sec:0
        })
    }
    render(){
        const Titles ={
            lbgimg:'url('+left+')',
            tit:"上传产品",
            color:"#333333"
        }
        const Item=List.Item;
        const tags=[
            {id:0,tit:"理财保险"},{id:1,tit:"信托理财"},{id:2,tit:"公募基金"}
        ]
        const Mortgage=[
            {label:"房产",value: '房产'},
            {label:"车辆",value:'车辆'},
            {label:"无",value:'无'},
        ]
        const {logo,tab}=this.state;
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
                        font-size:.25rem;
                        color:#333333;
                    }
                    .am-list-item .am-input-control input::placeholder,.am-list-item .am-input-control input{
                        text-align:right;
                    }
                    .am-list-item .am-input-label.am-input-label-5{
                        width:1.7rem;
                        margin:0;
                    }
                    .am-list-item,.am-list-item.am-input-item{
                        padding:0;
                        border-bottom:.01rem solid #EEEEEE;
                    }
                    .am-list-item .am-list-line{
                        padding:0 .2rem;
                    }
                    html:not([data-scale]) .am-list-body::before{
                        content:"";
                        height:0;
                    }
                    .am-list-item .am-list-line .am-list-extra{
                        flex-basis: 74%;
                    }
                    .am-list-item .am-input-extra{
                        max-height:.5rem;
                        line-height:.5rem;
                        color:#5ebbf4;
                    }
                    .am-button{
                        width:90%;
                        height:.8rem;
                        margin:.5rem auto;
                        color:#fff;
                        line-height:.8rem;
                        font-size:.36rem;
                        background-color:#5EBBF4;
                        border-radius:.1rem;
                    }
                    .am-list-header{
                        padding:.2rem;
                        height:1rem;
                        line-height:.6rem;
                        color:#333333;
                        font-size:.25rem;
                    }
                    .textarea{
                        height:auto;
                    }
                    .am-textarea-control{
                        padding:0;
                        padding-bottom:.2rem;
                    }
                `}</style>
                <Title {...Titles} leftFunc={()=>this.returnGoBack()}></Title>
                <div className={styles.main}>
                    <div className={styles.header}>
                        <div className={styles.tabs}>
                            <div className={this.state.tab?styles.active:""} onClick={()=>this.Tabclick(true)}>贷款</div>
                            <div className={this.state.tab?"":styles.active} onClick={()=>this.Tabclick(false)}>理财</div>
                        </div>
                    </div>
                    <h2>产品信息</h2>
                    <InputItem
                        placeholder="请输入标题"
                        clear
                        maxLength="15"
                        ref="tit"
                        onChange={this.InputTitle.bind(this)}
                        >标题</InputItem>
                    <InputItem
                        placeholder="请输入描述信息"
                        clear
                        ref="info"
                        maxLength="11"
                        onChange={this.InputInfo.bind(this)}
                        >描述</InputItem>
                    <div className={styles.content} style={{display:this.state.tab?'block':"none"}}>
                        <Picker
                            visible={this.state.visible}
                            data={Mortgage}
                            cols={1}
                            value={this.state.pickerValue}
                            onChange={v => this.setState({ pickerValue: v })}
                            onOk={() => this.setState({ visible: false })}
                            onDismiss={() => this.setState({ visible: false })}>
                            <List.Item arrow="horizontal" onClick={() => this.setState({ visible: true })} >有无抵押</List.Item>
                        </Picker>
                    </div>
                    <div className={styles.list}>
                        <span>{this.state.tab?"额度范围":"购买范围"}</span>
                        <div className={styles.box}>
                            <input type="number" value={this.state.minsection} onChange={this.MinSection.bind(this)} placeholder="请输入小区间（万）"/>
                            <span>-</span>
                            <input type="number" value={this.state.maxsection} onChange={this.MaxSection.bind(this)}  placeholder="请输入大区间（万）"/>
                        </div>
                    </div>
                    <div className={styles.list}>
                        <span>{this.state.tab?"期限范围":"投资期限"}</span>
                        <div className={styles.box}>
                            <input type="number" value={this.state.minmonth} onChange={this.Minmonth.bind(this)} placeholder="最小月份"/>
                            <span>-</span>
                            <input type="number" value={this.state.maxmonth} onChange={this.Maxmonth.bind(this)} placeholder="最大月份"/>
                        </div>
                    </div>
                    <InputItem
                        type="number"
                        placeholder="请输入"
                        clear
                        ref="rate"
                        maxLength="11"
                        extra="%"
                        onChange={this.Inputrate.bind(this)}
                        >{this.state.tab?"月手续费费率":"上日年化"}</InputItem>
                    <div className={styles.content} style={{display:this.state.tab?'block':"none"}}>
                        <InputItem
                            type="number"
                            placeholder="请输入"
                            clear
                            ref="oncerate"
                            maxLength="11"
                            extra="%"
                            onChange={this.Inputoncerate.bind(this)}
                            >一次性费率</InputItem>
                    </div>
                    <div className={styles.content} style={{display:this.state.tab?'none':"block"}}>
                        <Item className="status" extra={<Tags data={tags} sec={this.state.sec} click={(val)=>this.secclick(val)}></Tags>}>产品类型</Item>
                    </div>
                    <List renderHeader={() =>this.state.tab?"几种费用有什么区别":"产品基本介绍"}>
                        <TextareaItem
                            placeholder={this.state.tab?"例如：利息：按剩余本金计算，随每月剩余本金变少减少；费用：按贷款全额计算，不随剩余本金变而减少；一次性：按贷款全额计算，在放款时一次性收取；举例：贷款1万12个月分期还款1%月利息（共600元），1%月费用（共1200元），1%一次性（共100元），总利息共计1900元":"例如：活期新产品，日日欣理财计划，类货币理财产品；风险评级为R2，稳健型；申购T+1起息，赎回资金T+1到账"}
                            ref="text1"
                            className="textarea"
                            autoHeight
                            onChange={this.Teaxtarea1.bind(this)}
                        />
                    </List>
                    <List renderHeader={() =>this.state.tab?"申请条件":"交易规则"}>
                        <TextareaItem
                            placeholder={this.state.tab?"例如：年龄要求：22-60周岁；限制户籍：郑辛店，巩义，荣阳，新密和新郑地区户籍暂不接受申请；微粒贷要求：申请人有微粒贷授信额度且使用过该额度，额度8000元以上，未结清状态；工作要求：本地工作或本地注册经营；限制区域：郑辛店，巩义，荣阳，新密和新郑地区暂不接受申请；其他要求：在友众信业申请过贷款的拒绝申请；限制行业：不接受宇通货车，富士康，煤矿行业，铝厂，赌博场所，桑拿，洗浴，网吧，酒吧，夜总会，KTV人士申请；信用要求：信用良好，无不良逾期，暂不接受信用空白人士申请。%月利息（共600元），1%月费用（共1200元），1%一次性（共100元），总利息共计1900元":"例如:购买费率：购买费率为0;收益规则：现在买入，12.07开始计算收益赎回时间：受限开放期后每工作日0：00-15：30;赎回费率：赎回费率为0;到账时间：全部赎回：本金和分红T+1内到账"}
                            ref="text2"
                            className="textarea"
                            autoHeight
                            onChange={this.Teaxtarea2.bind(this)}
                        />
                    </List>
                    <div className={styles.content} style={{display:this.state.tab?'block':"none"}}>
                        <List renderHeader={() => '所需材料'}>
                            <TextareaItem
                                placeholder="例如：1.二代身份证&#13;&#10;2.简版人行征信报告"
                                ref="text3"
                                className="textarea"
                                autoHeight
                                onChange={this.Teaxtarea3.bind(this)}
                            />
                        </List>
                    </div>
                    <div className={styles.upload}>
                        <h2>LOGO上传</h2>
                        <div className={styles.con}>
                            <label className={styles.imgbox} htmlFor="imgbox" style={{background:`url(${logo?logo:bgimg}) center no-repeat`,backgroundSize:'100%'}}>
                                <input type="file" onChange={(event)=>this.Upload(event)} accept="image/*" id="imgbox"/>
                            </label>
                        </div>
                    </div>
                </div>
                <div className={styles.btn}>
                    <Button type="primary" onClick={tab?()=>this.Agentloan():()=>this.Agentfinanc()}>完成</Button>
                </div>    
            </div>
        )
    }
}