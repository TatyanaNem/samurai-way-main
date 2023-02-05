import {instance} from './instance';
import {AxiosResponse} from 'axios';

export const profileAPI = {
    getUserProfile(userId: string) {
        return instance.get('profile/' + userId).then(response => response.data)
    },
    updateProfileStatus (newStatus: string) {
        return instance.put<{ newStatus: string }, AxiosResponse<ResponseType>>(`profile/status`, {newStatus})
            .then(response => response.data.data)
    }
}

export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}