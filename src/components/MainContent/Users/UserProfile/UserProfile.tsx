import {PostType, ProfileType} from '../../../../redux/myProfileReducer';

type ProfilePropsType = {
    profile: null | ProfileType
    posts: PostType[]
    newPostText: string
    isAuth: boolean
}

const UserProfile = (props: ProfilePropsType) => {
    console.log('props: ', props)
    //if (!props.isAuth) return <Redirect to={'/login'}/>

    return <div>
        {/*<UserProfileInfo profile={props.profile}/>
        <UserPostsContainer/>*/}
    </div>
}

export default UserProfile;