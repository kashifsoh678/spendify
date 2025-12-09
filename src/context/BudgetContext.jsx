import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getBudget as apiGetBudget, setBudget as apiSetBudget, getBudgetStatus as apiGetBudgetStatus, getAlerts as apiGetAlerts } from '../services/budgetService';
import { getAIForecast as apiGetAIForecast } from '../services/aiService';
import { useAuth } from './AuthContext';

const BudgetContext = createContext();

export const useBudget = () => {
    return useContext(BudgetContext);
};

export const BudgetProvider = ({ children }) => {
    const { user } = useAuth();
    const [budget, setBudgetData] = useState(null);
    const [budgetStatus, setBudgetStatusData] = useState(null);
    const [alerts, setAlerts] = useState([]);
    const [aiForecast, setAIForecast] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchBudget = useCallback(async () => {
        if (!user) return;
        setLoading(true);
        try {
            setError(null);
            const response = await apiGetBudget();
            // API returns { success: true, data: { budget: {...} } }
            const data = response.data || response;
            setBudgetData(data.budget || data);
        } catch (err) {
            console.error('Error fetching budget:', err);
            setError('Failed to load budget');
        } finally {
            setLoading(false);
        }
    }, [user?._id]);

    const fetchBudgetStatus = useCallback(async () => {
        if (!user) return;
        setLoading(true);
        try {
            setError(null);
            const response = await apiGetBudgetStatus();
            // API returns { success: true, data: { alert, statusColor, budget: {...} } }
            const data = response.data || response;
            setBudgetStatusData(data);
            // Also update budget data from status response
            if (data.budget) {
                setBudgetData(data.budget);
            }
        } catch (err) {
            console.error('Error fetching budget status:', err);
            setError('Failed to load budget status');
        } finally {
            setLoading(false);
        }
    }, [user?._id]);

    const fetchAIForecast = useCallback(async () => {
        if (!user) return;
        try {
            const response = await apiGetAIForecast();
            // API returns { success: true, data: { forecast: {...} } }
            const data = response.data || response;
            // Only set forecast if it exists (AI might be disabled or no data)
            setAIForecast(data.forecast || null);
        } catch (err) {
            console.error('Error fetching AI forecast:', err);
            // Don't set error - forecast is optional
            setAIForecast(null);
        }
    }, [user?._id]);

    const fetchAlerts = useCallback(async () => {
        if (!user) return;
        try {
            const data = await apiGetAlerts();
            setAlerts(data || []);
        } catch (err) {
            console.error('Error fetching alerts:', err);
            setAlerts([]);
        }
    }, [user?._id]);

    const setBudget = async (monthlyBudget) => {
        try {
            const response = await apiSetBudget(monthlyBudget);
            const data = response.data || response;

            // Update local state with new budget
            setBudgetData(data.budget || data);

            // Refresh budget status to get updated calculations
            await fetchBudgetStatus();

            // Refresh AI forecast with new budget
            await fetchAIForecast();

            // Refresh alerts
            await fetchAlerts();

            return data.budget || data;
        } catch (err) {
            throw err;
        }
    };

    // Auto-fetch on mount when user exists
    useEffect(() => {
        if (user?._id) {
            fetchBudget();
            fetchBudgetStatus();
            fetchAIForecast();
            fetchAlerts();
        } else if (!user) {
            setBudgetData(null);
            setBudgetStatusData(null);
            setAIForecast(null);
        }
    }, [user?._id, fetchBudget, fetchBudgetStatus, fetchAIForecast, fetchAlerts]);

    const value = {
        budget,
        budgetStatus,
        alerts,
        aiForecast,
        loading,
        error,
        fetchBudget,
        fetchBudgetStatus,
        fetchAIForecast,
        fetchAlerts,
        setBudget
    };

    return (
        <BudgetContext.Provider value={value}>
            {children}
        </BudgetContext.Provider>
    );
};
