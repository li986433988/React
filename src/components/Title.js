import React ,{Component} from 'react';
import styles from "./style/Title.less";
export default class Title extends Component{
  render() {
      return (
        <div className={styles.box} style={{backgroundColor:this.props.bgcolor}}>
          <div style={{backgroundImage:this.props.lbgimg}} onClick={this.props.leftFunc} className={styles.left}>
            <img src={this.props.leftbgimg} alt=""/>
          </div>
          <h2 style={{color:this.props.color}}>{this.props.tit}</h2>
          <div className={styles.right} onClick={this.props.rightFunc}>{this.props.right}</div>
        </div>
      )
  }
}
