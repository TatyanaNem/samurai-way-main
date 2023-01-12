import React from 'react';
import s from './Header.module.css';

const Header = () => {
    return (
        <header className={s.header}>
            <div className={s.container}>
                <img
                    src={'https://askbootstrap.com/preview/osahanin/light/img/logo.svg'}
                    alt={'logotype'}/>
            </div>
        </header>
    )
}

export default Header;