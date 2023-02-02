import { NextPage, GetServerSideProps } from 'next'
import { LOCALDOMAIN } from 'utils'
import Image from 'next/image'
import { Converter } from 'showdown'
import { IArticleProps } from '@/pages/api/ArticleInfo';
import styles from './Article.module.scss'
import axios from 'axios';

const ArticleDetail: NextPage<IArticleProps> = ({ title, page, content, author, createTime, description }) => {
    const converter = new Converter({
        tables: true,
        simplifiedAutoLink: true,
        emoji: true,
    })
    return (
        <div className={styles.content}>
            <h1 className={styles.title}>{title}</h1>
            <div className={styles.info}>
                作者：{author} | 创建时间: {createTime}
            </div>
            <div className={styles.description}>{description}</div>
            {page && <Image src={page} alt='文章封面' />}
            <article dangerouslySetInnerHTML={{ __html: converter.makeHtml(content) }} className={styles.markdownBody} />
        </div>)
}


export const getServerSideProps: GetServerSideProps = async context => {
    const { articleId } = context.query;
    const { data } = await axios.get(`${LOCALDOMAIN}/api/ArticleInfo`, {
        params: {
            articleId,
        },
    });
    return {
        props: data,
    };
};

export default ArticleDetail