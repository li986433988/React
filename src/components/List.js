import React ,{Component} from 'react';
import styles from './style/List.less';
import shop from '../assets/shop.png';
export default class List extends Component{
  render() {
      const data=this.props.data;
      return (
        <div className={styles.box} onClick={()=>this.props.Clickbtn(data.id,data.type)}>
            <div className={styles.imgbox}>
                <img src={data?data.logo:""} alt=""/>
            </div>
            <div className={styles.info}>
                <div>
                    <h2>{data?data.title:""}</h2>
                    <span className={styles.status} style={{display:data.type?'none':'block'}}>{data?(!data.type?data.is_diya:""):""}</span>
                </div>
                <div>
                    <p><span>{data?(data.type?"投资期限":"可贷"):""}</span><span>{data?(data.type?data.min_max+"年":data.min_max+"万元"):""}</span></p>
                    <p><span>{data?(data.type?"预计回报率":"月费率"):""}</span><span>{data?(data.type?data.year:data.poundage):""}%</span></p>
                </div>
                <div>
                    <span>{data?(data.type?"产品类型":"一次性费率"):""}</span><span>{data?(data.type?data.leixing:data.rate+"%"):""}</span>
                </div>
            </div>
        </div>
      )
  }
}
