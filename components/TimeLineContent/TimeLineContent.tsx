import {IProps} from "@/stores/userAgent";
import Styles from './TimeLineContent.module.css'

function TimeLineContent({children}: IProps): JSX.Element {
    return <div className={Styles.timelinecontent}>
        {children}
    </div>
}

export default TimeLineContent;
