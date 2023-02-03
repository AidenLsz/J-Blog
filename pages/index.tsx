import {NextPage} from "next"
import NavBarView, {navBarData} from "@/components/NavBarView/NavBarView"
import MainContent from "@/components/MainContent/MainContent"
import TimeLineContent from "@/components/TimeLineContent/TimeLineContent"
import Timeline_entrylist from "@/components/TimeLineEntryList/TimeLineEntryList"
import axios from 'axios'
import {GetServerSideProps} from 'next'
import BusinessCard, {BusinessCardData} from "@/components/BusinessCard/BusinessCard"
import {LOCALDOMAIN} from "@/utils"
import {BusinessCardProps} from "@/components/BusinessCard/BusinessCard"
import {navBarProps} from "@/components/NavBarView/NavBarView";


const Home: NextPage<any> = ({data_nav, data_tab}) => {
    return (
        <MainContent>
            <>
                <NavBarView navBarData={data_nav}/>
                <TimeLineContent>
                    <Timeline_entrylist navBarData={data_tab}/>
                    {/*
          <Sidebar>
          </Sidebar> */}
                </TimeLineContent>
            </>
        </MainContent>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {
    const tab = axios.get('http://localhost:1337/api/article-tabs')
    const navbarview = axios.get('http://localhost:1337/api/article-type-tabs')
    const res_tab = (await tab).data.data
    const res_nav = (await navbarview).data.data
    return {
        props: {
            data_tab: res_tab,
            data_nav: res_nav,
        }
    }
}
export default Home
