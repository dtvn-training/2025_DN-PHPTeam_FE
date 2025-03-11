import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import './utils/Fontawesome';
import AuthRoutes from './roots/AuthRoutes';
import PrivateRoutes from './roots/PrivateRoutes';
import CreatePost from './pages/CreatePost';
import ViewHistory from './pages/ViewHistory';
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
                    <Route path="viewhistory" element={<ViewHistory />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
