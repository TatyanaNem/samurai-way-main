import React from 'react';
import AuthInfo from '../Auth/AuthInfo/AuthInfo';
import {NavLink} from 'react-router-dom';

type AuthPropsType = {
    isAuth: boolean
    login: string
}

const AuthBlock = (props: AuthPropsType) => {
    return (
        <div>
            {props.isAuth
                ? <AuthInfo login={props.login}/>
                : <NavLink to={'/login'}>LOG IN</NavLink>}
        </div>
    );
};

export default AuthBlock;