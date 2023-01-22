import React from 'react';
import styles from './Users.module.css';
import userPhoto from '../../assets/images/userPhoto.png';
import {UserType} from '../../redux/usersReducer';

type UsersType = {
    users: UserType[]
    totalUsersCount: number
    usersPerPage: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    follow: (userId: string) => void
    unfollow: (userId: string) => void
}

const Users = (props: UsersType) => {
    let numberOfPages = Math.ceil(props.totalUsersCount / props.usersPerPage)
    const pages = []
    for (let i = 1; i <= numberOfPages; i++) {
        pages.push(i)
    }

    return (
        <>
            <div className={styles.pagination}>
                {pages.slice(0,10).map(p => {
                    return <button
                        className={props.currentPage === p ? styles.currentPage : ''}
                        onClick={() => props.onPageChanged(p)}>
                        {p}
                    </button>
                })}
            </div>
            <ul className={styles.usersList}>
                {props.users.map(u => <li key={u.id} className={styles.userItem}>
                    <div className={styles.userPhotoBlock}>
                        <img src={u.photos.small !== null ? u.photos.small : userPhoto} alt="user avatar"/>
                        {u.followed
                            ? <button onClick={() => props.unfollow(u.id)}>Unfollow</button>
                            : <button onClick={() => props.follow(u.id)}>Follow</button>
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
        </>
    );
};

export default Users;