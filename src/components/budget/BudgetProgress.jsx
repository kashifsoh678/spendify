const BudgetProgress = ({ percentUsed }) => {
    // Determine color based on percentage
    const getColor = () => {
        if (percentUsed < 50) return { stroke: '#10b981', text: 'text-green-600' }; // Green
        if (percentUsed < 85) return { stroke: '#f59e0b', text: 'text-yellow-600' }; // Yellow
        return { stroke: '#ef4444', text: 'text-red-600' }; // Red
    };

    const { stroke, text } = getColor();
    const radius = 70;
    const circumference = 2 * Math.PI * radius;

    // Cap display percentage at 100% for visual purposes
    const displayPercentage = Math.min(percentUsed, 100);
    const strokeDashoffset = circumference - (displayPercentage / 100) * circumference;

    // Check if over budget
    const isOverBudget = percentUsed > 100;
    const overBudgetAmount = percentUsed - 100;

    return (
        <div className="rounded-xl sm:rounded-2xl bg-white p-4 sm:p-6 lg:p-8 shadow-sm dark:bg-[#1E1E2D]">

            <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6 text-center">
                Budget Progress
            </h3>

            <div className="flex items-center justify-center">
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64">
                    <svg className="transform -rotate-90 w-full h-full">
                        {/* Background circle */}
                        <circle
                            cx="50%"
                            cy="50%"
                            r={radius}
                            stroke="#e5e7eb"
                            strokeWidth="10"
                            fill="none"
                            className="dark:stroke-gray-700"
                        />
                        {/* Progress circle */}
                        <circle
                            cx="50%"
                            cy="50%"
                            r={radius}
                            stroke={stroke}
                            strokeWidth="10"
                            fill="none"
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeDashoffset}
                            strokeLinecap="round"
                            className="transition-all duration-1000 ease-out"
                        />
                    </svg>

                    {/* Center text */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        {isOverBudget ? (
                            <>
                                <span className={`text-2xl sm:text-3xl lg:text-4xl font-bold ${text}`}>
                                    100%
                                </span>
                                <span className="text-xs sm:text-sm text-red-600 dark:text-red-400 mt-1 font-semibold">
                                    +{Math.round(overBudgetAmount)}% Over
                                </span>
                            </>
                        ) : (
                            <span className={`text-2xl sm:text-3xl lg:text-4xl font-bold ${text}`}>
                                {Math.round(percentUsed)}%
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Legend */}
            <div className="mt-4 sm:mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-gray-600 dark:text-gray-400">0-50%</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <span className="text-gray-600 dark:text-gray-400">50-85%</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <span className="text-gray-600 dark:text-gray-400">85%+</span>
                </div>
            </div>
        </div>
    );
};

export default BudgetProgress;
