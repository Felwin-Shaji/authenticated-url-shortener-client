import { useEffect, type ReactNode } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { clearCredentials, setCredentials, setInitializing } from '../../store/slices/authSlice';
import { refreshAccessToken } from '../../services/authService';

interface AuthInitializerProps {
    children: ReactNode;
}

function AuthInitializer({ children }: AuthInitializerProps) {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const initializeAuth = async () => {
            try {
                const response = await refreshAccessToken();

                dispatch(
                    setCredentials({
                        user: response.user,
                        accessToken: response.accessToken,
                    }),
                );
            } catch {
                dispatch(clearCredentials());
            } finally {
                console.log('Auth initialization finished');
                dispatch(setInitializing(false));
            }
        };

        initializeAuth();
    }, [dispatch]);

    return <>{children}</>;
}

export default AuthInitializer;