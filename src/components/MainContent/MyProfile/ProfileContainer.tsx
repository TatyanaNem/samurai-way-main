import React, {FC} from 'react';
import {connect} from 'react-redux';
import {StateType} from '../../../redux/redux-store';
import {
    getProfileStatusTC,
    PostType,
    ProfileType,
    setUserProfileTC, updateProfileStatusTC
} from '../../../redux/myProfileReducer';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import Profile from './Profile';
import {compose} from 'redux';
import {withAuthRedirect} from '../../../HOC/withAuthRedirect';

type MapStatePropsType = {
    posts: PostType[]
    profile: null | ProfileType
    status: string
    isAuth: boolean
    authorizedUserId: null | number
}

type MapDispatchPropsType = {
    setUserProfileTC: (useId: string) => void
    getProfileStatusTC: (userId: string) => void
    updateProfileStatusTC: (status: string) => void
}

type PathParamsType = {
    userId: string
}

type OwnPropsType = MapStatePropsType & MapDispatchPropsType

type NewProfileContainerPropsType = RouteComponentProps<PathParamsType> & OwnPropsType;

class ProfileContainer extends React.Component<NewProfileContainerPropsType> {
    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = this.props.authorizedUserId + '';
        }
        this.props.setUserProfileTC(userId)
        this.props.getProfileStatusTC(userId)
    }

    render () {
        return <Profile {...this.props}
                        profile={this.props.profile}
                        posts={this.props.posts}
                        isAuth={this.props.isAuth}
                        status={this.props.status}
                        updateStatus={this.props.updateProfileStatusTC}
        />
    }
}

const mapStateToProps = (state: StateType): MapStatePropsType => {
    return {
        posts: state.profilePage.posts,
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        isAuth: state.auth.isAuth,
        authorizedUserId: state.auth.userId
    }
}

export default compose<FC>(
    connect(mapStateToProps, {setUserProfileTC, getProfileStatusTC, updateProfileStatusTC}),
    withRouter,
    withAuthRedirect
)(ProfileContainer)

/*
export default withAuthRedirect(connect(mapStateToProps, {setUserProfileTC})(withRouterComponent))*/
