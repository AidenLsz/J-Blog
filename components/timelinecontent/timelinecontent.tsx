import { IProps } from "@/stores/userAgent";
import Styles from '../timelinecontent/timelinecontent.module.css'

function Timelinecontent({children}:IProps):JSX.Element{
    return <div className={Styles.timelinecontent}>
        {children}
    </div>
}

export default Timelinecontent;