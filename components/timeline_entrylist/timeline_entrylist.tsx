import { IProps } from "@/stores/userAgent"
import React from "react"
import Styles from "../timeline_entrylist/timeline_entrylist.module.css"

function Timeline_entrylist({ children }: IProps): JSX.Element {
  return (
    <div className={Styles.timeline_entrylist}>
      <header className={Styles.list_header}>
        <nav role="navigation" className={Styles.list_nav}>
          <ul className={Styles.nav_list}>
            <li className={Styles.nav_item}>111</li>
            <li className={Styles.nav_item}>111</li>
            <li className={Styles.nav_item}>111</li>
          </ul>
        </nav>
      </header>
    </div>
  )
}

export default Timeline_entrylist
