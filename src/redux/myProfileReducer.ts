import {AddMessageActionType, UpdateNewMessageTextActionType} from './dialogsReducer';
import {Dispatch} from 'redux';
import {profileAPI} from '../API/profileAPI';

export type ProfilePageType = {
    profile: null | ProfileType
    posts: Array<PostType>
    newPostText: string
}

export type ProfileType = {
    aboutMe?: string
    contacts: {
        facebook: null | string
        website: null | string
        vk: null | string
        twitter: null | string
        instagram: null | string
        youtube: null | string
        github: null | string
        mainLink: null | string
    }
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    userId: number
    photos: {
        small: string
        large: string
    }
}

export type PostType = {
    id: string
    message: string
    likesCount: number
}

export type AddPostActionType = {
    type: 'ADD-POST'
}

export type UpdateNewPostTextActionType = {
    type: 'UPDATE-NEW-POST-TEXT'
    newText: string
}

export type ActionsType = AddPostActionType
    | UpdateNewPostTextActionType
    | AddMessageActionType
    | UpdateNewMessageTextActionType
    | ReturnType<typeof setUserProfileAC>
    | ReturnType<typeof setProfileStatusAC>

export const AddPostAC = () => {
    return {type: 'ADD-POST'} as const
}

export const UpdateNewPostTextAC = (text: string) => {
    return {type: 'UPDATE-NEW-POST-TEXT', newText: text} as const
}
export const setUserProfileAC = (profile: ProfileType) => {
    return {type: 'SET-USER-PROFILE', profile} as const
}

export const setProfileStatusAC = (status: string) => {
    return {type: 'SET-PROFILE-STATUS', status} as const
}

const initialState: ProfilePageType = {
    profile: null,
    posts: [
        {id: '1', message: 'Hi! How are you?', likesCount: 5},
        {id: '2', message: 'Its my first post!', likesCount: 20},
        {id: '3', message: 'I am learning JavaScript', likesCount: 100},
        {id: '4', message: 'I\'ve already learnt HTML and CSS', likesCount: 23},
        {id: '5', message: 'Yo!!!', likesCount: 36},
        {id: '6', message: 'Yo!!!', likesCount: 32},
    ],
    newPostText: ''
}

const myProfileReducer = (state: ProfilePageType = initialState, action: ActionsType) => {
    switch (action.type) {
        case 'ADD-POST':
            const newPost: PostType = {id: (Math.random() * 100).toString(), message: state.newPostText, likesCount: 0}
            return {...state, posts: [newPost, ...state.posts], newPostText: ''}
        case 'UPDATE-NEW-POST-TEXT':
            return {...state, newPostText: action.newText}
        case 'SET-USER-PROFILE':
            return {...state, profile: action.profile}
        case 'SET-PROFILE-STATUS':
            return {...state, aboutMe: action.status}
        default:
            return state;
    }
}

export const setUserProfileTC = (userId: string) => (dispatch: Dispatch) => {
    profileAPI.getUserProfile(userId)
        .then(data => dispatch(setUserProfileAC(data)))
}

// export const updateProfileStatusTC = (newStatus: string) => (dispatch: Dispatch) => {
//     profileAPI.updateProfileStatus(newStatus)
//         .then(data => dispatch(setProfileStatusAC(data)))
// }

export default myProfileReducer;