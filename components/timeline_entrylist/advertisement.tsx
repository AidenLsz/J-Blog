import { SERVERDOMAIN } from '@/utils'
import Image from 'next/image'
import Styles from '../timeline_entrylist/timeline_entrylist.module.css'
import { TimeCal } from './timeline_entrylist'



function Advertisement({data}:any):JSX.Element{
return <div>
    {data.map((post:any)=> 
     <li key={post.id} className={Styles.item}>
      
    <div className={Styles.advertisement}>
    <div className={Styles.meta_container}>
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
}
       
</div> 
}

export default Advertisement;