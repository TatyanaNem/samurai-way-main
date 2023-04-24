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

//reducer
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


//action creators
export const setUserAuthData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
    type: 'SET-USER-AUTH-DATA', payload: {
        userId,
        email,
        login,
        isAuth
    }
} as const)


//thunks
export const authorizeMeTC = () => async (dispatch: Dispatch) => {
    let data = await authAPI.authMe()
    if (data.resultCode === 0) {
        let {id, email, login} = data.data
        dispatch(setUserAuthData(id, email, login, true))
    }
}

export const loginTC = (email: string, password: string, rememberMe: boolean) => async (dispatch: ThunkDispatch<StateType, void, AnyAction>) => {

    let response = await authAPI.login(email, password, rememberMe)
    if (response.resultCode === 0) {
        dispatch(authorizeMeTC())
    } else {
        let message = response.messages.length > 0 ? response.messages[0] : 'some error'
        dispatch(stopSubmit('login', {error: message}))
    }
}

export const logoutTC = () => async (dispatch: ThunkDispatch<StateType, void, AnyAction>) => {
    let response = await authAPI.logout()
    if (response.resultCode === 0) {
        dispatch(setUserAuthData(null, null, null, false))
    }
}
