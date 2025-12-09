import { TrendingUp, AlertTriangle, CheckCircle, DollarSign } from 'lucide-react';

const AIForecastCard = ({ forecast }) => {
    if (!forecast) return null;

    // Get risk level styling
    const getRiskStyle = (riskLevel) => {
        const styles = {
            low: {
                bg: 'bg-green-50 dark:bg-green-900/20',
                border: 'border-green-200 dark:border-green-800',
                text: 'text-green-700 dark:text-green-400',
                icon: CheckCircle,
                label: 'Low Risk'
            },
            medium: {
                bg: 'bg-yellow-50 dark:bg-yellow-900/20',
                border: 'border-yellow-200 dark:border-yellow-800',
                text: 'text-yellow-700 dark:text-yellow-400',
                icon: AlertTriangle,
                label: 'Medium Risk'
            },
            high: {
                bg: 'bg-red-50 dark:bg-red-900/20',
                border: 'border-red-200 dark:border-red-800',
                text: 'text-red-700 dark:text-red-400',
                icon: AlertTriangle,
                label: 'High Risk'
            }
        };
        return styles[riskLevel] || styles.medium;
    };

    const riskStyle = getRiskStyle(forecast.riskLevel);
    const RiskIcon = riskStyle.icon;
    const isOverBudget = forecast.difference > 0;

    return (
        <div className="rounded-xl sm:rounded-2xl bg-white p-4 sm:p-6 shadow-sm dark:bg-[#1E1E2D]">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    AI Spending Forecast
                </h3>
                <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${riskStyle.bg} ${riskStyle.text} border ${riskStyle.border}`}>
                    <RiskIcon className="h-3.5 w-3.5" />
                    {riskStyle.label}
                </span>
            </div>

            {/* AI Message */}
            <div className={`rounded-lg p-4 mb-4 ${riskStyle.bg} border ${riskStyle.border}`}>
                <p className={`text-sm ${riskStyle.text}`}>
                    {forecast.message}
                </p>
            </div>

            {/* Forecast Details */}
            <div className="grid grid-cols-2 gap-4">
                {/* Predicted Expenses */}
                <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Predicted Expenses</p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                        PKR {forecast.predictedExpenses?.toLocaleString() || 0}
                    </p>
                </div>

                {/* Monthly Budget */}
                <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Monthly Budget</p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                        PKR {forecast.monthlyBudget?.toLocaleString() || 0}
                    </p>
                </div>

                {/* Daily Average */}
                <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Daily Average</p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                        PKR {forecast.dailyAverage?.toLocaleString() || 0}
                    </p>
                </div>

                {/* Difference */}
                <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                        {isOverBudget ? 'Over Budget' : 'Under Budget'}
                    </p>
                    <p className={`text-lg font-bold ${isOverBudget ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
                        PKR {Math.abs(forecast.difference || 0).toLocaleString()}
                    </p>
                </div>
            </div>

            {/* Remaining Days */}
            {forecast.remainingDays !== undefined && (
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                        {forecast.remainingDays} days remaining in this month
                    </p>
                </div>
            )}
        </div>
    );
};

export default AIForecastCard;
