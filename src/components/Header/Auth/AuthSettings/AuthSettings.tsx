import React from 'react';
import userPhoto from '../../../../assets/images/userPhoto.png'
import styles from './AuthSettings.module.css';

type AuthSettingsProps = {
    login: string
}

const AuthSettings = (props: AuthSettingsProps) => {
    return (
        <div className={styles.authSettings}>
            <img className={styles.userPhoto} src={userPhoto} alt='user photo'/>
            <span className={styles.userName}>{props.login}</span>
            <div className={styles.authSettingsModal}></div>
        </div>
    );
};

export default AuthSettings;