import axios, { type AxiosError, type InternalAxiosRequestConfig, } from 'axios';
import { store } from '../store/store';
import { setCredentials, clearCredentials } from '../store/slices/authSlice';
import type { LoginResponse } from '../types/auth';
import { refreshAccessToken } from './authService';
import toast from 'react-hot-toast';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

interface RetryableRequestConfig
    extends InternalAxiosRequestConfig {
    _retry?: boolean;
}

let refreshPromise: Promise<LoginResponse> | null = null;


api.interceptors.request.use(
    (config) => {
        const accessToken = store.getState().auth.accessToken;

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error) => Promise.reject(error),
);

api.interceptors.response.use(
    (response) => response,

    async (error: AxiosError) => {
        const originalRequest =
            error.config as RetryableRequestConfig | undefined;

        const status = error.response?.status;
        const url = originalRequest?.url ?? '';

        const isAuthRequest =
            url.includes('/auth/login') ||
            url.includes('/auth/register') ||
            url.includes('/auth/refresh') ||
            url.includes('/auth/logout');

        // Access token expired
        if (
            status === 401 &&
            originalRequest &&
            !originalRequest._retry &&
            !isAuthRequest
        ) {
            originalRequest._retry = true;

            try {
                if (!refreshPromise) {
                    refreshPromise = refreshAccessToken().finally(() => {
                        refreshPromise = null;
                    });
                }

                const response = await refreshPromise;

                store.dispatch(
                    setCredentials({
                        accessToken: response.accessToken,
                        user: response.user,
                    }),
                );

                originalRequest.headers.Authorization =
                    `Bearer ${response.accessToken}`;

                return api(originalRequest);
            } catch (refreshError) {
                store.dispatch(clearCredentials());

                return Promise.reject(refreshError);
            }
        }

        // Global error handling
        const data = error.response?.data as
            | { message?: string | string[] }
            | undefined;

        if (Array.isArray(data?.message)) {
            toast.error(data.message.join(', '));
        } else if (typeof data?.message === 'string') {
            toast.error(data.message);
        } else if (error.code === 'ERR_NETWORK') {
            toast.error('Unable to connect to the server.');
        } else if (status === 403) {
            toast.error('Access denied.');
        } else if (status === 500) {
            toast.error('Server error. Please try again.');
        }

        return Promise.reject(error);
    },
);

export default api;