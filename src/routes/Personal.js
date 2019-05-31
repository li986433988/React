import React,{Component} from 'react';
import {connect} from 'dva';
import { routerRedux} from 'dva/router';
import {Clearstatus,loggedIn} from '../utils/axios';
import {Personalinfo} from '../services/home';
import arrayTreeFilter from 'array-tree-filter';
import { List, InputItem,Toast,Picker,Button} from 'antd-mobile';
import Title from '../components/Title';
import styles from './style/Personal.less';
const cityData  = require('../ssx');
@connect(state => ({
   home: state.home
}))
export default class Personal extends Component {
    state={
        visible1:false,
        visible2:false,
        visible3:false,
        visible4:false,
        visible5:false,
        visible6:false,
        visible7:false,
        visible8:false,
        visible9:false,
        name:"",
        id:"",
        phone:"",
        bill:"",
        pickerValue:[],
        housetype:[],
        detail:"",
        marriage:[],
        education:[],
        company:[],
        car:[],
        policy:[],
        accumulation:[],
        relation:[],
        emergency:""
    }
    UNSAFE_componentWillMount() {
        const {dispatch}=this.props;
        let user=loggedIn();
        if(!user){
            dispatch(routerRedux.push('/login'))
        }
    }
    InputName(val){
        this.setState({
            name:val
        })
    }
    InputIdcard(val){
        this.setState({
            id:val
        })
    }
    InputPhone(val){
        this.setState({
            phone:val
        })
    }
    InputBill(val){
        this.setState({
            bill:val
        })
    }
    InputDetailed(val){
        this.setState({
            detail:val
        })
    }
    InputContact(val){
        this.setState({
            emergency:val
        })
    }
    getSel() {
        const value =this.state.pickerValue;
        if (!value) {
          return '';
        }
        const treeChildren = arrayTreeFilter(cityData.globalData, (c, level) => c.value === value[level]);
        return treeChildren.map(v => v.label).join(',');
    }
    //提交资料
    async Agent(){
        const {dispatch}=this.props;
        const cityData = this.state.pickerValue;
        let data=""
        if(this.state.name===""){
            Toast.offline("请输入姓名",2);
            return;
        }
        if(this.state.id===""){
            Toast.offline("请输入身份证号",2);
            return;
        }
        if(this.state.phone===""){
            Toast.offline("请输入手机号码",2);
            return;
        }
        if(this.state.bill===""){
            Toast.offline("请填写邮箱",2);
            return;
        }
        
        if(cityData.length===2){
            const cityArr = (this.refs.cityInfo.props.extra+"").split(",");
            data = cityArr[0]+cityArr[1];
        }else if(cityData.length===3){
              const cityArr = (this.refs.cityInfo.props.extra+"").split(",");
              data= cityArr[0]+cityArr[1]+cityArr[2];
        }else{
              Toast.offline("请选择住宅地址",2);
              return;
        }
        if(this.state.housetype===""){
            Toast.offline("请选择房屋性质",2);
            return;
        }
        if(this.state.detail===""){
            Toast.offline("请填写详细地址",2);
            return;
        }
        if(this.state.marriage===""){
            Toast.offline("请选择婚姻状况",2);
            return;
        }
        if(this.state.education===""){
            Toast.offline("请选择学历",2);
            return;
        }
        if(this.state.company===""){
            Toast.offline("请选择单位性质",2);
            return;
        }
        if(this.state.car===""){
            Toast.offline("请选择是否有车",2);
            return;
        }
        if(this.state.policy===""){
            Toast.offline("请选择是否有保单",2);
            return;
        }
        if(this.state.accumulation===""){
            Toast.offline("请选择是否有公积金",2);
            return;
        }
        if(this.state.relation===""){
            Toast.offline("请选择紧急联系人关系",2);
            return;
        }
        if(this.state.emergency===""){
            Toast.offline("请填写紧急联系人手机号",2);
            return;
        }
        const result=await Personalinfo({name:this.state.name,card:this.state.id,phone:this.state.phone,
            email:this.state.bill,area:data,home_nature:this.state.housetype[0],address:this.state.detail,
            marriage:this.state.marriage[0],education:this.state.education[0],unit:this.state.company[0],
            is_car:this.state.car[0],is_warranty:this.state.policy[0],is_wages:this.state.accumulation[0],
            urgent_preson:this.state.relation[0],urgent_phone:this.state.emergency}).then(response => response)
        if(result.data.code==="ok" && result.status===200){
            Clearstatus()
            Toast.success(result.data.msg,2,function(){
                dispatch(routerRedux.push('/'))
            })
        }else{
            Toast.offline(result.data.msg,2)
        }
        
    }
    render(){
        const Titles={
            bgcolor:"#fff",
            tit:"填写个人资料",
            color:"#333333"
        }
        const relation=[
            {label:"父子",value: '父子'},
            {label:"父女",value:'父女'},
            {label:"母子",value:'母女'},
            {label:"姐弟",value:'姐弟'},
            {label:"姐妹",value:'姐妹'}
        ]
        const House=[
            {label:"自购全额",value: '自购全额'},
            {label:"按揭",value:'按揭'},
            {label:"租赁",value:'租赁'},
        ]
        const Marriage=[
            {label:"已婚",value: '已婚'},
            {label:"未婚",value:'未婚'},
            {label:"离异",value:'离异'},
        ]
        const Education=[
            {label:"本科",value: '本科'},
            {label:"专科",value: '专科'},
            {label:"其他",value: '其他'}
        ]
        const Company=[
            {label:"私营",value: '私营'},
            {label:"党政机关",value: '党政机关'},
            {label:"上市公司",value: '上市公司'},
            {label:"事业单位",value: '事业单位'}
        ]
        const Whether=[
            {label:"是",value: '是'},
            {label:"否",value: '否'},
        ]
        return (
            <div className={styles.App}>
                <style>{`
                    .am-list-item.am-input-item,.am-list-item{
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
                        padding:0 .2rem;
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
                        margin:.8rem auto 0;
                        color:#fff;
                        line-height:.8rem;
                        font-size:.36rem;
                        background-color:#5EBBF4;
                        border-radius:.1rem;
                    }
                `}</style>
                <Title {...Titles}></Title>
                <div className={styles.main}>
                    <h2>身份信息</h2>
                    <InputItem
                        placeholder="请输入中文姓名"
                        clear
                        maxLength="15"
                        onChange={this.InputName.bind(this)}
                        >姓名</InputItem>
                    <InputItem
                        placeholder="请输入18位身份证号码"
                        clear
                        maxLength="18"
                        onChange={this.InputIdcard.bind(this)}
                        >身份证号</InputItem>
                    <InputItem
                        type="number"
                        placeholder="请输入11位手机号码"
                        clear
                        maxLength="11"
                        onChange={this.InputPhone.bind(this)}
                        >手机号</InputItem>
                    <h2>个人信息</h2>
                    <InputItem
                        placeholder="用于接受信用卡账单"
                        clear
                        maxLength="20"
                        onChange={this.InputBill.bind(this)}
                        >邮箱</InputItem>
                    <Picker
                        visible={this.state.visible1}
                        data={cityData.globalData}
                        value={this.state.pickerValue}
                        onChange={v => this.setState({pickerValue: v })}
                        onOk={() => this.setState({ visible1: false })}
                        onDismiss={() => this.setState({ visible1: false })}>
                        <List.Item ref="cityInfo" arrow="horizontal" extra={this.getSel()} onClick={() => this.setState({ visible1: true })} >住宅地址</List.Item>
                    </Picker>
                    <Picker
                        visible={this.state.visible2}
                        data={House}
                        cols={1}
                        value={this.state.housetype}
                        onChange={v => this.setState({ housetype: v })}
                        onOk={() => this.setState({ visible2: false })}
                        onDismiss={() => this.setState({ visible2: false })}>
                        <List.Item arrow="horizontal" onClick={() => this.setState({ visible2: true })}>房屋购买性质</List.Item>
                    </Picker>
                    <InputItem
                        placeholder="无需重复填写省/市/区县"
                        clear
                        maxLength="20"
                        onChange={this.InputDetailed.bind(this)}
                        >详细地址</InputItem>
                    <Picker
                        visible={this.state.visible3}
                        data={Marriage}
                        cols={1}
                        value={this.state.marriage}
                        onChange={v => this.setState({ marriage: v })}
                        onOk={() => this.setState({ visible3: false })}
                        onDismiss={() => this.setState({ visible3: false })}>
                        <List.Item arrow="horizontal" onClick={() => this.setState({ visible3: true })} >婚姻状况</List.Item>
                    </Picker>
                    <Picker
                        visible={this.state.visible4}
                        data={Education}
                        cols={1}
                        value={this.state.education}
                        onChange={v => this.setState({ education: v })}
                        onOk={() => this.setState({ visible4: false })}
                        onDismiss={() => this.setState({ visible4: false })}>
                        <List.Item arrow="horizontal" onClick={() => this.setState({ visible4: true })}>学历</List.Item>
                    </Picker>
                    <Picker
                        visible={this.state.visible5}
                        data={Company}
                        cols={1}
                        value={this.state.company}
                        onChange={v => this.setState({ company: v })}
                        onOk={() => this.setState({ visible5: false })}
                        onDismiss={() => this.setState({ visible5: false })}>
                        <List.Item arrow="horizontal" onClick={() => this.setState({ visible5: true })}>单位性质</List.Item>
                    </Picker>
                    <Picker
                        visible={this.state.visible6}
                        data={Whether}
                        cols={1}
                        value={this.state.car}
                        onChange={v => this.setState({ car: v })}
                        onOk={() => this.setState({ visible6: false })}
                        onDismiss={() => this.setState({ visible6: false })}>
                        <List.Item arrow="horizontal" onClick={() => this.setState({ visible6: true })}>是否有车</List.Item>
                    </Picker>
                    <Picker
                        visible={this.state.visible7}
                        data={Whether}
                        cols={1}
                        value={this.state.policy}
                        onChange={v => this.setState({ policy: v })}
                        onOk={() => this.setState({ visible7: false })}
                        onDismiss={() => this.setState({ visible7: false })}>
                        <List.Item arrow="horizontal" onClick={() => this.setState({ visible7: true })}>是否有保单</List.Item>
                    </Picker>
                    <Picker
                        visible={this.state.visible8}
                        data={Whether}
                        cols={1}
                        value={this.state.accumulation}
                        onChange={v => this.setState({ accumulation: v })}
                        onOk={() => this.setState({ visible8: false })}
                        onDismiss={() => this.setState({ visible8: false })}>
                        <List.Item arrow="horizontal" onClick={() => this.setState({ visible8: true })}>是否有公积金</List.Item>
                    </Picker>
                    <h2>联系人</h2>
                    <Picker
                        cols={1}
                        visible={this.state.visible}
                        data={relation}
                        value={this.state.relation}
                        onChange={v => this.setState({ relation: v })}
                        onOk={() => this.setState({ visible: false })}
                        onDismiss={() => this.setState({ visible: false })}>
                        <List.Item arrow="horizontal" onClick={() => this.setState({ visible: true })}>紧急联系人关系</List.Item>
                    </Picker>
                    <InputItem
                        type="number"
                        placeholder="请输入手机号"
                        clear
                        maxLength="11"
                        onChange={this.InputContact.bind(this)}
                        >紧急联系人</InputItem>
                    <Button type="primary" onClick={()=>this.Agent()}>完成</Button>
                </div>
            </div>
        )
    }
}