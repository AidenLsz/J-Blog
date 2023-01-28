import { NextPage } from "next"
import Image from "next/image"
import styles from "./NavBar.module.scss"
import { useContext, useEffect, useState } from "react"
import { ThemeContext } from "@/stores/theme"
import { Themes } from "@/constants/enum"
import { usePathname } from "next/navigation"

export interface INavBarItemProps {
  id: number
  name: string
  url: string
}

export interface INavBarProps {
  NavData: INavBarItemProps[]
}

const NavBar: NextPage<INavBarProps> = ({ NavData }) => {
  const [IsHide, setIsHide] = useState<boolean>(false)
  const { theme, setTheme } = useContext(ThemeContext)
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [IsFocus, setIsFocus] = useState<boolean>(false)
  const [IsActive, setIsActive] = useState<boolean>(false)
  const pathname = usePathname()
  //点击搜索按钮
  const handleSearch = (): void => {
    console.log(searchQuery)
  }
  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(e.target.value)
  }
  const handleClick = (e: MouseEvent) => {
    if (!e.target) return
    const target = e.target as HTMLElement
    if (target.classList.value.indexOf("more") === -1) {
      setIsActive(false)
    }
  }
  useEffect(() => {
    document.addEventListener("scroll", handlerScroll)
    document.addEventListener("click", handleClick)

    return () => {
      document.removeEventListener("click", handleClick)
      document.addEventListener("scroll", handlerScroll)
    }
  })
  // 滚动事件处理函数
  const handlerScroll = () => {
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop
    if (scrollTop > 446) {
      setIsHide(true)
    } else {
      setIsHide(false)
    }
  }

  //监听点击除了create__btn以外的地方

  return (
    <nav className={`${styles.nav} ${IsHide?styles.hide:''}`}>
      <div className={styles.nav_wrapper}>
        <div className={styles.nav__left}>
          <div className={styles.nav__logo}>
            <Image src="/next.svg" width={50} height={50} alt="test" />
          </div>
          <div className={styles.nav__menu__wrapper}>
            <ul className={styles.nav__menu}>
              {NavData.map((item) => {
                return (
                  <li
                    key={item.id}
                    className={`${styles.nav__menu__item} ${
                      pathname === item.url ? styles.active : ""
                    }`}
                  >
                    <a href={item.url}>{item.name}</a>
                  </li>
                )
              })}
            </ul>
            <div className={styles.activity}>
              <div className={styles.activity__item}>活动</div>
            </div>
          </div>
        </div>
        <div className={styles.nav__right}>
          <div
            className={`${styles.nav__search} ${IsFocus ? styles.focus : ""}`}
          >
            <input
              type="text"
              placeholder={IsFocus ? "文章、专栏、用户" : "搜索"}
              className={styles.nav__search__input}
              onChange={handleSearchInput}
              onFocus={() => setIsFocus(true)}
              onBlur={() => {
                if (searchQuery === "") {
                  setIsFocus(false)
                }
              }}
              value={searchQuery}
            />
            <i
              className={`${styles.search_icon} fas fa-search`}
              onClick={handleSearch}
            ></i>
          </div>
          <div className={styles.create__group}>
            <div
              className={`${styles.create__btn} ${IsFocus ? styles.focus : ""}`}
            >
              <button className={styles.add__btn}>创作者中心</button>
              <i
                className={styles.more}
                onClick={() => {
                  setIsActive(!IsActive)
                }}
              >
                <svg
                  className={`${styles.more__icon} ${
                    IsActive ? styles.active : ""
                  }`}
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    className="more__icon__path"
                    d="M2.45025 4.82383C2.17422 4.49908 2.40501 4 2.83122 4H9.16878C9.59499 4 9.82578 4.49908 9.54975 4.82382L6.38097 8.5518C6.1813 8.7867 5.8187 8.7867 5.61903 8.5518L2.45025 4.82383Z"
                    fill="white"
                  ></path>
                </svg>
              </i>
              <ul
                className={`${styles.more__list} ${
                  IsActive ? styles.active : ""
                }`}
              >
                <li className={styles.more__item}>
                  <span>写文章</span>
                </li>
                <li className={styles.more__item}>
                  <span>发沸点</span>
                </li>
                <li className={styles.more__item}>
                  <span>写笔记</span>
                </li>
                <li className={styles.more__item}>
                  <span>写代码</span>
                </li>
                <li className={styles.more__item}>
                  <span>草稿箱</span>
                </li>
              </ul>
            </div>
          </div>
          <div className={styles.nav__user}>
            <div className={styles.nav__user__avatar}>
              <Image src="/next.svg" width={50} height={50} alt="test" />
            </div>
            <div className={styles.theme__wrapper}>
              <i
                className={`${styles.theme__icon} ${
                  theme === Themes.light ? "fas fa-moon" : "fas fa-sun"
                }`}
                onClick={(): void => {
                  if (theme === Themes.light) {
                    setTheme(Themes.dark)
                  } else {
                    setTheme(Themes.light)
                  }
                }}
              ></i>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
