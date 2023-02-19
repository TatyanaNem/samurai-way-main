import {instance} from './instance';

export const profileAPI = {
    getUserProfile(userId: number) {
        return instance.get('profile/' + userId)
            .then(response => response.data)
    },
    getUserStatus(userId: number) {
        return instance.get('profile/status/' + userId.toString())
            .then(response => response.data)
    },
    updateUserStatus (status: string) {
        return instance.put(`profile/status`, {status})
            .then(response => response.data)
    }
}

export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}
