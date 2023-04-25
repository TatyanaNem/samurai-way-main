import React from 'react';
import s from './ProfileInfo.module.css';
import {ProfileType, updateProfileStatusTC} from '../../../../redux/myProfileReducer';
import userPhoto from '../../../../assets/images/userPhoto.png';
import {FaTimes} from 'react-icons/fa';
import {useDispatch, useSelector} from 'react-redux';
import ProfileStatus from './ProfileStatus/ProfileStatus';
import background from '../../../../assets/images/background-paper.png';
import {StateType} from '../../../../redux/redux-store';
import {SlSocialFacebook, SlSocialInstagram, SlSocialTwitter, SlSocialVkontakte, SlSocialYoutube} from 'react-icons/sl';
import {AiFillGithub} from 'react-icons/ai';
import {TiTickOutline} from 'react-icons/ti';

type ProfileInfoPropsType = {
    profile: null | ProfileType
    status: string
    authorizedUserId: null | number
    updateStatus: (status: string) => void
}

const ProfileInfo = (props: ProfileInfoPropsType) => {
    const dispatch = useDispatch()
    const updateStatus = (newStatus: string) => {
        dispatch(updateProfileStatusTC(newStatus))
    }

    return (
        <div className={s.profile}>
            <div className={s.imageBlock}>
                <img className={s.profileImage}
                     src={props.profile?.photos.large !== null ? props.profile?.photos.large : userPhoto}
                     alt="user avatar"/>
                {props.authorizedUserId === props.profile?.userId && <button>Change photo</button>}
            </div>

            <div className={s.descriptionBlock}>
                <div className={s.personalData} style={{backgroundImage: `url(${background})`, backgroundSize: '400px auto'}}>
                    <h2 className={s.fullName} onClick={() => {
                    }}>{props.profile?.fullName}</h2>
                    <div className={s.status}>
                        <u>Status:</u> {props.authorizedUserId === props.profile?.userId ?
                        <ProfileStatus updateStatus={updateStatus} status={props.status}/> :
                        <div>{props.status ? props.status : 'No status here yet ...'}</div>}
                    </div>
                    <p className={s.aboutMe}><u>About me:</u> {props.profile?.aboutMe}</p>
                    <p><u>Looking for job:</u> {props.profile?.lookingForAJob ? <TiTickOutline/>: <FaTimes/>}</p>
                    <p><u>Looking for job position:</u> {props.profile?.lookingForAJobDescription}</p>
                    <ul className={s.contacts}>
                        <u>Contacts</u>:
                        <li>My website: {props.profile?.contacts.website}</li>
                        <li><SlSocialVkontakte/> {props.profile?.contacts.vk}</li>
                        <li><SlSocialFacebook/> {props.profile?.contacts.facebook}</li>
                        <li><SlSocialYoutube/> {props.profile?.contacts.youtube}</li>
                        <li><AiFillGithub/> {props.profile?.contacts.github}</li>
                        <li><SlSocialInstagram/> {props.profile?.contacts.instagram}</li>
                        <li><SlSocialTwitter/> {props.profile?.contacts.twitter}</li>
                    </ul>
                </div>
                {props.authorizedUserId === props.profile?.userId ? <button>Edit profile</button> :
                    <button>Send a message</button>}
            </div>
        </div>
    )
}

export default ProfileInfo;
