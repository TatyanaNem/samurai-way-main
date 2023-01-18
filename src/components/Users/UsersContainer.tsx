import React from 'react';
import {connect} from 'react-redux';
import Users from './Users';
import {StateType} from '../../redux/redux-store';
import {ActionsType, setUsersAC, unfollowUserAC, UserType} from '../../redux/usersReducer';
import {followUserAC} from '../../redux/usersReducer';


const mapStateToProps = (state: StateType) => {
    return state.usersPage
}

const mapDispatchToProps = (dispatch: (action: ActionsType) => void) => {
    return {
        follow: (userId: string) => {
            dispatch(followUserAC(userId))
        },
        unfollow: (userId: string) => {
            dispatch(unfollowUserAC(userId))
        },
        setUsers: (users: UserType[]) => {
            dispatch(setUsersAC(users))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);