import React from 'react';
import userPhoto from '../../../../assets/images/userPhoto.png'
import styles from './AuthInfo.module.css';

type AuthInfoProps = {
    login: string
    logout: () => void
}

const AuthInfo = (props: AuthInfoProps) => {
    return (
        <div className={styles.authInfo}>
            <div className={styles.details}>
                <img className={styles.userPhoto} src={userPhoto} alt='user photo'/>
                <span className={styles.userName}>{props.login}</span>
            </div>
            <button onClick={props.logout}>LOG OUT</button>
        </div>
    );
};

export default AuthInfo;