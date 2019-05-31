import React ,{Component} from 'react';
import styles from './style/Tags.less';
export default class Tags extends Component{
  render() {
      const data=this.props.data;
      return (
        <div className={styles.box}>
            <style>{`

            `}</style>
            {
                data.length>0?data.map((item,index)=>
                    <div key={index} style={this.props.sec===index+1?this.props.active:this.props.style} onClick={()=>this.props.click(index+1)}>{item.tit}</div>
                ):""
            }
        </div>
      )
  }
}
