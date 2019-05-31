import React,{Component} from 'react';
import {connect} from 'dva';
import { routerRedux} from 'dva/router';
import {loggedIn} from '../utils/axios';
import {GetHelptype} from '../services/home';
import { Accordion,Toast} from 'antd-mobile';
import Title from '../components/Title';
import left from '../assets/left.png';
import dot from '../assets/dot.png';
import styles from './style/Help.less';
const queryString = require('query-string');
@connect(state => ({
   home: state.home
}))
export default class Probtype extends Component {
    state={
        name:"",
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
        const {location}=this.props;
        const parsed = queryString.parse(location.search);
        if(parsed){
            const result=await GetHelptype(parsed.type);
            this.setState({
                data:result.data,
                name:parsed.name
            })
        }
    }
    onChange = (key) => {

    }
    render(){
        const Titles={
            bgcolor:"#fff",
            lbgimg:'url('+left+')',
            tit:`${this.state.name}`,
            color:"#333333"
        }
        const {history}=this.props;
        const {data}=this.state;
        return (
            <div className={styles.App}>
                <style>{`
                    .fireprobloms{
                        display: flex;
                        height: .6rem;
                        justify-content: flex-start;
                        align-items: center;
                    }
                    .fireprobloms >img{
                        width: .15rem;
                        height: .15rem;
                        margin-right: .2rem;
                    }
                    .fireprobloms >p{
                        line-height: .6rem;
                    }
                    .am-accordion .am-accordion-item .am-accordion-content .am-accordion-content-box{
                        padding:0 .2rem;
                    }
                `}</style>
                <Title {...Titles} leftFunc={()=>this.returnGoBack()}></Title>
                <div className={styles.main}>
                    <Accordion  accordion className="my-accordion" onChange={this.onChange}>
                        {
                            data.length>0?data.map((item,index)=>(
                                <Accordion.Panel header={item.title} key={index}>
                                    {
                                        item.children.map((con,conindex)=>(
                                            <div key={conindex} className="fireprobloms" onClick={()=>history.push('/problem?id='+con.id)}>
                                                <img src={dot} alt=""/>
                                                <p>{con.title}</p>
                                            </div>
                                        ))
                                    }
                                </Accordion.Panel>
                            )):""
                        }
                        
                        {/* <Accordion.Panel header="2">
                        this is panel content2 or other
                        </Accordion.Panel>
                        <Accordion.Panel header="3">
                            text text text text text text text text text text text text text text text
                        </Accordion.Panel> */}
                    </Accordion>
                </div>
            </div>
        )
    }
}