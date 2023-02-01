import { NextPage } from 'next'
import Image from 'next/image'
import { useEffect, useState,useContext } from 'react'
import styles from './FixedBtn.module.scss'
import {ThemeContext} from "@/stores/theme";
import {Themes} from "@/constants/enum";

const FixedBtn: NextPage = () => {
  const [IsShow, setIsShow] = useState(false)
  const {theme,setTheme} = useContext(ThemeContext)
  // 监听滚动事件
  useEffect(() => {
    document.addEventListener('scroll', handlerScroll)
    return () => {
      document.removeEventListener('scroll', handlerScroll)
    }
  }, [])

  // 滚动事件处理函数
  const handlerScroll = () => {
    const scrollTop =document.documentElement.scrollTop || document.body.scrollTop
    if (scrollTop > 830) {
      setIsShow(true)
    } else {
      setIsShow(false)
    }
  }

  const backTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <div className={styles.fixed_btn}>
      <div
        className={`${styles.fixed_btn_item} ${!IsShow ? styles.hide : ''}`}
        onClick={backTop}
      >
        <i className={`${styles.back_top} fas fa-arrow-up`}></i>
      </div>
      <div className={styles.fixed_btn_item}>
        <a href="/feedback">
          <i className="fas fa-comment-alt"></i>
        </a>
      </div>
      <div className={styles.fixed_btn_item}
           onClick={(): void => {
             if (theme === Themes.light) {
               setTheme(Themes.dark)
             } else {
               setTheme(Themes.light)
             }
           }}
      >
      </div>
    </div>
  )
}

export default FixedBtn
