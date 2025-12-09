const BudgetProgress = ({ monthlyBudget = 0, totalExpenses = 0 }) => {
    const remainingBudget = monthlyBudget - totalExpenses;
    const budgetUsedPercentage = monthlyBudget > 0 ? (totalExpenses / monthlyBudget) * 100 : 0;

    const getBudgetStatus = () => {
        if (budgetUsedPercentage < 50) return { color: 'text-green-600', bg: 'bg-green-500', label: 'Healthy' };
        if (budgetUsedPercentage < 85) return { color: 'text-yellow-600', bg: 'bg-yellow-500', label: 'Moderate' };
        return { color: 'text-red-600', bg: 'bg-red-500', label: 'Critical' };
    };

    const budgetStatus = getBudgetStatus();

    // If no budget is set, show a message
    if (monthlyBudget === 0 || monthlyBudget === null) {
        return (
            <div className="rounded-xl sm:rounded-2xl bg-white p-4 sm:p-6 shadow-sm dark:bg-[#1E1E2D]">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">Budget Progress</h2>
                <div className="text-center py-8">
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                        No monthly budget set yet.
                    </p>
                    <a
                        href="/budget"
                        className="inline-block px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-lg hover:from-indigo-600 hover:to-indigo-700 transition-all"
                    >
                        Set Your Budget
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="rounded-xl sm:rounded-2xl bg-white p-4 sm:p-6 shadow-sm dark:bg-[#1E1E2D]">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">Budget Progress</h2>
            <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Monthly Budget: PKR {monthlyBudget.toLocaleString()}</span>
                    <span className={`font-semibold ${budgetStatus.color}`}>{budgetUsedPercentage.toFixed(1)}% Used</span>
                </div>
                <div className="relative h-3 sm:h-4 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                    <div
                        className={`h-full ${budgetStatus.bg} transition-all duration-500 rounded-full`}
                        style={{ width: `${Math.min(budgetUsedPercentage, 100)}%` }}
                    ></div>
                </div>
                <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Spent: PKR {totalExpenses.toLocaleString()}</span>
                    <span className="text-gray-600 dark:text-gray-400">Remaining: PKR {remainingBudget.toLocaleString()}</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    You have used {budgetUsedPercentage.toFixed(0)}% of your monthly budget. Your remaining budget is PKR {remainingBudget.toLocaleString()}.
                </p>
            </div>
        </div>
    );
};

export default BudgetProgress;
