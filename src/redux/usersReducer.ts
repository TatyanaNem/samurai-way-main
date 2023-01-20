type UsersPageType = {
    users: UserType[]
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

export type ActionsType = ReturnType<typeof followUserAC>
    | ReturnType<typeof unfollowUserAC>
    | ReturnType<typeof setUsersAC>


const initialState: UsersPageType = {
    users: []
}

const usersReducer = (state: UsersPageType = initialState, action: ActionsType) => {
    switch (action.type) {
        case 'FOLLOW':
            return {...state, users: state.users.map(u => u.id === action.userId ? {...u, isFollowed: true} : u)}
        case 'UNFOLLOW':
            return {...state, users: state.users.map(u => u.id === action.userId ? {...u, isFollowed: false} : u)}
        case 'SET-USERS':
            return {...state, users: [...state.users, ...action.users]}
        default:
            return state;
    }
}

export const followUserAC = (userId: string) => ({type: 'FOLLOW', userId} as const)
export const unfollowUserAC = (userId: string) => ({type: 'UNFOLLOW', userId} as const)
export const setUsersAC = (users: UserType[]) => ({type: 'SET-USERS', users} as const)


export default usersReducer;