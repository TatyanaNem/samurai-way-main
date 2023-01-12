import React, {ChangeEvent, useRef, useState} from 'react';
import styles from './AddItemInput.module.css';

type AddItemInputPropsType = {
    buttonTitle: string
    updateItem: (text: string) => void
    addItem: () => void
    newMessageText: string
}

const AddItemInput = (props: AddItemInputPropsType) => {
    const textareaElement = React.createRef<HTMLTextAreaElement>();
    const onChangeTextareaHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        if (textareaElement && textareaElement.current) {
            let text = textareaElement.current?.value;
            props.updateItem(text)
        }
    }
    const onClickHandler = () => {
        props.addItem()
    }

    return (
        <div className={styles.addItemInputWrapper}>
            <textarea onChange={onChangeTextareaHandler} value={props.newMessageText} ref={textareaElement}></textarea>
            <button onClick={onClickHandler}>{props.buttonTitle}</button>
        </div>
    );
};

export default AddItemInput;