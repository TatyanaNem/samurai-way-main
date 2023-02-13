import React from 'react';
import s from './Navbar.module.css';
import {NavLink} from 'react-router-dom';

const Navbar = () => {

    return (
        <nav className={s.nav}>
            <ul className={s.nav__list}>
                <li className={s.nav__item}>
                    <NavLink to="/profile" className={isActive =>
                        isActive ? s.active : s.nav__link}>Profile</NavLink>
                </li>
                <li className={s.nav__item}>
                    <NavLink to="/dialogs" className={isActive =>
                        isActive ? s.active : s.nav__link}>Messages</NavLink>
                </li>
                <li className={s.nav__item}>
                    <NavLink to="/users" className={isActive =>
                        isActive ? s.active : s.nav__link}>Users</NavLink>
                </li>
                <li className={s.nav__item}>
                    <NavLink to="/news" className={isActive =>
                        isActive ? s.active : s.nav__link}>News</NavLink>
                </li>
                <li className={s.nav__item}>
                    <NavLink to="/music" className={isActive =>
                        isActive ? s.active : s.nav__link}>Music</NavLink>
                </li>
                <li className={s.nav__item}>
                    <NavLink to="/settings" className={isActive =>
                        isActive ? s.active : s.nav__link}>Settings</NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar;