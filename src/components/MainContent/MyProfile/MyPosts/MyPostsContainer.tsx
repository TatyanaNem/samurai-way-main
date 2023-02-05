import React from 'react';
import {ActionsType, AddPostAC, UpdateNewPostTextAC} from '../../../../redux/myProfileReducer';
import MyPosts from './MyPosts';
import {StateType} from '../../../../redux/redux-store';
import {connect} from 'react-redux';


const mapStateToProps = (state: StateType) => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }
}

const mapDispatchToProps = (dispatch: (action: ActionsType) => void) => {
    return {
        addPost: () => {
            dispatch(AddPostAC())
        },
        updateNewPostText: (text: string) => {
            dispatch(UpdateNewPostTextAC(text))
        }
    }
}
const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer;