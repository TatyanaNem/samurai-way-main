import {DialogItemType} from '../../../redux/store';
import s from './Dialogs.module.css';
import {NavLink} from 'react-router-dom';
import React from 'react';

export const DialogItem = (props: DialogItemType) => {
    let path = '/dialogs/' + props.id;
    return <li key={props.id} className={s.dialogs__item}>
        <NavLink to={path} className={s.dialogs__link} activeClassName={s.active}>
            <img src={props.avatar ? props.avatar : 'https://placehold.co/400'} alt="friend avatar"/>
            {props.name}
        </NavLink>
    </li>
}
