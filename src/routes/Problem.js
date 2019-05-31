import React,{Component} from 'react';
import {connect} from 'dva';
import { routerRedux} from 'dva/router';
import {loggedIn} from '../utils/axios';
import {GetHelpinfo} from '../services/home';
import {Toast} from 'antd-mobile';
import Title from '../components/Title';
import left from '../assets/left.png';
import styles from './style/Problem.less';
@connect(state => ({
   home: state.home
}))
export default class Problem extends Component {
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
        Toast.loading("加载中",1)
        const queryString = require('query-string');
        const {location}=this.props;
        if(location.search!==""){
            const parsed = queryString.parse(location.search);
            const result=await GetHelpinfo(parsed.id);
            this.setState({
                data:result.data
            })
        }
    }
    returnGoBack=()=>{
        const {dispatch}=this.props;
        dispatch(
          routerRedux.goBack()
        )
    }
    //处理富文本
  htmlspecialchars_decode(str){
  return str;
}
    render(){
        const Titles={
            bgcolor:"#fff",
            lbgimg:'url('+left+')',
            tit:"问题",
            color:"#333333"
        }
        const {data}=this.state;
        const html=this.htmlspecialchars_decode(data.content)
        return (
            <div className={styles.App}>
                <Title {...Titles} leftFunc={()=>this.returnGoBack()}></Title>
                <div className={styles.main}>
                    <h2>{data.title}</h2>
                    <div dangerouslySetInnerHTML={{__html:html}} className={styles.shopinfo}></div>
                </div>
            </div>
        )
    }
}