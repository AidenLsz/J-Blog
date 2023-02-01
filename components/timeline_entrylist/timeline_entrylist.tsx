import { IProps } from "@/stores/userAgent"
import React from "react"
import Styles from "../timeline_entrylist/timeline_entrylist.module.css"

function Timeline_entrylist({Data}:any,{ children }: IProps): JSX.Element {
  return (
    <div className={Styles.timeline_entrylist}>
      <header className={Styles.list_header}>
        <nav role="navigation" className={Styles.list_nav}>
          <ul className={Styles.nav_list}>
          {Data.map((post:any) => (
        <li className={`${Styles.nav_item} ${post.id==Data.length ? Styles.right: ""} ${post.id==1 ? Styles.active: ""} `} key={post.id}>
          <a>{post.attributes.title}</a>
          </li>
        ))}

          </ul>
        </nav>
      </header>
    </div>
  )
}

export default Timeline_entrylist
