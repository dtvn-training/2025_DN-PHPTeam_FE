import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { FiLoader } from 'react-icons/fi';

const AuthRoutes = () => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) return <FiLoader />;

    return user ? <Navigate to="/" state={{ from: location }} replace /> : <Outlet />;
};

export default AuthRoutes;
