import axios from "axios";

import { newsAction } from "../../redux/slice/newsReducer";
import { AppDispatch } from "../../redux/store";
const apiKey ='pub_20681aea2dbf385097b3016931827b6d81a6d'
export const getAllNews = async (query: string, qwe: any, dispatch: AppDispatch) => {

  let res: any = await axios.get(`https://newsdata.io/api/1/news?apikey=${apiKey}&q=${query}${qwe !== 1 ? `${qwe}` : ""}

`)

    dispatch(newsAction.newsPageCount({totalHits: res.data.totalResults, nextPage: res.data.nextPage}))
     dispatch(newsAction.getSearchNews(res.data.results))
}

// pub_20681aea2dbf385097b3016931827b6d81a6d

