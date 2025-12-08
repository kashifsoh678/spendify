import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
    createBill as apiCreateBill,
    getBills as apiGetBills,
    getUpcomingBills as apiGetUpcomingBills,
    markBillAsPaid as apiMarkBillAsPaid,
    deleteBill as apiDeleteBill
} from '../services/billsService';
import { useAuth } from './AuthContext';

const BillsContext = createContext();

export const useBills = () => {
    return useContext(BillsContext);
};

export const BillsProvider = ({ children }) => {
    const { user } = useAuth();
    const [bills, setBills] = useState([]);
    const [upcomingBills, setUpcomingBills] = useState([]);
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        totalPages: 1,
        totalBills: 0
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchBills = useCallback(async (params = {}) => {
        if (!user) return;
        setLoading(true);
        try {
            setError(null);
            const response = await apiGetBills(params);
            // API returns { success: true, data: { bills: [], pagination: {} } }
            const data = response.data || response;
            setBills(data.bills || []);
            setPagination(data.pagination || {
                page: params.page || 1,
                limit: params.limit || 10,
                totalPages: 1,
                totalBills: data.bills?.length || 0
            });
        } catch (err) {
            console.error('Error fetching bills:', err);
            setError('Failed to load bills');
        } finally {
            setLoading(false);
        }
    }, [user?._id]);

    const fetchUpcomingBills = useCallback(async () => {
        if (!user) return;
        try {
            setError(null);
            const response = await apiGetUpcomingBills();
            // API returns { success: true, data: { upcoming: [...] } }
            const data = response.data || response;
            setUpcomingBills(data.upcoming || []);
        } catch (err) {
            console.error('Error fetching upcoming bills:', err);
            setError('Failed to load upcoming bills');
        }
    }, [user?._id]);

    const createBill = async (billData) => {
        try {
            const response = await apiCreateBill(billData);
            const data = response.data || response;

            // Optimistically add to bills list
            const newBill = data.bill || data;
            setBills(prevBills => [newBill, ...prevBills]);

            // Refresh upcoming bills
            await fetchUpcomingBills();

            return newBill;
        } catch (err) {
            throw err;
        }
    };

    const markAsPaid = async (billId) => {
        try {
            const response = await apiMarkBillAsPaid(billId);
            const data = response.data || response;

            // Update bill in list
            setBills(prevBills =>
                prevBills.map(bill =>
                    bill._id === billId ? { ...bill, status: 'paid' } : bill
                )
            );

            // Refresh upcoming bills (paid bills are removed from upcoming)
            await fetchUpcomingBills();

            return data.bill || data;
        } catch (err) {
            throw err;
        }
    };

    const deleteBill = async (billId) => {
        try {
            await apiDeleteBill(billId);

            // Remove from bills list
            setBills(prevBills => prevBills.filter(bill => bill._id !== billId));

            // Refresh upcoming bills
            await fetchUpcomingBills();
        } catch (err) {
            throw err;
        }
    };

    // Auto-fetch on mount when user exists
    useEffect(() => {
        if (user?._id) {
            fetchUpcomingBills(); // Always fetch upcoming for dashboard
        } else if (!user) {
            setBills([]);
            setUpcomingBills([]);
        }
    }, [user?._id, fetchUpcomingBills]);

    const value = {
        bills,
        upcomingBills,
        pagination,
        loading,
        error,
        fetchBills,
        fetchUpcomingBills,
        createBill,
        markAsPaid,
        deleteBill
    };

    return (
        <BillsContext.Provider value={value}>
            {children}
        </BillsContext.Provider>
    );
};
