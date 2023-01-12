import React from 'react';
import s from './ProfileInfo.module.css';

const ProfileInfo = () => {
    return (
        <div className={s.profileInfo}>
            <div className={s.profileInfo__image}></div>
            <div className={s.descriptionBlock}>ava + description</div>
        </div>
    )
}

export default ProfileInfo;