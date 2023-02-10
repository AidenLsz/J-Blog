import { IProps } from "@/stores/userAgent"
import React, { useState } from "react"
import Styles from "../timeline_entrylist/timeline_entrylist.module.scss"
import Image from "next/image"
import { timeStamp } from "console"
import { LOCALDOMAIN, SERVERDOMAIN } from "@/utils"
import Advertisement from "./advertisement"
import {FC} from "react";
import {navBarViewData} from "@/components/navbar-view";


export interface timeLineEntryListProps {
    dataTab: navBarViewData
    dataAd: navBarViewData,
    handlerLoading: () => void
}


export interface DataAd extends navBarViewData {
    brief: string
}


export const Timeline_entrylist: FC<timeLineEntryListProps> = ({dataTab, dataAd,handlerLoading}) => {
const [active,setActive]=useState(1)

  return (
    <div className={Styles.timeline_entrylist}>
      <header className={Styles.list_header}>
        <nav role="navigation" className={Styles.list_nav}>
          <ul className={Styles.nav_list}>
                        {Object.values(dataTab).map((post: any) => (
              <li
                className={`${Styles.nav_item} ${
                                    post.id == Object.values(dataTab).length ? Styles.right : ""
                } ${post.id == active ? Styles.active : ""} `}
                key={post.id}
                onClick={()=>{setActive(post.id)}}
              >
                <a>{post.attributes.title}</a>
              </li>
            ))}
          </ul>
        </nav>
      </header>
            <Advertisement data={dataAd} article_tab={active} handlerLoading={handlerLoading}/>
            {/*<ArticleList>*/}

            {/*</ArticleList>*/}
    </div>
  )
}

export default Timeline_entrylist