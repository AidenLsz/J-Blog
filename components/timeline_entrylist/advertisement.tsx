import { SERVERDOMAIN } from '@/utils'
import { useState } from 'react'
import Image from 'next/image'
import Styles from '../timeline_entrylist/timeline_entrylist.module.scss'
import { TimeCal } from './timeline_entrylist'



function Advertisement({data,article_tab}:any):JSX.Element{
  const [dislike,setDislike]=useState([0])
return <div>
  {data.map((post:any)=> 
  <li key={post.id} className={`${(dislike.indexOf(post.id)==-1)?Styles.item:Styles.none}`}>
 <div className={Styles.advertisement}>
 <div className={`${Styles.meta_container}`}>
   <div className={Styles.user_message}>
     <a className={Styles.userbox}>
       <div className={Styles.popper_box}>
         {post.attributes.userName}
       </div>
     </a>
   </div>
   <div className={Styles.dividing}></div>
   <div className={Styles.date}>
     {TimeCal(post.attributes.updatedAt)}
     </div>
   <div className={`${post.attributes.ad?Styles.none:Styles.tag_list}`}>
   {(`${post.attributes.article_type_tabs.data}`.length==0 &&
   `${post.attributes.article_type_tabs.data}`.length==0)?
      null
     :
     <div className={`${post.attributes.ad?Styles.none:Styles.dividing_left}`}></div>}
     {`${post.attributes.article_type_tabs.data}`=="null"?
     null
     :
     post.attributes.article_type_tabs.data.map((tab:any)=>
     <a key={tab.id} className={Styles.tag}>
       {tab.attributes.title}</a>
     )}
     {`${post.attributes.tags.data}`=="null"?
     null
     :
     post.attributes.tags.data.map((tag:any)=>
     <a key={tag.id} className={Styles.tag}>
       {tag.attributes.title}</a>
     )}                
     </div>
     <div className={`${post.attributes.ad?Styles.is_ad:Styles.not_ad}`}>广告</div>
     <div className={`${post.attributes.ad?Styles.not_article:Styles.is_article}` } 
     onClick={()=>{
       setDislike([
         ...dislike,post.id
       ]
       )
     }}>
<Image 
 width={15}
 height={15}
 alt="X"
 src="/images/cross.svg"
 />
     </div>
     
 </div>
 <div className={Styles.main}>
   <div className={Styles.info_box}>
     <a className={Styles.title}>{post.attributes.title}</a>
     <a className={Styles.description}>{post.attributes.brief}</a>
   </div>

     {(`${post.attributes.image.data}`=='null') ? 
   <div className={Styles.blank}></div>
    : 
   <Image 
     alt="广告位" 
     width={120} 
     height={80} 
     className={`${Styles.lazy} ${Styles.thumb}`} 
     src={`${SERVERDOMAIN}${post.attributes.image.data[0].attributes.url}`}/>}
   </div>
</div>
  </li>
)
}</div>






}

export default Advertisement;