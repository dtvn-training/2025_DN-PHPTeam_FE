import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import AuthRoutes from './roots/AuthRoutes';
import PrivateRoutes from './roots/PrivateRoutes';
import CreatePost from './pages/CreatePost';
import ViewHistory from './pages/ViewHistory';
import PostDetail from './pages/PostDetail';
import Interaction from './pages/Interaction';
import NoPage from './pages/NoPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route element={<AuthRoutes />}>
                    <Route path="/login" element={<Login />}></Route>
                    <Route path="/register" element={<Register />}></Route>
                </Route>

                <Route path="/" element={<PrivateRoutes />}>
                    <Route index element={<CreatePost />} />
                    <Route path="/viewhistory" element={<ViewHistory />} />
                    <Route path="/posts/:id" element={<PostDetail />} />
                    <Route path="/interactions/:postPlatformId" element={<Interaction />} />
                </Route>

                <Route path="/*" element={<NoPage />}></Route>
            </Routes>
        </Router>
    );
}

export default App;
