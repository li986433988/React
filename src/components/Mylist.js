import React ,{Component} from 'react';
import styles from './style/List.less';
import shop from '../assets/shop.png';
export default class Mylist extends Component{
  render() {
      const data=this.props.data;
      return (
        <div className={styles.box} onClick={()=>this.props.Clickbtn(data.l_id,data.type)}>
            <div className={styles.imgbox}>
                <img src={data?(data.type?data.licai.logo:data.loan.logo):""} alt=""/>
            </div>
            <div className={styles.info}>
                <div>
                    <h2>{data?(data.type?data.licai.title:data.loan.title):""}</h2>
                    <span className={styles.status} style={{display:data.type?'none':'block'}}>{data?(!data.type?data.loan.is_diya:""):""}</span>
                </div>
                <div>
                    <p><span>{data?(data.type?"投资期限":"可贷"):""}</span><span>{data?(data.type?data.time+"年":data.money+"万元"):""}</span></p>
                    <p><span>{data?(data.type?"预计回报率":"月费率"):""}</span><span>{data?(data.type?data.licai.year:data.loan.poundage):""}%</span></p>
                </div>
                <div>
                    <span>{data?(data.type?"产品类型":"一次性费率"):""}</span><span>{data?(data.type?(data.licai.type==0?"理财保险":(data.licai.type==1?"信托理财":"公募基金")):data.loan.rate+"%"):""}</span>
                </div>
            </div>
        </div>
      )
  }
}
