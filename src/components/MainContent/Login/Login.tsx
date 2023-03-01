import React, {FC} from 'react';
import styles from './Login.module.css';
import {connect} from 'react-redux';
import {loginTC} from '../../../redux/authReducer';
import {compose} from 'redux';
import {StateType} from '../../../redux/redux-store';
import {Redirect} from 'react-router-dom';
import style from '../../common/FormsControls/FormControls.module.css';
import {useFormik, Field} from 'formik';

type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
}

type FormikErrorsType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

type LoginFormPropsType = {
    onSubmit: (formData: FormDataType) => void
}

const LoginForm = ({onSubmit}: LoginFormPropsType) => {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values: FormDataType) => {
            const errors: FormikErrorsType = {}
            if (!values.email) {
                errors.email = 'Required'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email'
            }

            if (!values.password) {
                errors.password = 'Required'
            } else if (values.password.length <= 3) {
                errors.password = 'Password should be more than 3 symbols'
            }
            return errors
        },
        onSubmit: (values: FormDataType) => {
            formik.resetForm()
            onSubmit(values)
        }
    })
    return (
        <form onSubmit={formik.handleSubmit} className={styles.loginForm}>
            <p className={styles.instruction}>To log in get registered <a
                href="https://social-network.samuraijs.com/" target="_blank">here</a></p>
            <p className={styles.instruction}>or use common test account credentials:
                <span>Email: <b>free@samuraijs.com</b></span>
                <span>Password: <b>free</b></span>
            </p>
            <label className={styles.formField}>
                <input type={'e-mail'}
                       placeholder={'Enter your e-mail'}
                       {...formik.getFieldProps('email')}
                />
                {formik.errors && formik.touched.email ? <div style={{color: 'red', paddingTop: '5px'}}>{formik.errors.email}</div> : null}
            </label>
            <label className={styles.formField}>
                <input type={'password'}
                       placeholder={'Enter your password'}
                       {...formik.getFieldProps('password')}
                />
                {formik.errors && formik.touched.password ? <div style={{color: 'red', paddingTop: '5px'}}>{formik.errors.password}</div> : null}
            </label>

            <label className={styles.checkboxField}>
                <input type={'checkbox'}
                       {...formik.getFieldProps('rememberMe')}
                        checked={formik.values.rememberMe}
                />
                <span>remember&nbsp;me</span>
            </label>
            <button disabled={!formik.isValid} type={'submit'}>LOG IN</button>
        </form>
    )
}

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
            <LoginForm onSubmit={onSubmit}/>
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
