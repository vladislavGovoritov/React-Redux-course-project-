import {AUTH_SUCCESS} from '../actions/actionTypes'
import {AUTH_LOGOUT} from '../actions/actionTypes'

const InitialState = {
    token: null
}

export default function authReducer(state=InitialState, action) {
  switch(action.type) {
      case AUTH_SUCCESS:
          return {
              ...state, token: action.token
          }
      case AUTH_LOGOUT:
          return {
              ...state, token: null
          }    
      default:
          return state
  }
}