const BudgetProgress = ({ monthlyBudget, totalExpenses }) => {
    const remainingBudget = monthlyBudget - totalExpenses;
    const budgetUsedPercentage = (totalExpenses / monthlyBudget) * 100;

    const getBudgetStatus = () => {
        if (budgetUsedPercentage < 50) return { color: 'text-green-600', bg: 'bg-green-500', label: 'Healthy' };
        if (budgetUsedPercentage < 85) return { color: 'text-yellow-600', bg: 'bg-yellow-500', label: 'Moderate' };
        return { color: 'text-red-600', bg: 'bg-red-500', label: 'Critical' };
    };

    const budgetStatus = getBudgetStatus();

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
