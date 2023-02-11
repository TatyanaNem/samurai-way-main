import React from 'react';
import s from './MainContent.module.css';
import {Route, Switch} from 'react-router-dom';
import News from './News/News';
import Music from './Music/Music';
import Settings from './Settings/Settings';
import Sidebar from '../Sidebar/Sidebar';
import UsersContainer from './Users/UsersContainer';
import ProfileContainer from './MyProfile/ProfileContainer';
import AuthContainer from '../Header/AuthBlock/AuthBlockContainer';
import DialogsContainer from './Dialogs/DialogsContainer';
import Login from './Login/Login';
import {useSelector} from 'react-redux';
import {StateType} from '../../redux/redux-store';
import AuthBlockContainer from '../Header/AuthBlock/AuthBlockContainer';

const MainContent = () => {
    const isAuth = useSelector<StateType, boolean>(state => state.auth.isAuth)
    return (
        <div className={s.mainContent}>
            <div className={s.container}>
                <Sidebar/>
                <div className={s.mainContentWrapper}>
                    <Switch>
                        <Route exact={true} path={'/'} render={() => <ProfileContainer />}/>
                        <Route path={'/profile/:userId?'} render={() => <ProfileContainer/>}/>
                        <Route path={'/dialogs'} render={() => <DialogsContainer/>}/>
                        <Route path={'/users'} render={() => <UsersContainer/>}/>
                        <Route path={'/news'} component={News}/>
                        <Route path={'/music'} component={Music}/>
                        <Route path={'/settings'} component={Settings}/>
                        <Route path={'/login'} render={() => <Login/>}/>
                    </Switch>

                </div>
            </div>
        </div>
    )
}

export default MainContent;