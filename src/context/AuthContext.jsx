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
          // New response structure: { statusCode: 200, data: { _id, name, email, avatar, settings, categories }, success: true }
          const userData = response.data.data || response.data;
          setUser(userData);
        } catch (err) {
          console.error('Token verification failed:', err);
          localStorage.removeItem('token');
          setToken(null);
          setUser(null);
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

      // New response structure: { statusCode: 200, data: { _id, name, email, avatar, settings, categories, token }, success: true }
      const responseData = response.data.data || response.data;

      // Extract token and user data (exclude token from user object)
      const { token: authToken, ...userData } = responseData;

      if (!authToken) {
        throw new Error('Token missing in response');
      }

      // Save token to localStorage
      localStorage.setItem('token', authToken);
      setToken(authToken);
      setUser(userData);

      console.log('Login successful - User data:', userData); // Debug log

      return { success: true };
    } catch (err) {
      console.error("Login Parsing Error or API Error:", err);
      const errorMessage = err.response?.data?.message || 'Login failed. Please check your credentials.';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const register = async (name, email, password) => {
    try {
      setError(null);
      const response = await api.post('/auth/register', { name, email, password });

      // New response structure: { statusCode: 200, data: { _id, name, email, avatar, settings, categories, token }, success: true }
      const responseData = response.data.data || response.data;

      // Extract token and user data (exclude token from user object)
      const { token: authToken, ...userData } = responseData;

      if (!authToken) {
        throw new Error('Token missing in response');
      }

      // Save token to localStorage
      localStorage.setItem('token', authToken);
      setToken(authToken);
      setUser(userData);

      console.log('Registration successful - User data:', userData); // Debug log

      return { success: true };
    } catch (err) {
      console.error("Register Parsing Error or API Error:", err);
      const errorMessage = err.response?.data?.message || 'Registration failed. Please try again.';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }


  const forgotPassword = async (email) => {
    try {
      setError(null);
      await api.post('/auth/forgotpassword', { email });
      return { success: true };
    } catch (err) {


      const errorMessage = err.response?.data?.message || 'Failed to send reset email. Please try again.';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const resetPassword = async (token, password) => {
    try {
      setError(null);
      const response = await api.put(`/auth/resetpassword/${token}`, { password });

      const { token: authToken, user: userData } = response.data;

      // Save token to localStorage and update state
      if (authToken) {
        localStorage.setItem('token', authToken);
        setToken(authToken);
      }
      if (userData) {
        setUser(userData);
      }

      return { success: true };
    } catch (err) {


      const errorMessage = err.response?.data?.message || 'Failed to reset password. Please try again.';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setError(null);
  };

  const value = {
    user,
    token,
    login,
    register,
    forgotPassword,
    resetPassword,
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

