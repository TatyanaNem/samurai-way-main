import React from 'react';
import FriendsList from './FriendsList/FriendsList';
import Navbar from './Navbar/Navbar';
import FriendsListContainer from './FriendsList/FriendsList';

const Sidebar = () => {
    return (
        <div>
            <Navbar />
            <FriendsListContainer />
        </div>
    );
};

export default Sidebar;