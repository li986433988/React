import React ,{Component} from 'react';
import styles from './style/Uploadimg.less';
import {APIHost} from '../utils/axios';
import camera from '../assets/camera.png';
export default class Uploadimg extends Component{
  render() {
      const data=this.props.data;
      return (
        <div>
            {
                data.length>0?data.map((item,index)=>
                    <div className={styles.box} key={index}>
                        <h2>{item.tit}</h2>
                        <div className={styles.con}>
                            <label className={styles.imgbox} htmlFor={"imgbox"+index} style={{background:`url(${item.srcimg!==""?item.srcimg:item.bgimg}) center no-repeat`,}}>
                                <input type="file" onChange={(event)=>this.props.UploadImg(event,index)} accept="image/*" id={"imgbox"+index}/>
                                <img src={camera} className={styles.camera} alt="" style={{display:item.srcimg!==""?'none':'block'}}/>
                            </label>
                            <p>{item.con}</p>
                        </div>
                    </div>
                ):""
            }
        </div>
      )
  }
}
