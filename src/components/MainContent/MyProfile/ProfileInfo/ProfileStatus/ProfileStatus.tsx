import React, {ChangeEvent, KeyboardEvent, useEffect, useState} from 'react';
import styles from './ProfileStatus.module.css';

type ProfileStatusPropsType = {
    status: string
    updateStatus: (status: string) => void
}

const ProfileStatus = (props: ProfileStatusPropsType) => {
    const [editMode, setEditMode] = useState(false)
    const [inputValue, setInputValue] = useState(props.status)
    const activateEditMode = () => {
        setEditMode(true)
    }

    const onEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            deactivateEditMode()
        }
    }

    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(inputValue)
    }

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value)
    }

    useEffect(() => {
        setInputValue(props.status)
    }, [props.status])

    return (
        <div onBlur={deactivateEditMode} className={styles.statusBlock}>
            {editMode
                ? <input className={styles.statusInput} onKeyPress={onEnterHandler} onChange={onStatusChange} autoFocus value={inputValue}/>
                : <span className={styles.statusSpan} onClick={activateEditMode}>{props.status}</span>
            }
        </div>
    );
};

export default ProfileStatus;
