import { useState } from 'react';

interface FormInputProps {
    id: string;
    label: string;
    type?: 'text' | 'email' | 'password';
    value: string;
    placeholder?: string;
    error?: string;
    onChange: (value: string) => void;
    disabled?: boolean;
}

function FormInput({
    id,
    label,
    type = 'text',
    value,
    placeholder,
    error,
    onChange,
    disabled = false,
}: FormInputProps) {
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === 'password';
    const inputType = isPassword && showPassword ? 'text' : type;

    return (
        <div className="form-field">
            <label htmlFor={id}>{label}</label>

            <div className="input-wrapper">
                <input
                    id={id}
                    type={inputType}
                    value={value}
                    placeholder={placeholder}
                    disabled={disabled}
                    aria-invalid={Boolean(error)}
                    aria-describedby={error ? `${id}-error` : undefined}
                    onChange={(event) => onChange(event.target.value)}
                    className={error ? 'input-error' : ''}
                />

                {isPassword && (
                    <button
                        type="button"
                        className="password-toggle"
                        onClick={() => setShowPassword((previous) => !previous)}
                        aria-label={
                            showPassword
                                ? 'Hide password'
                                : 'Show password'
                        }
                    >
                        {showPassword ? 'Hide' : 'Show'}
                    </button>
                )}
            </div>

            {error && (
                <p id={`${id}-error`} className="field-error">
                    {error}
                </p>
            )}
        </div>
    );
}

export default FormInput;