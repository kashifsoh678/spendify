import api from '../api/api';

// Dummy Data
const DUMMY_PROFILE = {
    name: 'Talha Saleem',
    email: 'talha@example.com',
    avatar: null
};

const DUMMY_CATEGORIES = [
    { id: '1', name: 'Food & Dining', type: 'system' },
    { id: '2', name: 'Transportation', type: 'system' },
    { id: '3', name: 'Utilities', type: 'system' },
    { id: '4', name: 'Shopping', type: 'system' },
    { id: '5', name: 'Entertainment', type: 'system' },
    { id: '6', name: 'Healthcare', type: 'system' },
    { id: '7', name: 'Freelance', type: 'custom' },
    { id: '8', name: 'Gifts', type: 'custom' }
];

const DUMMY_NOTIFICATIONS = {
    budgetAlerts: true,
    billDueAlerts: true,
    weeklyReport: false,
    aiPredictions: true
};

const DUMMY_AI_PREFS = {
    forecast: true,
    personality: true,
    suggestions: true,
    challenges: false
};

// Profile API
export const getProfile = async () => {
    try {
        // const response = await api.get('/auth/me');
        // return response.data;
        return new Promise(resolve => setTimeout(() => resolve(DUMMY_PROFILE), 500));
    } catch (error) {
        console.error('Error fetching profile:', error);
        throw error;
    }
};

export const updateProfile = async (data) => {
    try {
        // const response = await api.put('/auth/update', data);
        // return response.data;
        return new Promise(resolve => setTimeout(() => resolve({ ...DUMMY_PROFILE, ...data }), 800));
    } catch (error) {
        console.error('Error updating profile:', error);
        throw error;
    }
};

export const uploadAvatar = async (file) => {
    try {
        // In a real app, we would upload to S3/Cloudinary here
        // const formData = new FormData();
        // formData.append('avatar', file);
        // const response = await api.post('/auth/avatar', formData);
        // return response.data.url;
        
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                setTimeout(() => resolve(reader.result), 1000);
            };
            reader.readAsDataURL(file);
        });
    } catch (error) {
        console.error('Error uploading avatar:', error);
        throw error;
    }
};

export const changePassword = async (data) => {
    try {
        // const response = await api.put('/auth/change-password', data);
        // return response.data;
        return new Promise(resolve => setTimeout(() => resolve({ success: true }), 800));
    } catch (error) {
        console.error('Error changing password:', error);
        throw error;
    }
};

// Categories API
export const getCategories = async () => {
    try {
        // const response = await api.get('/categories');
        // return response.data;
        return new Promise(resolve => setTimeout(() => resolve(DUMMY_CATEGORIES), 500));
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
};

export const addCategory = async (category) => {
    try {
        // const response = await api.post('/categories', category);
        // return response.data;
        const newCategory = { id: Date.now().toString(), ...category, type: 'custom' };
        return new Promise(resolve => setTimeout(() => resolve(newCategory), 600));
    } catch (error) {
        console.error('Error adding category:', error);
        throw error;
    }
};

export const deleteCategory = async (id) => {
    try {
        // const response = await api.delete(`/categories/${id}`);
        // return response.data;
        return new Promise(resolve => setTimeout(() => resolve({ success: true }), 600));
    } catch (error) {
        console.error('Error deleting category:', error);
        throw error;
    }
};

// Notification Settings API
export const getNotificationSettings = async () => {
    try {
        // const response = await api.get('/settings/notifications');
        // return response.data;
        return new Promise(resolve => setTimeout(() => resolve(DUMMY_NOTIFICATIONS), 400));
    } catch (error) {
        console.error('Error fetching notification settings:', error);
        throw error;
    }
};

export const updateNotificationSettings = async (settings) => {
    try {
        // const response = await api.put('/settings/notifications', settings);
        // return response.data;
        return new Promise(resolve => setTimeout(() => resolve(settings), 500));
    } catch (error) {
        console.error('Error updating notification settings:', error);
        throw error;
    }
};

// AI Settings API
export const getAISettings = async () => {
    try {
        // const response = await api.get('/settings/ai');
        // return response.data;
        return new Promise(resolve => setTimeout(() => resolve(DUMMY_AI_PREFS), 400));
    } catch (error) {
        console.error('Error fetching AI settings:', error);
        throw error;
    }
};

export const updateAISettings = async (settings) => {
    try {
        // const response = await api.put('/settings/ai', settings);
        // return response.data;
        return new Promise(resolve => setTimeout(() => resolve(settings), 500));
    } catch (error) {
        console.error('Error updating AI settings:', error);
        throw error;
    }
};
