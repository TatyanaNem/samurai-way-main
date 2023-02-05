import React, {FC} from 'react';
import {Redirect} from 'react-router-dom';
import {StateType} from '../redux/redux-store';
import {connect} from 'react-redux';

type MapStateToPropsType = {
    isAuth: boolean
}

const mapStateToProps = (state: StateType): MapStateToPropsType => ({
    isAuth: state.auth.isAuth
})

export function withAuthRedirect<T>(Component: FC) {
    const RedirectComponent = (props: MapStateToPropsType) => {
        let {isAuth, ...restProps} = props
        if (!isAuth) return <Redirect to={'/login'}/>
        return <Component {...restProps as T}/>
    }
    return connect<MapStateToPropsType, {}, T, StateType>(mapStateToProps)(RedirectComponent);
}