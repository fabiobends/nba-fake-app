import {
  GET_NEWS
} from '../types';

import { FIREBASEURL } from '../../utils/misc';
import Axios from 'axios';

export const getNews = () => {

  const request = Axios({
    method: 'GET',
    url: `${FIREBASEURL}/news.json`
  }).then(response => {
    const articles = [];
    for (let key in response.data) {
      articles.push({
        ...response.data[key],
        id: key
      })
    }
    return articles;
  }).catch(e => { return false });

  return {
    type: GET_NEWS,
    payload: request
  }
}
