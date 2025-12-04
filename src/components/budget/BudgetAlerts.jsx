import { AlertTriangle, AlertCircle, TrendingUp } from 'lucide-react';

const BudgetAlerts = ({ alerts = [], aiForecast = null }) => {
    const getAlertIcon = (type) => {
        switch (type) {
            case 'warning':
                return AlertTriangle;
            case 'danger':
                return AlertCircle;
            case 'info':
                return TrendingUp;
            default:
                return AlertTriangle;
        }
    };

    const getAlertStyle = (type) => {
        switch (type) {
            case 'warning':
                return 'bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-900/20 dark:border-yellow-800 dark:text-yellow-300';
            case 'danger':
                return 'bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-300';
            case 'info':
                return 'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-300';
            default:
                return 'bg-gray-50 border-gray-200 text-gray-800 dark:bg-gray-900/20 dark:border-gray-800 dark:text-gray-300';
        }
    };

    const hasAlerts = alerts.length > 0 || aiForecast;

    if (!hasAlerts) {
        return null;
    }

    return (
        <div>
            <div className="rounded-xl sm:rounded-2xl bg-white p-4 sm:p-6 shadow-sm dark:bg-[#1E1E2D] ">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Budget Alerts
                </h3>

                <div className="space-y-3">
                    {/* Budget Alerts */}
                    {alerts.map((alert, index) => {
                        const Icon = getAlertIcon(alert.type);
                        return (
                            <div
                                key={index}
                                className={`flex items-start gap-3 rounded-lg border p-4 ${getAlertStyle(alert.type)}`}
                            >
                                <Icon className="h-5 w-5 flex-shrink-0 mt-0.5" />
                                <div className="flex-1">
                                    <p className="text-sm font-medium">{alert.message}</p>
                                </div>
                            </div>
                        );
                    })}

                    {/* AI Forecast Alert */}
                    {aiForecast && aiForecast.prediction === 'overspend' && (
                        <div className="flex items-start gap-3 rounded-lg border p-4 bg-indigo-50 border-indigo-200 text-indigo-800 dark:bg-indigo-900/20 dark:border-indigo-800 dark:text-indigo-300">
                            <TrendingUp className="h-5 w-5 flex-shrink-0 mt-0.5" />
                            <div className="flex-1">
                                <p className="text-sm font-medium mb-2">
                                    📈 AI Forecast: {aiForecast.message}
                                </p>
                                {aiForecast.recommendations && aiForecast.recommendations.length > 0 && (
                                    <div className="mt-2">
                                        <p className="text-xs font-semibold mb-1">Recommendations:</p>
                                        <ul className="text-xs space-y-1">
                                            {aiForecast.recommendations.map((rec, idx) => (
                                                <li key={idx} className="flex items-start gap-1">
                                                    <span>•</span>
                                                    <span>{rec}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                <p className="text-xs mt-2 opacity-75">
                                    Confidence: {Math.round(aiForecast.confidence * 100)}%
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>

    );
};

export default BudgetAlerts;
