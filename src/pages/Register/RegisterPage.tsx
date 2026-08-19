import { useState, type FormEvent } from 'react';
import type { RegisterFormData } from '../../types/auth';
import { registerUser } from '../../services/authService';
import FormInput from '../../components/FormInput/FormInput';
import { validateRegisterForm } from '../../validation/authValidation';

interface RegisterErrors {
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
}

function RegisterPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [errors, setErrors] = useState<RegisterErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [serverError, setServerError] = useState('');


    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setServerError('');

        const validationErrors = validateRegisterForm(
            {
                username,
                email,
                password,
            },
            confirmPassword,
        );

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({});
        setIsSubmitting(true);

        const formData: RegisterFormData = {
            username: username.trim(),
            email: email.trim(),
            password,
        };

        try {
            const response = await registerUser(formData);

            console.log('Registration successful:', response);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="auth-page">
            <section className="register-card">
                <div className="register-header">
                    <span className="brand-mark">URL</span>

                    <h1>Create your account</h1>

                    <p>
                        Create an account to start shortening and managing
                        your URLs.
                    </p>
                </div>

                {serverError && (
                    <div className="server-error" role="alert">
                        {serverError}
                    </div>
                )}

                <form onSubmit={handleSubmit} noValidate>
                    <FormInput
                        id="username"
                        label="Username"
                        value={username}
                        placeholder="Enter your username"
                        error={errors.username}
                        onChange={setUsername}
                        disabled={isSubmitting}
                    />

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
                        placeholder="Minimum 8 characters"
                        error={errors.password}
                        onChange={setPassword}
                        disabled={isSubmitting}
                    />

                    <FormInput
                        id="confirm-password"
                        label="Confirm password"
                        type="password"
                        value={confirmPassword}
                        placeholder="Re-enter your password"
                        error={errors.confirmPassword}
                        onChange={setConfirmPassword}
                        disabled={isSubmitting}
                    />

                    <button
                        type="submit"
                        className="register-button"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Creating account...' : 'Create account'}
                    </button>
                </form>

                <p className="auth-footer">
                    Already have an account?{' '}
                    <button type="button" className="login-link">
                        Sign in
                    </button>
                </p>
            </section>
        </main>
    );
}

export default RegisterPage;