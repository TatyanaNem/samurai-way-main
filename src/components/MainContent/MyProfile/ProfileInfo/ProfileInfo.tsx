import React from 'react';
import s from './ProfileInfo.module.css';
import {ProfileType, updateProfileStatusTC} from '../../../../redux/myProfileReducer';
import userPhoto from '../../../../assets/images/userPhoto.png';
import {FaPen} from 'react-icons/fa';
import {useDispatch} from 'react-redux';
import ProfileStatus from './ProfileStatus/ProfileStatus';

type ProfileInfoPropsType = {
    profile: null | ProfileType
    status: null | string
    updateStatus: (status: string) => void
}

const ProfileInfo = (props: ProfileInfoPropsType) => {
    const dispatch = useDispatch()
    const updateProfileStatus = (newStatus: string) => {
        dispatch(updateProfileStatusTC(newStatus))
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
                        {props.status && <ProfileStatus/>}
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
