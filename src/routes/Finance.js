import React,{Component} from 'react';
import {connect} from 'dva';
import { routerRedux} from 'dva/router';
import {loggedIn} from '../utils/axios';
import {Drawer,Toast} from 'antd-mobile';
import {GetLoan,Getfinancial} from '../services/home';
import Title from '../components/Title';
import left from '../assets/left.png';
import Listdetail from '../components/List';
import icon0 from '../assets/icon0.png';
import styles from './style/Finance.less';
const Modals=(props)=>{
    const data=props.data;
    return (
        <div className={styles.modal}>
            {
                data.map((item,index)=>(
                    <p key={index} className={item.status?styles.active:""} onClick={()=>props.modal(props.index,index)}>{item.text}</p>
                ))
            }
        </div>
    );
}
@connect(state => ({
   home: state.home
}))
export default class Finance extends Component {
    state={
        tit:"",
        middleval:"",
        topval:0,
        tab:true,
        visible:false,
        text0:"不限金额",
        text01:"不限期限",
        text1:"不限期限",
        text11:"不限金额",
        text2:"综合",
        text21:"综合",
        datalist:[],
        loan0:[
            {text:"不限金额",status:true,},
            {text:"0.1~10万元",status:false,},
            {text:"10~20万元",status:false,},
            {text:"20万元以上",status:false,}
        ],
        loan1:[
            {text:"不限期限",status:true,}, 
            {text:"1~3年",status:false,},
            {text:"3~5年",status:false,},
            {text:"5年以上",status:false,}
        ],
        loan2:[
            {text:"综合",status:true,},
            {text:"利率从高到低",status:false,},
            {text:"利率从低到高",status:false,},
        ],
        loan3:[
            {text:"不限期限",status:true,},
            {text:"1~3年",status:false,},
            {text:"3~5年",status:false,},
            {text:"5年以上",status:false,}
        ],
        loan4:[
            {text:"不限金额",status:true,}, 
            {text:"5万以下",status:false,},
            {text:"5万~50万",status:false,},
            {text:"50万~100万",status:false,},
            {text:"10万以上",status:false,},
        ],
        loan5:[
            {text:"综合",status:true,},
            {text:"保险理财",status:false,},
            {text:"信托理财",status:false,},
            {text:"公募基金",status:false,},
        ]
    }
    UNSAFE_componentWillMount() {
        const {dispatch}=this.props;
        let user=loggedIn();
        if(!user){
            dispatch(routerRedux.push('/login'))
        }
    }
    async componentDidMount(){
        const queryString = require('query-string');
        const {location}=this.props;
        Toast.loading("加载中",1)
        if(location.search!==""){
            const parsed = queryString.parse(location.search);
            if(parsed.type=="true"){
                const result=await Getfinancial({time:"",buy:"",type:""});
                this.setState({
                    tit:"全部理财",
                    tab:false,
                    datalist:result.data
                })
            }else{
                const result=await GetLoan({money:"",term:"",sort:""});
                this.setState({
                    tit:"全部贷款",
                    tab:true,
                    datalist:result.data
                })
            }
        }
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
    tabscroll(val){
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
    onkeydown(event){
        if(event.keyCode===107 || event.keyCode===109){event.preventDefault()}
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
    //弹窗展示隐藏
    onOpenChange = (...args) => {
        this.setState({ visible:!this.state.visible});
    }
    returnGoBack=()=>{
        const {dispatch}=this.props;
        dispatch(
          routerRedux.goBack()
        )
    }
    mapsec(arr,index){
        arr.map((item)=>{
            item.status=false;
        })
        arr[index].status=true;
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
    render(){
        const Titles={
            bgcolor:"#fff",
            lbgimg:'url('+left+')',
            tit:`${this.state.tit}`,
            color:"#333333"
        }
        const {history}=this.props;
        const {text0,text01,text1,text11,text2,text21,datalist,tab}=this.state;
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
        return (
            <div className={styles.App}>
                <style>{`
                    
                `}</style>
                <Title {...Titles} leftFunc={()=>this.returnGoBack()}></Title>
                <div className={styles.header}>
                    <div className={styles.screen}>
                        <div onClick={this.state.tab?()=>this.tabscroll(1):()=>this.tabscroll(4)}>
                            <span>{this.state.tab?text0:text01}</span>
                            <img src={icon0} alt=""/>
                        </div>
                        <div onClick={this.state.tab?()=>this.tabscroll(2):()=>this.tabscroll(5)}>
                            <span>{this.state.tab?text1:text11}</span>
                            <img src={icon0} alt=""/>
                        </div>
                        <div onClick={this.state.tab?()=>this.tabscroll(3):()=>this.tabscroll(6)}>
                            <span>{this.state.tab?text2:text21}</span>
                            <img src={icon0} alt=""/>
                        </div>
                    </div>
                </div>
                <div className={styles.main}>
                    <div className={styles.list}>
                    {
                        datalist.length>0?datalist.map((item,index)=>(
                            <Listdetail key={index} data={item?item:""} Clickbtn={tab?()=>history.push('/loandetails?id='+item.id):()=>history.push('/finadatails?id='+item.id)}></Listdetail>
                        )):""
                    }
                    </div>
                </div>
                <Drawer
                    ref="drawer"
                    style={{top:'1.88rem',bottom:'0',zIndex:this.state.visible?1:-1}}
                    contentStyle={{textAlign: 'center', padding:0}}
                    sidebar={this.state.topval===1?Slider1:(this.state.topval===2?Slider2:(this.state.topval===3?Slider3:(this.state.topval===4?Slider4:(this.state.topval===5?Slider5:Slider6))))}
                    position="top"
                    open={this.state.visible}
                    onOpenChange={this.onOpenChange}
                > </Drawer>
            </div>
        )
    }
}