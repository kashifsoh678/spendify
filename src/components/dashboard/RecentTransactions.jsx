import {
    Utensils,
    Car,
    Home,
    Wallet,
    ShoppingBag,
    GraduationCap,
    Heart,
    Sparkles,
    DollarSign
} from 'lucide-react';

// Helper function to get icon based on category
const getCategoryIcon = (category) => {
    const iconMap = {
        'Food': Utensils,
        'Travel': Car,
        'Utilities': Home,
        'Shopping': ShoppingBag,
        'Education': GraduationCap,
        'Health': Heart,
        'Entertainment': Sparkles,
        'Income': Wallet,
        'Salary': DollarSign,
    };
    return iconMap[category] || Wallet; // Default to Wallet icon
};

const RecentTransactions = ({ transactions }) => {
    return (
        <div className="rounded-2xl bg-white p-4 sm:p-6 shadow-sm dark:bg-[#1E1E2D]">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">Recent Transactions</h2>

            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                            <th className="pb-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-400">Category</th>
                            <th className="pb-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-400">Description</th>
                            <th className="pb-3 text-right text-sm font-semibold text-gray-600 dark:text-gray-400">Amount</th>
                            <th className="pb-3 text-center text-sm font-semibold text-gray-600 dark:text-gray-400">Type</th>
                            <th className="pb-3 text-right text-sm font-semibold text-gray-600 dark:text-gray-400">Date</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                        {transactions.map((transaction) => {
                            const Icon = transaction.icon || getCategoryIcon(transaction.category);
                            return (
                                <tr key={transaction._id || transaction.id} className="group hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                    <td className="py-4">
                                        <div className="flex items-center gap-3">
                                            <div className={`rounded-lg p-2 ${transaction.type === 'income' ? 'text-green-600 bg-green-50 dark:bg-green-900/20' : 'text-red-600 bg-red-50 dark:bg-red-900/20'}`}>
                                                <Icon className="h-4 w-4" />
                                            </div>
                                            <span className="text-sm font-medium text-gray-900 dark:text-white">{transaction.category}</span>
                                        </div>
                                    </td>
                                    <td className="py-4">
                                        <span className="text-sm text-gray-600 dark:text-gray-400">{transaction.note || transaction.description || 'No description'}</span>
                                    </td>
                                    <td className="py-4 text-right">
                                        <span className={`text-sm font-semibold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                                            {transaction.type === 'income' ? '+' : '-'}PKR {transaction.amount.toLocaleString()}
                                        </span>
                                    </td>
                                    <td className="py-4 text-center">
                                        <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${transaction.type === 'income'
                                            ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                                            : 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400'
                                            }`}>
                                            {transaction.type}
                                        </span>
                                    </td>
                                    <td className="py-4 text-right">
                                        <span className="text-sm text-gray-500 dark:text-gray-400">
                                            {new Date(transaction.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                        </span>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-3">
                {transactions.map((transaction) => {
                    const Icon = transaction.icon || getCategoryIcon(transaction.category);
                    return (
                        <div
                            key={transaction._id || transaction.id}
                            className="rounded-xl border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-all"
                        >
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-3">
                                    <div className={`rounded-lg p-2 ${transaction.type === 'income' ? 'text-green-600 bg-green-50 dark:bg-green-900/20' : 'text-red-600 bg-red-50 dark:bg-red-900/20'}`}>
                                        <Icon className="h-4 w-4" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">{transaction.category}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">{transaction.note || transaction.description || 'No description'}</p>
                                    </div>
                                </div>
                                <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${transaction.type === 'income'
                                    ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                                    : 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400'
                                    }`}>
                                    {transaction.type}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className={`text-base font-bold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                                    {transaction.type === 'income' ? '+' : '-'}PKR {transaction.amount.toLocaleString()}
                                </span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                    {new Date(transaction.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default RecentTransactions;
