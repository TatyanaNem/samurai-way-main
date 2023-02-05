import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import './App.css';
import MainContent from './components/MainContent/MainContent';
import {useSelector} from 'react-redux';
import {StateType} from './redux/redux-store';


function App() {
    const isAuth = useSelector<StateType, boolean>(state => state.auth.isAuth)
    return (
                <div className="App">
                    <Header isAuth={isAuth}/>
                    <MainContent />
                </div>
    );
}

export default App;
