import { NextPage, GetServerSideProps } from 'next'
import { LOCALDOMAIN,CMSDOMAIN} from 'utils'
import Image from 'next/image'
import { Converter } from 'showdown'
import styles from './Article.module.scss'
import axios from 'axios';
import RelatedArticles,{article} from '@/components/RelatedArticles/RelatedArticles';
import BusinessCard,{BusinessCardData} from '@/components/BusinessCard/BusinessCard'
import {IArticleProps} from '../api/ArticleInfo'
interface dataProps{
    currentArticle:IArticleProps,
    relatedArticles:article[],
    business:BusinessCardData[]
}
const ArticleDetail: NextPage<dataProps> = ({currentArticle:{ title, image,article_detail,createdAt, description },relatedArticles,business}) => {
    const converter = new Converter({
        tables: true,
        simplifiedAutoLink: true,
        emoji: true,
    })
    return (
        <div className={styles.contain}>
        <div className={styles.content}>
            <h1 className={styles.title}>{title}</h1>
            <div className={styles.info}>
                作者：{article_detail.data.attributes.AuthorName} | 创建时间: {createdAt}
            </div>
            {/* <div className={styles.description}>{description}</div> */}
            {image.data && <Image src={CMSDOMAIN+image.data[0].attributes.url} alt='文章封面'  width={700} height={400}/>}
            <article dangerouslySetInnerHTML={{ __html: converter.makeHtml(article_detail.data.attributes.description) }} className={styles['markdown-body']} />
        </div>
        <div className={styles.sideCard}>
        <BusinessCard BusinessCardData={business}/>
        <RelatedArticles article={relatedArticles}/>
        </div>
        </div>
        )
}


export const getServerSideProps: GetServerSideProps = async context => {
    const { articleId } = context.query;
    const { data:currentArticle } = await axios.get(`${LOCALDOMAIN}/api/ArticleInfo`, { //获取当前文章
        params: {
            articleId,
        },
    });
    const {data:{BusinessCardData:business}}= await axios.get(`${LOCALDOMAIN}/api/BusinessCardData`, { //获取作者信息
        params: {
            articleId,
        },
    })
    const relatedArticles =await getRelatedArticles(articleId)
    
    return {
      props: {relatedArticles,currentArticle,business}, // 需要拿props包裹
    };
};
//获取相关文章 (建议抽取到api下)
async function getRelatedArticles(articleId:string|string[]|undefined){
    const { data } = await axios.get(`http://localhost:1337/api/article-type-tabs?populate=*`);
    const articles = await axios.get(`http://localhost:1337/api/articles?populate=*`)
    const tab:string = articles.data.data.filter((item:any)=>{
        return item.id==articleId  //articleId 
    })[0].attributes.article_type_tabs.data[0].attributes.title

    const article =data.data.filter((item:any)=>{
        return tab==item.attributes.title
    })[0].attributes.articles.data

    return article
}
export default ArticleDetail