import { NextPage } from "next"
import { GetServerSideProps } from "next"
import { SERVERDOMAIN, getDiffTime } from "../../utils"
import axios from "axios"
import Home from ".."
import { IProps } from ".."
import React from "react"

const TagPage: NextPage<IProps> = ({
  data_nav,
  data_tab,
  AdvertisementData,
  UserListData,
  data_article,
  data_latest,
  data_hot,
  IsFixed,
  handlerLoading
}) =>{
  return <Home
  data_nav={data_nav}
  data_tab={data_tab}
  AdvertisementData={AdvertisementData}
  UserListData={UserListData}
  data_article={data_article}
  data_latest={data_latest}
  data_hot={data_hot}
  IsFixed={IsFixed}
  handlerLoading={handlerLoading}
  ></Home>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const bigNav = context.query.Bignav
  const tab = axios.get(`${SERVERDOMAIN}/api/article-tabs`)
  const navbarview = axios.get(`${SERVERDOMAIN}/api/article-type-tabs`)
  const article = axios.get(`${SERVERDOMAIN}/api/articles?populate=*&filters[article_type_tabs][id]=${bigNav}`)
  const article_latest = axios.get(
    `${SERVERDOMAIN}/api/articles?filters[article_type_tabs][id]=${bigNav}&sort[0]=updatedAt:desc&populate=*`
  )
  const article_hot = axios.get(
    `${SERVERDOMAIN}/api/articles?filters[article_type_tabs][id]=${bigNav}&sort[0]=view_count:desc&populate=*`
  )

  const res_tab = (await tab).data.data
  const res_nav = (await navbarview).data.data
  const res_article = (await article).data.data
  const res_latestarticle = (await article_latest).data.data
  const res_hotarticle = (await article_hot).data.data
  const { data: res_advertisement } = await axios.get(
    `${SERVERDOMAIN}/api/advertisements?populate=deep`
  )

  const { data: res_userlist } = await axios.get(
    `${SERVERDOMAIN}/api/author-lists?populate=deep`
  )

  for (let i = 0; i < res_article.length; i++) {
    res_article[i].attributes.date = getDiffTime(
      res_article[i].attributes.updatedAt
    )
    res_latestarticle[i].attributes.date = getDiffTime(
      res_latestarticle[i].attributes.updatedAt
    )
    res_hotarticle[i].attributes.date = getDiffTime(
      res_hotarticle[i].attributes.updatedAt
    )
  }

  // console.log(res_ad[2].attributes.article_type_tabs.data);
  return {
    props: {
      data_tab: res_tab,
      data_nav: res_nav,
      AdvertisementData: res_advertisement.data,
      UserListData: res_userlist.data,
      data_article: res_article,
      data_latest: res_latestarticle,
      data_hot: res_hotarticle
    }
  }
}
export default TagPage
