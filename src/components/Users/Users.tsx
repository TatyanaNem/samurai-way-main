import React from 'react';
import {UserType} from '../../redux/usersReducer';
import styles from './Users.module.css';
import axios from 'axios';
import userPhoto from '../../assets/images/userPhoto.png';
import {StateType} from '../../redux/redux-store';

type UsersPropsType = {
    users: UserType[]
    setUsers: (users: UserType[]) => void
    follow: (userId: string) => void
    unfollow: (userId: string) => void
}

class Users extends React.Component<UsersPropsType> {
    constructor(props: UsersPropsType) {
        super(props);

        axios.get('https://social-network.samuraijs.com/api/1.0/users')
            .then(response => props.setUsers(response.data.items))
    }

    render () {
        return <ul className={styles.usersList}>
            {this.props.users.map(u => <li key={u.id} className={styles.userItem}>
                <div className={styles.userPhotoBlock}>
                    <img src={u.photos.small !== null ? u.photos.small : userPhoto} alt="user avatar"/>
                    {u.followed
                        ? <button onClick={() => this.props.unfollow(u.id)}>Unfollow</button>
                        : <button onClick={() => this.props.follow(u.id)}>Follow</button>
                    }
                </div>
                <div className={styles.userDetailsBlock}>
                    <div>
                        <span>{u.name}</span>
                        <span className={styles.userStatus}>"{u.status !== null ? u.status : 'Hey there!'}"</span>
                    </div>
                    <div>
                        <span>{'u.location.city'}</span>
                        <span>{'u.location.country'}</span>
                    </div>
                </div>
            </li>)}
        </ul>
    }
}

export default Users;