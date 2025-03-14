import useAuth from '../hooks/useAuth';
import Layout from '../components/Layout';
import Landing from '../pages/Landing';
import Loading from '../components/Loading';
const PrivateRoutes = () => {
    const { user, loading } = useAuth();

    if (loading) return <Loading />;

    return user ? <Layout /> : <Landing />;
};

export default PrivateRoutes;
