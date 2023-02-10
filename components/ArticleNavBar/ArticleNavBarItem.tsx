import { NextPage } from "next"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import style from "./ArticleNavBarItem.module.scss"

const ArticleNavBarItem: NextPage<any> = ({
  navItemData,
  children,
  extend
}) => {
  let navItemRef: any = useRef()
  let linkRef: any = useRef()

  function addActive() {
    console.dir(linkRef.current)

    if (linkRef.current.id === "11" && linkRef.current.innerText === "展开") {
      extend()
      return
    }

    navItemRef.current.parentElement.childNodes.forEach((item) => {
      item.style.backgroundColor = "#fff"
      item.firstElementChild.style.color = "#8a9aa9"
    })
    navItemRef.current.style.backgroundColor = "#007fff"
    linkRef.current.style.color = "#fff"
  }

  useEffect(() => {
    if (navItemData.id === 1) {
      navItemRef.current.style.backgroundColor = "#007fff"
      linkRef.current.style.color = "#fff"
    }
  }, [])

  return (
    <div className={style["nav-item"]} ref={navItemRef}>
      <Link
        href="javascript:;"
        className={style["link"]}
        onClick={addActive}
        ref={linkRef}
        id={navItemData.id}
      >
        {children}
      </Link>
    </div>
  )
}

export default ArticleNavBarItem
