import React,{Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {APIHost} from '../utils/axios';
import * as Home from '../services/home';
import {transformFileToDataUrl} from './Base64';
import {Toast,Button} from 'antd-mobile';
import Title from '../components/Title';
import left from '../assets/left.png';
import bgimg from '../assets/load.png';
import styles from './style/Tovip.less';
@connect(state => ({
   home: state.home
}))
export default class Tovip extends Component {
    state={
        logo:"",
        imgs:[]
    }   
    async componentDidMount(){
        const res=await Home.Getpayimg({});
        this.setState({
            imgs:res.data
        })
    }
    returnGoBack=()=>{
        const {dispatch}=this.props;
        dispatch(
          routerRedux.goBack()
        )
    }
    async Agent(){
        let val=this.state.logo;
        const {dispatch}=this.props;
        if(val==""){
            Toast.offline("请上传付款凭证",2);
            return;
        }
        const res=await Home.AgentPAY({pic:val})
        if(res.data.code==1){
            Toast.success(res.data.msg,2,function(){
                dispatch(routerRedux.push('/'))
            })
        }else{
            Toast.offline(res.data.msg,2);
        }
    }
    //图片上传
    Upload (event,index){
        transformFileToDataUrl(event.target, async (base64)=> {
            var formData = new FormData();
            formData.append("imgFile",base64);
            const result= await Home.Uploadimg(formData).then(response => response);
            if(result.data.code==="ok" && result.status===200){
                this.setState({
                    logo:result.data.data
                })
            }else{
                Toast.offline(result.data.msg,2)
            }
        });
    }
    render(){
        const {history}=this.props;
        const Titles={
            bgcolor:"#fff",
            lbgimg:'url('+left+')',
            tit:"注册会员",
            color:"#333333"
        }
        const {logo,imgs}=this.state;
        return (
            <div className={styles.App}>
                <Title {...Titles} leftFunc={()=>this.returnGoBack()}></Title>
                <style>{`
                    .am-button-primary{
                        width:80%;
                        margin:1rem auto 2rem;
                        text-decoration: none !important;
                    }
                `}</style>
                <div className={styles.main}>
                    <div className={styles.paybox}>
                        <h2>扫描下方二维码付款</h2>
                        <div className={styles.payimgbox}>
                            <div>
                                <img src={imgs[1]} alt=""/>
                                <h2>支付宝付款码</h2>
                            </div>
                            <div>
                                <img src={imgs[0]} alt=""/>
                                <h2>微信付款码</h2>
                            </div>
                        </div>
                    </div>
                    <div className={styles.upload}>
                        <h2>上传付款凭证</h2>
                        <div className={styles.con}>
                            <label className={styles.imgbox} htmlFor="imgbox" style={{background:`url(${bgimg}) center no-repeat`,backgroundSize:'100%',display:logo?'none':'block'}}>
                                <input type="file" onChange={(event)=>this.Upload(event)} accept="image/*" id="imgbox"/>
                            </label>
                            <img  src={logo?logo:bgimg} style={logo?{display:'block'}:{display:"none"}} alt=""/>
                        </div>
                    </div>
                    <Button type="primary" onClick={()=>this.Agent()}>立即提交</Button>
                </div>
            </div>
        )
    }
}