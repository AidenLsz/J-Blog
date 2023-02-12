import { NextPage } from "next"
import { useContext, useEffect, useRef, useState } from "react"
import style from "./ArticleNavBarItem.module.scss"
import { ExtendContext } from "@/stores/expend"
import { useRouter } from "next/router"

const ArticleNavBarItem: NextPage<any> = ({
  navItemData,
  children,
  extend,
  isCard,
  bigNavId
}) => {
  let navItemRef: any = useRef()
  let linkRef: any = useRef()
  let { active, setActive } = useContext(ExtendContext)
  let route = useRouter()

  function addActive(id) {
    // 当是card点击的时候，要将其展开
    if (isCard) {
      // setExtend(true)
      // 点击完成，将卡片隐藏
      navItemRef.current.parentNode.parentNode.style.display = "none"
    }
    // 当点击的时候是展开的时候，将他展开，告诉父组件还原展开值
    if (linkRef.current.innerText === "展开") {
      extend()
      return
    }
    // 添加点击效果
    setActive(id)
    // 路由跳转
    // route.push({
    //   pathname: "/[bigid]/[smallid]",
    //   query: { bigid: bigNavId, smallid: id }
    // })
  }

  return (
    <div
      className={`${isCard ? style["nav-item-card"] : style["nav-item"]} ${
        navItemData.id === active ? style["active"] : ""
      }`}
      ref={navItemRef}
    >
      <div
        className={`${style["link"]} ${
          navItemData.id === active ? style["activelink"] : ""
        }`}
        onClick={addActive.bind(this, navItemData.id)}
        ref={linkRef}
      >
        {children}
      </div>
    </div>
  )
}

export default ArticleNavBarItem
