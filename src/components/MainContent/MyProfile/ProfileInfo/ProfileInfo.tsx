import React from 'react';
import s from './ProfileInfo.module.css';
import {ProfileType, updateProfileStatusTC} from '../../../../redux/myProfileReducer';
import userPhoto from '../../../../assets/images/userPhoto.png';
import {FaPen} from 'react-icons/fa';
import {useDispatch} from 'react-redux';
import ProfileStatus from './ProfileStatus/ProfileStatus';
import ProfileStatusWithHooks from './ProfileStatus/ProfileStatus';

type ProfileInfoPropsType = {
    profile: null | ProfileType
    status: string
    authorizedUserId: null |number
    updateStatus: (status: string) => void
}

const ProfileInfo = (props: ProfileInfoPropsType) => {
    const dispatch = useDispatch()
    const updateStatus = (newStatus: string) => {
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
                        <h2 className={s.fullName} onClick={() => {}}>{props.profile?.fullName}</h2>
                        {props.authorizedUserId === props.profile?.userId ? <ProfileStatus updateStatus={updateStatus} status={props.status}/> : <div>{props.status ? props.status : 'No status here yet ...'}</div>}
                    </div>
                    <div className={s.lookingForJob}>
                        <span className={s.text}>{props.profile?.lookingForAJob
                            ? <svg className={s.lookingForJobSVG} xmlns="http://www.w3.org/2000/svg"
                                   xmlnsXlink="http://www.w3.org/1999/xlink" width="160" height="160">
                                <defs>
                                    <path d="M5,115a80,75 0 1,0 140,-100a80,80 0 1,0 -145,0" id="textcircle" />
                                </defs>
                                <text>
                                    <textPath xlinkHref="#textcircle">
                                        #lookingForJob
                                    </textPath>
                                </text>
                            </svg>
                            : '' }</span>
                    </div>
                    {props.authorizedUserId === props.profile?.userId ? <button>Edit profile</button> : <button>Send a message</button>}
                </div>
        </div>
    )
}

export default ProfileInfo;
