import { NextPage, GetServerSideProps } from 'next'
import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { LOCALDOMAIN, SERVERDOMAIN } from 'utils'
import Image from 'next/image'
import { Converter } from 'showdown'
import axios from 'axios';
import 'markdown-navbar/dist/navbar.css';
import styles from './Article.module.scss'
import MarkdownIt from 'markdown-it'
import hightLight from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'
import markdownItAnchor from 'markdown-it-anchor'
import RelatedArticles, { article } from '@/components/RelatedArticles/RelatedArticles';
import BusinessCard, { BusinessCardData } from '@/components/BusinessCard/BusinessCard'
import { IArticleProps } from '../api/ArticleInfo'
interface dataProps {
    currentArticle: IArticleProps,
    relatedArticles: article[],
    business: BusinessCardData[]
}
const ArticleDetail: NextPage<dataProps> = ({ currentArticle: { title, image, article_detail, createdAt, description }, relatedArticles, business }) => {
    let headLength = 0
    const converter = new Converter({
        tables: true,
        simplifiedAutoLink: true,
        emoji: true,
    })
    const md = new MarkdownIt({
        html: true,
        linkify: true,
        typographer: true,
        highlight: (str, lang) => {
            if (lang && hightLight.getLanguage(lang)) {
            try {
                return hightLight.highlight(str, { language: lang }).value
            } catch (__) {}
            }

            return ''
        }
        }).use(markdownItAnchor, {
        level: [1, 2, 3],
        slugify: () => 'head-' + headLength++
    })
    const article_content = md.render(article_detail ? article_detail.data.attributes.description : '')
    const catalogRef = useRef<HTMLDivElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const Head = useRef<HTMLHeadingElement[]>([])
    const [activeHeadIndex, setActiveHeadIndex] = useState(0)

    const CatalogItems = () => {
        let left = 0
        return Head.current.map((item, index, arr) => {
            if (item.tagName != arr[index - 1]?.tagName) {
                left = item.tagName > arr[index - 1]?.tagName ? left + 12 : 0
            }
            const className = 'navlink' + (activeHeadIndex == index ? ' is-active' : '')

            return (
                <li className='navitem' key={item.id}>
                <div style={{ left }}>
                    <Link className={className} href={'#' + item.id}>
                    {item.innerText}
                    </Link>
                </div>
                </li>
            )
        })
    }

    useEffect(() => {
        Head.current.splice(0, Head.current.length)
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((item) => {
              if (item.isIntersecting) {
                const index = Head.current.findIndex((head) => head.id == item.target.id)
                setActiveHeadIndex(index)
              }
            })
          },
          { rootMargin: '0px 0px -96% 0px' }
        )
        for (let i = 0; i < headLength; i++) {
          const key = 'head-' + i
          const heading = contentRef.current?.children.namedItem(key)
          if (heading) {
            Head.current.push(heading as HTMLHeadingElement)
            observer.observe(heading)
          }
        }
      }, [headLength])
    
    return (
        <div className={styles.contain}>
            <div className={styles.content}>
                <h1 className={styles.title}>{title}</h1>
                <div className={styles.info}>
                    作者：{article_detail.data.attributes.AuthorName} | 创建时间: {createdAt}
                </div>
                {/* <div className={styles.description}>{description}</div> */}
                {image.data && <Image src={SERVERDOMAIN + image.data[0].attributes.url} alt='文章封面' width={700} height={400} />}
                <div ref={contentRef} dangerouslySetInnerHTML={{ __html: article_content }} className={styles['markdown-body']} />
            </div>
            <div className={styles.sideCard}>
                <BusinessCard BusinessCardData={business} />
                <RelatedArticles article={relatedArticles} />
                <div style={{backgroundColor:'white',paddingTop:'10px'}}>
                {/* <div className={styles.navTitle}>目录</div>
                    <MarkNav
                        className={styles.articleMenu}
                        source={article_detail.data.attributes.description}
                        headingTopOffset={0}
                        ordered={false}
                    /> */}
                <div ref={catalogRef} className='navcatalog'>
                    <div className={styles.navTitle}>目录</div>
                    <ul className='navcatalog-list'>
                        {CatalogItems()}
                    </ul>
                </div>
            </div>
        </div>
        </div>
        )
}


export const getServerSideProps: GetServerSideProps = async context => {
    const {articleId} = context.query;
    const {data:currentArticle } = await axios.get(`${LOCALDOMAIN}/api/ArticleInfo`, { //获取当前文章
        params: {
        articleId,
        },
    });
    const {data:{BusinessCardData:business}}= await axios.get(`${LOCALDOMAIN}/api/BusinessCardData`, { //获取作者信息
        params: {
        articleId,
        },
    })
    console.log(currentArticle)
    const relatedArticles =await getRelatedArticles(articleId)

    return {
        props: {relatedArticles, currentArticle, business}, // 需要拿props包裹
    };
};
            //获取相关文章 (建议抽取到api下)
async function getRelatedArticles(articleId:string|string[]|undefined){   
    const {data} = await axios.get(`${SERVERDOMAIN}/api/article-type-tabs?populate=*`);
    const articles = await axios.get(`${SERVERDOMAIN}/api/articles?populate=*`)
    const tab:string = articles.data.data.filter((item:any)=>{
        return item.id==articleId  //articleId 
    })[0].attributes.article_type_tabs.data[0].attributes.title
    const article =data.data.filter((item:any)=>{
        return tab==item.attributes.title
    })[0].attributes.articles.data

    return article
}
export default ArticleDetail
