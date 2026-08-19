import { API_AUTH } from '../types/apiRoutes/apiAuth';
import type { RegisterFormData } from '../types/auth';
import api from './api';

export const registerUser = async (data: RegisterFormData) => {
    const response = await api.post(API_AUTH.REGISTER, data);

    return response.data;
};