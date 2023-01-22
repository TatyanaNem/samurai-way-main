type UsersPageType = {
    users: UserType[]
    currentPage: number
    totalUsersCount: number,
    usersPerPage: number
    isFetching: boolean
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

export type ActionsType = ReturnType<typeof followUser>
    | ReturnType<typeof unfollowUser>
    | ReturnType<typeof setUsers>
    | ReturnType<typeof setTotalUsersCount>
    | ReturnType<typeof setCurrentPage>
    | ReturnType<typeof toggleIsFetching>


const initialState: UsersPageType = {
    users: [],
    currentPage: 1,
    totalUsersCount: 0,
    usersPerPage: 5,
    isFetching: false
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
        default:
            return state;
    }
}

export const followUser = (userId: string) => ({type: 'FOLLOW', userId} as const)
export const unfollowUser = (userId: string) => ({type: 'UNFOLLOW', userId} as const)
export const setUsers = (users: UserType[]) => ({type: 'SET-USERS', users} as const)
export const setCurrentPage = (pageNumber: number) => ({type: 'SET-CURRENT-PAGE', currentPage: pageNumber} as const)
export const setTotalUsersCount = (count: number) => ({
    type: 'SET-TOTAL-USERS-COUNT',
    totalUsersCount: count
} as const)
export const toggleIsFetching = (isFetching: boolean) => ({ type: 'TOGGLE-IS-FETCHING', isFetching }as const)


export default usersReducer;