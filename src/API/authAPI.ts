import {instance} from './instance';

export const authAPI = {
    authMe() {
        return instance.get('auth/me')
            .then(response => response.data)
    },
    login(email: string, password: string, rememberMe: boolean = false) {
        return instance.post('/auth/login', {email, password, rememberMe}).then(res => res.data)
    },
    logout() {
        return instance.delete('auth/login').then(res => res.data)
    }
}