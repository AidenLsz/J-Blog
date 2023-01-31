import { NextPage } from "next"
import Navbarview from "@/components/navbar-view"
import MainContent from "@/components/maincontent/maincontent"
import Timelinecontent from "@/components/timelinecontent/timelinecontent"
import Timeline_entrylist from "@/components/timeline_entrylist/timeline_entrylist"

const Home: NextPage = () => {
  return (
    <MainContent>
      <>
        <Navbarview />
        <Timelinecontent>
          <Timeline_entrylist>
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
export default Home
