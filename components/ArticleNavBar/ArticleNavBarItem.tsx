import Link from "next/link"
import style from "./ArticleNavBarItem.module.scss"

const ArticleNavBarItem = () => {
  return (
    <div className={style[".nav-item"]}>
      <Link href="" className={style[".link"]}></Link>
    </div>
  )
}

export default ArticleNavBarItem
