import { TrendingUp, TrendingDown, AlertTriangle, Calendar, Wallet, DollarSign } from 'lucide-react';

const ForecastCard = ({ forecast }) => {
    // Return placeholder if no forecast data
    if (!forecast) {
        return (
            <div className="rounded-xl sm:rounded-2xl bg-white p-6 shadow-sm dark:bg-[#1E1E2D]">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    AI Spending Forecast
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    No forecast data available. Set a budget and add transactions to see predictions.
                </p>
            </div>
        );
    }

    const {
        riskLevel = 'low',
        message,
        predictedExpenses = 0,
        monthlyBudget = 0,
        difference = 0,
        remainingDays
    } = forecast;

    const isOverBudget = difference > 0;
    const percentageUsed = monthlyBudget > 0 ? (predictedExpenses / monthlyBudget) * 100 : 0;

    const getRiskStyle = (risk) => {
        const level = (risk || 'low').toLowerCase();
        switch (level) {
            case 'high':
                return {
                    bg: 'bg-red-50 dark:bg-red-900/20',
                    border: 'border-red-100 dark:border-red-800',
                    text: 'text-red-700 dark:text-red-400',
                    badge: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
                    icon: AlertTriangle
                };
            case 'medium':
                return {
                    bg: 'bg-yellow-50 dark:bg-yellow-900/20',
                    border: 'border-yellow-100 dark:border-yellow-800',
                    text: 'text-yellow-700 dark:text-yellow-400',
                    badge: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300',
                    icon: TrendingUp
                };
            case 'low':
            default:
                return {
                    bg: 'bg-green-50 dark:bg-green-900/20',
                    border: 'border-green-100 dark:border-green-800',
                    text: 'text-green-700 dark:text-green-400',
                    badge: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
                    icon: TrendingDown
                };
        }
    };

    const style = getRiskStyle(riskLevel);
    const Icon = style.icon;

    return (
        <div className={`rounded-xl sm:rounded-2xl bg-white dark:bg-[#1E1E2D] border border-gray-100 dark:border-gray-800 p-4 sm:p-6 shadow-sm`}>
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                        AI Spending Forecast
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        End-of-month prediction
                    </p>
                </div>
                <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${style.badge}`}>
                    <Icon className="h-3.5 w-3.5" />
                    {riskLevel.toUpperCase()} RISK
                </span>
            </div>

            {/* Main Message */}
            <div className={`p-4 rounded-xl ${style.bg} border ${style.border} mb-6`}>
                <p className={`text-sm font-medium ${style.text}`}>
                    "{message}"
                </p>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 flex items-center gap-1">
                        <Wallet className="h-3 w-3" /> Predicted Spend
                    </p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                        PKR {predictedExpenses.toLocaleString()}
                    </p>
                </div>

                <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 flex items-center gap-1">
                        <DollarSign className="h-3 w-3" /> Monthly Budget
                    </p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                        PKR {monthlyBudget.toLocaleString()}
                    </p>
                </div>

                <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                        {isOverBudget ? 'Projected Over' : 'Projected Under'}
                    </p>
                    <p className={`text-lg font-bold ${isOverBudget ? 'text-red-600' : 'text-green-600'}`}>
                        PKR {Math.abs(difference).toLocaleString()}
                    </p>
                </div>

                {remainingDays !== undefined && (
                    <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 flex items-center gap-1">
                            <Calendar className="h-3 w-3" /> Days Left
                        </p>
                        <p className="text-lg font-bold text-gray-900 dark:text-white">
                            {remainingDays} days
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ForecastCard;
