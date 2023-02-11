import React, {FC} from 'react';
import {ActionsType, AddPostAC} from '../../../../redux/myProfileReducer';
import MyPosts from './MyPosts';
import {StateType} from '../../../../redux/redux-store';
import {connect} from 'react-redux';
import {compose} from 'redux';


const mapStateToProps = (state: StateType) => {
    return {
        posts: state.profilePage.posts
    }
}

const mapDispatchToProps = (dispatch: (action: ActionsType) => void) => {
    return {
        addPost: (newPostMessage: string) => {
            dispatch(AddPostAC(newPostMessage))
        }
    }
}
const MyPostsContainer = compose<FC>(connect(mapStateToProps, mapDispatchToProps))(MyPosts)

export default MyPostsContainer;