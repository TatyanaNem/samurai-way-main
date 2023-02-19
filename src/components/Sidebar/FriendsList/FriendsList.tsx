import React from 'react';
import styles from './FriendsList.module.css';
import {useSelector} from 'react-redux';
import userPhoto from '../../../assets/images/userPhoto.png';
import {selectFollowedUsers} from './friendsListSelectors';


const FriendsList = () => {
    const friends = useSelector(selectFollowedUsers)
    let counter = friends.length
    return (
        <div className={styles.friendsList}>
            <h4>Followed users <span> {counter} </span></h4>
            <ul className={styles.friendsListWrapper}>
                {friends.map(el => {
                    return (
                        <li key={el.id}>
                            <img src={el.photos.small ? el.photos.small : userPhoto} alt="Friend's avatar"/>
                            <div>{el.name}</div>
                        </li>
                    )
                })}
            </ul>
        </div>
    );
};


export default FriendsList;
