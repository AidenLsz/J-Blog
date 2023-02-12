import Styles from "./navbar.module.css"
import React, {FC} from "react"

export interface navBarViewData {
    id: number
    attributes: {
        title: string
        createdAt: string
        updatedAt: string
        publishedAt: string
    }
}

export interface navBarViewProps {
    dataNav: navBarViewData
    IsFixed?: boolean
}

export const Navbarview: FC<navBarViewProps> = ({dataNav, IsFixed}) => {
    return (
        <div>
            <div className={`${Styles.view_nav} ${IsFixed ? Styles.fixed : ""}`}>
                <div className={Styles.nav_list}>
                    {Object.values(dataNav).map((post: navBarViewData) => (
                        <a
                            key={post.id}
                            href=""
                            className={`{
         ${Styles.nav_item} 
         ${post.id == 1 ? Styles.active : null}
        }`}
                        >
                            <div className={Styles.category_popover_box}>
                                <span>{post.attributes.title}</span>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Navbarview
