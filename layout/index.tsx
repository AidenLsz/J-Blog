import { NextPage } from 'next'
import NavBar from '@/components/NavBar/NavBar'
import FixedBtn from '@/components/FixedBtn/FixedBtn'
import { INavBarItemProps } from '@/components/NavBar/NavBar'
import styles from './layout.module.scss'

export interface ILayoutProps {
  NavData: INavBarItemProps[]
}
const Layout: NextPage<ILayoutProps & { children: JSX.Element }> = ({
  children,
  NavData
}) => {
  return (
    <div className={styles.layout_wrapper}>
        <div className={styles.main_header_box}></div>
      <NavBar NavData={NavData} />
      {children}
      <FixedBtn />
    </div>
  )
}

export default Layout
