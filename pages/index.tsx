import {NextPage} from "next"
import {GetServerSideProps} from "next"
import Navbarview, {navBarViewData} from "@/components/navbar-view"
import MainContent from "@/components/maincontent/maincontent"
import TimeLineContent from "@/components/timelinecontent/timelinecontent"
import Timeline_entrylist, {DataAd} from "@/components/timeline_entrylist/timeline_entrylist"
import Advertisement, {AdvertisementItemProps} from "@/components/Advertisement/Advertisement"
import UserList, {UserListItemProp} from "@/components/UserList/UserList"
import style from "./index.module.scss"
import axios from "axios"
import {LOCALDOMAIN} from "@/utils"

export interface IProps {
    data_nav: navBarViewData,
    data_tab: navBarViewData,
    data_ad: navBarViewData,
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
                                    data_ad,
                                    IsFixed,
                                    handlerLoading,
                                }) => {
    return (
        <MainContent>
            <>
                <Navbarview dataNav={data_nav} IsFixed={IsFixed}/>
                <TimeLineContent>
                    {/*<Timeline_entrylist*/}
                    {/*    dataTab={data_tab}*/}
                    {/*    dataAd={data_ad}*/}
                    {/*    handlerLoading={handlerLoading}*/}
                    {/*/>*/}
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
    const {data: homeData} = await axios.get(`${LOCALDOMAIN}/api/home`)
    const {data: articleIntro} = await axios.get(`${LOCALDOMAIN}/api/articleIntro`)
    return {
        props: {
            data_tab: articleIntro.resTab,
            data_nav: homeData.data.res_nav,
            AdvertisementData: homeData.data.AdvertisementData,
            UserListData: homeData.data.UserListData,
            data_ad: articleIntro.resAd,
        }
    }
}
export default Home
