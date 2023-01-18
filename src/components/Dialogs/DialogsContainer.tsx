import React from 'react';
import Dialogs from './Dialogs';
import {AddMessageAC, UpdateNewMessageTextAC} from '../../redux/dialogsReducer';
import {connect} from 'react-redux';
import {StateType} from '../../redux/redux-store';
import {ActionsType} from '../../redux/store';


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

export const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs)