import React, {FC} from 'react';
import Dialogs from './Dialogs';
import {AddMessageAC, UpdateNewMessageTextAC} from '../../../redux/dialogsReducer';
import {connect} from 'react-redux';
import {StateType} from '../../../redux/redux-store';
import {ActionsType} from '../../../redux/myProfileReducer';
import {withAuthRedirect} from '../../../HOC/withAuthRedirect';
import {compose} from 'redux';

const mapStateToProps = (state: StateType) => {
    return {
        dialogsPage: state.dialogsPage
    }
}

const mapDispatchToProps = (dispatch: (action: ActionsType) => void) => {
    return {
        addMessage: () => dispatch(AddMessageAC()),
        updateNewMessageText: (text: string) => dispatch(UpdateNewMessageTextAC(text))
    }
}

export default compose<FC>(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialogs)