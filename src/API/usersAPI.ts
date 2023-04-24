import {instance} from './instance';

export const usersAPI = {
    getUsers (currentPage: number, usersPerPage: number) {
        return instance.get(`users?page=${currentPage}&count=${usersPerPage}`)
            .then(response => response.data)
    },
    follow(userId: number) {
        return instance.post(`follow/${userId}`, {})
            .then(response => response.data)
    },
    unfollow(userId: number) {
        return instance.delete(`follow/${userId}`)
            .then(response => response.data)
    }
}
