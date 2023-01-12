import React from 'react';
import s from './MainContent.module.css';
import {Route} from 'react-router-dom';
import Profile from '../Profile/Profile';
import News from '../News/News';
import Music from '../Music/Music';
import Settings from '../Settings/Settings';
import Sidebar from '../Sidebar/Sidebar';
import {DialogsContainer} from '../Dialogs/DialogsContainer';

const MainContent = () => {
    return (
        <div className={s.mainContent}>
            <div className={s.container}>
                <Sidebar />
                <div className={s.mainContentWrapper}>
                    <Route path={'/profile'} render={() => <Profile /> }/>
                    <Route path={'/dialogs'} render={() => <DialogsContainer />}/>
                    <Route path={'/news'} component={News}/>
                    <Route path={'/music'} component={Music}/>
                    <Route path={'/settings'} component={Settings}/>
                </div>
            </div>
        </div>
    )
}

export default MainContent;