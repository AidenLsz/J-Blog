import Styles from "./navbar.module.css";
import React from "react";


function Navbarview({Data_Nav}:any):JSX.Element{
  return (
    <div>
      
      <div className={Styles.view_nav}>
        <div className={Styles.nav_list}>

        {Data_Nav.map((post:any) => (
         <a key={post.attributes.tag} href="" className={
          `{
         ${Styles.nav_item} 
         ${post.id==1? Styles.active:null}
        }`
         }>
         <div className={Styles.category_popover_box}>
           <span>{post.attributes.title}</span>
         </div>
       </a>
        ))}

        </div>
      </div>
    </div>
  );
}

export default Navbarview;
