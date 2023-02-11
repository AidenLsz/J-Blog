import { NextPage } from "next"
import Link from "next/link"
import { useContext, useEffect, useRef, useState } from "react"
import style from "./ArticleNavBarItem.module.scss"
import { ExtendContext } from "@/stores/expend"

const ArticleNavBarItem: NextPage<any> = ({
  navItemData,
  children,
  extend,
  isCard
}) => {
  let navItemRef: any = useRef()
  let linkRef: any = useRef()
  let { setExtend, active, setActive } = useContext(ExtendContext)

  function addActive(id) {
    // 当是card点击的时候，要将其展开
    if (isCard) {
      setExtend(true)
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
  }

  // useEffect(() => {
  //   if (navItemData.id === 1) {
  //     navItemRef.current.style.backgroundColor = "#007fff"
  //     linkRef.current.style.color = "#fff"
  //   }
  // }, [])

  return (
    <div
      className={`${isCard ? style["nav-item-card"] : style["nav-item"]} ${
        navItemData.id === active ? style["active"] : ""
      }`}
      ref={navItemRef}
    >
      <Link
        href="javascript:;"
        className={`${style["link"]} ${
          navItemData.id === active ? style["activelink"] : ""
        }`}
        onClick={addActive.bind(this, navItemData.id)}
        ref={linkRef}
      >
        {children}
      </Link>
    </div>
  )
}

export default ArticleNavBarItem
