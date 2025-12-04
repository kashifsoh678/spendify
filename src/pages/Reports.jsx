
import { useState, useEffect, useMemo } from 'react';
import { FileText } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import MonthSelector from '../components/reports/MonthSelector';
import SummaryCards from '../components/reports/SummaryCards';
import ExportButtons from '../components/reports/ExportButtons';
import { getMonthOptions, getMonthlyReport } from '../services/reportsService';

// Reuse Dashboard components
import CategoryPieChart from '../components/dashboard/CategoryPieChart';
import MonthlyLineChart from '../components/dashboard/MonthlyLineChart';

// Reuse Transactions components
import TransactionTable from '../components/transactions/TransactionTable';
import FilterBar from '../components/transactions/FilterBar';
import { Pagination } from '../components/common';

const Reports = () => {
    const [months] = useState(getMonthOptions());
    const [selectedMonth, setSelectedMonth] = useState(months[0]?.value || '');
    const [reportData, setReportData] = useState(null);

    // Filter and Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState({
        search: '',
        type: 'all',
        category: 'all',
        startDate: '',
        endDate: ''
    });

    // Fetch report data when month changes
    useEffect(() => {
        if (!selectedMonth) return;

        const fetchReport = async () => {
            try {
                const data = await getMonthlyReport(selectedMonth);
                setReportData(data);
                setCurrentPage(1); // Reset page on month change
            } catch (error) {
                console.error('Error fetching report:', error);
                toast.error('Failed to load report');
            }
        };

        fetchReport();
    }, [selectedMonth]);

    // Handle filter changes
    const handleFilterChange = (newFilters) => {
        setFilters({ ...filters, ...newFilters });
        setCurrentPage(1);
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

    // Filter and Paginate Transactions
    const { paginatedTransactions, totalPages } = useMemo(() => {
        if (!reportData?.transactions) return { paginatedTransactions: [], totalPages: 1 };

        let filtered = [...reportData.transactions];

        // Apply Search
        if (filters.search) {
            const searchLower = filters.search.toLowerCase();
            filtered = filtered.filter(t =>
                t.note?.toLowerCase().includes(searchLower) ||
                t.category?.toLowerCase().includes(searchLower)
            );
        }

        // Apply Type Filter
        if (filters.type !== 'all') {
            filtered = filtered.filter(t => t.type === filters.type);
        }

        // Apply Category Filter
        if (filters.category !== 'all') {
            filtered = filtered.filter(t => t.category === filters.category);
        }

        // Apply Date Range
        if (filters.startDate) {
            filtered = filtered.filter(t => new Date(t.date) >= new Date(filters.startDate));
        }
        if (filters.endDate) {
            filtered = filtered.filter(t => new Date(t.date) <= new Date(filters.endDate));
        }

        // Pagination
        const itemsPerPage = 10;
        const totalPages = Math.ceil(filtered.length / itemsPerPage) || 1;
        const startIndex = (currentPage - 1) * itemsPerPage;
        const paginatedTransactions = filtered.slice(startIndex, startIndex + itemsPerPage);

        return { paginatedTransactions, totalPages };
    }, [reportData, filters, currentPage]);

    // Transform data for Category Pie Chart
    const getCategoryChartData = () => {
        if (!reportData?.categoryBreakdown) return null;

        return {
            labels: reportData.categoryBreakdown.map(item => item.category),
            datasets: [{
                data: reportData.categoryBreakdown.map(item => item.amount),
                backgroundColor: reportData.categoryBreakdown.map(item => item.color),
                borderColor: reportData.categoryBreakdown.map(item => {
                    if (item.color.startsWith('rgba')) {
                        return item.color.replace('rgba', 'rgb').replace(/, 0\.\d+\)/, ')');
                    }
                    return item.color;
                }),
                borderWidth: 1
            }]
        };
    };

    // Transform data for Monthly Trend Chart
    const getTrendChartData = () => {
        if (!reportData?.trend) return null;

        return {
            labels: reportData.trend.map(item => {
                const date = new Date(item.date);
                return `Day ${date.getDate()} `;
            }),
            datasets: [{
                label: 'Daily Spending',
                data: reportData.trend.map(item => item.amount),
                borderColor: 'rgb(99, 102, 241)',
                backgroundColor: 'rgba(99, 102, 241, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4,
                pointRadius: 0,
                pointHoverRadius: 6,
                pointHoverBackgroundColor: 'rgb(99, 102, 241)',
                pointHoverBorderColor: '#fff',
                pointHoverBorderWidth: 2
            }]
        };
    };

    return (
        <div className="space-y-6">
            <Toaster position="top-right" />

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2">
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                            Reports
                        </h1>
                    </div>
                    <p className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                        Generate and download your monthly financial reports
                    </p>
                </div>

                {/* Month Selector */}
                <MonthSelector
                    selectedMonth={selectedMonth}
                    onMonthChange={setSelectedMonth}
                    months={months}
                />
            </div>

            {reportData ? (
                <>
                    {/* Summary Cards */}
                    <SummaryCards summary={reportData.summary} />

                    {/* Charts Row */}
                    <div className="grid gap-6 lg:grid-cols-2">
                        {reportData.categoryBreakdown && reportData.categoryBreakdown.length > 0 ? (
                            <CategoryPieChart data={getCategoryChartData()} />
                        ) : (
                            <div className="rounded-xl sm:rounded-2xl bg-white dark:bg-[#1E1E2D] p-6 shadow-sm flex items-center justify-center">
                                <p className="text-gray-500 dark:text-gray-400">No category data available</p>
                            </div>
                        )}

                        {reportData.trend && reportData.trend.length > 0 ? (
                            <MonthlyLineChart data={getTrendChartData()} />
                        ) : (
                            <div className="rounded-xl sm:rounded-2xl bg-white dark:bg-[#1E1E2D] p-6 shadow-sm flex items-center justify-center">
                                <p className="text-gray-500 dark:text-gray-400">No trend data available</p>
                            </div>
                        )}
                    </div>

                    {/* Export Buttons - Moved before Transactions Table */}
                    <ExportButtons selectedMonth={selectedMonth} />

                    {/* Transactions Section */}
                    <div className="space-y-4">
                        {/* Filter Bar */}
                        <FilterBar
                            filters={filters}
                            onFilterChange={handleFilterChange}
                            onClearFilters={handleClearFilters}
                        />

                        <div className="rounded-xl sm:rounded-2xl bg-white p-4 sm:p-6 shadow-sm dark:bg-[#1E1E2D]">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                Monthly Transactions
                            </h3>

                            {/* Reused Transaction Table with readOnly prop */}
                            <TransactionTable
                                transactions={paginatedTransactions}
                                readOnly={true}
                            />
                        </div>

                        {/* Pagination */}
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    </div>
                </>
            ) : (
                <div className="rounded-xl sm:rounded-2xl bg-white dark:bg-[#1E1E2D] p-6 shadow-sm">
                    <p className="text-center text-gray-500 dark:text-gray-400">
                        No report data available for the selected month.
                    </p>
                </div>
            )}
        </div>
    );
};

export default Reports;

