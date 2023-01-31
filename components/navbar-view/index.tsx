import Styles from "./navbar.module.css";
import React from "react";


function Navbarview():JSX.Element{
  return (
    <div>
      <div className={Styles.view_nav}>
        <div className={Styles.nav_list}>
          <a href="" className={`${Styles.nav_item} ${Styles.active}`}>
            <div className={Styles.category_popover_box}>
              <span>综合</span>
            </div>
          </a>
          <a href="" className={Styles.nav_item}>
            <div className={Styles.category_popover_box}>
              <span>关注</span>
            </div>
          </a>
          <a href="" className={Styles.nav_item}>
            <div className={Styles.category_popover_box}>
              <span>后端</span>
            </div>
          </a>
          <a href="" className={Styles.nav_item}>
            <div className={Styles.category_popover_box}>
              <span>前端</span>
            </div>
          </a>
          <a href="" className={Styles.nav_item}>
            {" "}
            <div className={Styles.category_popover_box}>
              <span>Android</span>
            </div>
          </a>
          <a href="" className={Styles.nav_item}>
            {" "}
            <div className={Styles.category_popover_box}>
              <span>iOS</span>
            </div>
          </a>
          <a href="" className={Styles.nav_item}>
            {" "}
            <div className={Styles.category_popover_box}>
              <span>人工智能</span>
            </div>
          </a>
          <a href="" className={Styles.nav_item}>
            {" "}
            <div className={Styles.category_popover_box}>
              <span>开发工具</span>
            </div>
          </a>
          <a href="" className={Styles.nav_item}>
            {" "}
            <div className={Styles.category_popover_box}>
              <span>代码人生</span>
            </div>
          </a>
          <a href="" className={Styles.nav_item}>
            {" "}
            <div className={Styles.category_popover_box}>
              <span>阅读</span>
            </div>
          </a>
          <a href="" className={`${Styles.nav_item} ${Styles.right}`}>
            {" "}
            <div className={Styles.category_popover_box}>
              <span>标签管理</span>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Navbarview;
