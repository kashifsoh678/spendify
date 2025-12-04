import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const GuestRoute = ({ children }) => {
    const { token, loading } = useAuth();

    // Check both context and localStorage for token
    const storedToken = localStorage.getItem('token');
    const isAuthenticated = token || storedToken;

    // Show loading state while checking authentication
    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-center">
                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-[var(--color-primary)] mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    // If user is authenticated, redirect to dashboard
    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }

    // If not authenticated, show the auth page (login/register)
    return children;
};

export default GuestRoute;
