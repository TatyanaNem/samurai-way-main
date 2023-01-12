import dialogsReducer, { AddMessageActionType, UpdateNewMessageTextActionType} from './dialogsReducer';
import profileReducer, {AddPostActionType, UpdateNewPostTextActionType} from './profileReducer';
import {Store} from 'redux';

export type PostType = {
    id: string
    message: string
    likesCount: number
}

export type DialogItemType = {
    id: string
    name: string
    avatar: string
}

export type MessageItemType = {
    id: string
    message: string
}

export type ProfilePageType = {
    posts: Array<PostType>
    newPostText: string
}

export type DialogsPageType = {
    dialogs: Array<DialogItemType>
    messages: Array<MessageItemType>
    newMessageText: string
}

export type StateType = {
    profilePage: ProfilePageType,
    dialogsPage: DialogsPageType
}

export type StoreType = {
    _state: StateType
    _callSubscriber: () => void
    subscribe: (observer:() => void) => void
    dispatch: (action: ActionsType) => void
    getState: () => void
}

export type ActionsType = AddPostActionType | UpdateNewPostTextActionType | AddMessageActionType | UpdateNewMessageTextActionType


const store: StoreType = {
    _state: {
        profilePage: {
            posts: [
                {id: '1', message: 'Hi! How are you?', likesCount: 5},
                {id: '2', message: 'Its my first post!', likesCount: 20},
                {id: '3', message: 'I am learning JavaScript', likesCount: 100},
                {id: '4', message: 'I\'ve already learnt HTML and CSS', likesCount: 23},
                {id: '5', message: 'Yo!!!', likesCount: 36},
                {id: '6', message: 'Yo!!!', likesCount: 32},
            ],
            newPostText: ''
        },
        dialogsPage: {
            dialogs: [
                {id: '1', name: 'Dimych', avatar: 'https://koshka.top/uploads/posts/2021-11/1637843459_62-koshka-top-p-malenkii-pushistii-kotik-70.jpg'},
                {id: '2', name: 'Tanya', avatar: 'https://otkritkis.com/wp-content/uploads/2022/06/pwwhk.jpg'},
                {id: '3', name: 'Sveta', avatar: 'https://www.radiodetector.ru/wp-content/uploads/2022/05/270143ffce849dcf742941a97e95b6a9.jpg'},
                {id: '4', name: 'Sasha', avatar: 'http://myhomeinet.ru/ava/i/56/92ae5cfef57d9ef9a523753e45fc9b0b.jpg'},
                {id: '5', name: 'Viktor', avatar: 'https://thumbs.dreamstime.com/b/black-skull-symbol-crossed-bones-7633489.jpg'},
                {id: '6', name: 'Valery', avatar: 'https://www.southparkfan.ru/wall/images_large/wall/south-park-wallpaper-4.jpg'},
            ],
            messages: [
                {id: '1', message: 'Hi'},
                {id: '2', message: 'How is your IT-KAMASUTRA?'},
                {id: '3', message: 'Yo!!!'},
                {id: '4', message: 'Yo!!!'},
                {id: '5', message: 'Yo!!!'},
                {id: '6', message: 'Yo!!!'},
            ],
            newMessageText: ''
        }
    },
    _callSubscriber () {
        console.log('state changed')
    },

    getState () {
        return this._state
    },
    subscribe (observer: () => void) {
        this._callSubscriber = observer;
    },

    dispatch(action: ActionsType) {
        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
        this._callSubscriber()
    }
}

export default store;