import {NextApiRequest, NextApiResponse} from "next";
import axios from "axios";
import {SERVERDOMAIN} from "@/utils";


const getHomeData = (req: NextApiRequest, res: NextApiResponse): void => {
    axios.get(`${SERVERDOMAIN}/api/author-lists?populate=deep`).then(userListData => {
            axios.get(`${SERVERDOMAIN}/api/advertisements?populate=deep`).then(advertisementData => {
                axios.get(`${SERVERDOMAIN}/api/article-type-tabs`).then(navData => {
                    const data = {
                        res_nav: navData.data.data,
                        AdvertisementData: advertisementData.data.data,
                        UserListData: userListData.data.data,
                    }
                    res.status(200).json({
                        data: data
                    })
                })
            })

        }
    )
}
export default getHomeData;
