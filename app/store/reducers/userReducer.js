import {
  SIGN_IN,
  SIGN_UP,
  AUTO_SIGN_IN
} from '../types'

const initialState = {}

export default (state = initialState, { type, payload }) => {
  // console.log(SIGN_IN)
  switch (type) {
    case SIGN_IN:
      return {
        ...state,
        auth: {
          uid: payload.localId || false,
          token: payload.idToken || false,
          refToken: payload.refreshToken || false
        }
      }
    case SIGN_UP:
      return {
        ...state,
        auth: {
          uid: payload.localId || false,
          token: payload.idToken || false,
          refToken: payload.refreshToken || false
        }
      }
    case AUTO_SIGN_IN:
      return {
        ...state,
        auth: {
          uid: payload.user_id || false,
          token: payload.id_token || false,
          refToken: payload.refresh_token || false
        }
      }
    default:
      return state
  }
}
