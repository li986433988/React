import React,{Component} from 'react';
import {connect} from 'dva';
import { routerRedux} from 'dva/router';
import {loggedIn} from '../utils/axios';
import {List,Button,Toast} from 'antd-mobile';
import {GetInfo} from '../services/home';
import Title from '../components/Title';
import left from '../assets/left.png';
import styles from './style/Help.less';
@connect(state => ({
   home: state.home
}))
export default class Mineinfo extends Component {
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
        Toast.loading("加载中",1)
        const result=await GetInfo({});
        this.setState({
            data:result.data
        })
    }
    render(){
        const Titles={
            bgcolor:"#fff",
            lbgimg:'url('+left+')',
            tit:"个人信息",
            color:"#333333"
        }
        const {history}=this.props;
        const {data}=this.state;
        const Item=List.Item;
        return (
            <div className={styles.App}>
                <style>{`
                    .am-list-item{
                        height:1rem;
                        min-height:1rem;
                    }
                    .am-list-item .am-input-label,.am-list-item .am-list-line .am-list-content,.am-textarea-label,.am-list-item .am-input-control input,.am-textarea-control textarea,.am-list-item .am-list-line .am-list-extra{
                        font-size:.3rem;
                        color:#333333;
                    }
                    .am-list-item,.am-list-item.am-input-item{
                        padding:0;
                        border-bottom:.01rem solid #EEEEEE;
                    }
                    .am-list-item .am-list-line{
                        padding:0 .3rem;
                    }
                    .am-list-item .am-input-control input{
                        padding-right:.3rem;
                        text-align:right;
                    }
                    .am-list-item .am-input-control input::-webkit-input-placeholder{
                        text-align:right;
                    }
                    .am-list-item .am-list-line .am-list-extra{
                        flex-basis: 65%;
                    }
                    .am-list-item .am-input-label.am-input-label-5{
                        width:2rem;
                    }
                    .am-list-item .am-list-line .am-list-content,.am-list-item .am-input-label,.am-list-item .am-input-control input,.am-list-item .am-list-line .am-list-extra{
                        font-size:.25rem;
                        margin:0;
                    }
                    .am-button{
                        width:90%;
                        height:.8rem;
                        margin:.8rem auto;
                        color:#fff;
                        line-height:.8rem;
                        font-size:.36rem;
                        background-color:#5EBBF4;
                        border-radius:.1rem;
                    }
                `}</style>
                <Title {...Titles} leftFunc={()=>this.returnGoBack()}></Title>
                <div className={styles.main}>
                    <Item extra={data?data.name:""}>姓名</Item>
                    <Item extra={data?data.card:""}>身份证号</Item>
                    <Item extra={data?data.phone:""}>手机号</Item>
                    <Item extra={data?data.email:""}>邮箱</Item>
                    <Item extra={data?data.area:""}>住宅地址</Item>
                    <Item extra={data?data.home_nature:""}>房屋购买性质</Item>
                    <Item extra={data?data.address:""}>详细地址</Item>
                    <Item extra={data?data.marriage:""}>婚姻状况</Item>
                    <Item extra={data?data.education:""}>学历</Item>
                    <Item extra={data?data.is_car:""}>是否有车</Item>
                    <Item extra={data?data.is_warranty:""}>是否有保单</Item>
                    <Item extra={data?data.is_wages:""}>是否有公积金</Item>
                    <Item extra={data?data.urgent_phone:""}>紧急联系人</Item>
                    <Button type="primary" onClick={()=>history.push('/personal')}>编辑信息</Button>
                </div>
            </div>
        )
    }
}