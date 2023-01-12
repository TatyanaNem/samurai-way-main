import React from 'react';
import s from './Dialogs.module.css';
import AddItemInput from '../AddItemInput/AddItemInput';
import {DialogItem} from './DialogItem';
import {MessageItem} from './MessageItem';
import {DialogsPageType} from '../../redux/store';

type DialogsPropsType = {
    dialogsPage: DialogsPageType
    updateNewMessageText: (text: string) => void
    addMessage: () => void
}

const Dialogs = (props: DialogsPropsType) => {

    return (
        <div className={s.dialogs}>
            <ul className={s.dialogs__list}>
                {props.dialogsPage.dialogs.map(el => {
                    return <DialogItem id={el.id} key={el.id} name={el.name} avatar={el.avatar}/>
                })}
            </ul>
            <div className={s.messages__list}>
                {props.dialogsPage.messages.map((el => {
                    return <MessageItem id={el.id} key={el.id} message={el.message}/>
                }))}
                <AddItemInput buttonTitle={'+'} updateItem={props.updateNewMessageText} addItem={props.addMessage} newMessageText={props.dialogsPage.newMessageText}/>
            </div>
        </div>
    )
}

export default Dialogs;