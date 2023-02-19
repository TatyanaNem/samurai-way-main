import dialogsReducer from './dialogsReducer';
import myProfileReducer, {
    ActionsType,
    ProfilePageType
} from './myProfileReducer';

export type DialogItemType = {
    id: string
    name: string
    avatar: null | string
}

export type MessageItemType = {
    id: string
    message: string
}


export type DialogsPageType = {
    dialogs: Array<DialogItemType>
    messages: Array<MessageItemType>
}

export type StateType = {
    profilePage: ProfilePageType,
    dialogsPage: DialogsPageType
}

export type StoreType = {
    _state: StateType
    _callSubscriber: () => void
    subscribe: (observer: () => void) => void
    dispatch: (action: ActionsType) => void
    getState: () => void
}




const store: StoreType = {
    _state: {
        profilePage: {
            profile: {
                'aboutMe': 'я круто чувак 1001%',
                'contacts': {
                    'facebook': 'facebook.com',
                    'website': null,
                    'vk': 'vk.com/dimych',
                    'twitter': 'https://twitter.com/@sdf',
                    'instagram': 'instagra.com/sds',
                    'youtube': null,
                    'github': 'github.com',
                    'mainLink': null
                },
                'lookingForAJob': true,
                'lookingForAJobDescription': 'не ищу, а дурачусь',
                'fullName': 'samurai dimych',
                'userId': 2,
                'photos': {
                    'small': 'https://social-network.samuraijs.com/activecontent/images/users/2/user-small.jpg?v=0',
                    'large': 'https://social-network.samuraijs.com/activecontent/images/users/2/user.jpg?v=0'
                }
            },
            posts: [
                {id: '1', message: 'Hi! How are you?', likesCount: 5},
                {id: '2', message: 'Its my first post!', likesCount: 20},
                {id: '3', message: 'I am learning JavaScript', likesCount: 100},
                {id: '4', message: 'I\'ve already learnt HTML and CSS', likesCount: 23},
                {id: '5', message: 'Yo!!!', likesCount: 36},
                {id: '6', message: 'Yo!!!', likesCount: 32},
            ],
            status: ''
        },
        dialogsPage: {
            dialogs: [
                {
                    id: '1',
                    name: 'Dimych',
                    avatar: 'https://koshka.top/uploads/posts/2021-11/1637843459_62-koshka-top-p-malenkii-pushistii-kotik-70.jpg'
                },
                {id: '2', name: 'Tanya', avatar: 'https://otkritkis.com/wp-content/uploads/2022/06/pwwhk.jpg'},
                {
                    id: '3',
                    name: 'Sveta',
                    avatar: null
                },
                {id: '4', name: 'Sasha', avatar: 'http://myhomeinet.ru/ava/i/56/92ae5cfef57d9ef9a523753e45fc9b0b.jpg'},
                {
                    id: '5',
                    name: 'Viktor',
                    avatar: 'https://thumbs.dreamstime.com/b/black-skull-symbol-crossed-bones-7633489.jpg'
                },
                {
                    id: '6',
                    name: 'Valery',
                    avatar: 'https://www.southparkfan.ru/wall/images_large/wall/south-park-wallpaper-4.jpg'
                },
            ],
            messages: [
                {id: '1', message: 'Hi'},
                {id: '2', message: 'How is your IT-KAMASUTRA?'},
                {id: '3', message: 'Yo!!!'},
                {id: '4', message: 'Yo!!!'},
                {id: '5', message: 'Yo!!!'},
                {id: '6', message: 'Yo!!!'},
            ]
        }
    },
    _callSubscriber() {
        console.log('state changed')
    },

    getState() {
        return this._state
    },
    subscribe(observer: () => void) {
        this._callSubscriber = observer;
    },

    dispatch(action: ActionsType) {
        this._state.profilePage = myProfileReducer(this._state.profilePage, action)
        //this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
        this._callSubscriber()
    }
}

export default store;
