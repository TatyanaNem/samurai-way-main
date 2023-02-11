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

type PropsType = {
    isAuth: boolean
}

const Header = (props: PropsType) => {

    const users = useSelector<StateType, UserType[]>(state => state.usersPage.users)
    console.log('users', users)
    const [friends, setFriends] = useState<UserType[]>([])
    console.log(friends)
    const [find, setFind] = useState('')
    const [openDropDown, setOpenDropDown] = useState(false)
    const findFriends = (value: string) => {
        setFriends(users.filter(el => el.name.toLowerCase().startsWith(value)))
    }

    const onChangeFind = (value: string) => {
        setFind(value)
    }

    useEffect(() => {
        let friends = users.filter(el => el.followed)
        setFriends(friends)
    }, [users])

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
                    {users.length !== 0 && <form action="#" className={s.searchForm}>
                      <SuperDebouncedInput
                        className={s.searchForm__input}
                        placeholder="Find followed friends"
                        onDebouncedChange={findFriends}
                        onChangeText={onChangeFind}
                        value={find}
                        onClick={() => setOpenDropDown(true)}
                        onBlur={() => setOpenDropDown(false)}
                      /><FaSearch/>
                      <ul className={openDropDown ? s.dropdown__visible : s.searchForm__dropdown}>
                          {friends.length ? friends.map(f => {
                              return <li className={s.dropdown__item}>
                                  <NavLink className={s.dropdown__link} to={`/profile/${f.id}`}>
                                      <img src={f.photos.small ? f.photos.small : userPhoto} alt="user photo"/>
                                      <span>{f.name}</span>
                                  </NavLink>
                              </li>
                          }) : <li className={s.dropdown__item}>No suggestions</li>}
                      </ul>
                    </form>}
                    <nav className={s.nav}>
                        <ul className={s.nav__list}>
                            <li className={s.nav__item}>
                                <NavLink to={'/profile'} title="Home"><FaHome/></NavLink>
                            </li>
                            <li className={s.nav__item}>
                                <NavLink to={'/users'} title="Users"><FaUserFriends/></NavLink>
                            </li>
                            <li className={s.nav__item}>
                                <NavLink to={'#'} title="Notifications"><FaRegBell/></NavLink>
                            </li>
                        </ul>
                    </nav>
                    {!props.isAuth
                        ? <NavLink to={'/login'} className={s.loginLink}>LOG IN</NavLink>
                        : <AuthBlockContainer/>}
                </div>
            </div>
        </header>
    )
}

export default Header;