import useAuth from '../hooks/useAuth';
import { FiLoader } from 'react-icons/fi';
import Layout from '../components/Layout';
import Landing from '../pages/Landing';
const PrivateRoutes = () => {
    const { user, loading } = useAuth();

    if (loading) return <FiLoader />;

    return user ? <Layout /> : <Landing />;
};

export default PrivateRoutes;
