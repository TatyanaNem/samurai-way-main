import React from 'react';
import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import styles from './Login.module.css';
import {Input} from '../../common/FormsControls/FormsControls';
import {required} from '../../common/validators/validators';

type FormDataType = {
    login: string
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
                       placeholder={'Enter your login'}
                       name={'login'}
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
            <button type={'submit'}>LOG IN</button>
        </form>
    )
}

const LoginReduxForm = reduxForm<FormDataType>({form: 'login'})(LoginForm)

const Login = () => {
    const onSubmit = (formData: FormDataType) => {
        console.log(formData)
    }
    return (
        <div className={styles.loginPage}>
            <h2>LOGIN</h2>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    );
};

export default Login;