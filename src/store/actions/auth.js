import axios from 'axios'
import {AUTH_SUCCESS} from './actionTypes'
import {AUTH_LOGOUT} from './actionTypes'



export function auth(email, password, isLogin) {
    return async dispatch => {
        const authData ={
            email, password,
            returnSecureToken: true
        }
 
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAZRPM1L4XWmMxMdwl3EhxGc8HJQHrXsBw'
        if(isLogin) {
           url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAZRPM1L4XWmMxMdwl3EhxGc8HJQHrXsBw'
        }
            const response = await axios.post(url, authData)
            const data = response.data
            const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000)

            localStorage.setItem('token', data.idToken)
            localStorage.setItem('userId', data.localId)
            localStorage.setItem('expirantionDate', expirationDate)

            dispatch(authSuccess(data.idToken))
            dispatch(autoLogout(data.expiresIn))
      
    }
}

export function autoLogout(time) {
    return dispatch => {
        setTimeout(() =>{
            dispatch(logout())
        }, time *1000)
    }
}

export function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('expirantionDate')
    return {
        type:AUTH_LOGOUT
    }
}

export function autoLogin() {
    return dispatch => {
        const token = localStorage.getItem('token')
        if(!token) {
           dispatch(logout())
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'))
            if (expirationDate <= new Date()) {
                dispatch(logout())
            } else {
                dispatch(authSuccess(token))
                dispatch(autoLogout((expirationDate.getTime() - new Date().getTime()) / 1000))
            }
        }
    }
}

export function authSuccess(token) {
    return {
        type: AUTH_SUCCESS,
        token
    }
}