import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import Users from './pages/Users';
import Inventory from './pages/Inventory';
import HR from './pages/HR';
import Settings from './pages/Settings';
import Dashboard from './pages/Dashboard';
import TableMap from './pages/TableMap';
import ServiceCalendar from './pages/ServiceCalendar';
import HotelRooms from './pages/HotelRooms';
import Analytics from './pages/Analytics';
import Help from './pages/Help';
import Wiki from './pages/Wiki';
import { ThemeProvider } from './context/ThemeContext';

// Simple protected route component
const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    if (!token) {
        return <Navigate to="/login" replace />;
    }
    return children;
};

import { LanguageProvider } from './context/LanguageContext';

function App() {
    return (
        <LanguageProvider>
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
                            <Route path="restaurant/tables" element={<TableMap />} />
                            <Route path="service/tickets" element={<ServiceCalendar />} />
                            <Route path="hotel/rooms" element={<HotelRooms />} />
                            <Route path="inventory" element={<Inventory />} />
                            <Route path="analytics" element={<Analytics />} />
                            <Route path="hr" element={<HR />} />
                            <Route path="settings" element={<Settings />} />
                            <Route path="help" element={<Help />} />
                            <Route path="dev/wiki" element={<Wiki />} />
                        </Route>
                    </Routes>
                </Router>
            </ThemeProvider>
        </LanguageProvider>
    );
}

export default App;
