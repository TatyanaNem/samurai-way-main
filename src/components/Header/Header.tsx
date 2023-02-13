import React, {useEffect, useState} from 'react';
import s from './Header.module.css';
import {NavLink} from 'react-router-dom';
import AuthBlockContainer from './AuthBlock/AuthBlockContainer';
import {FaHome, FaRegBell, FaSearch, FaUserFriends} from 'react-icons/fa';
import {useSelector} from 'react-redux';
import {UserType} from '../../redux/usersReducer';
import {StateType} from '../../redux/redux-store';
import SuperDebouncedInput from '../common/SuperDebouncedInput/SuperDebouncedInput';
import userPhoto from '../../assets/images/userPhoto.png';
import logo from '../../assets/images/logo.svg';

const Header = () => {
    const isAuth = useSelector<StateType, boolean>(state => state.auth.isAuth)
    return (
        <header className={s.header}>
            <div className={s.container}>
                <div className={s.logo}>
                    <img
                        src={logo}
                        alt={'logotype'}/>
                    <span style={{color: 'mediumslateblue', textTransform: 'uppercase'}}>SamuraiJS Social Network</span>
                </div>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <nav className={s.nav}>
                        <ul className={s.nav__list}>
                            <li className={s.nav__item}>
                                <NavLink to={'/'} title="Home"><FaHome/></NavLink>
                            </li>
                            <li className={s.nav__item}>
                                <NavLink to={'/users'} title="Users"><FaUserFriends/></NavLink>
                            </li>
                            <li className={s.nav__item}>
                                <NavLink to={'#'} title="Notifications"><FaRegBell/></NavLink>
                            </li>
                        </ul>
                    </nav>
                    {!isAuth
                        ? <NavLink to={'/login'} className={s.loginLink}>LOG IN</NavLink>
                        : <AuthBlockContainer/>}
                </div>
            </div>
        </header>
    )
}

export default Header;
