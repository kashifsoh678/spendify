import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * Reusable Pagination component
 */
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;

    const canGoPrevious = currentPage > 1;
    const canGoNext = currentPage < totalPages;

    // Generate page numbers to display
    const getPageNumbers = () => {
        const pages = [];
        const maxVisible = 5;

        if (totalPages <= maxVisible) {
            // Show all pages if total is less than max
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Always show first page
            pages.push(1);

            if (currentPage > 3) {
                pages.push('...');
            }

            // Show pages around current page
            const start = Math.max(2, currentPage - 1);
            const end = Math.min(totalPages - 1, currentPage + 1);

            for (let i = start; i <= end; i++) {
                pages.push(i);
            }

            if (currentPage < totalPages - 2) {
                pages.push('...');
            }

            // Always show last page
            pages.push(totalPages);
        }

        return pages;
    };

    const pageNumbers = getPageNumbers();

    return (
        <div className="flex items-center justify-center gap-2">
            {/* Previous Button */}
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={!canGoPrevious}
                className="flex items-center gap-1 rounded-lg bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-[#1E1E2D] dark:text-gray-300 dark:hover:bg-gray-800 transition-colors"
                aria-label="Previous page"
            >
                <ChevronLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Previous</span>
            </button>

            {/* Page Numbers */}
            <div className="flex items-center gap-1">
                {pageNumbers.map((page, index) => {
                    if (page === '...') {
                        return (
                            <span key={`ellipsis-${index}`} className="px-2 text-gray-500">
                                ...
                            </span>
                        );
                    }

                    return (
                        <button
                            key={page}
                            onClick={() => onPageChange(page)}
                            className={`min-w-[2.5rem] rounded-lg px-3 py-2 text-sm font-medium transition-colors ${currentPage === page
                                    ? 'bg-[var(--color-primary)] text-white'
                                    : 'bg-white text-gray-700 hover:bg-gray-50 dark:bg-[#1E1E2D] dark:text-gray-300 dark:hover:bg-gray-800'
                                }`}
                            aria-label={`Page ${page}`}
                            aria-current={currentPage === page ? 'page' : undefined}
                        >
                            {page}
                        </button>
                    );
                })}
            </div>

            {/* Next Button */}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={!canGoNext}
                className="flex items-center gap-1 rounded-lg bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-[#1E1E2D] dark:text-gray-300 dark:hover:bg-gray-800 transition-colors"
                aria-label="Next page"
            >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="h-4 w-4" />
            </button>
        </div>
    );
};

export default Pagination;
