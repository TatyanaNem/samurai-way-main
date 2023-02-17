import {StateType} from '../../../redux/redux-store';
import {UserType} from '../../../redux/usersReducer';
import {createSelector} from 'reselect';

export const selectAllUsers = (state: StateType): UserType[] => state.usersPage.users;

export const selectFollowedUsers = createSelector(selectAllUsers, (users) => {
    return users.filter(u => u.followed)
})
