import React from 'react';
import styles from './MyPosts.module.css';
import Post from './Post/Post';
import {PostType} from '../../../../redux/myProfileReducer';
import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import {Textarea} from '../../../common/FormsControls/FormsControls';
import {maxLengthCreator, required} from '../../../common/validators/validators';


type MyPostsPropsType = {
    posts: Array<PostType>
    addPost: (newPostMessage: string) => void
}

type FormDataType = {
    newPostMessage: string
}

const MyPosts = (props: MyPostsPropsType) => {
    const onSubmit = (formData: FormDataType) => {
        props.addPost(formData.newPostMessage)
    }

    return (
        <div className={styles.myPosts}>
            <h2 className="title">My posts</h2>
            <AddPostReduxForm onSubmit={onSubmit}/>
            <ol className="postsList">
                {props.posts.map(el => {
                    return <Post key={el.id} id={el.id} message={el.message} likesCount={el.likesCount}/>
                })}
            </ol>
        </div>
    )
}

const maxLength100 = maxLengthCreator(100)

const AddPostForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className={styles.addPostForm}>
            <Field placeholder='Write, what you think about...'
                   name='newPostMessage'
                   component={Textarea}
                   validate={[required, maxLength100]}
            >
            </Field>
            <button>Public</button>
        </form>
    )
}

const AddPostReduxForm = reduxForm<FormDataType>({form: 'profileAddPostForm'})(AddPostForm)

export default MyPosts;