import {NextPage} from "next";
import Image from "next/image";
import styles from "./NavBar.module.scss";
import {useContext} from "react";
import {ThemeContext} from "@/stores/theme";
import {Themes} from "@/constants/enum";
import {usePathname} from "next/navigation";

export interface INavBarItemProps {
    id: number;
    name: string;
    url: string;
}

export interface INavBarProps {
    NavData: INavBarItemProps[];
}

const NavBar: NextPage<INavBarProps> = ({NavData}) => {

    const {theme, setTheme} = useContext(ThemeContext);

    const pathname=usePathname()
    return (
        <nav className={styles.nav}>
            <div className={styles.nav_wrapper}>
                <div className={styles.nav__left}>
                    <div className={styles.nav__logo}>
                        <Image src='/next.svg' width={50} height={50} alt="test"/>
                    </div>
                    <div className={styles.nav__menu__wrapper}>
                        <ul className={styles.nav__menu}>
                            {
                                NavData.map((item) => {
                                    return (
                                        <li key={item.id} className={`${styles.nav__menu__item} ${pathname===item.url?styles.active:''}`}><a
                                            href={item.url}>{item.name}</a></li>
                                    )
                                })
                            }
                        </ul>
                        <div className={styles.activity}>
                            <div className={styles.activity__item}>
                                活动
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.nav__right}>
                    <div className={styles.nav__search}>
                        <input type="text" placeholder="搜索"/>
                        <i className="icon"></i>


                    </div>
                    <div className={styles.nav__user}>
                        <div className={styles.nav__user__avatar}>
                            <Image src='/next.svg' width={50} height={50} alt="test"/>
                        </div>
                    </div>
                    <div className={styles.theme__wrapper}>
                        <i className={`${styles.theme__icon} ${theme === Themes.light ? 'fas fa-moon' : 'fas fa-sun'}`}
                           onClick={(): void => {
                               if (theme === Themes.light) {
                                   setTheme(Themes.dark);
                               } else {
                                   setTheme(Themes.light);
                               }
                           }}
                        ></i>
                    </div>
                </div>

            </div>
        </nav>
    )
}

export default NavBar