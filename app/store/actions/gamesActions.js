import {
  GET_GAMES
} from '../types';

import { FIREBASEURL, convertFirebase, findTeamData } from '../../utils/misc';
import Axios from 'axios';

export const getGames = () => {

  const promise = new Promise((resolve, reject) => {

    Axios.get(`${FIREBASEURL}/teams.json`)
      .then(response => {
        let teams = convertFirebase(response.data);

        Axios.get(`${FIREBASEURL}/games.json`)
          .then(response => {
            const responseData = [];
            let articles = convertFirebase(response.data);

            for(let key in articles){
              responseData.push({
                ...articles[key],
                awayData: findTeamData(articles[key].away, teams),
                localData: findTeamData(articles[key].local, teams)
              })
            }
            resolve(responseData);
          })
      }).catch(e => reject(false))
  })

  return {
    type: GET_GAMES,
    payload: promise
  }
}