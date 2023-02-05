import { IProps } from "@/stores/userAgent"
import React from "react"
import Styles from "../timeline_entrylist/timeline_entrylist.module.css"
import Image from "next/image"
import { timeStamp } from "console"
import { LOCALDOMAIN, SERVERDOMAIN } from "@/utils"
import Advertisement from "./advertisement"



function Timeline_entrylist({Data_Tab,Data_Ad}:any): JSX.Element {
  return (
    <div className={Styles.timeline_entrylist}>
      <header className={Styles.list_header}>
        <nav role="navigation" className={Styles.list_nav}>
          <ul className={Styles.nav_list}>
          {Data_Tab.map((post:any) => (
        <li className={`${Styles.nav_item} ${post.id==Data_Tab.length ? Styles.right: ""} ${post.id==1 ? Styles.active: ""} `} key={post.id}>
          <a>{post.attributes.title}</a>
          </li>
        ))}

          </ul>
        </nav>
      </header> 
      <Advertisement data={Data_Ad}></Advertisement>
     {/* <ArticleList>

     </ArticleList> */}
    </div>
  )
}

export default Timeline_entrylist
