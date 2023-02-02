import type { NextApiRequest, NextApiResponse } from 'next';
// import axios from 'axios';
// import { CMSDOMAIN } from '@/utils';



export interface IArticleProps {
    title: string;
    author: string;
    description: string;
    createTime: string;
    content: string;
    page: string;
}

const getArticleInfoData = (req: NextApiRequest, res: NextApiResponse<IArticleProps>): void => {
    const { articleId } = req.query;
    //   axios.get(`${CMSDOMAIN}/api/article-infos/${articleId}`).then(result => {
    //     const data = result.data || {};
    //     res.status(200).json(data);
    //   });
    res.status(200).json({
        title: '1111',
        author: 'liu',
        description: '文章介绍。。。',
        createTime: '2023年',
        content: '# 标题一',
        page: ''
    })
};

export default getArticleInfoData;
