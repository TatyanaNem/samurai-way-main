import React from 'react';
import s from './Header.module.css';
import {NavLink} from 'react-router-dom';
import AuthContainer from './Auth/AuthContainer';

type PropsType = {
    isAuth: boolean
}

const Header = (props: PropsType) => {
    return (
        <header className={s.header}>
            <div className={s.container}>
                <img
                    src={'https://askbootstrap.com/preview/osahanin/light/img/logo.svg'}
                    alt={'logotype'}/>
                {!props.isAuth
                    ? <NavLink to={'/login'} className={s.loginLink}>LOG IN</NavLink>
                    : <AuthContainer/>}

            </div>
        </header>
    )
}

export default Header;