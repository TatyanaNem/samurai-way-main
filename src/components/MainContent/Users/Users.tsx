import React, {useEffect} from 'react';
import styles from './Users.module.css';
import userPhoto from '../../../assets/images/userPhoto.png';
import {UserType} from '../../../redux/usersReducer';
import {NavLink} from 'react-router-dom';
import {Pagination} from '../../common/Pagination/Pagination';

type UsersType = {
    users: UserType[]
    totalUsersCount: number
    usersPerPage: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    followUser: (userId: number) => void
    unfollowUser: (userId: number) => void
    followingInProgress: number[]
}

const Users = (props: UsersType) => {
    console.log('Users rerender')
    return (
        <>
            <Pagination
                currentPage={props.currentPage}
                usersPerPage={props.usersPerPage}
                totalItemsCount={props.totalUsersCount}
                onPageChanged={props.onPageChanged}
                portionSize={5}
            />
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
