import React,{Component} from 'react';
import {connect} from 'dva';
import { routerRedux} from 'dva/router';
import {loggedIn} from '../utils/axios';
import {GetHelp} from '../services/home';
import Title from '../components/Title';
import {Toast} from 'antd-mobile';
import left from '../assets/left.png';
import dot from '../assets/dot.png';
import icon01 from '../assets/problom0.png';
import icon02 from '../assets/problom1.png';
import icon03 from '../assets/problom2.png';
import styles from './style/Help.less';
@connect(state => ({
   home: state.home
}))
export default class Help extends Component {
    state={
        data:[]
    }
    returnGoBack=()=>{
        const {dispatch}=this.props;
        dispatch(
          routerRedux.goBack()
        )
    }
    UNSAFE_componentWillMount() {
        const {dispatch}=this.props;
        let user=loggedIn();
        if(!user){
            dispatch(routerRedux.push('/login'))
        }
    }
    async componentDidMount(){
        const result=await GetHelp({});
        Toast.loading("加载中",1)
        this.setState({
            data:result.data
        })
    }
    render(){
        const Titles={
            bgcolor:"#fff",
            lbgimg:'url('+left+')',
            tit:"帮助中心",
            color:"#333333"
        }
        const {history}=this.props;
        const {data}=this.state;
        return (
            <div className={styles.App}>
                <style>{`
                    
                `}</style>
                <Title {...Titles} leftFunc={()=>this.returnGoBack()}></Title>
                <div className={styles.main}>
                    <h2>问题类型</h2>
                    <div className={styles.menus}>
                        <div onClick={()=>history.push('/probtype?name=贷款问题&type=1')}>
                            <img src={icon01} alt=""/>
                            <p>贷款问题</p>
                        </div>
                        <div onClick={()=>history.push('/probtype?name=理财问题&type=2')}>
                            <img src={icon02} alt=""/>
                            <p>理财问题</p>
                        </div>
                        <div onClick={()=>history.push('/probtype?name=账户问题&type=3')}>
                            <img src={icon03} alt=""/>
                            <p>账户问题</p>
                        </div>
                    </div>
                    <h2>热门问题</h2>
                    <div className={styles.fire}>
                        {
                            data.length>0?data.map((item,index)=>(
                                <div key={index} className={styles.fireproblom} onClick={()=>history.push('/problem?id='+item.id)}>
                                    <img src={dot} alt=""/>
                                    <p>{item.title}</p>
                                </div>
                            )):""
                        }
                    </div>
                </div>
            </div>
        )
    }
}