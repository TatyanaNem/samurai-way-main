import {Dispatch} from 'redux';
import {authAPI} from '../API/authAPI';

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
                ...action.data,
                isAuth: true
            }
        default:
            return state
    }
}

export const setUserAuthData = (userId: number, email: string, login: string) => ({
    type: 'SET-USER-AUTH-DATA', data: {
        userId,
        email,
        login
    }
} as const)

export const authorizeMeTC = () => (dispatch: Dispatch) => {
    authAPI.authMe().then(data => {
        if (data.resultCode === 0) {
            let {id, email, login} = data.data
            dispatch(setUserAuthData(id, email, login))
        }
    })
}
