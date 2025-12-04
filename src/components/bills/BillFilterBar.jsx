import { X } from 'lucide-react';
import { SearchInput, Select, DatePicker } from '../common';

const BillFilterBar = ({ filters, onFilterChange, onClearFilters }) => {
    const hasActiveFilters = filters.search || filters.status !== 'all' || filters.startDate || filters.endDate;

    const statusOptions = [
        { value: 'all', label: 'All Status' },
        { value: 'pending', label: 'Pending' },
        { value: 'paid', label: 'Paid' },
        { value: 'overdue', label: 'Overdue' }
    ];

    return (
        <div className="rounded-xl sm:rounded-2xl bg-white p-4 sm:p-6 shadow-sm dark:bg-[#1E1E2D] mb-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Filters</h3>
                {hasActiveFilters && (
                    <button
                        onClick={onClearFilters}
                        className="flex items-center gap-1 text-xs text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] font-medium transition-colors"
                    >
                        <X className="h-3 w-3" />
                        <span className="hidden xs:inline">Clear All</span>
                        <span className="xs:hidden">Clear</span>
                    </button>
                )}
            </div>

            {/* Responsive Grid Layout */}
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                {/* Search - Full width on mobile, half on tablet, quarter on desktop */}
                <div className="sm:col-span-2 lg:col-span-1">
                    <SearchInput
                        label="Search"
                        placeholder="Search bills..."
                        value={filters.search}
                        onChange={(e) => onFilterChange({ search: e.target.value })}
                        onClear={() => onFilterChange({ search: '' })}
                    />
                </div>

                {/* Status Filter */}
                <Select
                    label="Status"
                    value={filters.status}
                    onChange={(e) => onFilterChange({ status: e.target.value })}
                    options={statusOptions}
                    placeholder=""
                />

                {/* Date Range - Spans 2 columns on tablet and desktop, stacks on mobile */}
                <div className="sm:col-span-2 lg:col-span-2">
                    <div className="grid grid-cols-2 gap-2">
                        <DatePicker
                            label="Start Date"
                            value={filters.startDate}
                            onChange={(e) => onFilterChange({ startDate: e.target.value })}
                            clearable
                            onClear={() => onFilterChange({ startDate: '' })}
                        />
                        <DatePicker
                            label="End Date"
                            value={filters.endDate}
                            onChange={(e) => onFilterChange({ endDate: e.target.value })}
                            clearable
                            onClear={() => onFilterChange({ endDate: '' })}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BillFilterBar;
