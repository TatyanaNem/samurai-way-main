import React from 'react';
import styles from './FormControls.module.css';


export const Textarea = (props: any) => {
    const {input, meta, ...restProps} = props;
    const hasError = meta.touched && meta.error;
    return (
        <div className={styles.formControl}>
            <textarea className={styles.formTextarea + ' ' + (hasError ? styles.formError : '')} {...input} {...restProps} contentEditable />
            {hasError && <span>{meta.error}</span>}
        </div>
    );
};

export const Input = (props: any) => {
    const {input, meta, ...restProps} = props;
    const hasError = meta.touched && meta.error;
    return (
        <div className={styles.formControl}>
                <input className={styles.formInput + ' ' + (hasError ? styles.formError : '')} {...input} {...restProps} contentEditable />
                {hasError && <span>{meta.error}</span>}
        </div>
    );
};
