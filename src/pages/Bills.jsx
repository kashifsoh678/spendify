import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import BillAlerts from '../components/bills/BillAlerts';
import BillFilterBar from '../components/bills/BillFilterBar';
import BillsTable from '../components/bills/BillsTable';
import AddBillModal from '../components/bills/AddBillModal';
import { Pagination, ConfirmationModal } from '../components/common';
import { useBills } from '../context/BillsContext';

const Bills = () => {
    const { bills, upcomingBills, pagination, loading, fetchBills, createBill, markAsPaid, deleteBill } = useBills();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [billToDelete, setBillToDelete] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    const [filters, setFilters] = useState({
        search: '',
        status: 'all',
        startDate: '',
        endDate: ''
    });

    // Debounced fetch with delay for search input
    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            fetchBills({
                page: currentPage,
                limit: 10,
                ...filters
            });
        }, 500); // 500ms delay

        return () => clearTimeout(debounceTimer);
    }, [currentPage, filters, fetchBills]);

    // Handle filter changes
    const handleFilterChange = (newFilters) => {
        setFilters({ ...filters, ...newFilters });
        setCurrentPage(1); // Reset to first page when filters change
    };

    // Handle clear all filters
    const handleClearFilters = () => {
        setFilters({
            search: '',
            status: 'all',
            startDate: '',
            endDate: ''
        });
        setCurrentPage(1);
    };

    // Handle add bill
    const handleAddBill = async (billData) => {
        try {
            await createBill(billData);
            toast.success('Bill added successfully!');
            // Refresh current page
            await fetchBills({
                page: currentPage,
                limit: 10,
                ...filters
            });
        } catch (error) {
            toast.error(error.message || 'Failed to add bill');
            throw error;
        }
    };

    // Handle mark as paid
    const handleMarkPaid = async (id) => {
        try {
            await markAsPaid(id);
            toast.success('Bill marked as paid!');
        } catch (error) {
            toast.error(error.message || 'Failed to update bill');
            console.error('Error updating bill:', error);
        }
    };

    // Handle delete
    const handleDeleteBill = (id) => {
        setBillToDelete(id);
        setIsConfirmOpen(true);
    };

    const confirmDelete = async () => {
        if (!billToDelete) return;

        try {
            await deleteBill(billToDelete);
            toast.success('Bill deleted successfully!');
        } catch (error) {
            toast.error(error.message || 'Failed to delete bill');
        } finally {
            setBillToDelete(null);
        }
    };

    return (
        <div className="space-y-6">
            <Toaster position="top-right" />

            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Bills & Reminders</h1>
                    <p className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                        Track and manage your upcoming bill payments
                    </p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 rounded-lg bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--color-primary-dark)] transition-colors"
                >
                    <Plus className="h-5 w-5" />
                    <span className="hidden sm:inline">Add Bill</span>
                </button>
            </div>

            {/* Alerts */}
            <BillAlerts bills={upcomingBills} />

            {/* Filter Bar */}
            <BillFilterBar
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
            />

            {/* Bills Table */}
            <div className="rounded-xl sm:rounded-2xl bg-white p-4 sm:p-6 shadow-sm dark:bg-[#1E1E2D]">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    All Bills
                </h2>
                <BillsTable
                    bills={bills}
                    onDelete={handleDeleteBill}
                    onMarkPaid={handleMarkPaid}
                    loading={loading}
                />
            </div>

            {/* Pagination */}
            {pagination && (
                <Pagination
                    currentPage={pagination.page || currentPage}
                    totalPages={pagination.totalPages || 1}
                    onPageChange={setCurrentPage}
                />
            )}

            {/* Add Bill Modal */}
            <AddBillModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleAddBill}
            />

            {/* Delete Confirmation Modal */}
            <ConfirmationModal
                isOpen={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
                onConfirm={confirmDelete}
                title="Delete Bill"
                message="Are you sure you want to delete this bill? This action cannot be undone."
                confirmText="Delete"
                cancelText="Cancel"
                variant="danger"
            />
        </div>
    );
};

export default Bills;
