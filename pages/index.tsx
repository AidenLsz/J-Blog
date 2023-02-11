import {NextPage} from "next"
import {GetServerSideProps} from "next"
import {SERVERDOMAIN,getDiffTime} from "@/utils"
import Navbarview, {navBarViewData} from "@/components/navbar-view"
import MainContent from "@/components/maincontent/maincontent"
import TimeLineContent from "@/components/timelinecontent/timelinecontent"
import Timeline_entrylist, {DataAd} from "@/components/timeline_entrylist/timeline_entrylist"
import Advertisement, {AdvertisementItemProps} from "@/components/Advertisement/Advertisement"
import UserList, {UserListItemProp} from "@/components/UserList/UserList"
import BusinessCard, {
    BusinessCardData
} from "@/components/BusinessCard/BusinessCard"

import style from "./index.module.scss"
import axios from "axios"

import {LOCALDOMAIN} from "@/utils"
import {BusinessCardProps} from "@/components/BusinessCard/BusinessCard"

import {AdvertisementProps} from "@/components/Advertisement/Advertisement"
import {UserListProp} from "@/components/UserList/UserList"
import {navBarViewProps} from "@/components/navbar-view";

export interface IProps {
    data_nav: navBarViewData,
    data_tab: navBarViewData,
    data_article: DataAd,
    data_latest:DataAd,
    data_hot:DataAd,
    AdvertisementData: AdvertisementItemProps,
    UserListData: UserListItemProp,
    IsFixed: boolean,
    handlerLoading: () => void,
}

const Home: NextPage<IProps> = ({
                                    data_nav,
                                    data_tab,
                                    AdvertisementData,
                                    UserListData,
                                    data_article,
                                    data_latest,
                                    data_hot,
                                    IsFixed,
                                    handlerLoading
                                }) => {
    return (
        <MainContent>
            <>
                <Navbarview dataNav={data_nav} IsFixed={IsFixed}/>
                <TimeLineContent>
                    <Timeline_entrylist
                        dataTab={data_tab}
                        data_article={data_article}
                        data_latest={data_latest}
                        data_hot={data_hot}
                        handlerLoading={handlerLoading}
                    />
                    {/*<Sidebar>*/}
                    {/*</Sidebar>*/}
                    <aside className={style["aside"]}>
                        <Advertisement
                            AdvertisementData={AdvertisementData}
                        />
                        <UserList UserListData={UserListData}/>
                    </aside>
                </TimeLineContent>
            </>
        </MainContent>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {
    const tab = axios.get(`${SERVERDOMAIN}/api/article-tabs`)
    const navbarview = axios.get(`${SERVERDOMAIN}/api/article-type-tabs`)
    const article=axios.get(`${SERVERDOMAIN}/api/articles?populate=*`)
    const article_latest = axios.get(`${SERVERDOMAIN}/api/articles?sort[0]=updatedAt:desc&populate=*`)
    const article_hot=axios.get(`${SERVERDOMAIN}/api/articles?sort[0]=view_count:desc&populate=*`)
    const res_tab = (await tab).data.data
    const res_nav = (await navbarview).data.data
    const res_article = (await article).data.data
    const res_latestarticle = (await article_latest).data.data
    const res_hotarticle = (await article_hot).data.data
    const {data: res_advertisement} = await axios.get(
        `${SERVERDOMAIN}/api/advertisements?populate=deep`
        )
        
    const {data: res_userlist} = await axios.get(
        `${SERVERDOMAIN}/api/author-lists?populate=deep`
    )

    for (let i = 0; i < res_article.length; i++) {
        res_article[i].attributes.date = getDiffTime(res_article[i].attributes.updatedAt)
        res_latestarticle[i].attributes.date = getDiffTime(res_latestarticle[i].attributes.updatedAt)
        res_hotarticle[i].attributes.date = getDiffTime(res_hotarticle[i].attributes.updatedAt)
    }
    
   // console.log(res_ad[2].attributes.article_type_tabs.data);
    return {
        props: {
            data_tab: res_tab,
            data_nav: res_nav,
            AdvertisementData: res_advertisement.data,
            UserListData: res_userlist.data,
            data_article: res_article,
            data_latest:res_latestarticle,
            data_hot:res_hotarticle
        }
    }
}
export default Home