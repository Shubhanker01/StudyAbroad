import api from './api'

export const login = async (formData) => {
    const response = await api.post('auth/login', formData)
    return response
}

export const signup = async (formData) => {
    const response = await api.post('auth/register', formData)
    return response
}