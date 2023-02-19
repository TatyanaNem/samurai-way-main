import React, {KeyboardEvent, ChangeEvent, FC} from 'react';
import {FaPen} from 'react-icons/fa';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {StateType} from '../../../../../redux/redux-store';
import {updateProfileStatusTC} from '../../../../../redux/myProfileReducer';
import styles from './ProfileStatus.module.css';

type MapStateToPropsType = {
    status: string
}

type MapDispatchToPropsType = {
    updateProfileStatusTC: (status: string) => void
}

class ProfileStatus extends React.Component<MapStateToPropsType & MapDispatchToPropsType> {
    state = {
        editMode: false,
        status: this.props.status
    }

    activateEditMode () {
        this.setState({
            editMode: true
        })
    }

    deactivateEditMode () {
        this.setState({
            editMode: false
        })
        this.props.updateProfileStatusTC(this.state.status)
    }
    onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: e.currentTarget.value
        })
    }
    onEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            this.deactivateEditMode()
        }
    }

    render() {
        return (
            <div onBlur={this.deactivateEditMode.bind(this)} className={styles.statusBlock}>
                {this.state.editMode
                    ? <input className={styles.statusInput} onKeyPress={this.onEnterHandler} onChange={this.onStatusChange} autoFocus value={this.state.status !== null ? this.state.status : undefined}/>
                    : <span className={styles.statusSpan} onDoubleClick={this.activateEditMode.bind(this)}>{this.props.status}&nbsp;<FaPen size="0.8rem"/></span>
                }
            </div>
        );
    };
}

const mapStateToProps = (state: StateType): MapStateToPropsType => ({
    status: state.profilePage.status
})


export default compose<FC>(connect<MapStateToPropsType, MapDispatchToPropsType, {}, StateType>(mapStateToProps, {updateProfileStatusTC}))(ProfileStatus);
