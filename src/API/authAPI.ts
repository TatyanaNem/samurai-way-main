import {instance} from './instance';

export const authAPI = {
    authMe() {
        return instance.get<ResponseType<{ id: number, email: string, login: string }>>('auth/me')
            .then(response => response.data)
    },
    login(email: string, password: string, rememberMe: boolean = false) {
        return instance.post<ResponseType<{ userId: number }>>('/auth/login', {email, password, rememberMe}).then(res => {
            console.log(res.data)
            return res.data
        })
    },
    logout() {
        return instance.delete<ResponseType>('auth/login').then(res => res.data)
    }
}

export type ResponseType<T = {}> = {
    data: T
    messages: string[]
    resultCode: number
}
