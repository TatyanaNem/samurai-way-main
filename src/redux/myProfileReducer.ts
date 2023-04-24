import {Dispatch} from 'redux';
import {profileAPI} from '../API/profileAPI';
import {AddMessageActionType} from './dialogsReducer';

export type ProfilePageType = {
    profile: null | ProfileType
    posts: Array<PostType>
    status: string
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
    newPostMessage: string
}

export type UpdateNewPostTextActionType = {
    type: 'UPDATE-NEW-POST-TEXT'
    newText: string
}

export type ActionsType = AddPostActionType
    | AddMessageActionType
    | UpdateNewPostTextActionType
    | ReturnType<typeof setUserProfileAC>
    | ReturnType<typeof setProfileStatusAC>


//action creators
export const AddPostAC = (newPostMessage: string) => {
    return {type: 'ADD-POST', newPostMessage} as const
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
    status: ''
}

//reducer
const myProfileReducer = (state: ProfilePageType = initialState, action: ActionsType) => {
    switch (action.type) {
        case 'ADD-POST':
            const newPost = {id: (Math.random() * 100).toString(), message: action.newPostMessage, likesCount: 0}
            return {...state, posts: [newPost, ...state.posts]}
        case 'UPDATE-NEW-POST-TEXT':
            return {...state, newPostText: action.newText}
        case 'SET-USER-PROFILE':
            return {...state, profile: action.profile}
        case 'SET-PROFILE-STATUS':
            return {...state, status: action.status}
        default:
            return state;
    }
}

export const setUserProfileTC = (userId: number) => async (dispatch: Dispatch) => {
    let response = await profileAPI.getUserProfile(userId)
    dispatch(setUserProfileAC(response))
}

export const getProfileStatusTC = (userId: number) => async (dispatch: Dispatch) => {
    let response = await profileAPI.getUserStatus(userId)
    dispatch(setProfileStatusAC(response))
}

export const updateProfileStatusTC = (newStatus: string) => async (dispatch: Dispatch) => {
    let response = await profileAPI.updateUserStatus(newStatus)
    if (response.resultCode === 0) {
        dispatch(setProfileStatusAC(newStatus))
    }
}

export default myProfileReducer;
