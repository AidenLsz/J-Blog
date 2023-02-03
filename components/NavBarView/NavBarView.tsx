import Styles from "./NavBarView.module.css";
import React from "react";

export interface navBarProps {
    navBarData: navBarData[]
}

export interface navBarData {
    id: number
    attributes: {
        title: string,
        createdAt: string,
        updatedAt: string,
        publishedAt: string
    }
}

function NavBarView({navBarData}: navBarProps): JSX.Element {
    return (
        <div>
            <div className={Styles.view_nav}>
                <div className={Styles.nav_list}>
                    {navBarData.map((post: any) => (
                        <a key={post.id} href="" className={
                            `{
         ${Styles.nav_item} 
         ${post.id == 1 ? Styles.active : null}
        }`
                        }>
                            <div className={Styles.category_popover_box}>
                                <span>{post.attributes.title}</span>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default NavBarView;
