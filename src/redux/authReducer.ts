import {AnyAction, Dispatch} from 'redux';
import {authAPI} from '../API/authAPI';
import {StateType} from './redux-store';
import {ThunkDispatch} from 'redux-thunk';
import {stopSubmit} from 'redux-form';

type initialStateType = {
    userId: null | number
    email: null | string
    login: null | string
    isAuth: boolean
}

const initialState: initialStateType = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
}

export type ActionsType = ReturnType<typeof setUserAuthData>

export const authReducer = (state = initialState, action: ActionsType) => {
    switch (action.type) {
        case 'SET-USER-AUTH-DATA':
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}

export const setUserAuthData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
    type: 'SET-USER-AUTH-DATA', payload: {
        userId,
        email,
        login,
        isAuth
    }
} as const)

export const authorizeMeTC = () => (dispatch: Dispatch) => {
    return authAPI.authMe()
        .then(data => {
        if (data.resultCode === 0) {
            let {id, email, login} = data.data
            dispatch(setUserAuthData(id, email, login, true))
        }
    })
}

export const loginTC = (email: string, password: string, rememberMe: boolean) => (dispatch: ThunkDispatch<StateType, void, AnyAction>) => {

    authAPI.login(email, password, rememberMe)
        .then(data => {
            if (data.resultCode === 0) {
                dispatch(authorizeMeTC())
            } else {
                let message = data.messages.length > 0 ? data.messages[0] : 'some error'
                dispatch(stopSubmit('login', {_error: message}))
            }
        })
}

export const logoutTC = () => (dispatch: ThunkDispatch<StateType, void, AnyAction>) => {
    authAPI.logout()
        .then(data => {
            if (data.resultCode === 0) {
                dispatch(setUserAuthData(null, null, null,false))
            }
        })
}
