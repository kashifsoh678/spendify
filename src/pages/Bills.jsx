import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import BillAlerts from '../components/bills/BillAlerts';
import BillFilterBar from '../components/bills/BillFilterBar';
import BillsTable from '../components/bills/BillsTable';
import AddBillModal from '../components/bills/AddBillModal';
import { Pagination } from '../components/common';
import { getBills, addBill, updateBill, deleteBill } from '../services/billsService';

const Bills = () => {
    const [bills, setBills] = useState([]);
    const [allBills, setAllBills] = useState([]); // Unfiltered bills for alerts
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [filters, setFilters] = useState({
        search: '',
        status: 'all',
        startDate: '',
        endDate: ''
    });

    // Fetch bills (filtered)
    const fetchBills = async () => {
        setLoading(true);
        try {
            const response = await getBills({
                page: currentPage,
                limit: 10,
                ...filters
            });
            // Handle both array response (legacy/simple) and paginated object response
            if (Array.isArray(response)) {
                setBills(response);
                setTotalPages(1);
            } else {
                setBills(response.bills || []);
                setTotalPages(response.totalPages || 1);
            }
        } catch (error) {
            console.error('Error fetching bills:', error);
            toast.error('Failed to load bills');
        } finally {
            setLoading(false);
        }
    };

    // Fetch all bills (unfiltered) for alerts
    const fetchAllBills = async () => {
        try {
            const response = await getBills({
                page: 1,
                limit: 1000 // Get all bills for alerts
            });
            if (Array.isArray(response)) {
                setAllBills(response);
            } else {
                setAllBills(response.bills || []);
            }
        } catch (error) {
            console.error('Error fetching all bills:', error);
        }
    };

    // Initial load
    useEffect(() => {
        fetchBills();
        fetchAllBills();
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
            status: 'all',
            startDate: '',
            endDate: ''
        });
        setCurrentPage(1);
    };

    // Handle add bill
    const handleAddBill = async (billData) => {
        try {
            await addBill(billData);
            toast.success('Bill added successfully!');
            fetchBills();
            fetchAllBills(); // Refresh alerts
        } catch (error) {
            toast.error('Failed to add bill');
            throw error;
        }
    };

    // Handle mark as paid
    const handleMarkPaid = async (id) => {
        try {
            await updateBill(id, { status: 'paid' });
            toast.success('Bill marked as paid!');
            fetchBills();
            fetchAllBills(); // Refresh alerts
        } catch (error) {
            toast.error('Failed to update bill');
            console.error('Error updating bill:', error);
        }
    };

    // Handle delete
    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this bill?')) {
            return;
        }

        try {
            await deleteBill(id);
            toast.success('Bill deleted successfully!');
            fetchBills();
            fetchAllBills(); // Refresh alerts
        } catch (error) {
            toast.error('Failed to delete bill');
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
            <BillAlerts bills={allBills} />

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
                    onDelete={handleDelete}
                    onMarkPaid={handleMarkPaid}
                    loading={loading}
                />
            </div>

            {/* Pagination */}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />

            {/* Add Bill Modal */}
            <AddBillModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleAddBill}
            />
        </div>
    );
};

export default Bills;
