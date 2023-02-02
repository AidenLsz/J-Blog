import { IProps } from "@/stores/userAgent"
import React from "react"
import Styles from "../timeline_entrylist/timeline_entrylist.module.css"
import Image from "next/image"

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
      <li className={Styles.item}>
        <div className={Styles.advertisement}>
          <div className={Styles.meta_container}>
            <div className={Styles.user_message}>
              <a className={Styles.userbox}>
                <div className={Styles.popper_box}>
                  掘金酱
                </div>
              </a>
            </div>
            <div className={Styles.dividing}></div>
            <div className={Styles.date}>2小时前</div>
          </div>
          <div className={Styles.main}>
            <div className={Styles.info_box}>
              <a className={Styles.title}>1111111111111111111111111111111111111111111111111</a>
              <a className={Styles.description}>1111111111111111111111111111111111111111111111111111111111111111111111111111111111
              11111111111111111111111111111111111111111111111111111111111111
              1111111111111111111111111111111111111111111111111</a>
            </div>
              <Image alt="广告位" width={120} height={80} className={`${Styles.lazy} ${Styles.thumb}`} src='/969260ab77f2d99b3f047e0d3d7e09b7_100x100.awebp' />
            </div>
        </div>
      </li>
      {children}
    </div>
  )
}

export default Timeline_entrylist
