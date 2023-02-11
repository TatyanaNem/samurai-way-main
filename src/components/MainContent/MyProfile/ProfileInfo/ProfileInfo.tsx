import React from 'react';
import s from './ProfileInfo.module.css';
import {ProfileType} from '../../../../redux/myProfileReducer';
import userPhoto from '../../../../assets/images/userPhoto.png';
import {FaPen} from 'react-icons/fa';
import EditableSpan from '../../../common/EditableSpan';

type ProfileInfoPropsType = {
    profile: null | ProfileType
}

const ProfileInfo = (props: ProfileInfoPropsType) => {
    const updateProfileStatus = (newStatus: string) => {

    }

    return (
        <div className={s.profile}>
                <div className={s.profileInfo}>
                    <img className={s.profileImage}
                         src={props.profile?.photos.large !== null ? props.profile?.photos.large : userPhoto}
                         alt="user avatar"/>
                </div>
                <div className={s.descriptionBlock}>
                    <div className={s.personalData}>
                        <h2 className={s.fullName} onClick={() => {}}>{props.profile?.fullName}<FaPen size='0.8rem' color='mediumslateblue' className={s.svg}/></h2>
                        <EditableSpan status={props.profile?.aboutMe} onChange={updateProfileStatus}/>
                        {/*<p className={s.status}>"{props.profile?.aboutMe === null ? 'Hey there!!!' : props.profile?.aboutMe}"</p>*/}
                    </div>
                    <div className={s.lookingForJob}>
                        <span>{props.profile?.lookingForAJob ? '#ищуPаботу': '' }</span>
                        <div>{props.profile?.lookingForAJobDescription}</div>
                    </div>
                    <button>Написать сообщение</button>
                </div>
        </div>
    )
}

export default ProfileInfo;