import React,{Component} from 'react';
import {connect} from 'dva';
import { routerRedux} from 'dva/router';
import {loggedIn} from '../utils/axios';
import {Grid, Toast} from 'antd-mobile';
import {GetLoan,Getfinancial,AuthId} from '../services/home';
import { Drawer,Modal} from 'antd-mobile';
import icon0 from '../assets/icon0.png';
import icon1 from '../assets/icon1.png';
import icon2 from '../assets/icon2.png';
import icon3 from '../assets/icon3.png';
import icon4 from '../assets/icon4.png';
import icon5 from '../assets/icon5.png';
import icon6 from '../assets/icon6.png';
import icon7 from '../assets/icon7.png';
import icon8 from '../assets/icon8.png';
import icon9 from '../assets/icon9.png';
import logo from '../assets/logo.jpg';
import Listdetail from '../components/List';
import Tabbar from '../components/TabBar';
import styles from './style/Index.less';
const alert = Modal.alert;
const Modals=(props)=>{
    const data=props.data;
    return (
        <div className={styles.modal}>
            {
                data.map((item,index)=>(<p key={index} className={item.status?styles.active:""} onClick={()=>props.modal(props.index,index)}>{item.text}</p>))
            }
        </div>
    );
}
@connect(state => ({
   home: state.home
}))
export default class Login extends Component {
    state = {
        tab:true,money:"",visible:false,modal:false,topval:0,datalist:[],type:[],middleval:"",
        text0:"不限金额",text01:"不限期限",text1:"不限期限",text11:"不限金额",text2:"综合",text21:"综合",
        loan0:[{text:"不限金额",status:true,},{text:"0.1~10万元",status:false,},{text:"10~20万元",status:false,},{text:"20万元以上",status:false,}],
        loan1:[{text:"不限期限",status:true,}, {text:"1~3年",status:false,},{text:"3~5年",status:false,},{text:"5年以上",status:false,}],
        loan2:[{text:"综合",status:true,},{text:"利率从高到低",status:false,},{text:"利率从低到高",status:false,},],
        loan3:[{text:"不限期限",status:true,},{text:"1~3年",status:false,},{text:"3~5年",status:false,},{text:"5年以上",status:false,}],
        loan4:[{text:"不限金额",status:true,}, {text:"5万以下",status:false,},{text:"5万~50万",status:false,},{text:"50万~100万",status:false,},{text:"10万以上",status:false,},],
        loan5:[{text:"综合",status:true,},{text:"保险理财",status:false,},{text:"信托理财",status:false,},{text:"公募基金",status:false,},]
    };
    async UNSAFE_componentWillMount() {
        const {dispatch}=this.props;
        let user=loggedIn();
        if(!user){
            dispatch(routerRedux.push('/login'))
        }else{
            const result=await AuthId();
            if(result.data.is_renzheng==0){ 
                const noInstance = alert('您还未进行资料认证', '是否立即去认证?', [
                    { text: '下次再说', onPress: () =>{}},
                    { text: '立即认证', onPress:()=>dispatch(routerRedux.push('/organ'))},
                ]);
            }else if(result.data.is_renzheng==3){
                const falseInstance = alert('您的资料认证失败', '立即重新认证?', [
                    { text: '下次再说', onPress: () =>{}},
                    { text: '立即认证', onPress:()=>dispatch(routerRedux.push('/organ'))},
                ]);
            }else{
                return
            }
        }
    }
    async componentDidMount(){
        const {dispatch}=this.props;
        Toast.loading("加载中",1)
        const result=await GetLoan({money:"",term:"",sort:""});
        if(result.data.code==401){
            dispatch(routerRedux.push('/login'))
        }else if(result.data.code=='no'){
            Toast.offline(result.data.msg,2)
        }else{
            this.setState({
                datalist:result.data
            })
        }
    }
    scroll(){
        let target=this.refs.con.offsetTop;
        cancelAnimationFrame(timer);
        const _this=this;
        var timer = requestAnimationFrame(function fn(){
            if(target-_this.refs.box.scrollTop>=1000){
                _this.refs.box.scrollTop+=500
                timer = requestAnimationFrame(fn);
            }else if(target-_this.refs.box.scrollTop>=500){
                _this.refs.box.scrollTop+=250
                timer = requestAnimationFrame(fn);
            }else if(target-_this.refs.box.scrollTop>=250){
                _this.refs.box.scrollTop+=125
                timer = requestAnimationFrame(fn);
            }else if(target-_this.refs.box.scrollTop>=100){
                _this.refs.box.scrollTop+=50
                timer = requestAnimationFrame(fn);
            }else if(target-_this.refs.box.scrollTop>=50){
                _this.refs.box.scrollTop+=10
                timer = requestAnimationFrame(fn);
            }else if(target-_this.refs.box.scrollTop>=40){
                _this.refs.box.scrollTop+=1
                timer = requestAnimationFrame(fn);
            }else{
                cancelAnimationFrame(timer);
            }
        });
    }
    tabscroll(val){
        this.scroll()
        this.setState({
            topval:val,
        })
        if(this.state.topval===0){
            this.setState({
                visible:true,
            })
        }else if(val===this.state.topval){
            this.setState({
                visible:!this.state.visible,
            })
        }else{
            this.setState({
                visible:true,  
            })
        }
    }
    slidefun(val){
        
    }
    onkeydown(event){
        if(event.keyCode===107 || event.keyCode===109){event.preventDefault()}
    }
    change(e){
        this.setState({money:e.target.value})
    }
    //切换筛选
    tabactive(index,boxindex){
        let demodata=this.state.data;
            demodata[boxindex].list.map((item)=>{item.status=false});
            demodata[boxindex].list[index].status=true;
        this.setState({
            data:demodata
        })
    }
    mapsec(arr,index){
        arr.map((item)=>{
            item.status=false;
        })
        arr[index].status=true;
    }
    //切换条件
    modalsec(val,index){
        if(val===0){
            let arr=this.state.loan0;
            this.mapsec(arr,index)
            this.setState({
                loan0:arr,
                text0:arr[index].text
            })
        }else if(val===1){
            let arr=this.state.loan1;
            this.mapsec(arr,index)
            this.setState({
                loan1:arr,
                text1:arr[index].text
            })
        }else if(val===2){
            let arr=this.state.loan2;
            this.mapsec(arr,index)
            this.setState({
                loan2:arr,
                text2:arr[index].text
            })
        }else if(val===3){
            let arr=this.state.loan3;
            this.mapsec(arr,index)
            this.setState({
                loan3:arr,
                text01:arr[index].text
            })
        }else if(val===4){
            let arr=this.state.loan4;
            this.mapsec(arr,index)
            this.setState({
                loan4:arr,
                text11:arr[index].text
            })
        }else if(val===5){
            let arr=this.state.loan5;
            this.mapsec(arr,index)
            this.setState({
                loan5:arr,
                text21:arr[index].text
            })
        }
        this.onOpenChange()
        this.refreshlist()
    }
    //刷新列表
    refreshlist(){
        const _this=this;
        if(this.state.tab){
            Toast.loading("加载中",1,async function(){
                let text0=_this.state.text0;
                let text1=_this.state.text1;
                let text2=_this.state.text2;
                const result=await GetLoan({money:text0,term:text1,sort:text2});
                _this.setState({
                    datalist:result.data
                })
            })
        }else{
            Toast.loading("加载中",1,async function(){
                let text0=_this.state.text01;
                let text1=_this.state.text11;
                let text2=_this.state.text21;
                const result=await Getfinancial({time:text0,buy:text1,type:text2});
                _this.setState({
                    datalist:result.data
                })
            })
        }
        this.setState({
            middleval:""
        })
    }
    //切换贷款和理财
    async tabActive(val){
        if(val){
            Toast.loading("加载中",1)
            const result=await GetLoan();
            this.setState({
                datalist:result.data,
                tab:true
            })
        }else{
            Toast.loading("加载中",1)
            const result=await Getfinancial({time:"",buy:"",type:""});
            this.setState({
                datalist:result.data,
                tab:false
            })
        }
        if(this.state.visible){
            this.onOpenChange()
        }
    }
    //弹窗展示隐藏
    onOpenChange = (...args) => {
        this.setState({ visible:!this.state.visible});
    }
    //跳转到贷款详情
    historyloan(){
        const {dispatch}=this.props;
        dispatch(routerRedux.push('/loandetails'))
    }
    //理财详情
    tofinacing(){
        const {dispatch}=this.props;
        dispatch(routerRedux.push('/finadatails'))
    }
    entermoney(){
        let data=this.state.loan0;
        data.map((item)=>{item.status=false});
        this.setState({
            visible:false,
            text0:this.state.middleval+"万元"
        })
        this.refreshlist()
    }
    moneyInput(e){
        if(e.target.value.length>4){
            e.target.value=e.target.value.slice(0,4);
            this.setState({
                middleval:e.target.value
            })
        }else{
            this.setState({
                middleval:e.target.value
            })
        }
    }
    //按钮事件
    menuclick(el,index){
        const {dispatch}=this.props;
        if(this.state.tab){
            if(index===0){
                dispatch(routerRedux.push('/finance?id=0&type=false'))
            }else if(index===1){
                dispatch(routerRedux.push('/finance?id=1&type=false'))
            }else if(index===2){
                dispatch(routerRedux.push('/finance?id=2&type=false'))
            }else if(index===3){
                dispatch(routerRedux.push('/finance?id=3&type=false'))
            }else if(index===4){
                dispatch(routerRedux.push('/finance?id=4&type=false'))
            }else{
                dispatch(routerRedux.push('/finance?id=5&type=false'))
            }
        }else{
            if(index===0){
                dispatch(routerRedux.push('/finance?id=0&type=true'))
            }else if(index===1){
                dispatch(routerRedux.push('/finance?id=1&type=true'))
            }else{
                dispatch(routerRedux.push('/finance?id=2&type=true'))
            }
        }
    }
    oneAgent(){
        const {dispatch}=this.props;
        let val=this.state.money;
        let tab=this.state.tab;
        if(val){
            if(tab){
                dispatch(routerRedux.push('/finance?type=false'))
            }else{
                dispatch(routerRedux.push('/finance?type=true'))
            }
        }else{
            return
        }
    }
    render(){
        const {history}=this.props;
        const MyTabBar={selectedTabBar:"home",history}
        const menus=[{icon:icon1,text:"上班族"},{icon:icon2,text:"企业主"},{icon:icon3,text:"自由职业"},{icon:icon4,text:"信用贷"},{icon:icon5,text:"抵押贷"},{icon:icon6,text:"车贷"}]
        const menus2=[{icon:icon7,text:"短期"},{icon:icon8,text:"中期"},{icon:icon9,text:"长期"}]
        const {text0,text01,text1,text11,text2,text21}=this.state;
        const Slider1=(
            <div className={styles.modalmoney}>
                <Modals data={this.state.loan0} index={0} modal={(val,index)=>this.modalsec(val,index)}></Modals>
                <div className={styles.box}>
                    <label htmlFor="">
                        <input ref="daikuan" type="number" value={this.state.middleval} onChange={this.moneyInput.bind(this)} onKeyDown={(event)=>this.onkeydown(event)} placeholder="请输入贷款金额"/><span>万元</span>
                    </label>
                    <span onClick={()=>this.entermoney()}>确定</span>
                </div>
                <span>可输入贷款范围0.1 ~ 1000万元</span>
            </div>
        )
        const Slider2=(<Modals data={this.state.loan1} index={1} modal={(val,index)=>this.modalsec(val,index)}></Modals>)
        const Slider3=(<Modals data={this.state.loan2} index={2} modal={(val,index)=>this.modalsec(val,index)}></Modals>)
        const Slider4=(<Modals data={this.state.loan3} index={3} modal={(val,index)=>this.modalsec(val,index)}></Modals>)
        const Slider5=(<Modals data={this.state.loan4} index={4} modal={(val,index)=>this.modalsec(val,index)}></Modals>)
        const Slider6=(<Modals data={this.state.loan5} index={5} modal={(val,index)=>this.modalsec(val,index)}></Modals>)
        const {datalist,tab}=this.state;
        return (
            <div className={styles.App}>
                <style>{`
                    .am-grid .am-flexbox .am-flexbox-item .am-grid-item-content .am-grid-item-inner-content .am-grid-icon{
                        width:1rem;
                        height:1rem;
                        border-radius:50%;
                    }
                    .am-grid .am-flexbox .am-flexbox-item .am-grid-item-content .am-grid-item-inner-content.column-num-3 .am-grid-text{
                        font-size:.3rem;
                    }
                `}</style>
                <div className={`${styles.boxcon} ${!this.state.visible?styles.zindex:""}`} ref="box">
                    <div className={styles.title}>
                        <div style={{backgroundImage:this.props.lbgimg}}>
                            <img src={logo} alt=""/>
                        </div>
                        <h2 style={{color:this.props.color}}>首页</h2>
                        <div className={styles.right}></div>
                    </div>
                    <div className={styles.main}>
                        <div className={styles.header}>
                            <div className={styles.tabs}>
                                <div className={this.state.tab?styles.active:""} onClick={()=>this.tabActive(true)}>贷款</div>
                                <div className={this.state.tab?"":styles.active} onClick={()=>this.tabActive(false)}>理财</div>
                            </div>
                        </div>
                        <p>输入您要的金额 一键为您推荐（元）</p>
                        <div className={styles.money}>
                            <input type="number" placeholder="10,000" value={this.state.money} onKeyDown={(event)=>this.onkeydown(event)} onChange={(e)=>this.change(e)}/>
                        </div>
                        <div className={styles.btn} onClick={()=>this.oneAgent()}>一键申请</div>
                        <div className={styles.menus} style={{display:this.state.tab?'block':"none"}}>
                            <Grid data={menus} columnNum={3} square={false} hasLine={false} onClick={(el,index)=>this.menuclick(el,index)}/>
                        </div>
                        <div className={styles.menus} style={{display:this.state.tab?'none':"block"}}>
                            <Grid data={menus2} columnNum={3} square={false} hasLine={false} onClick={(el,index)=>this.menuclick(el,index)}/>
                        </div>
                        <div className={styles.content} ref="con">
                            <div className={styles.header}>
                                <div className={styles.screen}>
                                    <div onClick={this.state.tab?()=>this.tabscroll(1):()=>this.tabscroll(4)}>
                                        <span>{this.state.tab?text0:text01}</span><img src={icon0} alt=""/>
                                    </div>
                                    <div onClick={this.state.tab?()=>this.tabscroll(2):()=>this.tabscroll(5)}>
                                        <span>{this.state.tab?text1:text11}</span><img src={icon0} alt=""/>
                                    </div>
                                    <div onClick={this.state.tab?()=>this.tabscroll(3):()=>this.tabscroll(6)}>
                                        <span>{this.state.tab?text2:text21}</span><img src={icon0} alt=""/>
                                    </div>
                                </div>
                            </div>
                            {/* 贷款列表 */}
                            <div className={styles.list}>
                            {
                                datalist.length>0?datalist.map((item,index)=>(
                                    <Listdetail key={index} data={item?item:""} Clickbtn={tab?()=>history.push('/loandetails?id='+item.id):()=>history.push('/finadatails?id='+item.id)}></Listdetail>
                                )):""
                            }
                            </div>
                        </div>
                    </div>
                </div>
                <Tabbar {...MyTabBar}></Tabbar>
                <Drawer ref="drawer" style={{top:'1.85rem',bottom:'1rem',zIndex:1}} contentStyle={{textAlign: 'center', padding:0}} position="top" open={this.state.visible} onOpenChange={this.onOpenChange}
                    sidebar={this.state.topval===1?Slider1:(this.state.topval===2?Slider2:(this.state.topval===3?Slider3:(this.state.topval===4?Slider4:(this.state.topval===5?Slider5:Slider6))))}>0
                </Drawer>
            </div>
        )
    }
}