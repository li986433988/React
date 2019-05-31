import React,{Component} from 'react';
import {connect} from 'dva';
import { routerRedux} from 'dva/router';
import {loggedIn} from '../utils/axios';
import {Getloaninfo,GetCollection,StopCollection,Getnewinfo,Agentloan,GetVip} from '../services/home';
import { WhiteSpace,Picker, Toast,Modal } from 'antd-mobile';
import Title from '../components/Title';
import Financing from '../components/Financing';
import left from '../assets/left.png';
import sec from '../assets/cosec.png';
import nosec from '../assets/conosec.png';
import icon00 from '../assets/arrow.png';
import icon01 from '../assets/bottom.png';
import icon02 from '../assets/top.png';
import icon03 from '../assets/flow1.png';
import icon04 from '../assets/flow2.png';
import icon05 from '../assets/flow3.png';
import icon06 from '../assets/flow4.png';
import styles from './style/Loandetails.less';
import createF2 from 'f2react';
const alert = Modal.alert;
@connect(state => ({
   home: state.home
}))

export default class Loandetails extends Component {
    state={
        id:"",
        flag:false,
        sec:false,
        visible:false,
        value:"",
        content:{},
        data:[],
        tels:[],
        datatit:{},
        renderstatus:false,
        status:false,
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
            const result=await Getloaninfo(parsed.id)
            if(result.data.shou){
                this.setState({
                    status:true
                })
            }
            this.setState({
                content:result.data,
                data:result.data.money.wai,
                datatit:result.data.money.nei,
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
    Inputmoney(e){
        this.setState({
            money:e.target.value
        })
    }
    modalclick(){
        this.setState({ visible: true })
    }
    //收藏、取消收藏
    async secclick(val){
        let status=this.state.status;
        if(status){
            const result=await StopCollection({id:val,type:"true"})
            if(result.data.code==="ok"){
                this.setState({
                    status:false
                })
                Toast.success(result.data.msg,2)
            }
        }else{
            const result=await GetCollection({id:val,type:"true"})
            if(result.data.code==="ok"){
                Toast.success(result.data.msg,2)
                this.setState({
                    status:true
                })
            }
        }
    }
    modal(){
        const _this=this;
        this.setState({
            visible:false,
        })
        let time=setTimeout(function(){
            _this.renderchart();
            clearTimeout(time)
        },500)
    }
    //渲染饼图
    async renderchart(){
        const _this=this;
        let money=this.state.money?this.state.money:this.state.content.limit_min;
        let term=this.state.value.length>0?this.state.value[0].split("个月")[0]:this.state.content.term_min;
        let id=this.state.id;
        let max=this.state.content.limit_max*1;
        let min=this.state.content.limit_min*1;
        if(min>money){
            Toast.offline("额度范围不符合规范",2);
            return false;
        }else if(min<=money && money<=max){
            Toast.loading("加载中",1)
            let time=setTimeout(function(){
                _this.setState({
                    renderstatus:false,
                })
                clearTimeout(time)
            },1000)
            const result=await Getnewinfo({id:id,money:money,time:term})
            this.setState({
                renderstatus:true,
                data:result.data.wai,
                datatit:result.data.nei,
            })
        }else{
            Toast.offline("额度范围不符合规范",2);
            return false;
        }
    }
    //提交申请
    async Agent(){
        const {dispatch}=this.props;
        let money=this.state.money?this.state.money:"";
        let term=this.state.value?this.state.value[0].split("个月")[0]:"";
        let id=this.state.id;
        const result=await Agentloan({l_id:id,money:money,time:term})
        if(result.data.code==="ok"){
            Toast.success(result.data.msg,2,function(){
                dispatch(routerRedux.push('/'))
            })
        }else{
            Toast.offline(result.data.msg,2)
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
            tit:"贷款",
            color:"#333333"
        }
        const {content,data,datatit,status,tels,vip}=this.state;
        const Bar=createF2((chart) => {
            chart.tooltip(false);
            chart.axis(false);
            chart.legend({
                position: 'right',
                clickable:false,
                marker: {
                    symbol: 'circle', // marker 的形状
                    radius:8// 半径大小
                },
                itemFormatter: function itemFormatter(val) {return val}
            });
            chart.coord('polar', { transposed: true,innerRadius: 0.5,radius:1});
            if(this.state.renderstatus){
                chart.interval().position('1*bi').color('name', ['#EC5B54','#FBAF54','#FDD754',]).adjust('stack').animate(true);
                chart.guide().html({
                    position: ['50%', '50%'],
                    html: `
                    <div style="width:2rem;font-size:.2rem;color:#888888;text-align: center;">
                        <h2 style="line-height:.4rem;">${datatit.all_m}</h2>
                        <h2 style="line-height:.4rem;">${datatit.m_m}</h2>
                    </div>}`
                });
                chart.render();
            }else{
                chart.interval().position('1*bi').color('name', ['#EC5B54','#FBAF54','#FDD754',]).adjust('stack').animate(false);
                chart.guide().html({
                    position: ['50%', '50%'],
                    html: `
                    <div style="width:2rem;font-size:.2rem;color:#888888;text-align: center;">
                        <h2 style="line-height:.4rem;">${datatit.all_m}</h2>
                        <h2 style="line-height:.4rem;">${datatit.m_m}</h2>
                    </div>}`
                });
                chart.render();
            }
            
        });
        return (
            <div className={styles.App}>
                <style>{`
                    .am-modal-alert-content img{
                        width:100%;
                    }
                `}</style>
                <Title {...Titles} leftFunc={()=>this.returnGoBack()}></Title>
                <div className={styles.main}>
                    <Financing data={content} render={()=>this.renderchart()} money={this.state.money} term={this.state.value} change={(e)=>this.Inputmoney(e)} modalclick={()=>this.modalclick()}></Financing>
                    <div className={`${styles.content} ${this.state.flag?styles.flag:""}`}>
                        <div style={{display:content.status?'none':'block'}}>
                            <Bar width={350} height={200} data={data}/>
                        </div>
                        <h2>利率说明</h2>
                        <table cellPadding="0" cellSpacing="0">
                            <tbody>
                                <tr>
                                    <td>贷款期限（月）</td>
                                    <td>月手续费率</td>
                                    <td style={{display:!content.status?'none':''}}>一次性费率</td>
                                </tr>
                                <tr>
                                    <td>{content.qi}</td>
                                    <td>{content.poundage}%</td>
                                    <td style={{display:!content.status?'none':''}}>{content.rate}%</td>
                                </tr>
                                
                            </tbody>
                        </table>
                        {/* <h2>提前还款</h2>
                        <WhiteSpace size="sm" />
                        <p>支持提前还款，没有违约金。 </p> */}
                        <WhiteSpace size="sm" />
                        <h2>几种费用有什么区别？</h2>
                        <WhiteSpace size="sm" />
                        <p>{content.different}</p>
                        <WhiteSpace size="xl" />
                        <div className={styles.menu} onClick={()=>this.setState({flag:!this.state.flag})}>
                            <h2 style={{color:this.state.flag?"#999999":"#1E1E1E"}}>{this.state.flag?"收起":"产品详情"}</h2>
                            <img src={this.state.flag?icon02:icon01} alt=""/>
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
                    <div className={styles.flow}>
                        <h2>办理流程（门店办理）</h2>
                        <div className={styles.flowbox}>
                            <div>
                                <img src={icon03} alt=""/>
                                <span>申请贷款</span>
                            </div>
                            <img src={icon00} alt=""/>
                            <div>
                                <img src={icon04} alt=""/>
                                <span>电话初审</span>
                            </div>
                            <img src={icon00} alt=""/>
                            <div>
                                <img src={icon05} alt=""/>
                                <span>银行办理</span>
                            </div>
                            <img src={icon00} alt=""/>
                            <div>
                                <img src={icon06} alt=""/>
                                <span>审批放款</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.condition}>
                        <h2>申请条件</h2>
                        <div className={styles.conditionlist}>
                            <p>
                                {content.condition}
                            </p>
                        </div>
                    </div>
                    <div className={styles.science}>
                        <h2>所需材料</h2>
                        <p>{content.material}</p>
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
                    onOk={() =>this.modal()}
                    onDismiss={() => this.setState({ visible: false })}>
                </Picker>
            </div>
        )
    }
}