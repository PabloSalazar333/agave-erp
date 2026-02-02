import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import Users from './pages/Users';
import Inventory from './pages/Inventory';
import HR from './pages/HR';
import Settings from './pages/Settings';
import Dashboard from './pages/Dashboard';
import { ThemeProvider } from './context/ThemeContext';

// Simple protected route component
const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    if (!token) {
        return <Navigate to="/login" replace />;
    }
    return children;
};

function App() {
    return (
        <ThemeProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />

                    {/* Protected Routes wrapped in Layout */}
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute>
                                <Layout />
                            </ProtectedRoute>
                        }
                    >
                        <Route index element={<Dashboard />} />
                        <Route path="users" element={<Users />} />
                        <Route path="inventory" element={<Inventory />} />
                        <Route path="hr" element={<HR />} />
                        <Route path="settings" element={<Settings />} />
                    </Route>
                </Routes>
            </Routes>
        </Router>
        </ThemeProvider >
    );
}

export default App;
