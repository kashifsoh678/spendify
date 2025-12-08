import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getBudget as apiGetBudget, setBudget as apiSetBudget, getBudgetStatus as apiGetBudgetStatus } from '../services/budgetService';
import { useAuth } from './AuthContext';

const BudgetContext = createContext();

export const useBudget = () => {
    return useContext(BudgetContext);
};

export const BudgetProvider = ({ children }) => {
    const { user } = useAuth();
    const [budget, setBudgetData] = useState(null);
    const [budgetStatus, setBudgetStatusData] = useState(null);
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

    const setBudget = async (monthlyBudget) => {
        try {
            const response = await apiSetBudget(monthlyBudget);
            const data = response.data || response;

            // Update local state with new budget
            setBudgetData(data.budget || data);

            // Refresh budget status to get updated calculations
            await fetchBudgetStatus();

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
        } else if (!user) {
            setBudgetData(null);
            setBudgetStatusData(null);
        }
    }, [user?._id, fetchBudget, fetchBudgetStatus]);

    const value = {
        budget,
        budgetStatus,
        loading,
        error,
        fetchBudget,
        fetchBudgetStatus,
        setBudget
    };

    return (
        <BudgetContext.Provider value={value}>
            {children}
        </BudgetContext.Provider>
    );
};
