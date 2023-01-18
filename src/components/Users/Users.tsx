import React from 'react';
import {UserType} from '../../redux/usersReducer';
import styles from './Users.module.css';

type UsersPropsType = {
    users: UserType[]
    setUsers: (users: UserType[]) => void
    follow: (userId: string) => void
    unfollow: (userId: string) => void
}

const Users = (props: UsersPropsType) => {
    if (props.users.length === 0) {
        props.setUsers([
            {id: '1', avatar: 'https://biografii.net/wp-content/uploads/2018/12/1442831684-dmitrij-nagiev.jpg', name: 'Dimych', surname: 'Kuzyuberdin', isFollowed: false, status: 'I am boss', location: {city: 'Minsk', country: 'Belarus'}},
            {id: '2', avatar: 'https://biografii.net/wp-content/uploads/2018/12/1442831684-dmitrij-nagiev.jpg', name: 'Sasha', surname: 'Golovin', isFollowed: true, status: 'I am boss too', location: {city: 'Moscow', country: 'Russia'}},
            {id: '3', avatar: 'https://biografii.net/wp-content/uploads/2018/12/1442831684-dmitrij-nagiev.jpg', name: 'Andrew', surname: 'Nesterenko', isFollowed: false, status: 'I am looking for job right now', location: {city: 'Kiev', country: 'Ukraine'}}
        ])
    }

    return (
        <ul className={styles.usersList}>
            {props.users.map(u => <li key={u.id} className={styles.userItem}>
                <div className={styles.userPhotoBlock}>
                    <img src={u.avatar} alt="user avatar"/>
                    {u.isFollowed
                        ? <button onClick={() => props.unfollow(u.id)}>Unfollow</button>
                        : <button onClick={() => props.follow(u.id)}>Follow</button>
                    }
                </div>
                <div className={styles.userDetailsBlock}>
                    <div>
                        <span>{`${u.name} ${u.surname.slice(0, 1)}.`}</span>
                        <span className={styles.userStatus}>"{u.status}"</span>
                    </div>
                    <div>
                        <span>{u.location.city}</span>
                        <span>{u.location.country}</span>
                    </div>
                </div>
            </li>)}
        </ul>
    );
};

export default Users;