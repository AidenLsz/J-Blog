import {ExtendContext} from "@/stores/expend"
import {NextPage} from "next"
import {useContext} from "react"
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

const ArticleNavBar: NextPage<IArticleNavBarProp> = ({navList, isCard}) => {
    let {isExtend, setExtend} = useContext(ExtendContext)
    let navListData = navList.attributes.labels.data
    let tagList = navListData.map((v) => {
        return {id: '_' + v.id, attributes: v.attributes}
    })
    let bigNavId = navList.id
    const filterNavList = navListData.slice(0, 9)
    filterNavList.unshift({
        id: 0,
        attributes: {
            title: "全部",
            createdAt: "",
            updatedAt: "",
            publishedAt: ""
        }
    })
    filterNavList.push({
        id: 3333,
        attributes: {
            title: "展开",
            createdAt: "1",
            updatedAt: "",
            publishedAt: ""
        }
    })
    let newNavList: any = filterNavList

    function showRawData() {
        if (!isExtend) {
            setExtend(true)
            // setNewNavList(navListData)

            newNavList = navListData.unshift({
                id: 0,
                attributes: {
                    title: "全部",
                    createdAt: "",
                    updatedAt: "",
                    publishedAt: ""
                }
            })
        }
    }

    if (isExtend || isCard) {
        return (
            <div className={style["nav-list"]}>
                {
                    tagList.map((navitem) => (
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
                    isCard={isCard}
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
