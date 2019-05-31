import React from 'react';
import styles from "./style/tabBar.css";
import Tab4 from "../assets/tab4.png";
import Tab41 from "../assets/tab41.png"
import Tab2 from "../assets/tab2.png";
import Tab21 from "../assets/tab21.png"
import Tab3 from "../assets/tab3.png";
import Tab31 from "../assets/tab31.png"
import Tab1 from "../assets/tab1.png";
import Tab11 from "../assets/tab11.png";
import { Toast } from 'antd-mobile';
const MyTabBar=({selectedTabBar,history}) =>{
  return(
    <div  className={styles.tabBarAll}>
          <div className={styles.tabBarItem} onClick={()=>history.push('/')}>
            <div className={styles.tabBarItemInfo}>
              <div className={styles.tabBarItemInfoIcon} style={{background:`url(${selectedTabBar==='home'?Tab11:Tab1}) center center no-repeat`,backgroundSize:'contain'}}></div>
              <span className={selectedTabBar==='home'?styles.tabBarItemInfoTextActive:styles.tabBarItemInfoText}>首页</span>
            </div>
          </div>
          <div className={styles.tabBarItem} onClick={()=>history.push('/information')}>
            <div className={styles.tabBarItemInfo}>
              <div className={styles.tabBarItemInfoIcon} style={{background:`url(${selectedTabBar==='information'?Tab21:Tab2}) center center no-repeat`,backgroundSize:'contain'}}></div>
              <span className={selectedTabBar==='information'?styles.tabBarItemInfoTextActive:styles.tabBarItemInfoText}>资讯</span>
            </div>
          </div>
          <div className={styles.tabBarItem} onClick={()=>Toast.offline("努力完善中",2)} >
          {/* onClick={()=>history.push('/mall')} */}
            <div className={styles.tabBarItemInfo}>
              <div className={styles.tabBarItemInfoIcon} style={{background:`url(${selectedTabBar==='mall'?Tab31:Tab3}) center center no-repeat`,backgroundSize:'contain'}}></div>
              <span className={selectedTabBar==='mall'?styles.tabBarItemInfoTextActive:styles.tabBarItemInfoText}>积分商城</span>
            </div>
          </div>
          <div className={styles.tabBarItem} onClick={()=>history.push('/mine')}>
            <div className={styles.tabBarItemInfo}>
              <div className={styles.tabBarItemInfoIcon} style={{background:`url(${selectedTabBar==='mine'?Tab41:Tab4}) center center no-repeat`,backgroundSize:'contain'}}></div>
              <span className={selectedTabBar==='mine'?styles.tabBarItemInfoTextActive:styles.tabBarItemInfoText}>我的</span>
            </div>
          </div>
	  </div>
  )
}

export default MyTabBar
