import { TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';

const ForecastCard = ({ forecast }) => {
    if (!forecast) return null;

    const getRiskStyle = (risk) => {
        switch (risk) {
            case 'high':
                return {
                    bg: 'bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20',
                    border: 'border-red-200 dark:border-red-800',
                    text: 'text-red-700 dark:text-red-300',
                    badge: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
                    icon: AlertTriangle
                };
            case 'medium':
                return {
                    bg: 'bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20',
                    border: 'border-yellow-200 dark:border-yellow-800',
                    text: 'text-yellow-700 dark:text-yellow-300',
                    badge: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300',
                    icon: TrendingUp
                };
            case 'low':
                return {
                    bg: 'bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20',
                    border: 'border-green-200 dark:border-green-800',
                    text: 'text-green-700 dark:text-green-300',
                    badge: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
                    icon: TrendingDown
                };
            default:
                return {
                    bg: 'bg-white dark:bg-[#1E1E2D]',
                    border: 'border-gray-200 dark:border-gray-700',
                    text: 'text-gray-700 dark:text-gray-300',
                    badge: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
                    icon: TrendingUp
                };
        }
    };

    const style = getRiskStyle(forecast.risk);
    const Icon = style.icon;

    return (
        <div className={`rounded-xl sm:rounded-2xl ${style.bg} border ${style.border} p-4 sm:p-6 shadow-sm`}>
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        AI Spending Forecast
                    </h3>
                </div>
                <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${style.badge}`}>
                    <Icon className="h-3 w-3" />
                    {forecast.risk.toUpperCase()}
                </span>
            </div>

            <div className="flex items-center gap-4 mb-3 ">
                <div className="flex-shrink-0">
                    <div className={`text-5xl font-bold ${style.text}`}>
                        {forecast.percent > 0 ? '+' : ''}{forecast.percent}%
                    </div>
                </div>
                <div className="flex-1">
                    <p className={`text-sm font-medium ${style.text}`}>
                        {forecast.message}
                    </p>
                </div>
            </div>

            {forecast.details && (
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                    {forecast.details}
                </p>
            )}
        </div>
    );
};

export default ForecastCard;
