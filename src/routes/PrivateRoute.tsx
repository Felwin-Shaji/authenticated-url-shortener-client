import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import AuthLoading from '../components/AuthLoading/AuthLoading';

function PrivateRoute() {
    const { isAuthenticated, isInitializing, } = useAppSelector((state) => state.auth);

    if (isInitializing) {
        return <AuthLoading />;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}

export default PrivateRoute;