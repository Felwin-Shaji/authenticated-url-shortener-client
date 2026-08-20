import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import AuthLoading from '../components/AuthLoading/AuthLoading';

function PublicRoute() {
    const {
        isAuthenticated,
        isInitializing,
    } = useAppSelector((state) => state.auth);

    if (isInitializing) {
        return <AuthLoading />;
    }

    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
}

export default PublicRoute;