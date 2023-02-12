import {FC} from 'react';
import Dialogs from './Dialogs';
import {AddMessageAC} from '../../../redux/dialogsReducer';
import {connect} from 'react-redux';
import {StateType} from '../../../redux/redux-store';
import {compose} from 'redux';
import {withAuthRedirect} from '../../../HOC/withAuthRedirect';

const mapStateToProps = (state: StateType) => {
    return {
        dialogsPage: state.dialogsPage
    }
}

const mapDispatchToProps = (dispatch: (action: ReturnType<typeof AddMessageAC>) => void) => {
    return {
        addMessage: (newMessage: string) => dispatch(AddMessageAC(newMessage))
    }
}

export default compose<FC>(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialogs)