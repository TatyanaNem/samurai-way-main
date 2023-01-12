import React from 'react';
import styles from './FriendsList.module.css';
import {connect} from 'react-redux';
import {StateType} from '../../../redux/redux-store';
import {DialogItemType} from '../../../redux/store';

type FriendsListPropsType = {
    dialogs: DialogItemType[]
}

const FriendsList = (props: FriendsListPropsType) => {
    let counter = props.dialogs.length
    return (
        <div className={styles.friendsList}>
            <h4>Friends <span>{counter}</span></h4>
            <ul className={styles.friendsListWrapper}>
                {props.dialogs.map(el => {
                    return (
                        <li key={el.id}>
                            <img src={el.avatar} alt="Friend's avatar"/>
                            <div>{el.name}</div>
                        </li>
                    )
                })}
            </ul>
        </div>
    );
};

const mapStateToProps = (state: StateType) => {
    return {
        dialogs: state.dialogsPage.dialogs
    }
}

const FriendsListContainer = connect(mapStateToProps)(FriendsList)

export default FriendsListContainer;