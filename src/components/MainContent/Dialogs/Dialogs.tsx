import React from 'react';
import s from './Dialogs.module.css';
import {DialogItem} from './DialogItem';
import {MessageItem} from './MessageItem';
import {DialogsPageType} from '../../../redux/store';
import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import {Textarea} from '../../common/FormsControls/FormsControls';
import {maxLengthCreator, required} from '../../common/validators/validators';
import {AiOutlineSend} from 'react-icons/ai';

type DialogsPropsType = {
    dialogsPage: DialogsPageType
    updateNewMessageText: (text: string) => void
    addMessage: (newMessage: string) => void
}

export type FormDataType = {
    newMessageBody: string
}

const Dialogs = (props: DialogsPropsType) => {
    const onSubmit = (formData: FormDataType) => {
        props.addMessage(formData.newMessageBody)
    }

    return (
        <div className={s.dialogs}>
            <ul className={s.dialogs__list}>
                {props.dialogsPage.dialogs.map(el => {
                    return <DialogItem id={el.id} key={el.id} name={el.name} avatar={el.avatar}/>
                })}
            </ul>
            <div className={s.messages__list}>
                {props.dialogsPage.messages.map((el => {
                    return <MessageItem id={el.id} key={el.id} message={el.message}/>
                }))}
                <DialogsReduxForm onSubmit={onSubmit}/>
            </div>
        </div>
    )
}

const maxLength50 = maxLengthCreator(50)

const DialogAddMessageForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className={s.addMessageForm}>
            <Field placeholder='Enter your message'
                   name='newMessageBody'
                   component={Textarea}
                   validate={[required, maxLength50]}
            >
            </Field>
            <button><AiOutlineSend/></button>
        </form>
    )
}

const DialogsReduxForm = reduxForm<FormDataType>({form: 'dialogAddMessageForm'})(DialogAddMessageForm)

export default Dialogs;