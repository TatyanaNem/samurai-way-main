import React, {FC} from 'react';
import {connect} from 'react-redux';
import {StateType} from '../../../redux/redux-store';
import {PostType, ProfileType, setUserProfileTC} from '../../../redux/myProfileReducer';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import MyProfile from './MyProfile';
import {compose} from 'redux';

type MapStatePropsType = {
    posts: PostType[]
    newPostText: string
    profile: null | ProfileType
    isAuth: boolean
}

type MapDispatchPropsType = {
    setUserProfileTC: (useId: string) => void
}

type PathParamsType = {
    userId: string
}

type OwnPropsType = MapStatePropsType & MapDispatchPropsType

type NewProfileContainerPropsType = RouteComponentProps<PathParamsType> & OwnPropsType;

class MyProfileContainer extends React.Component<NewProfileContainerPropsType> {
    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = '2';
        }
        this.props.setUserProfileTC(userId)
    }

    render () {
        return <MyProfile {...this.props}
                          profile={this.props.profile}
                          posts={this.props.posts}
                          newPostText={this.props.newPostText}
                          isAuth={this.props.isAuth}
        />
    }
}

const mapStateToProps = (state: StateType): MapStatePropsType => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText,
        profile: state.profilePage.profile,
        isAuth: state.auth.isAuth
    }
}

export default compose<FC>(
    connect(mapStateToProps, {setUserProfileTC}),
    withRouter
)(MyProfileContainer)

/*
export default withAuthRedirect(connect(mapStateToProps, {setUserProfileTC})(withRouterComponent))*/
