// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import NavData from '@/public/data.json'


const data ={
  "NavData":[
    {
      "id":"1",
      "name":"Home",
      "url":"/"
    },
    {
      "id":"2",
      "name":"About",
      "url":"http://www.yahoo.com"
    },
    {
      "id":"3",
      "name":"Contact",
      "url":"http://www.bing.com"
    },
    {
      "id":"4",
      "name":"Services",
      "url":"http://www.msn.com"
    },
    {
      "id":"5",
      "name":"Portfolio",
      "url":"http://www.msn.com"
    },
    {
      "id":"6",
      "name":"Blog",
      "url":"http://www.msn.com"
    },
    {
      "id":"7",
      "name":"Contact",
      "url":"http://www.msn.com"
    },
    {
      "id":"8",
      "name":"Services",
      "url":"http://www.msn.com"

    }
  ]
}
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.status(200).json(data)
}
