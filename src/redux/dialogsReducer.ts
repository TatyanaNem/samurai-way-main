import {DialogsPageType} from './store';

export type AddMessageActionType = {
    type: 'ADD-MESSAGE'
    newMessage: string
}

type ActionsType = AddMessageActionType


const initialState: DialogsPageType = {
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
        {
            id: '4',
            name: 'Sasha',
            avatar: null
        },
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

//action creators
export const AddMessageAC = (newMessage: string) => {
    return {type: 'ADD-MESSAGE', newMessage} as const
}

//reducer
const dialogsReducer = (state: DialogsPageType = initialState, action: ActionsType) => {
    switch (action.type) {
        case 'ADD-MESSAGE':
            return {...state, messages: [...state.messages, {id: (Math.random()* 100 + 5).toString(), message: action.newMessage}]}
        default:
            return state;
    }
}

export default dialogsReducer;
