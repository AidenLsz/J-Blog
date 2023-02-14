import { ExtendContext } from "@/stores/expend"
import { NextPage } from "next"
import { useContext, useState } from "react"
import style from "./ArticleNavBar.module.scss"
import ArticleNavBarItem from "./ArticleNavBarItem"


export interface IArticleNavBarProp {
  navList: smallNavBarList
  isCard: boolean
}
export interface smallNavBarLItemProp {
  id: number
  attributes: {
    title: string
    createdAt: string
    updatedAt: string
    publishedAt: string
  }
}
export interface smallNavBarList {
  id: number
  attributes: {
    title: string
    createdAt: string
    updatedAt: string
    publishedAt: string
    labels: {
      data: Array<smallNavBarLItemProp>
    }
    articles: Object
  }
}

const ArticleNavBar: NextPage<IArticleNavBarProp> = ({ navList, isCard }) => {

  let { isExtend, setExtend } = useContext(ExtendContext)
  let navListData = navList.attributes.labels.data
  let bigNavId = navList.id
  const filterNavList = navListData.slice(0, 9)
  filterNavList.push({
    id: 3333,
    attributes: {
      title: "展开",
      createdAt: "1",
      updatedAt: "",
      publishedAt: ""
    }
  })

  // let [newNavList, setNewNavList] = useState(filterNavList)
  let newNavList = filterNavList

  function showRawData() {
    console.log("还原数据")
    if (!isExtend) {
      setExtend(true)
      // setNewNavList(navListData)
      newNavList = navListData
    }
    return (
      <div className={style["nav-list"]}>
        {navListData.map((navitem) => (
          <ArticleNavBarItem
            key={navitem.id}
            navItemData={navitem}
            extend={showRawData}
            isCard={isCard}
            bigNavId={bigNavId}
          >
            {navitem.attributes.title}

          </ArticleNavBarItem>
        ))}
      </div>
    )
  }
  return (
    <div className={style["nav-list"]}>
      {newNavList.map((navitem) => (
        <ArticleNavBarItem
          key={navitem.id}
          navItemData={navitem}
          bigNavId={bigNavId}
          extend={showRawData}
        >
          {navitem.attributes.title === "展开" ? (
            <span className={style["triangle"]}>
              {navitem.attributes.title}
            </span>
          ) : (
            navitem.attributes.title
          )}
        </ArticleNavBarItem>
      ))}
    </div>
  )
}

export default ArticleNavBar
