import { NextPage } from "next"
import Navbarview from "@/components/navbar-view"
import MainContent from "@/components/maincontent/maincontent"
import Timelinecontent from "@/components/timelinecontent/timelinecontent"
import Timeline_entrylist from "@/components/timeline_entrylist/timeline_entrylist"
import axios from 'axios'
import { GetServerSideProps } from 'next'

const Home: NextPage = ({data_nav,data_tab}:any) => {

  return (
    <MainContent>
      <>
        <Navbarview Data_Nav={data_nav}/>
        <Timelinecontent>
          <Timeline_entrylist Data={data_tab}>
            <></>
          </Timeline_entrylist>
          {/* 
          <Sidebar>
          </Sidebar> */}
        </Timelinecontent>
      </>
    </MainContent>
  )
}

export const getServerSideProps: GetServerSideProps = async () =>  {
  const tab = axios.get('http://localhost:1337/api/article-tabs')
  const navbarview = axios.get('http://localhost:1337/api/top-tabs')
  const res_tab = (await tab).data.data
  const res_nav = (await navbarview).data.data
  res_nav.sort(function(a:any,b:any){return a.attributes.tag-b.attributes.tag});
  return {
    props:{
      data_tab:res_tab,
      data_nav:res_nav
    }
  }
}
export default Home
