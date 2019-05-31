import React,{Component} from 'react';
import {connect} from 'dva';
import {loggedIn,loginOut} from '../utils/axios';
import {Getuser} from '../services/home';
import { routerRedux} from 'dva/router';
import {Toast,Modal,Button} from 'antd-mobile';
import Tabbar from '../components/TabBar';
import icon01 from '../assets/more.png';
import icon02 from '../assets/img0.png';
import icon03 from '../assets/img1.png';
import icon04 from '../assets/img2.png';
import menu1 from '../assets/menu1.png';
import menu2 from '../assets/menu2.png';
import menu3 from '../assets/menu3.png';
import menu4 from '../assets/menu4.png';
import menu5 from '../assets/menu5.png';
import menu6 from '../assets/menu6.png';
import menu7 from '../assets/menu7.png';
import menu8 from '../assets/menu8.png';
import menu9 from '../assets/menu9.png';
import styles from './style/Mine.less';
@connect(state => ({
   home: state.home
}))
export default class Mine extends Component {
    state={
        data:{},
        modal:false,
        info:{}
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
        const result=await Getuser().then(response => response);
        this.setState({
            data:result.data,
            info:result.data.kefu
        })
    }
    menuclick(index){
        const {dispatch}=this.props;
        if(index===0){
            dispatch(routerRedux.push('/myshop?type=我的贷款&status=false'))
        }else if(index===1){
            dispatch(routerRedux.push('/myshop?type=我的理财&status=true'))
        }else if(index===2){
            dispatch(routerRedux.push('/recommend'))
        }else if(index===3){
            dispatch(routerRedux.push('/upload'))
        }else if(index===4){
            dispatch(routerRedux.push('/help'))
        }else if(index===5){
            this.setState({
                modal:true
            })
        }else if(index===7){
            dispatch(routerRedux.push('/collection'))
        }else if(index===8){
            dispatch(routerRedux.push('/feedback'))
        }
    }
    loginOut(){
        loginOut();
        const {dispatch}=this.props;
        dispatch(routerRedux.push('/login'))
    }
    render(){
        const {history}=this.props;
        const menus=[
            {icon:menu1,text:"我的贷款"},
            {icon:menu2,text:"我的理财"},
            {icon:menu3,text:"推荐好友"},
            {icon:menu4,text:"上传产品"},
            {icon:menu5,text:"帮助中心"},
            {icon:menu6,text:"联系平台"},
            {icon:menu7,text:"特色活动"},
            {icon:menu8,text:"我的收藏"},
            {icon:menu9,text:"意见反馈"}
        ]
        const MyTabBar={
            selectedTabBar:"mine",history
        }
        const {data,info}=this.state;
        return (
            <div className={styles.App}>
                <style>{`
                    .am-modal-body h2{
                        line-height:.6rem;
                    }
                    .am-modal-body a{
                        text-decoration: none;
                        color:#36A2EE;
                        font-size:.4rem;
                    }
                    .am-button{
                        width:80%;
                        height:1rem;
                        margin:.6rem auto;
                        color:#fff;
                        line-height:1rem;
                        font-size:.36rem;
                        background-color:#5EBBF4;
                        border-radius:.1rem;
                    }
                    .am-modal-transparent{
                        width:85%;
                    }
                `}</style>
                <div className={styles.header} onClick={()=>history.push('/userinfo')}>
                    <div className={styles.imgbox} style={{background:`url(${data.avatarUrl}) center no-repeat`}}></div>
                    <div className={styles.userinfo}>
                        <div>
                            <p>{data.tel}</p>
                            <div>{data.gold}金币</div>
                        </div>
                        <img src={icon01} alt=""/>
                    </div>
                </div>
                <div className={styles.credit}>
                    <h2>我的信用等级：{data.level}</h2>
                    <p>去提升，5000轻松拿</p>
                </div>
                <div className={styles.myloan}>
                    <h2>我的贷款</h2>
                    <div className={styles.menus}>
                        <div>
                            <img src={icon02} alt=""/>
                            <p>待完成订单</p>
                        </div>
                        <div>
                            <img src={icon03} alt=""/>
                            <p>待完成订单</p>
                        </div>
                        <div>
                            <img src={icon04} alt=""/>
                            <p>待完成订单</p>
                        </div>
                    </div>
                </div>
                <div className={styles.service}>
                    <h2>我的服务</h2>
                    <div className={styles.gridbox}>
                        {
                            menus.length>0?menus.map((item,index)=>(
                                <div className={styles.menus} key={index} onClick={()=>this.menuclick(index)}>
                                    <div style={{background:`url(${item.icon}) center no-repeat`}}></div>
                                    <span>{item.text}</span>
                                </div>
                            )):""
                        }
                    </div>
                </div>
                <Button type="primary" onClick={()=>this.loginOut()}>退出登录</Button>
                <Tabbar {...MyTabBar}></Tabbar>
                <Modal
                    visible={this.state.modal}
                    transparent
                    onClose={()=>this.setState({modal:false})}
                    title="联系方式"
                    >
                    <div className={styles.imgbox}>
                        <img src={info.pic} alt=""/>
                    </div>
                    <h3 style={{lineHeight:'.6rem'}}>扫码添加客服微信</h3>
                    <h2>电话：{info.tel}</h2>
                    <a href={'tel:'+`${info.tel}`}>立即拨打</a>
                    </Modal>
            </div>
        )
    }
}