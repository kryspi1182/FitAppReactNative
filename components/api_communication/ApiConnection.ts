import axios, { AxiosError } from 'axios';

export const api = axios.create({
    baseURL: 'http://192.168.0.15:25415/api/',
    withCredentials: true,
});

api.interceptors.response.use(async response => {
    return await response;
}, (error: AxiosError) => {
    const { data, status } = error.response!;
    return Promise.reject(error);
});