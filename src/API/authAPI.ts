import {instance} from './instance';

export const authAPI = {
    authMe() {
        return instance.get('auth/me')
            .then(response => response.data)
    }
}