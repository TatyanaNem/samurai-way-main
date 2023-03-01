import React from 'react';
import styles from './Users.module.css';
import userPhoto from '../../../assets/images/userPhoto.png';
import {UserType} from '../../../redux/usersReducer';
import {NavLink} from 'react-router-dom';

type UsersType = {
    users: UserType[]
    totalUsersCount: number
    usersPerPage: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    followUser: (userId: string) => void
    unfollowUser: (userId: string) => void
    followingInProgress: string[]
}

const Users = (props: UsersType) => {
    let numberOfPages = Math.ceil(props.totalUsersCount / props.usersPerPage)
    const pages = []
    for (let i = 1; i <= 35; i++) {
        pages.push(i)
    }

    return (
        <>
            <div className={styles.pagination}>
                {pages.map((p, i) => {
                    return <button key={i}
                                   className={props.currentPage === p ? styles.currentPage : ''}
                                   onClick={() => props.onPageChanged(p)}>
                        {p}
                    </button>
                })}
            </div>
            <ul className={styles.usersList}>
                {props.users.map(u => <>
                <li key={u.id} className={styles.userItem}>
                    <div className={styles.userPhotoBlock}>
                        <NavLink to={`/profile/${u.id}`}><img
                            src={u.photos.small !== null ? u.photos.small : userPhoto} alt="user avatar"/></NavLink>
                        {u.followed
                            ? <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {
                                props.unfollowUser(u.id)
                            }}>Unfollow</button>
                            : <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {
                                props.followUser(u.id)
                            }}>Follow</button>
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
                </li>
                </>)}
            </ul>
        </>
    );
};

export default Users;
