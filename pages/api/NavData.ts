// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'


const data = {
    NavData: [
        {
            id: '1',
            name: '首页',
            url: '/'
        },
        {
            id: '2',
            name: '沸点',
            url: '/pins'
        },
        {
            id: '3',
            name: '课程',
            url: '/courses'
        },
        {
            id: '4',
            name: '直播',
            url: '/live'
        },
        {
            id: '5',
            name: '活动',
            url: 'http://www.msn.com'
        },
        {
            id: '6',
            name: '竞赛',
            url: '/competitions'
        },
        {
            id: '7',
            name: '商城',
            url: '/shop'
        },
        {
            id: '8',
            name: 'APP',
            url: '/app'
        },
        {
            id: '9',
            name: '插件',
            url: '/plugins'
        }
    ]
}
export default function handler(req: NextApiRequest, res: NextApiResponse) {
    res.status(200).json(data)
}
