import {AnyAction} from 'redux';
import {authorizeMeTC} from './authReducer';
import {ThunkDispatch} from 'redux-thunk';
import {StateType} from './redux-store';

type initialStateType = {
    initialized: boolean
}

type ActionsType = ReturnType<typeof InitializedSuccess>

const initialState = {
    initialized: false
}

export const appReducer = (state = initialState, action: ActionsType): initialStateType => {
    switch (action.type) {
        case 'INITIALIZED-SUCCESS':
            return {
                ...state,
                initialized: true
            }
        default:
            return state
    }
}

export const InitializedSuccess = () => ({type: 'INITIALIZED-SUCCESS'} as const)

export const initializeApp = () => (dispatch: ThunkDispatch<StateType, void, AnyAction>) => {
    dispatch(authorizeMeTC())
        .then(() => {
        dispatch(InitializedSuccess())
    })
}
