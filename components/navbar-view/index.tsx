import Styles from "./navbar.module.css"
import React, { FC, useRef, useState } from "react"
import ArticleNavBar from "../ArticleNavBar/ArticleNavBar"
import { debounce, throttle } from "@/utils"
import Link from "next/link"
import { useRouter } from "next/router"

export interface navBarViewData {
  id: number
  attributes: {
    title: string
    createdAt: string
    updatedAt: string
    publishedAt: string
  }
}

export interface navBarViewProps {
  dataNav: navBarViewData
  IsFixed?: boolean
}

export const Navbarview: FC<navBarViewProps> = ({ dataNav, IsFixed }) => {
  let cardRef: any = useRef()
  let smallNavBarRef: any = useRef()
  let [activeIndex, setActiveIndex] = useState(1)
  let route = useRouter()

  let isKeep = false
  function addActive(id) {
    if (id === 1 || id === 2) {
      smallNavBarRef.current.style.display = "none"
    } else {
      smallNavBarRef.current.style.display = "block"
    }

    setActiveIndex(id)
    // route.push({ pathname: "./[bigid]", query: { bigid: id } })
    // 修改ArticleNavBar数据
  }
  // 显示card类型的元素
  function showArticleNavBar(e) {
    cardRef.current.style.display = "block"
    cardRef.current.style.left = `${e.relatedTarget.offsetLeft}px`
    // 修改ArticleNavBar数据
  }
  // 关闭card
  function closeArticleNavBar() {
    setTimeout(() => {
      if (!isKeep) {
        cardRef.current.style.display = "none"
      }
    }, 100)
  }
  // 关闭card
  function closeShow() {
    isKeep = false
    cardRef.current.style.display = "none"
  }

  return (
    <div>
      <div className={`${Styles.view_nav} ${IsFixed ? Styles.fixed : ""}`}>
        <div className={Styles.nav_list}>
          {Object.values(dataNav).map((post: navBarViewData) => (
            <Link
              key={post.id}
              href=""
              onClick={addActive.bind(this, post.id)}
              className={`{
         ${Styles.nav_item} 
         ${post.id == activeIndex ? Styles.active : null}
        }`}
            >
              <div className={Styles.category_popover_box}>
                <span
                  onMouseEnter={throttle(showArticleNavBar.bind(this), 200)}
                  onMouseLeave={throttle(closeArticleNavBar.bind(this), 200)}
                >
                  {post.attributes.title}
                </span>
              </div>
              <div
                className={Styles.card}
                ref={cardRef}
                onMouseEnter={() => (isKeep = true)}
                onMouseLeave={closeShow}
              >
                <ArticleNavBar isCard={true}></ArticleNavBar>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div ref={smallNavBarRef} className={Styles.smallNavBar}>
        <ArticleNavBar isCard={false}></ArticleNavBar>
      </div>
    </div>
  )
}

export default Navbarview
