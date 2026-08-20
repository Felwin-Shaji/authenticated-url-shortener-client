interface AuthLoadingProps {
    message?: string;
}

function AuthLoading({
    message = 'Checking your session...',
}: AuthLoadingProps) {
    return (
        <div className="auth-loading">
            <div className="auth-loading-spinner" />
            <p>{message}</p>
        </div>
    );
}

export default AuthLoading;