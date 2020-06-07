import AsyncStorage from '@react-native-community/async-storage';

const FIREBASEURL = 'https://rn-nba-fabio.firebaseio.com';
const APIKEY = 'AIzaSyBODjSQAHj4RNwRwPjnitBNhJP2I9A3zA8';
const SIGNUP = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${APIKEY}`;
const SIGNIN = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${APIKEY}`;
const REFRESH = `https://securetoken.googleapis.com/v1/token?key=${APIKEY}`;

export const setTokens = (values, cb) => {
  const dateNow = new Date();
  const expiration = dateNow.getTime() + (3600 * 1000);

  AsyncStorage.multiSet([
    ['@nba_app@token', values.token],
    ['@nba_app@refreshToken', values.refToken],
    ['@nba_app@expiretoken', expiration.toString()],
    ['@nba_app@uid', values.uid]
  ]).then((value) => cb(value))
}

export const getTokens = (cb) => {

  AsyncStorage.multiGet([
    '@nba_app@token',
    '@nba_app@refreshToken',
    '@nba_app@expiretoken',
    '@nba_app@uid'
  ]).then(value => cb(value))
}

export const convertFirebase = (data) => {
  const newData = [];
  for (let key in data) {
    newData.push({
      ...data[key],
      id: key
    })
  }
  return newData;
}

export const findTeamData = (itemId, teams) => {
  const result = teams.find(team => {
    return team.id === itemId
  });
  return result;
}
export {
  FIREBASEURL,
  APIKEY,
  SIGNUP,
  SIGNIN,
  REFRESH,
}