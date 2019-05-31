import React,{Component} from 'react';
import {connect} from 'dva';
import { routerRedux} from 'dva/router';
import {loggedIn} from '../utils/axios';
import {TextareaItem,Button,Toast} from 'antd-mobile';
import {Opinion} from '../services/home';
import Title from '../components/Title';
import left from '../assets/left.png';
import styles from './style/Feedback.less';
@connect(state => ({
   home: state.home
}))
export default class Feedback extends Component {
    state={
        content:""
    }
    UNSAFE_componentWillMount() {
        const {dispatch}=this.props;
        let user=loggedIn();
        if(!user){
            dispatch(routerRedux.push('/login'))
        }
    }
    returnGoBack=()=>{
        const {dispatch}=this.props;
        dispatch(
          routerRedux.goBack()
        )
    }
    onchange(val){
        this.setState({
            content:val
        })
    }
    //提交
    async Agent(){
        const {dispatch}=this.props;
        let content=this.state.content;
        const result=await Opinion({feedback:content})
        if(result.data.code==="ok" && result.status===200){
            Toast.success("提交成功",2,function(){
                dispatch(routerRedux.push('/mine'))
            })
        }else{
            Toast.offline(result.data.msg,2)
        }
    }
    render(){
        const Titles={
            bgcolor:"#fff",
            lbgimg:'url('+left+')',
            tit:"意见反馈",
            color:"#333333"
        }
        return (
            <div className={styles.App}>
                <style>{`
                    .am-textarea-has-count{
                        padding:0 .1rem;
                        border:.01rem solid #D3D3D3;
                    }
                    .am-button{
                        width:30%;
                        height:.6rem;
                        margin:.6rem auto 0;
                        color:#fff;
                        line-height:.6rem;
                        font-size:.3rem;
                        background-color:#36A2EE;
                        border-radius:.3rem;
                        text-decoration:none !important;
                    }
                `}</style>
                <Title {...Titles} leftFunc={()=>this.returnGoBack()}></Title>
                <div className={styles.main}>
                <TextareaItem
                    rows={5}
                    count={200}
                    autoHeight={true}
                    onChange={val=>this.onchange(val)}
                    />
                <Button type="primary" onClick={()=>this.Agent()}>发送</Button>
                </div>
            </div>
        )
    }
}