import {
  GET_NEWS
} from '../types';

const initialState = {};

export default (state = initialState, { type, payload }) => {
  switch (type) {

    case GET_NEWS:
      return { ...state, articles: payload }

    default:
      return state
  }
}
