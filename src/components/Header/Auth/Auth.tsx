import React from 'react';
import {NavLink, Redirect} from 'react-router-dom';
import styles from './Auth.module.css';
import AuthSettings from './AuthSettings/AuthSettings';
import Login from '../../MainContent/Login/Login';

type AuthPropsType = {
    isAuth: boolean
    login: string
}

const Auth = (props: AuthPropsType) => {
    return (
        <div>
            {props.isAuth
                ? <AuthSettings login={props.login}/>
                : <Login/>}
        </div>
    );
};

export default Auth;