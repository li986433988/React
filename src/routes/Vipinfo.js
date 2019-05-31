import React,{Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {APIHost} from '../utils/axios';
import {GetVipInfo} from '../services/home';
import {Button, Toast} from 'antd-mobile';
import Title from '../components/Title';
import left from '../assets/left.png';
import styles from './style/Vipinfo.less';
@connect(state => ({
   home: state.home
}))
export default class VIP extends Component {
    state={
        data:{},
        status:""
    }   
    async componentDidMount(){
        const result=await GetVipInfo();
        this.setState({
            data:result.data,
        })
    }
    returnGoBack=()=>{
        const {dispatch}=this.props;
        dispatch(
          routerRedux.goBack()
        )
    }
    //处理富文本
    htmlspecialchars_decode(str, APIHost){
        str = str.replace(/&amp;/g, '&');
        str = str.replace(/&lt;/g, '<');
        str = str.replace(/&gt;/g, '>');
        str = str.replace(/&quot;/g, '"');
        str = str.replace(/&#039;/g, "'");
        str = str.replace(/\/ueditor/g,APIHost+'/ueditor' );
        return str;
    }
    getVip(){
        const _this=this;
        Toast.offline("您的身份属于银行，认证通过即可成为VIP",2,function(){
            _this.returnGoBack()
        })
    }
    render(){
        const {history}=this.props;
        const Titles={
            bgcolor:"#fff",
            lbgimg:'url('+left+')',
            tit:"会员说明",
            color:"#333333"
        }
        const {data}=this.state;
        let value=data.content?data.content:"";
        const html=this.htmlspecialchars_decode(value,APIHost)
        return (
            <div className={styles.App}>
                <Title {...Titles} leftFunc={()=>this.returnGoBack()}></Title>
                <style>{`
                    .am-button-primary{
                        width:80%;
                        margin:1rem auto .5rem;
                        text-decoration: none !important;
                    }
                `}</style>
                <div className={styles.main}>
                    <div dangerouslySetInnerHTML={{__html:html}} className={styles.shopinfo}></div>
                    <Button type="primary" onClick={data?(data.identity==1?()=>this.getVip():()=>history.push('/tovip')):""}>已阅读，立即注册会员</Button>
                </div>
            </div>
        )
    }
}