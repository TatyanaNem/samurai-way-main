import {Dispatch} from 'redux';
import {usersAPI} from '../API/usersAPI';

type UsersPageType = {
    users: UserType[]
    currentPage: number
    totalUsersCount: number
    usersPerPage: number
    isFetching: boolean
    followingInProgress: string[]
}

export type UserType = {
    id: string
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

const usersReducer = (state: UsersPageType = initialState, action: ActionsType): UsersPageType => {
    switch (action.type) {
        case 'FOLLOW':
            return {...state, users: state.users.map(u => u.id === action.userId ? {...u, followed: true} : u)}
        case 'UNFOLLOW':
            return {...state, users: state.users.map(u => u.id === action.userId ? {...u, followed: false} : u)}
        case 'SET-USERS':
            return {...state, users: action.users}
        case 'SET-TOTAL-USERS-COUNT':
            return {...state, totalUsersCount: action.totalUsersCount}
        case 'SET-CURRENT-PAGE':
            return {...state, currentPage: action.currentPage}
        case 'TOGGLE-IS-FETCHING':
            return {...state, isFetching: action.isFetching}
        case 'TOGGLE-FOLLOWING-PROGRESS':
            return {...state, followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(el => el !== action.userId)
            }
        default:
            return state;
    }
}

export const followAC = (userId: string) => ({type: 'FOLLOW', userId} as const)
export const unfollowAC = (userId: string) => ({type: 'UNFOLLOW', userId} as const)
export const setUsers = (users: UserType[]) => ({type: 'SET-USERS', users} as const)
export const setCurrentPage = (pageNumber: number) => ({type: 'SET-CURRENT-PAGE', currentPage: pageNumber} as const)
export const setTotalUsersCount = (count: number) => ({
    type: 'SET-TOTAL-USERS-COUNT',
    totalUsersCount: count
} as const)
export const toggleIsFetching = (isFetching: boolean) => ({type: 'TOGGLE-IS-FETCHING', isFetching} as const)
export const toggleFollowingProgress = (isFetching: boolean, userId: string) => ({
    type: 'TOGGLE-FOLLOWING-PROGRESS',
    isFetching,
    userId
} as const)

export const getUsersTC = (currentPage: number, usersPerPage: number) => (dispatch: Dispatch) => {
    dispatch(toggleIsFetching(true))
    usersAPI.getUsers(currentPage, usersPerPage)
        .then(data => {
            dispatch(toggleIsFetching(false))
            dispatch(setUsers(data.items))
            dispatch(setTotalUsersCount(data.totalCount))
        })
}

export const followTC = (userId: string) => (dispatch: Dispatch) => {
    dispatch(toggleFollowingProgress(true, userId))
    usersAPI.follow(userId).then(data => {
        if (data.resultCode === 0) {
            dispatch(followAC(userId))
        }
        dispatch(toggleFollowingProgress(false, userId))
    })
}

export const unfollowTC = (userId: string) => (dispatch: Dispatch) => {
    dispatch(toggleFollowingProgress(true, userId))
    usersAPI.unfollow(userId).then(data => {
        if (data.resultCode === 0) {
            dispatch(unfollowAC(userId))
        }
        dispatch(toggleFollowingProgress(false, userId))
    })
}


export default usersReducer;
