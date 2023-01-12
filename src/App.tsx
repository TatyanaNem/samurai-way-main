import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import './App.css';
import {BrowserRouter} from 'react-router-dom';
import MainContent from './components/MainContent/MainContent';


function App() {
    return (
                <div className="App">
                    <Header/>
                    <MainContent />
                </div>
    );
}

export default App;
