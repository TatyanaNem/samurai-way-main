import {instance} from './instance';

export const usersAPI = {
    getUsers (currentPage: number, usersPerPage: number) {
        return instance.get(`users?page=${currentPage}&count=${usersPerPage}`)
            .then(response => response.data)
    },
    follow(userId: string) {
        return instance.post(`follow/${userId}`, {})
            .then(response => response.data)
    },
    unfollow(userId: string) {
        return instance.delete(`follow/${userId}`)
            .then(response => response.data)
    }
}