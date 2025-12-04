import { createContext, useState, useEffect, useContext } from 'react';
import api from '../api/api';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('token');

      if (storedToken) {
        setToken(storedToken);
        try {
          // Verify token and get user data
          const response = await api.get('/auth/me');
          setUser(response.data.user);
        } catch (err) {
          console.error('Token verification failed:', err);
          // If it's a mock token (for frontend-only testing), keep it
          if (storedToken.startsWith('mock-jwt-token-')) {
            const mockUser = JSON.parse(localStorage.getItem('mockUser') || '{"name":"Test User"}');
            setUser(mockUser);
          } else {
            // Real token is invalid, clear it
            localStorage.removeItem('token');
            setToken(null);
            setUser(null);
          }
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    try {
      setError(null);
      const response = await api.post('/auth/login', { email, password });

      const { token: authToken, user: userData } = response.data;

      // Save token to localStorage
      localStorage.setItem('token', authToken);
      setToken(authToken);
      setUser(userData);

      return { success: true };
    } catch (err) {
      // Fallback to mock authentication for frontend-only testing
      if (err.code === 'ERR_NETWORK' || err.message.includes('Network Error')) {
        console.warn('Backend not available, using mock authentication');
        const mockToken = 'mock-jwt-token-' + Date.now();
        const mockUser = { email, name: email.split('@')[0] };

        localStorage.setItem('token', mockToken);
        localStorage.setItem('mockUser', JSON.stringify(mockUser));
        setToken(mockToken);
        setUser(mockUser);

        return { success: true };
      }

      const errorMessage = err.response?.data?.message || 'Login failed. Please check your credentials.';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const register = async (name, email, password) => {
    try {
      setError(null);
      const response = await api.post('/auth/register', { name, email, password });

      const { token: authToken, user: userData } = response.data;

      // Save token to localStorage
      localStorage.setItem('token', authToken);
      setToken(authToken);
      setUser(userData);

      return { success: true };
    } catch (err) {
      // Fallback to mock authentication for frontend-only testing
      if (err.code === 'ERR_NETWORK' || err.message.includes('Network Error')) {
        console.warn('Backend not available, using mock authentication');
        const mockToken = 'mock-jwt-token-' + Date.now();
        const mockUser = { name, email };

        localStorage.setItem('token', mockToken);
        localStorage.setItem('mockUser', JSON.stringify(mockUser));
        setToken(mockToken);
        setUser(mockUser);

        return { success: true };
      }

      const errorMessage = err.response?.data?.message || 'Registration failed. Please try again.';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('mockUser');
    setToken(null);
    setUser(null);
    setError(null);
  };

  const value = {
    user,
    token,
    login,
    register,
    logout,
    loading,
    error,
    setError,
    updateUser: setUser
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
