import { useState } from "react"
import style from "./ArticleNavBar.module.scss"
import ArticleNavBarItem from "./ArticleNavBarItem"

const ArticleNavBar = ({ navListData }) => {
  const navList = [
    { id: 1, title: "后端" },
    { id: 2, title: "前端" },
    { id: 3, title: "后端" },
    { id: 4, title: "前端" },
    { id: 5, title: "后端" },
    { id: 6, title: "前端" },
    { id: 7, title: "后端" },
    { id: 8, title: "前端" },
    { id: 9, title: "后端" },
    { id: 10, title: "前端" },
    { id: 11, title: "后端" },
    { id: 12, title: "前端" }
  ]
  const filterNavList = navList.filter((item) => item.id <= 10)
  filterNavList.push({ id: 11, title: "展开" })

  let [newNavList, setNewNavList] = useState(filterNavList)

  function showRawData() {
    console.log("还原数据")
    setNewNavList(navList)
  }

  return (
    <div className={style["nav-list"]}>
      {newNavList.map((navitem) => (
        <ArticleNavBarItem
          key={navitem.id}
          navItemData={navitem}
          extend={showRawData}
        >
          {navitem.title === "展开" ? (
            <span className={style["triangle"]}>{navitem.title}</span>
          ) : (
            navitem.title
          )}
        </ArticleNavBarItem>
      ))}
    </div>
  )
}

export default ArticleNavBar
