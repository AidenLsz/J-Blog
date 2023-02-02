// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'


const data = {
    BusinessCardData: [
        {
            "user_id": "3122268752840919",
            "user_name": "麻不烧",
            "company": "黄油相机",
            "job_title": "程序员",
            "avatar_large": "https://p26-passport.byteacctimg.com/img/user-avatar/8edbb3239d32ea2bd21a5517604a5445~300x300.image",
            "level": 5,
            "got_digg_count": 3050,
            "got_view_count": 159608,
        }
    ]
}
export default function handler(req: NextApiRequest, res: NextApiResponse) {
    res.status(200).json(data)
}
