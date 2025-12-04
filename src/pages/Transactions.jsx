import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import StatsRow from '../components/transactions/StatsRow';
import FilterBar from '../components/transactions/FilterBar';
import TransactionTable from '../components/transactions/TransactionTable';
import AddTransactionModal from '../components/transactions/AddTransactionModal';
import { Pagination } from '../components/common';
import { getTransactions, getMonthlyStats, addTransaction, updateTransaction, deleteTransaction } from '../services/transactionService';

const Transactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [stats, setStats] = useState({ totalIncome: 0, totalExpenses: 0, netBalance: 0 });
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTransaction, setEditingTransaction] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [filters, setFilters] = useState({
        search: '',
        type: 'all',
        category: 'all',
        startDate: '',
        endDate: ''
    });

    // Fetch transactions
    const fetchTransactions = async () => {
        setLoading(true);
        try {
            const response = await getTransactions({
                page: currentPage,
                limit: 10,
                ...filters
            });

            setTransactions(response.transactions || []);
            setTotalPages(response.totalPages || 1);
        } catch (error) {
            console.error('Error fetching transactions:', error);
            toast.error('Failed to load transactions');
        } finally {
            setLoading(false);
        }
    };

    // Fetch monthly stats
    const fetchStats = async () => {
        try {
            const data = await getMonthlyStats();
            setStats(data);
        } catch (error) {
            console.error('Error fetching stats:', error);
        }
    };

    // Initial load
    useEffect(() => {
        fetchTransactions();
        fetchStats();
    }, [currentPage, filters]);

    // Handle filter changes
    const handleFilterChange = (newFilters) => {
        setFilters({ ...filters, ...newFilters });
        setCurrentPage(1); // Reset to first page when filters change
    };

    // Handle clear all filters
    const handleClearFilters = () => {
        setFilters({
            search: '',
            type: 'all',
            category: 'all',
            startDate: '',
            endDate: ''
        });
        setCurrentPage(1);
    };

    // Handle add transaction
    const handleAddTransaction = async (transactionData) => {
        try {
            await addTransaction(transactionData);
            toast.success('Transaction added successfully!');
            fetchTransactions();
            fetchStats();
        } catch (error) {
            toast.error('Failed to add transaction');
            throw error;
        }
    };

    // Handle edit transaction
    const handleEditTransaction = async (transactionData) => {
        try {
            await updateTransaction(editingTransaction.id, transactionData);
            toast.success('Transaction updated successfully!');
            setEditingTransaction(null);
            fetchTransactions();
            fetchStats();
        } catch (error) {
            toast.error('Failed to update transaction');
            throw error;
        }
    };

    // Handle delete transaction
    const handleDeleteTransaction = async (id) => {
        if (!window.confirm('Are you sure you want to delete this transaction?')) {
            return;
        }

        try {
            await deleteTransaction(id);
            toast.success('Transaction deleted successfully!');
            fetchTransactions();
            fetchStats();
        } catch (error) {
            toast.error('Failed to delete transaction');
        }
    };

    // Open edit modal
    const handleEdit = (transaction) => {
        setEditingTransaction(transaction);
        setIsModalOpen(true);
    };

    // Close modal
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingTransaction(null);
    };

    return (
        <div className="space-y-6">
            <Toaster position="top-right" />

            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Transactions</h1>
                    <p className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                        Manage your income and expenses
                    </p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 rounded-lg bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--color-primary-dark)] transition-colors"
                >
                    <Plus className="h-5 w-5" />
                    <span className="hidden sm:inline">Add Transaction</span>
                </button>
            </div>

            {/* Stats Row */}
            <StatsRow stats={stats} />

            {/* Filter Bar */}
            <FilterBar
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
            />
            <div className="rounded-xl sm:rounded-2xl bg-white p-4 sm:p-6 shadow-sm dark:bg-[#1E1E2D]">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    All Transactions
                </h2>

                {/* Transactions Table */}
                <TransactionTable
                    transactions={transactions}
                    onEdit={handleEdit}
                    onDelete={handleDeleteTransaction}
                    loading={loading}
                />
            </div>
            {/* Pagination */}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />

            {/* Add/Edit Transaction Modal */}
            <AddTransactionModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSubmit={editingTransaction ? handleEditTransaction : handleAddTransaction}
                initialData={editingTransaction}
            />
        </div>
    );
};

export default Transactions;
