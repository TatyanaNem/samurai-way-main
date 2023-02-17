import React from 'react';
import FriendsList from './FriendsList/FriendsList';
import Navbar from './Navbar/Navbar';
import {useSelector} from 'react-redux';
import {StateType} from '../../redux/redux-store';
import {UserType} from '../../redux/usersReducer';


const Sidebar = () => {
    const users = useSelector((state: StateType): UserType[] => state.usersPage.users)
    return (
        <div>
            <Navbar />
            {users.length !== 0 && <FriendsList/>}
        </div>
    );
};

export default Sidebar;
