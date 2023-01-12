import React from 'react';
import s from './Navbar.module.css';
import {NavLink} from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className={s.nav}>
            <ul className={s.nav__list}>
                <li className={s.nav__item}>
                    <NavLink to="/profile" className={s.nav__link} activeClassName={s.active}>Profile</NavLink>
                </li>
                <li className={s.nav__item}>
                    <NavLink to="/dialogs" className={s.nav__link} activeClassName={s.active}>Messages</NavLink>
                </li>
                <li className={s.nav__item}>
                    <NavLink to="/news" className={s.nav__link} activeClassName={s.active}>News</NavLink>
                </li>
                <li className={s.nav__item}>
                    <NavLink to="/music" className={s.nav__link} activeClassName={s.active}>Music</NavLink>
                </li>
                <li className={s.nav__item}>
                    <NavLink to="/settings" className={s.nav__link} activeClassName={s.active}>Settings</NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar;