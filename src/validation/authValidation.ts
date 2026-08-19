import type { RegisterFormData } from '../types/auth';

export interface RegisterErrors {
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
}

export const validateRegisterForm = (
    data: RegisterFormData,
    confirmPassword: string,
): RegisterErrors => {
    const errors: RegisterErrors = {};

    const username = data.username.trim();
    const email = data.email.trim();
    const { password } = data;

    if (!username) {
        errors.username = 'Username is required';
    } else if (username.length < 3) {
        errors.username = 'Username must be at least 3 characters';
    } else if (username.length > 30) {
        errors.username = 'Username cannot exceed 30 characters';
    }

    if (!email) {
        errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.email = 'Enter a valid email address';
    }

    if (!password) {
        errors.password = 'Password is required';
    } else if (password.length < 8) {
        errors.password = 'Password must be at least 8 characters';
    } else if (!/[A-Z]/.test(password)) {
        errors.password = 'Password must contain an uppercase letter';
    } else if (!/[a-z]/.test(password)) {
        errors.password = 'Password must contain a lowercase letter';
    } else if (!/[0-9]/.test(password)) {
        errors.password = 'Password must contain a number';
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        errors.password = 'Password must contain a special character';
    }

    if (!confirmPassword) {
        errors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
    }

    return errors;
};