import React, {FC} from 'react';
import AuthBlock from './AuthBlock';
import {StateType} from '../../../redux/redux-store';
import {connect} from 'react-redux';
import {authorizeMeTC} from '../../../redux/authReducer';
import {compose} from 'redux';
import {setUserProfileTC} from '../../../redux/myProfileReducer';
import {withAuthRedirect} from '../../../HOC/withAuthRedirect';

class AuthBlockContainer extends React.Component<any, any> {
    componentDidMount() {
        this.props.authorizeMeTC()
    }

    render() {
        return <AuthBlock {...this.props} isAuth={this.props.isAuth} login={this.props.login}/>
    }
}

type MapStatePropsType = {
    userId: null | number
    login: null | string
    isAuth: boolean
}

type MapDispatchPropsType = {
    authorizeMeTC: () => void
    setUserProfileTC: (userId: number) => void
}

const
    MapStateToProps = (state: StateType): MapStatePropsType => {
        return {
            userId: state.auth.userId,
            login: state.auth.login,
            isAuth: state.auth.isAuth
        }
    }


export default compose<FC>(connect<MapStatePropsType, MapDispatchPropsType, {}, StateType> (MapStateToProps, {authorizeMeTC, setUserProfileTC})
)(AuthBlockContainer);