import React,{Component} from 'react';
import {connect} from 'dva';
import { routerRedux} from 'dva/router';
import {loggedIn} from '../utils/axios';
import {Toast} from 'antd-mobile';
import {Collectionlist} from '../services/home';
import left from '../assets/left.png';
import List from '../components/List';
import Title from '../components/Title';
import styles from './style/Collection.less';
@connect(state => ({
   home: state.home
}))
export default class Collection extends Component {
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
        const result=await Collectionlist()
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
    detailinfo(id,type){
        const {dispatch}=this.props;
        if(type){
            dispatch(routerRedux.push('/finadatails?id='+id))
        }else{
            dispatch(routerRedux.push('/loandetails?id='+id))
        }
    }
    render(){
        const Titles={
            bgcolor:"#fff",
            lbgimg:'url('+left+')',
            tit:"收藏列表",
            color:"#333333"
        }
        const {data}=this.state
        return (
            <div className={styles.App}>
                <style>{`
                    
                `}</style>
                <Title {...Titles} leftFunc={()=>this.returnGoBack()}></Title>
                <div className={styles.main}>
                    {
                        data.length>0?data.map((item,index)=>(
                            <List key={index} data={item} Clickbtn={(id,type)=>this.detailinfo(id,type)}></List>
                        )):""
                    }
                </div>
            </div>
        )
    }
}