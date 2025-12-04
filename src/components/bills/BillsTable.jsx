import { Trash2, CheckCircle, Circle, AlertCircle, Clock } from 'lucide-react';

const BillsTable = ({ bills, onDelete, onMarkPaid, loading }) => {
    // Get status badge
    const getStatusBadge = (daysLeft, status) => {
        if (status === 'paid') {
            return { color: 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400', label: 'Paid', icon: CheckCircle };
        }

        if (daysLeft < 0) {
            return { color: 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400', label: 'Overdue', icon: AlertCircle };
        }

        if (daysLeft === 0) {
            return { color: 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400', label: 'Due Today', icon: AlertCircle };
        }

        if (daysLeft <= 2) {
            return { color: 'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400', label: `${daysLeft} days`, icon: AlertCircle };
        }

        if (daysLeft <= 5) {
            return { color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400', label: `${daysLeft} days`, icon: Clock };
        }

        return { color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400', label: `${daysLeft} days`, icon: Circle };
    };

    if (bills.length === 0) {
        return (
            <div className="rounded-xl sm:rounded-2xl bg-white p-6 shadow-sm dark:bg-[#1E1E2D]">
                <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                    <svg className="h-16 w-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="text-lg font-medium">No bills found</p>
                    <p className="text-sm">Add your first bill to get started</p>
                </div>
            </div>
        );
    }

    return (
        <>
            {/* Desktop Table */}
            <div className="hidden md:block rounded-xl sm:rounded-2xl bg-white shadow-sm dark:bg-[#1E1E2D] overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-gray-800">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                                    Bill Name
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                                    Amount
                                </th>
                                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                                    Due Date
                                </th>
                                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {bills.map((bill) => {
                                const badge = getStatusBadge(bill.daysLeft, bill.status);
                                const BadgeIcon = badge.icon;

                                return (
                                    <tr key={bill.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                                                {bill.billName}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right">
                                            <span className="text-sm font-semibold text-gray-900 dark:text-white">
                                                PKR {bill.amount.toLocaleString()}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                                {new Date(bill.dueDate).toLocaleDateString('en-GB')}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-xs font-medium ${badge.color}`}>
                                                <BadgeIcon className="h-3 w-3" />
                                                {badge.label}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                {bill.status === 'pending' && (
                                                    <button
                                                        onClick={() => onMarkPaid(bill.id)}
                                                        disabled={loading}
                                                        className="p-1 text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300"
                                                        title="Mark as Paid"
                                                    >
                                                        <CheckCircle className="h-4 w-4" />
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => onDelete(bill.id)}
                                                    disabled={loading}
                                                    className="p-1 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4">
                {bills.map((bill) => {
                    const badge = getStatusBadge(bill.daysLeft, bill.status);
                    const BadgeIcon = badge.icon;

                    return (
                        <div
                            key={bill.id}
                            className="rounded-xl bg-white p-4 shadow-sm dark:bg-[#1E1E2D] border border-gray-200 dark:border-gray-700"
                        >
                            <div className="flex items-start justify-between mb-3">
                                <div>
                                    <p className="text-sm font-medium text-gray-900 dark:text-white">{bill.billName}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                        Due: {new Date(bill.dueDate).toLocaleDateString('en-GB')}
                                    </p>
                                </div>
                                <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-xs font-medium ${badge.color}`}>
                                    <BadgeIcon className="h-3 w-3" />
                                    {badge.label}
                                </span>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-lg font-bold text-gray-900 dark:text-white">
                                    PKR {bill.amount.toLocaleString()}
                                </span>

                                <div className="flex items-center gap-2">
                                    {bill.status === 'pending' && (
                                        <button
                                            onClick={() => onMarkPaid(bill.id)}
                                            disabled={loading}
                                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg dark:text-green-400 dark:hover:bg-green-900/20"
                                        >
                                            <CheckCircle className="h-4 w-4" />
                                        </button>
                                    )}
                                    <button
                                        onClick={() => onDelete(bill.id)}
                                        disabled={loading}
                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg dark:text-red-400 dark:hover:bg-red-900/20"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default BillsTable;
