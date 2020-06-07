import {
  GET_GAMES
} from '../types';

const initialState = {};

export default (state = initialState, { type, payload }) => {
  switch (type) {

    case GET_GAMES:
      return { ...state, games: payload }

    default:
      return state
  }
}
