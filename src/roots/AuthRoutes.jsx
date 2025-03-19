import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Loading from '../components/Loading';

const AuthRoutes = () => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) return <Loading />;

    return user ? <Navigate to="/" state={{ from: location }} replace /> : <Outlet />;
};

export default AuthRoutes;
