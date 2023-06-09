import React, {  useState } from 'react'
import { getAllNews } from './NewsApi'
import { useAppDispatch } from '../../redux/hooks'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'

import s from './News.module.css'
const News = () =>{
    let [query, setQuery] = useState<string>('')
    const dispatch = useAppDispatch()
    const {news, pages, nextPage} = useSelector((s: RootState) => s.news)
   
    let arrayPage: any[] = []
 
    for (let i = 1; i <= pages  ; i += 1) {
      
        arrayPage.push(i)
    }

    const onHandleClick = (e: any ) => {
   
    setQuery(e.target.value)
    }
    function onSubmitForm(e: any) {
        e.preventDefault()
        getAllNews(query, 1,dispatch)
        setQuery("")
    }
    const getCurrentPage = (e: any) => {
      
        getAllNews(query, nextPage, dispatch)
       
        
    }
  return (
      <div>
          <form className={s.newsForm} onSubmit={onSubmitForm}>
              <label>Search
                  <input className={s.newsFormInput} type='text' onBlur={onHandleClick} />
              </label>
         <button className={s.newsFormButton} type="submit">Search</button>
          </form>
         

          <ul style={{marginTop: "20px"}}>
              
         
             
              {news.map(news => (
                  <li key={news.title} style={{margin: "20px 0"}}>
                       <img width={400} height={"auto"} alt='' src={news.image_url !== null ? news.image_url : 'https://cdn.nextgov.com/media/img/cd/2022/11/21/112122datashareNG/860x394.jpg'} />
                      <h3 style={{"marginTop": "10px"}}>{ news.creator !== null ? news.creator : "Noname"}</h3>
               <a className={s.newsFormLink} rel="noreferrer" href={news.link} target="_blank"   >
              <p>{news.title}</p>
                      </a>
                     
                     
              </li>
              ))}
               <button className={s.newsButtonNext} onClick={(e) => getCurrentPage(e)}>NextPage &#8594;</button>
         </ul>
     
    </div>
  )
}

export default News
