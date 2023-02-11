import React from 'react';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import {PostType, ProfileType} from '../../../redux/myProfileReducer';

type ProfilePropsType = {
    profile: null | ProfileType
    posts: PostType[]
    isAuth: boolean
}

const Profile = (props: ProfilePropsType) => {
    console.log('props: ', props)
    //if (!props.isAuth) return <Redirect to={'/login'}/>

    return <div>
        <ProfileInfo profile={props.profile}/>
        <MyPostsContainer/>
    </div>
}

export default Profile;