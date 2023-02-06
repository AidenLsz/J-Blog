import { IProps } from "@/stores/userAgent"
import Styles from "../timelinecontent/timelinecontent.module.css"

function TimeLineContent({ children }): JSX.Element {
  return <div className={Styles.timeLineContent}>{children}</div>
}

export default TimeLineContent
