import React, {ChangeEvent, useState} from 'react';
import s from '../MainContent/MyProfile/ProfileInfo/ProfileInfo.module.css';
import {FaPen} from 'react-icons/fa';

type PropsType = {
    status?: string
    onChange: (newValue: string) => void

}

const EditableSpan = (props: PropsType) => {
    const [editMode, setEditMode] = useState(false)
    const [inputValue, setInputValue] = useState<string>('')
    const deactivateEditMode = (newStatus: string) => {
        setEditMode(false)
        props.onChange(inputValue)
    }
    const activateEditMode = () => {
        setEditMode(true)
        if (props.status) setInputValue(props.status)
    }

    return (
        <div onBlur={() => deactivateEditMode(inputValue)}>
            {editMode
                ? <input autoFocus value={inputValue} onChange={(e: ChangeEvent<HTMLInputElement>) => setInputValue(e.currentTarget.value)}/>
                : <span onDoubleClick={activateEditMode}>{props.status}<FaPen size='0.8rem' color='mediumslateblue' className={s.svg}/></span>
            }
        </div>
    );
};

export default EditableSpan;