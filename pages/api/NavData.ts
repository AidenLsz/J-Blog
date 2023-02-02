// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'



const data = {
    NavData: [
        {
            id: '1',
            name: '首页',
            url: '/',
            className: 'active'

        },
        {
            id: '2',
            name: '沸点',
            url: '/pins',
            className: 'activities'
        },
        {
            id: '3',
            name: '课程',
            url: '/courses',
            className: 'book'
        },
        {
            id: '4',
            name: '直播',
            url: '/live',
            className: 'live'
        },
        {
            id: '5',
            name: '活动',
            url: 'http://www.msn.com',
            className: 'activity'
        },
        {
            id: '6',
            name: '竞赛',
            url: '/competitions',
            className: 'competition'
        },

    ]
}
export default function handler(req: NextApiRequest, res: NextApiResponse) {
    res.status(200).json(data)
}
