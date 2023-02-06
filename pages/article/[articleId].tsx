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
    const { data } = await axios.get(`${SERVERDOMAIN}/api/ArticleInfo`, {
        params: {
            articleId,
        },
    });

    return {
        props: data
    };
};
//获取相关文章接口
//<RelatedArticles article={article}/>
/*export const getServerSideProps: GetServerSideProps = async context => {
    const {articleId} = context.query
    const { data } = await axios.get(`http://localhost:1337/api/article-type-tabs?populate=*`);
    const articles = await axios.get(`http://localhost:1337/api/articles?populate=*`)
    const data1 = (await articles).data.data

    const tab = data1.filter((item:any)=>{
        return item.id==2  //articleId
    })[0].attributes.article_type_tabs.data[0].attributes.title

    const article = (await data).data
    const data3 = article.filter((item:any)=>{
        return tab==item.attributes.title
    })[0].attributes.articles.data
    return {
      props: {article:data3}, // 需要拿props包裹
    };
  };*/
export default ArticleDetail
