import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import Users from './pages/Users';
import Inventory from './pages/Inventory';
import HR from './pages/HR';
import Settings from './pages/Settings';
import { ThemeProvider } from './context/ThemeContext';

// Simple protected route component
const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    if (!token) {
        return <Navigate to="/login" replace />;
    }
    return children;
};

// Placeholder Dashboard content (displayed inside Layout)
const DashboardHome = () => {
    return (
        <div>
            <h1 className="text-2xl font-bold text-dark mb-6">Dashboard Overview</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Revenue</h3>
                    <p className="text-3xl font-bold text-primary">$24,500</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Active Orders</h3>
                    <p className="text-3xl font-bold text-secondary">12</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Pending Tasks</h3>
                    <p className="text-3xl font-bold text-accent">5</p>
                </div>
            </div>
        </div>
    );
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
                        <Route index element={<DashboardHome />} />
                        <Route path="users" element={<Users />} />
                        <Route path="inventory" element={<Inventory />} />
                        <Route path="hr" element={<HR />} />
                        <Route path="settings" element={<Settings />} />
                    </Route>
                </Routes>
            </Router>
            );
}

            export default App;
