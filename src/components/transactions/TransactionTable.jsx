import { Trash2, Edit2 } from 'lucide-react';
import { getCategoryByValue, getMoodByValue } from '../../constants/transactions';

const TransactionTable = ({ transactions, onEdit, onDelete, loading, readOnly = false }) => {
    if (loading) {
        return (
            <div className="rounded-xl sm:rounded-2xl bg-white p-6 shadow-sm dark:bg-[#1E1E2D]">
                <div className="flex items-center justify-center h-64">
                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-[var(--color-primary)]"></div>
                </div>
            </div>
        );
    }

    if (!transactions || transactions.length === 0) {
        return (
            <div className="rounded-xl sm:rounded-2xl bg-white p-6 shadow-sm dark:bg-[#1E1E2D]">
                <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                    <svg className="h-16 w-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                    <p className="text-lg font-medium">No transactions found</p>
                    <p className="text-sm">Add your first transaction to get started</p>
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
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Category</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Note</th>
                                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Amount</th>
                                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Type</th>
                                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Mood</th>
                                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Date</th>
                                {!readOnly && <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Actions</th>}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {transactions.map((transaction) => {
                                const category = getCategoryByValue(transaction.category, transaction.type);
                                const mood = getMoodByValue(transaction.mood);

                                return (
                                    <tr key={transaction._id || transaction.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-3">
                                                <span className="text-2xl">{category.icon}</span>
                                                <span className="text-sm font-medium text-gray-900 dark:text-white">{category.label}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm text-gray-600 dark:text-gray-400">{transaction.note}</span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right">
                                            <span className={`text-sm font-semibold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                                                {transaction.type === 'income' ? '+' : '-'}PKR {transaction.amount.toLocaleString()}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${transaction.type === 'income'
                                                ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                                                : 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400'
                                                }`}>
                                                {transaction.type}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            <span className="text-2xl" title={mood.label}>{mood.emoji}</span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                                {new Date(transaction.date).toLocaleDateString('en-GB')}
                                            </span>
                                        </td>
                                        {!readOnly && (
                                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                                <div className="flex items-center justify-center gap-2">
                                                    <button
                                                        onClick={() => onEdit(transaction)}
                                                        className="p-1 text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
                                                        title="Edit"
                                                    >
                                                        <Edit2 className="h-4 w-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => onDelete(transaction._id || transaction.id)}
                                                        className="p-1 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                                                        title="Delete"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        )}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4">
                {transactions.map((transaction) => {
                    const category = getCategoryByValue(transaction.category, transaction.type);
                    const mood = getMoodByValue(transaction.mood);

                    return (
                        <div key={transaction._id || transaction.id} className="rounded-xl bg-white p-4 shadow-sm dark:bg-[#1E1E2D] border border-gray-200 dark:border-gray-700">
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl">{category.icon}</span>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">{category.label}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">{transaction.note}</p>
                                    </div>
                                </div>
                                <span className="text-xl">{mood.emoji}</span>
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <span className={`text-lg font-bold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                                        {transaction.type === 'income' ? '+' : '-'}PKR {transaction.amount.toLocaleString()}
                                    </span>
                                    <span className={`ml-2 inline-flex rounded-full px-2 py-1 text-xs font-medium ${transaction.type === 'income'
                                        ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                                        : 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400'
                                        }`}>
                                        {transaction.type}
                                    </span>
                                </div>
                                {!readOnly && (
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => onEdit(transaction)}
                                            className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg dark:text-indigo-400 dark:hover:bg-indigo-900/20"
                                        >
                                            <Edit2 className="h-4 w-4" />
                                        </button>
                                        <button
                                            onClick={() => onDelete(transaction._id || transaction.id)}
                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg dark:text-red-400 dark:hover:bg-red-900/20"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                                {new Date(transaction.date).toLocaleDateString('en-GB')}
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default TransactionTable;
