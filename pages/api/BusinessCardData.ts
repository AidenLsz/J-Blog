// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'


const data = {
    BusinessCardData: [
        {
            "user_id": "3122268752840919",
            "user_name": "麻不烧",
            "company": "黄油相机",
            "job_title": "程序员",
            "avatar_large": "/uploads/4_3592202c86.webp",
            "level": 5,
            "attributes":{title:'1'},
            "got_digg_count": 3050,
            "got_view_count": 159608,
        }
    ]
}
export default function handler(req: NextApiRequest, res: NextApiResponse) {
    res.status(200).json(data)
}
