import { IProps } from "@/stores/userAgent"
import React from "react"
import Styles from "../timeline_entrylist/timeline_entrylist.module.css"
import Image from "next/image"
import { timeStamp } from "console"
import { LOCALDOMAIN } from "@/utils"

function TimeCal(date: string): string {
  let timestamp = new Date()
  let cur_year = timestamp.getFullYear()
  let cur_month = timestamp.getMonth() + 1
  let cur_day = timestamp.getDate()
  let cur_hour = timestamp.getHours()
  let cur_min = timestamp.getMinutes()
  let cur_sec = timestamp.getSeconds()
  let year = Number(date.slice(0, 4))
  console.log(year)
  let gap_year = cur_year - year
  if (gap_year > 0) {
    return gap_year.toString() + "年前"
  }
  if (gap_year < 0) {
    return "时间计算错误"
  }
  let month = Number(date.slice(5, 7))
  let gap_month = cur_month - month
  if (gap_month > 0) {
    return gap_month.toString() + "月前"
  }
  if (gap_month < 0) {
    return "时间计算错误"
  }
  let day = Number(date.slice(8, 10))
  let gap_day = cur_day - day
  if (gap_day > 0) {
    return gap_day.toString() + "天前"
  }
  if (gap_day < 0) {
    return "时间计算错误"
  }
  let hour = Number(date.slice(11, 13))
  let gap_hour = cur_hour - hour
  if (gap_hour > 0) {
    return gap_hour.toString() + "小时前"
  }
  if (gap_hour < 0) {
    return "时间计算错误"
  }
  let sec = Number(date.slice(11, 13))
  let gap_sec = cur_sec - sec
  if (gap_sec > 0) {
    return gap_sec.toString() + "秒前"
  }
  return "时间计算有误"
}

function Timeline_entrylist({ Data_Tab, Data_Ad }: any): JSX.Element {
  return (
    <div className={Styles.timeline_entrylist}>
      <header className={Styles.list_header}>
        <nav role="navigation" className={Styles.list_nav}>
          <ul className={Styles.nav_list}>
            {Data_Tab.map((post: any) => (
              <li
                className={`${Styles.nav_item} ${
                  post.id == Data_Tab.length ? Styles.right : ""
                } ${post.id == 1 ? Styles.active : ""} `}
                key={post.id}
              >
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
                  {Data_Ad[0].attributes.AuthorName}
                </div>
              </a>
            </div>
            <div className={Styles.dividing}></div>
            <div className={Styles.date}>
              {TimeCal(Data_Ad[0].attributes.updatedAt)}
            </div>
          </div>
          <div className={Styles.main}>
            <div className={Styles.info_box}>
              <a className={Styles.title}>{Data_Ad[0].attributes.title}</a>
              <a className={Styles.description}>
                {Data_Ad[0].attributes.description}
              </a>
            </div>
            <Image
              alt="广告位"
              width={120}
              height={80}
              className={`${Styles.lazy} ${Styles.thumb}`}
              src={`http://127.0.0.1:1337${Data_Ad[0].attributes.image.data[0].attributes.url}`}
            />
          </div>
        </div>
      </li>
    </div>
  )
}

export default Timeline_entrylist
