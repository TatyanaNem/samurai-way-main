import React from 'react';
import {connect} from 'react-redux';
import {StateType} from '../../redux/redux-store';
import {
    setCurrentPage,
    setTotalUsersCount,
    setUsers, toggleIsFetching,
    unfollowUser,
    UserType
} from '../../redux/usersReducer';
import {followUser} from '../../redux/usersReducer';
import {Dispatch} from 'redux';
import axios from 'axios';
import Users from './Users';
import Preloader from '../common/Preloader/Preloader';

export type MapStatePropsType = {
    users: UserType[],
    currentPage: number,
    totalUsersCount: number,
    usersPerPage: number
    isFetching: boolean
}

export type MapDispatchPropsType = {
    followUser: (userId: string) => void
    unfollowUser: (userId: string) => void
    setUsers: (users: UserType[]) => void
    setTotalUsersCount: (count: number) => void
    setCurrentPage: (pageNumber: number) => void
    toggleIsFetching: (isFetching: boolean) => void
}

type UsersPropsType = MapStatePropsType & MapDispatchPropsType

class UsersContainer extends React.Component<UsersPropsType> {
    constructor(props: UsersPropsType) {
        super(props);
    }

    componentDidMount() {
        this.props.toggleIsFetching(true)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.usersPerPage}`)
            .then(response => {
                this.props.toggleIsFetching(false)
                this.props.setUsers(response.data.items)
                this.props.setTotalUsersCount(response.data.totalCount)
            })
    }

    onPageChanged = (pageNumber: number) => {    // стрелочный тип либо как вариант при передаче в атрибутах this.onPageChanged.bind(this)
        this.props.setCurrentPage(pageNumber)
        this.props.toggleIsFetching(true)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.usersPerPage}`)
            .then(response => {
                this.props.toggleIsFetching(false)
                this.props.setUsers(response.data.items)
            })
    }

    render() {
        return <>
            {this.props.isFetching
                ? <Preloader/>
                : <Users
                totalUsersCount={this.props.totalUsersCount}
                users={this.props.users}
                currentPage={this.props.currentPage}
                usersPerPage={this.props.usersPerPage}
                follow={this.props.followUser}
                unfollow={this.props.unfollowUser}
                onPageChanged={this.onPageChanged}
            />}
        </>
    }
}


const mapStateToProps = (state: StateType): MapStatePropsType => {
    return ({
        users: state.usersPage.users,
        currentPage: state.usersPage.currentPage,
        totalUsersCount: state.usersPage.totalUsersCount,
        usersPerPage: state.usersPage.usersPerPage,
        isFetching: state.usersPage.isFetching
    })
}

/*const mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
    return ({
        follow: (userId: string) => {
            dispatch(followUserAC(userId))
        },
        unfollow: (userId: string) => {
            dispatch(unfollowUserAC(userId))
        },
        setUsers: (users: UserType[]) => {
            dispatch(setUsersAC(users))
        },
        setTotalUsersCount: (count: number) => {
            dispatch(setTotalUsersCountAC(count))
        },
        setCurrentPage: (pageNumber: number) => {
            dispatch(setCurrentPageAC(pageNumber))
        },
        toggleIsFetching: (isFetching: boolean) => {
            dispatch(toggleIsFetchingAC(isFetching))
        }
    })
}*/


export default connect<MapStatePropsType, MapDispatchPropsType, {}, StateType>(mapStateToProps, {
    followUser,
    unfollowUser,
    setUsers,
    setTotalUsersCount,
    setCurrentPage,
    toggleIsFetching})(UsersContainer as any);