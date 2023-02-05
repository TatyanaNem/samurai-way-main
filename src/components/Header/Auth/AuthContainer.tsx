import React, {FC} from 'react';
import Auth from './Auth';
import {StateType} from '../../../redux/redux-store';
import {connect} from 'react-redux';
import {authorizeMeTC} from '../../../redux/authReducer';
import {compose} from 'redux';

class AuthContainer extends React.Component<any, any> {
    componentDidMount() {
        this.props.authorizeMeTC()
    }

    render() {
        return <Auth {...this.props} isAuth={this.props.isAuth} login={this.props.login}/>
    }
}

type MapStatePropsType = {
    login: null | string
    isAuth: boolean
}

type MapDispatchPropsType = {
    authorizeMeTC: () => void
}

const
    MapStateToProps = (state: StateType): MapStatePropsType => {
        return {
            login: state.auth.login,
            isAuth: state.auth.isAuth
        }
    }


export default compose<FC>(connect<MapStatePropsType, MapDispatchPropsType, {}, StateType> (MapStateToProps, {authorizeMeTC})
)
(AuthContainer);