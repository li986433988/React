import React ,{Component} from 'react';
import styles from './style/Financing.less';
import arrayTreeFilter from 'array-tree-filter';
import { WhiteSpace , List,Picker } from 'antd-mobile';
import btn from '../assets/btn.png';
import shop from '../assets/shop.png';
export default class Financing extends Component{
  render() {
      const data=this.props.data?this.props.data:"";
      return (
        <div className={styles.box}>
            <div className={styles.header}>
                <div className={styles.imgbox}>
                    <img src={data.logo} alt=""/>
                </div>
                <div className={styles.info}>
                    <h2>{data.title}</h2>
                    <p>
                        {data.content}
                    </p>
                    <h3 style={{display:data.diff?'none':'block'}}>{data.is_diya}</h3>
                </div>
            </div>
            <div className={styles.content}>
                <div className={styles.left}>
                    <div>
                        <h3>金额</h3>
                        <div className={styles.conbox}>
                            <input type="number" onChange={this.props.change} onBlur={data.diff?()=>{}:this.props.render} placeholder={data.diff?data.buy_min:data.limit_min}/>
                            <span>万</span>
                        </div>
                    </div>
                    <p>{data.diff?"购买范围":"额度范围"}：{data.diff?data.buy_min:data.limit_min}万-{data.diff?data.buy_max:data.limit_max}万</p>
                </div>
                <div className={styles.right}>
                    <div>
                        <h3>期限</h3>
                        <div className={styles.conbox}>
                            <h3>{this.props.term?this.props.term:(data.diff?data.time_min+"个月":data.term_min+"个月")}</h3>
                            <img src={btn} alt="" onClick={this.props.modalclick}/>
                        </div>
                    </div>
                    <p>{data.diff?"投资期限":"期限范围"}：{data.diff?data.time_min:data.term_min}个月-{data.diff?data.time_max:data.term_max}个月</p>
                </div>
            </div>
        </div>
      )
  }
}
