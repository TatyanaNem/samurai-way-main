import React, {FC} from 'react';
import AuthBlock from './AuthBlock';
import {StateType} from '../../../redux/redux-store';
import {connect} from 'react-redux';
import {authorizeMeTC, logoutTC} from '../../../redux/authReducer';
import {compose} from 'redux';
import {setUserProfileTC} from '../../../redux/myProfileReducer';

class AuthBlockContainer extends React.Component<any, any> {
    componentDidMount() {
        this.props.authorizeMeTC()
    }

    render() {
        return <AuthBlock {...this.props} isAuth={this.props.isAuth} login={this.props.login} logout={this.props.logoutTC}/>
    }
}

type MapStatePropsType = {
    login: null | string
    isAuth: boolean
}

type MapDispatchPropsType = {
    authorizeMeTC: () => void
    setUserProfileTC: (userId: number) => void
    logoutTC: () => void
}

const
    MapStateToProps = (state: StateType): MapStatePropsType => {
        return {
            login: state.auth.login,
            isAuth: state.auth.isAuth
        }
    }


export default compose<FC>(connect<MapStatePropsType, MapDispatchPropsType, {}, StateType> (MapStateToProps, {authorizeMeTC, setUserProfileTC, logoutTC})
)(AuthBlockContainer);