import axios from "axios";
import {SERVERDOMAIN} from "@/utils";
import {NextApiRequest, NextApiResponse} from "next";

const getArticleIntro = (req: NextApiRequest, res: NextApiResponse) => {
    axios.get(`${SERVERDOMAIN}/api/article-tabs`).then(
        tab => {
            axios.get(`${SERVERDOMAIN}/api/articles?populate=*`).then(
                ad => {
                    res.status(200).json({
                        resTab: tab.data.data,
                        resAd: ad.data.data
                    })
                })
        }
    )
}
export default getArticleIntro;