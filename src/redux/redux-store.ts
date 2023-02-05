import {applyMiddleware, combineReducers, createStore} from 'redux';
import myProfileReducer from './myProfileReducer';
import dialogsReducer from './dialogsReducer';
import usersReducer from './usersReducer';
import {authReducer} from './authReducer';
import thunk from 'redux-thunk';

export type StateType = ReturnType<typeof rootReducer>

let rootReducer = combineReducers({
    profilePage: myProfileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer
})

let store = createStore(rootReducer, applyMiddleware(thunk));

// @ts-ignore
window.store = store;

export default store;