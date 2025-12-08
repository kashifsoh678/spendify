import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import StatsRow from '../components/transactions/StatsRow';
import FilterBar from '../components/transactions/FilterBar';
import TransactionTable from '../components/transactions/TransactionTable';
import AddTransactionModal from '../components/transactions/AddTransactionModal';
import { Pagination, ConfirmationModal } from '../components/common';

import { useTransaction } from '../context/TransactionContext';

const Transactions = () => {
    const { transactions, pagination, addTransaction, updateTransaction, deleteTransaction, loading, fetchTransactions } = useTransaction();
    const [stats, setStats] = useState({ totalIncome: 0, totalExpenses: 0, netBalance: 0 }); // Local stats for this page view if needed, or derived
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTransaction, setEditingTransaction] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    const [filters, setFilters] = useState({
        search: '',
        type: 'all',
        category: 'all',
        startDate: '',
        endDate: ''
    });

    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [transactionToDelete, setTransactionToDelete] = useState(null);

    // Debounced fetch with delay for search input
    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            fetchTransactions({
                page: currentPage,
                limit: itemsPerPage,
                ...filters
            });
        }, 500); // 500ms delay

        return () => clearTimeout(debounceTimer);
    }, [currentPage, filters, fetchTransactions]);

    // Calculate stats from current view transactions dynamically
    const calculateStats = () => {
        const income = transactions
            .filter(t => t.type === 'income')
            .reduce((acc, t) => acc + (Number(t.amount) || 0), 0);
        const expense = transactions
            .filter(t => t.type === 'expense')
            .reduce((acc, t) => acc + (Number(t.amount) || 0), 0);
        return {
            totalIncome: income,
            totalExpenses: expense,
            netBalance: income - expense
        };
    };

    useEffect(() => {
        setStats(calculateStats());
    }, [transactions]);





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
            setIsModalOpen(false); // Close modal on success
        } catch (error) {
            toast.error(error.message || 'Failed to add transaction');
            // throw error; // Don't throw if handled
        }
    };

    // Handle edit transaction
    const handleEditTransaction = async (transactionData) => {
        try {
            await updateTransaction(editingTransaction._id, transactionData); // Use _id from MongoDB
            toast.success('Transaction updated successfully!');
            setIsModalOpen(false);
            setEditingTransaction(null);
        } catch (error) {
            toast.error(error.message || 'Failed to update transaction');
        }
    };

    // Handle delete transaction
    const handleDeleteTransaction = (id) => {
        setTransactionToDelete(id);
        setIsConfirmOpen(true);
    };

    const confirmDelete = async () => {
        if (!transactionToDelete) return;

        try {
            await deleteTransaction(transactionToDelete);
            toast.success('Transaction deleted successfully!');
        } catch (error) {
            toast.error(error.message || 'Failed to delete transaction');
        } finally {
            setTransactionToDelete(null);
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
                currentPage={pagination.page}
                totalPages={pagination.totalPages}
                onPageChange={setCurrentPage}
            />

            {/* Add/Edit Transaction Modal */}
            <AddTransactionModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSubmit={editingTransaction ? handleEditTransaction : handleAddTransaction}
                initialData={editingTransaction}
            />

            {/* Delete Confirmation Modal */}
            <ConfirmationModal
                isOpen={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
                onConfirm={confirmDelete}
                title="Delete Transaction"
                message="Are you sure you want to delete this transaction? This action cannot be undone."
                confirmText="Delete"
                cancelText="Cancel"
                variant="danger"
            />
        </div>
    );
};

export default Transactions;
