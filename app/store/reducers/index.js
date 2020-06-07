import { combineReducers } from 'redux';
import User from './userReducer';
import News from './newsReducer';
import Games from './gamesReducer';

const Root = combineReducers({
  User,
  News,
  Games
})

export default Root;