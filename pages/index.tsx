import { NextPage } from "next"
import { GetServerSideProps } from "next"
import { SERVERDOMAIN } from "@/utils"
import Navbarview from "@/components/navbar-view"
import MainContent from "@/components/maincontent/maincontent"
import Timelinecontent from "@/components/timelinecontent/timelinecontent"
import Timeline_entrylist from "@/components/timeline_entrylist/timeline_entrylist"
import Advertisement from "@/components/Advertisement/Advertisement"
import UserList from "@/components/UserList/UserList"
import BusinessCard, {
  BusinessCardData
} from "@/components/BusinessCard/BusinessCard"

import style from "./index.module.scss"
import axios from "axios"

import { LOCALDOMAIN } from "@/utils"
import { BusinessCardProps } from "@/components/BusinessCard/BusinessCard"

import { AdvertisementProps } from "@/components/Advertisement/Advertisement"
import { UserListProp } from "@/components/UserList/UserList"

const Home: NextPage<any> = ({
  data_nav,
  data_tab,
  AdvertisementData,
  UserListData,
  data_ad
}) => {
  return (
    <MainContent>
      <>
        <Navbarview Data_Nav={data_nav} />
        <Timelinecontent>
          <Timeline_entrylist
            Data_Tab={data_tab}
            Data_Ad={data_ad}
          ></Timeline_entrylist>

          {/* 
          <Sidebar>
          </Sidebar> */}
          <aside className={style["aside"]}>
            <Advertisement
              AdvertisementData={AdvertisementData}
            ></Advertisement>
            <UserList UserListData={UserListData}></UserList>
          </aside>
        </Timelinecontent>
      </>
    </MainContent>
  )
}

export const getServerSideProps: GetServerSideProps = async () =>  {
  const tab = axios.get(`${SERVERDOMAIN}/api/article-tabs`)
  const navbarview = axios.get(`${SERVERDOMAIN}/api/article-type-tabs`)
  const advertisement = axios.get(`${SERVERDOMAIN}/api/articles?populate=*`)
  const res_tab = (await tab).data.data
  const res_nav = (await navbarview).data.data
  const res_ad=(await advertisement).data.data
  const { data: res_advertisement } = await axios.get(
    `${SERVERDOMAIN}/api/advertisements?populate=deep`
  )
  const { data: res_userlist } = await axios.get(
    `${SERVERDOMAIN}/api/author-lists?populate=deep`
  )
 // console.log(res_ad[0].attributes.image.data[0].attributes.url);
  return {
    props: {
      data_tab: res_tab,
      data_nav: res_nav,
      AdvertisementData: res_advertisement.data,
      UserListData: res_userlist.data,
      data_ad: res_ad
    }
  }
}
export default Home
