import React, {FC} from 'react';
import './App.css';
import Header from './components/Header/Header';
import './App.css';
import MainContent from './components/MainContent/MainContent';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {initializeApp} from './redux/appReducer';
import {StateType} from './redux/redux-store';
import Preloader from './components/common/Preloader/Preloader';

type MapDispatchToPropsType = {
    initializeApp: () => void
}

type MapStateToPropsType = {
    initialized: boolean
}

const mapStateToProps = (state: StateType) => ({
    initialized: state.app.initialized
})

type AppPropsType = MapStateToPropsType & MapDispatchToPropsType


class App extends React.Component<AppPropsType> {
    componentDidMount() {
        this.props.initializeApp()
    }

    render () {
        if(!this.props.initialized) return <Preloader />

        return <div className="App">
                <Header />
                <MainContent />
            </div>
    }

}

export default compose<FC>(connect(mapStateToProps, {initializeApp}))(App);
