import React,{Component} from 'react';
import {connect} from 'dva';
import {loggedIn} from '../utils/axios';
import { routerRedux} from 'dva/router';
import {Toast} from 'antd-mobile';
import * as Home from '../services/home';
import Title from '../components/Title';
import Tabbar from '../components/TabBar';
import styles from './style/Information.less';
@connect(state => ({
   home: state.home
}))
export default class Information extends Component {
    state={
        data:[]
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
        const result=await Home.Getnews().then(response => response);
        this.setState({
            data:result.data
        })
    }
    render(){
        const {history}=this.props;
        const Titles={
            bgcolor:"#fff",
            tit:"资讯",
            color:"#333333"
        }
        const MyTabBar={
            selectedTabBar:"information",history
        }
        const {data}=this.state;
        return (
            <div className={styles.App}>
                <style>{`
                    .text_hidden2{
                        -webkit-line-clamp:2;
                        line-height:.4rem;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        font-size:.25rem;
                      }
                `}</style>
                <Title {...Titles}></Title>
                <div className={styles.main}>
                    {
                        data.length>0?data.map((item,index)=>(
                            <div key={index} className={styles.list} onClick={()=>history.push('/newsinfo?id='+item.id)}>
                                <div>
                                    <p className="text_hidden2">{item.title}</p>
                                    <p className={styles.info}>
                                        <span>{item.addtime}</span><span>{item.num}次阅读</span>
                                    </p>
                                </div>
                                <img src={item.pic} alt=""/>
                            </div>
                        )):""
                    }
                </div>
                <Tabbar {...MyTabBar}></Tabbar>
            </div>
        )
    }
}