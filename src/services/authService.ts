import { API_AUTH } from '../types/apiRoutes/apiAuth';
import type { LoginFormData, LoginResponse, RegisterFormData } from '../types/auth';
import api from './api';

export const registerUser = async (data: RegisterFormData) => {
    const response = await api.post(API_AUTH.REGISTER, data);

    return response.data;
};

export const loginUser = async (data: LoginFormData,): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>(
        API_AUTH.LOGIN,
        data,
        {
            withCredentials: true,
        },
    );

    return response.data;
};

export const refreshAccessToken = async (): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>(
        API_AUTH.REFRESH,
        {},
        {
            withCredentials: true,
        },
    );

    return response.data;
};


export const logoutUser = async (): Promise<void> => {
    await api.post(API_AUTH.LOGOUT);
};