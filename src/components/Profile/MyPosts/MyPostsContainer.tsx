import React from 'react';
import {AddPostAC, UpdateNewPostTextAC} from '../../../redux/profileReducer';
import MyPosts from './MyPosts';
import {ActionsType, StoreType} from '../../../redux/store';
import {StateType} from '../../../redux/redux-store';
import {connect} from 'react-redux';


const mapStateToProps = (state: StateType) => {
    return {
        profilePage: state.profilePage
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