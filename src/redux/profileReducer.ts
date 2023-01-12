import {ActionsType, PostType, ProfilePageType} from './store';

export type AddPostActionType = {
    type: 'ADD-POST'
}

export type UpdateNewPostTextActionType = {
    type: 'UPDATE-NEW-POST-TEXT'
    newText: string
}

export const AddPostAC = () => {
    return {type: 'ADD-POST'} as const
}

export const UpdateNewPostTextAC = (text: string) => {
    return {type: 'UPDATE-NEW-POST-TEXT', newText: text} as const
}

const initialState: ProfilePageType = {
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

const profileReducer = (state: ProfilePageType = initialState, action: ActionsType) => {
    switch (action.type) {
        case 'ADD-POST':
            const newPost: PostType = {id: (Math.random() * 100).toString(), message: state.newPostText, likesCount: 0}
            return {...state, posts: [newPost, ...state.posts], newPostText: ''}
        case 'UPDATE-NEW-POST-TEXT':
            return {...state, newPostText: action.newText}
        default:
            return state;
    }
}

export default profileReducer;