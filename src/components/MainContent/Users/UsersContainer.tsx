import React, {FC} from 'react';
import {connect} from 'react-redux';
import {StateType} from '../../../redux/redux-store';
import {
    followTC,
    getUsersTC,
    setCurrentPage,
    setTotalUsersCount,
    setUsers,
    unfollowTC,
    UserType
} from '../../../redux/usersReducer';
import Users from './Users';
import Preloader from '../../common/Preloader/Preloader';
import {compose} from 'redux';

export type MapStatePropsType = {
    users: UserType[],
    currentPage: number,
    totalUsersCount: number,
    usersPerPage: number
    isFetching: boolean
    followingInProgress: string[]
}

export type MapDispatchPropsType = {
    followTC: (userId: string) => void
    unfollowTC: (userId: string) => void
    setUsers: (users: UserType[]) => void
    setTotalUsersCount: (count: number) => void
    setCurrentPage: (pageNumber: number) => void
    getUsersTC: (currentPage: number, usersPerPage: number) => void
}

type UsersPropsType = MapStatePropsType & MapDispatchPropsType

class UsersContainer extends React.Component<UsersPropsType> {
    constructor(props: UsersPropsType) {
        super(props);
    }

    componentDidMount() {
        this.props.getUsersTC(this.props.currentPage, this.props.usersPerPage)
    }

    onPageChanged = (pageNumber: number) => {    // стрелочный тип либо как вариант при передаче в атрибутах this.onPageChanged.bind(this)
        this.props.setCurrentPage(pageNumber)
        this.props.getUsersTC(pageNumber, this.props.usersPerPage)
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
                    followUser={this.props.followTC}
                    unfollowUser={this.props.unfollowTC}
                    onPageChanged={this.onPageChanged}
                    followingInProgress={this.props.followingInProgress}
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
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress
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


export default compose<FC>(connect<MapStatePropsType, MapDispatchPropsType, {}, StateType>(mapStateToProps, {
    followTC,
    unfollowTC,
    setUsers,
    setTotalUsersCount,
    setCurrentPage,
    getUsersTC
}))(UsersContainer);