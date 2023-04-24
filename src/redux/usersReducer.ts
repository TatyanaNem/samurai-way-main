import {Dispatch} from 'redux';
import {usersAPI} from '../API/usersAPI';
import {ResponseType} from '../API/authAPI';
import {updateObjectInArray} from '../utils/object-helpers';

type UsersPageType = {
    users: UserType[]
    currentPage: number
    totalUsersCount: number
    usersPerPage: number
    isFetching: boolean
    followingInProgress: number[]
}

export type UserType = {
    id: number
    name: string
    followed: boolean
    photos: {
        small: null | string
        large: null | string
    }
    status: null | string
    uniqueUrlName: null | string
}

export type ActionsType = ReturnType<typeof followAC>
    | ReturnType<typeof unfollowAC>
    | ReturnType<typeof setUsers>
    | ReturnType<typeof setTotalUsersCount>
    | ReturnType<typeof setCurrentPage>
    | ReturnType<typeof toggleIsFetching>
    | ReturnType<typeof toggleFollowingProgress>


const initialState: UsersPageType = {
    users: [],
    currentPage: 1,
    totalUsersCount: 0,
    usersPerPage: 5,
    isFetching: false,
    followingInProgress: []
}

//reducer
const usersReducer = (state: UsersPageType = initialState, action: ActionsType): UsersPageType => {
    switch (action.type) {
        case 'FOLLOW':
            return {...state, users: updateObjectInArray(state.users, action.userId, 'id', {followed: true})}
        case 'UNFOLLOW':
            return {...state, users: updateObjectInArray(state.users, action.userId, 'id', {followed: false})}
        case 'SET-USERS':
            return {...state, users: action.users}
        case 'SET-TOTAL-USERS-COUNT':
            return {...state, totalUsersCount: action.totalUsersCount}
        case 'SET-CURRENT-PAGE':
            return {...state, currentPage: action.currentPage}
        case 'TOGGLE-IS-FETCHING':
            return {...state, isFetching: action.isFetching}
        case 'TOGGLE-FOLLOWING-PROGRESS':
            return {
                ...state, followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(el => el !== action.userId)
            }
        default:
            return state;
    }
}

//action creators
export const followAC = (userId: number) => ({type: 'FOLLOW', userId} as const)
export const unfollowAC = (userId: number) => ({type: 'UNFOLLOW', userId} as const)
export const setUsers = (users: UserType[]) => ({type: 'SET-USERS', users} as const)
export const setCurrentPage = (pageNumber: number) => ({type: 'SET-CURRENT-PAGE', currentPage: pageNumber} as const)
export const setTotalUsersCount = (count: number) => ({
    type: 'SET-TOTAL-USERS-COUNT',
    totalUsersCount: count
} as const)
export const toggleIsFetching = (isFetching: boolean) => ({type: 'TOGGLE-IS-FETCHING', isFetching} as const)
export const toggleFollowingProgress = (isFetching: boolean, userId: number) => ({
    type: 'TOGGLE-FOLLOWING-PROGRESS',
    isFetching,
    userId
} as const)


//thunks
export const getUsersTC = (currentPage: number, usersPerPage: number) => async (dispatch: Dispatch) => {
    dispatch(toggleIsFetching(true))
    let response = await usersAPI.getUsers(currentPage, usersPerPage)
    dispatch(toggleIsFetching(false))
    dispatch(setUsers(response.items))
    dispatch(setTotalUsersCount(response.totalCount))
}

const followUnfollowFlow = async (dispatch: Dispatch, userId: number, apiMethod: (userId: number) => Promise<ResponseType>, actionCreator: any) => {
    dispatch(toggleFollowingProgress(true, userId))
    let response = await apiMethod(userId)
    if (response.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(toggleFollowingProgress(false, userId))
}

export const followTC = (userId: number) => async (dispatch: Dispatch) => {
    await followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), followAC)
}

export const unfollowTC = (userId: number) => async (dispatch: Dispatch) => {
    await followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), unfollowAC)
}


export default usersReducer;
