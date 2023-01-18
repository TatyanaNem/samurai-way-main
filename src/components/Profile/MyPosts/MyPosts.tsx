import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import {ProfilePageType} from '../../../redux/store';

type MyPostsPropsType = {
    profilePage: ProfilePageType
    addPost: () => void
    updateNewPostText: (text: string) => void
}

const MyPosts = (props: MyPostsPropsType) => {
    const newPostElement = React.createRef<HTMLTextAreaElement>();
    const onClickHandler = () => {
        if (newPostElement && newPostElement.current) {
            props.addPost()
        }
    }
    const onChangeHandler = () => {
        if (newPostElement && newPostElement.current) {
            let text = newPostElement.current.value;
            props.updateNewPostText(text)
        }
    }

    return (
        <div className={s.myPosts}>
            <h2 className="title">My posts</h2>
            <div className={s.postInput}>
                <textarea className={s.textarea} ref={newPostElement} onChange={onChangeHandler} value={props.profilePage.newPostText}></textarea>
                <button className={s.postInputButton} onClick={onClickHandler}>Add post</button>
            </div>
            <ol className="postsList">
                {props.profilePage.posts.map(el => {
                    return <Post key={el.id} id={el.id} message={el.message} likesCount={el.likesCount}/>
                })}
            </ol>
        </div>
    )
}

export default MyPosts;