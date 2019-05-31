import React,{Component} from 'react';
import {connect} from 'dva';
import { routerRedux} from 'dva/router';
import {loggedIn} from '../utils/axios';
import {GetRecomn} from '../services/home';
import {Toast} from 'antd-mobile';
import copy from 'copy-to-clipboard';
import Title from '../components/Title';
import left from '../assets/left.png';
import styles from './style/Recommend.less';
var QRCode = require('qrcode.react');
@connect(state => ({
   home: state.home
}))
export default class Recommend extends Component {
    state={
        data:""
    }
    UNSAFE_componentWillMount() {
        const {dispatch}=this.props;
        let user=loggedIn();
        if(!user){
            dispatch(routerRedux.push('/login'))
        }
    }
    async componentDidMount(){
        const result =await GetRecomn({})
        this.setState({
            data:result.data
        })
    }
    returnGoBack=()=>{
        const {dispatch}=this.props;
        dispatch(
          routerRedux.goBack()
        )
    }
    copyclick(){
        let val=this.state.data.code
        if(copy(val)){
            Toast.success("复制成功",2)
        }else{
            Toast.offline("复制失败",2)
        }
    }
    
    render(){
        const Titles={
            bgcolor:"#fff",
            tit:"好友推荐",
            color:"#333333",
            lbgimg:'url('+left+')',
        }
        const {data}=this.state;
        return (
            <div className={styles.App}>
                <Title {...Titles} leftFunc={()=>this.returnGoBack()}></Title>
                <div className={styles.main}>
                    <div className={styles.header}>
                        <div className={styles.imgbox}>
                            <div style={{background:`url(${data.avatarUrl}) center no-repeat`}}></div>
                        </div>
                        <div className={styles.info}>
                            <h2>{data.nickName}</h2>
                            <p>{data.tel}</p>
                        </div>
                    </div>
                    <div className={styles.qrcode}>
                        <QRCode value={"http://*********"+data.code} size={150}/>
                        <h2>推荐码：{data.code}</h2>
                        <div className={styles.copybtn} onClick={()=>this.copyclick()}>复制推荐码</div>
                    </div>
                </div>
            </div>
        )
    }
}