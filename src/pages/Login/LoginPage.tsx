import { useState, type FormEvent } from 'react';
import FormInput from '../../components/FormInput/FormInput';
import { loginUser } from '../../services/authService';
import type { LoginFormData } from '../../types/auth';
import {
    validateLoginForm,
    type LoginErrors,
} from '../../validation/authValidation';
import { useAppDispatch } from '../../store/hooks';
import { setCredentials } from '../../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [errors, setErrors] = useState<LoginErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (
        event: FormEvent<HTMLFormElement>,
    ) => {
        event.preventDefault();


        const formData: LoginFormData = {
            email: email.trim(),
            password,
        };

        const validationErrors = validateLoginForm(
            email,
            password,
        );

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({});
        setIsSubmitting(true);

        try {
            const response = await loginUser(formData);

            dispatch(
                setCredentials({
                    user: response.user,
                    accessToken: response.accessToken,
                }),
            );

            console.log('Login successful:', response.user);
        } catch {
            // Global Axios interceptor handles the error toast.
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="auth-page">
            <section className="register-card">
                <div className="register-header">
                    <span className="brand-mark">URL</span>

                    <h1>Welcome back</h1>

                    <p>
                        Sign in to manage your shortened URLs.
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    noValidate
                >
                    <FormInput
                        id="email"
                        label="Email address"
                        type="email"
                        value={email}
                        placeholder="you@example.com"
                        error={errors.email}
                        onChange={setEmail}
                        disabled={isSubmitting}
                    />

                    <FormInput
                        id="password"
                        label="Password"
                        type="password"
                        value={password}
                        placeholder="Enter your password"
                        error={errors.password}
                        onChange={setPassword}
                        disabled={isSubmitting}
                    />

                    <button
                        type="submit"
                        className="register-button"
                        disabled={isSubmitting}
                    >
                        {isSubmitting
                            ? 'Signing in...'
                            : 'Sign in'}
                    </button>
                </form>

                <p className="auth-footer">
                    Don't have an account?{' '}
                    <button
                        type="button"
                        className="login-link"
                        onClick={() => navigate('/register')}
                    >
                        Create account
                    </button>
                </p>
            </section>
        </main>
    );
}

export default LoginPage;