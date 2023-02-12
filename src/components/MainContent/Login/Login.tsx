import React, {FC} from 'react';
import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import styles from './Login.module.css';
import {Input} from '../../common/FormsControls/FormsControls';
import {required} from '../../common/validators/validators';
import {connect} from 'react-redux';
import {loginTC} from '../../../redux/authReducer';
import {compose} from 'redux';
import {StateType} from '../../../redux/redux-store';
import {Redirect} from 'react-router-dom';
import style from '../../common/FormsControls/FormControls.module.css';

type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
}

const LoginForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className={styles.loginForm}>
            <p className={styles.instruction}>To log in get registered <a
                href="https://social-network.samuraijs.com/" target="_blank">here</a></p>
            <p className={styles.instruction}>or use common test account credentials:
                <span>Email: <b>free@samuraijs.com</b></span>
                <span>Password: <b>free</b></span>
            </p>
            <label className={styles.formField}>
                <Field type={'e-mail'}
                       placeholder={'Enter your e-mail'}
                       name={'email'}
                       component={Input}
                       validate={[required]}
                ></Field>
            </label>
            <label className={styles.formField}>
                <Field type={'password'}
                       placeholder={'Enter your password'}
                       name={'password'}
                       component={Input}
                       validate={[required]}
                ></Field>
            </label>

            <label className={styles.checkboxField}>
                <Field type={'checkbox'}
                       name={'rememberMe'}
                       component={Input}
                >
                </Field>
                <span>remember me</span>
            </label>
            {props.error && <div className={style.formSummaryError}>{props.error}</div>}
            <button type={'submit'}>LOG IN</button>
        </form>
    )
}

const LoginReduxForm = reduxForm<FormDataType>({form: 'login'})(LoginForm)

type LoginPropsType = {
    isAuth: boolean
    loginTC: (email: string, password: string, rememberMe: boolean) => void
}

const Login = (props: LoginPropsType) => {
    const onSubmit = (formData: FormDataType) => {
        props.loginTC(formData.email, formData.password, formData.rememberMe)
    }
    if (props.isAuth) {
        return <Redirect to={'/profile'} />
    }

    return (
        <div className={styles.loginPage}>
            <h2>LOGIN</h2>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    );
};

type MapStatePropsType = {
    isAuth: boolean
}

const mapStateToProps = (state: StateType): MapStatePropsType => ({
    isAuth: state.auth.isAuth
})


export default compose<FC>(connect(mapStateToProps, {loginTC}))(Login);