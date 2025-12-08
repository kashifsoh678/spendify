import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getTransactions, addTransaction as apiAddTransaction, deleteTransaction as apiDeleteTransaction, updateTransaction as apiUpdateTransaction, getMonthlyTransactions } from '../services/transactionService';
import { useAuth } from './AuthContext';

const TransactionContext = createContext();

export const useTransaction = () => {
    return useContext(TransactionContext);
};

export const TransactionProvider = ({ children }) => {
    const { user } = useAuth();
    const [transactions, setTransactions] = useState([]);
    const [recentTransactions, setRecentTransactions] = useState([]); // For dashboard
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Dashboard/Report related state
    const [monthlyStats, setMonthlyStats] = useState({
        totalIncome: 0,
        totalExpenses: 0,
        categoryBreakdown: {}
    });

    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        totalPages: 1,
        totalTransactions: 0
    });

    const fetchTransactions = useCallback(async (params = {}) => {
        if (!user) return;
        setLoading(true);
        try {
            setError(null);

            // Call API with params
            const response = await getTransactions(params);

            // response.data contains { transactions, pagination }
            const data = response.data || response; // handle potential wrapper variations

            setTransactions(data.transactions || []);

            if (data.pagination) {
                setPagination(data.pagination);
            }

            // For dashboard "recent" list, if specific params weren't passed (meaning default view), 
            // we could theoretically use this. But usually Dashboard should call its own endpoint or 
            // we rely on the generic fetch. 
            // For now, if no search/filter, update recent.
            if (Object.keys(params).length === 0 || (!params.search && !params.category && params.page === 1)) {
                setRecentTransactions((data.transactions || []).slice(0, 5));
            }

        } catch (err) {
            console.error('Error fetching transactions:', err);
            setError('Failed to load transactions');
        } finally {
            setLoading(false);
        }
    }, [user?._id]);

    const fetchMonthlyStats = useCallback(async (year, month) => {
        if (!user) return;
        try {
            const data = await getMonthlyTransactions(year, month);
            setMonthlyStats({
                totalIncome: data.totalIncome || 0,
                totalExpenses: data.totalExpenses || 0,
                categoryBreakdown: data.categoryBreakdown || {}
            });
            return data;
        } catch (err) {
            console.error("Error fetching monthly stats", err);
        }
    }, [user?._id]);

    // Clear transactions when user logs out
    useEffect(() => {
        if (!user) {
            setTransactions([]);
            setRecentTransactions([]);
        }
    }, [user]);

    const addTransaction = async (data) => {
        try {
            const response = await apiAddTransaction(data);
            // API returns { data: { ...transaction }, ... }
            const newTransaction = response.data || response;

            // Optimistic / Immediate Update
            setTransactions(prev => [newTransaction, ...prev]);
            setRecentTransactions(prev => [newTransaction, ...prev].slice(0, 5));

            // Refresh stats in background
            const now = new Date();
            fetchMonthlyStats(now.getFullYear(), String(now.getMonth() + 1).padStart(2, '0'));

            return newTransaction;
        } catch (err) {
            throw err;
        }
    };

    const updateTransaction = async (id, updatedData) => {
        try {
            const response = await apiUpdateTransaction(id, updatedData);
            const updatedTxn = response.data || response;

            // Update local state
            setTransactions(prev => prev.map(t => t._id === id ? updatedTxn : t));
            setRecentTransactions(prev => prev.map(t => t._id === id ? updatedTxn : t));

            // Refresh stats
            const now = new Date();
            fetchMonthlyStats(now.getFullYear(), String(now.getMonth() + 1).padStart(2, '0'));

            return updatedTxn;
        } catch (err) {
            throw err;
        }
    };

    const deleteTransaction = async (id) => {
        try {
            await apiDeleteTransaction(id);
            // Optimistic update or refresh
            setTransactions(prev => prev.filter(t => t._id !== id));
            setRecentTransactions(prev => prev.filter(t => t._id !== id));
            // Refresh stats as amounts changed
            const now = new Date();
            await fetchMonthlyStats(now.getFullYear(), String(now.getMonth() + 1).padStart(2, '0'));
        } catch (err) {
            throw err;
        }
    };

    // Update transaction logic (if API supported it, but user didn't provide update API. 
    // We'll leave it as a placeholder or remove it if not needed yet, but Dashboard usually needs consistency)

    const value = {
        transactions,
        recentTransactions,
        monthlyStats,
        loading,
        error,
        fetchTransactions,
        fetchMonthlyStats,
        addTransaction,
        updateTransaction,
        deleteTransaction,
        pagination
    };

    return (
        <TransactionContext.Provider value={value}>
            {children}
        </TransactionContext.Provider>
    );
};
