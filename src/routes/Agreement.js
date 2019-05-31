import React,{Component} from 'react';
import {connect} from 'dva';
import { routerRedux} from 'dva/router';
import {APIHost} from '../utils/axios';
import {Toast} from 'antd-mobile';
import Title from '../components/Title';
import left from '../assets/left.png';
import {GetAgreement} from '../services/home';
import styles from './style/Newsinfo.less';
@connect(state => ({
   home: state.home
}))
export default class Agreement extends Component {
    state={
        data:""
    }
    returnGoBack=()=>{
        const {dispatch}=this.props;
        dispatch(
          routerRedux.goBack()
        )
    }
    async componentDidMount(){
        Toast.loading("加载中",1)
        const result=await GetAgreement();
        this.setState({
            data:result.data
        })
    }
    //处理富文本
  htmlspecialchars_decode(str){
    str = str.replace(/&amp;/g, '&');
    str = str.replace(/&lt;/g, '<');
    str = str.replace(/&gt;/g, '>');
    str = str.replace(/&quot;/g, '"');
    str = str.replace(/&#039;/g, "'");
    str = str.replace(/\/ueditor/g,APIHost+'/ueditor');
    return str;
  }
    render(){
        const Titles={
            bgcolor:"#fff",
            lbgimg:'url('+left+')',
            tit:"服务协议",
            color:"#333333"
        }
        const {data}=this.state;
        let content=data?data.content:"";
        const html=this.htmlspecialchars_decode(content)
        return (
            <div className={styles.App}>
                <style>{`
                    
                `}</style>
                <Title {...Titles} leftFunc={()=>this.returnGoBack()}></Title>
                <div className={styles.main}>
                    <h2>{data.title}</h2>
                    <div dangerouslySetInnerHTML={{__html:html}} className={styles.shopinfo}></div>
                </div>
            </div>
        )
    }
}