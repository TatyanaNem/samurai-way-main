import React, {FC} from 'react';
import {connect} from 'react-redux';
import {StateType} from '../../../redux/redux-store';
import {PostType, ProfileType, setUserProfileTC} from '../../../redux/myProfileReducer';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import Profile from './Profile';
import {compose} from 'redux';
import {withAuthRedirect} from '../../../HOC/withAuthRedirect';

type MapStatePropsType = {
    posts: PostType[]
    profile: null | ProfileType
    isAuth: boolean
    authorizedUserId: null | number
}

type MapDispatchPropsType = {
    setUserProfileTC: (useId: string) => void
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
            userId = this.props.authorizedUserId!.toString();
        }
        this.props.setUserProfileTC(userId)
    }

    render () {
        return <Profile {...this.props}
                        profile={this.props.profile}
                        posts={this.props.posts}
                        isAuth={this.props.isAuth}
        />
    }
}

const mapStateToProps = (state: StateType): MapStatePropsType => {
    return {
        posts: state.profilePage.posts,
        profile: state.profilePage.profile,
        isAuth: state.auth.isAuth,
        authorizedUserId: state.auth.userId
    }
}

export default compose<FC>(
    connect(mapStateToProps, {setUserProfileTC}),
    withRouter,
    withAuthRedirect
)(ProfileContainer)

/*
export default withAuthRedirect(connect(mapStateToProps, {setUserProfileTC})(withRouterComponent))*/
