import {MessageItemType} from '../../redux/store';
import s from './Dialogs.module.css';
import React from 'react';

export const MessageItem = (props: MessageItemType) => {
    return <div className={s.messages__item}>{props.message}</div>
}