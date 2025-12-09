import { Bell, AlertCircle, Calendar, TrendingUp, Target, DollarSign } from 'lucide-react';

// Map alert type to icon
const getAlertIcon = (type) => {
    const iconMap = {
        'budget': DollarSign,
        'bill': Calendar,
        'trend': TrendingUp,
        'goal': Target,
        'warning': AlertCircle,
        'danger': AlertCircle,
        'info': TrendingUp,
    };
    return iconMap[type] || AlertCircle;
};

// Map severity to colors (supports both new API format and old format)
const getSeverityColors = (severity, type) => {
    // New API format (severity: high/medium/low/critical)
    if (severity) {
        const colorMap = {
            'high': {
                color: 'text-red-600',
                bgColor: 'bg-red-50 dark:bg-red-900/20'
            },
            'medium': {
                color: 'text-amber-600',
                bgColor: 'bg-amber-50 dark:bg-amber-900/20'
            },
            'low': {
                color: 'text-blue-600',
                bgColor: 'bg-blue-50 dark:bg-blue-900/20'
            },
            'critical': {
                color: 'text-red-700',
                bgColor: 'bg-red-100 dark:bg-red-900/30'
            },
        };
        return colorMap[severity] || colorMap['low'];
    }

    // Old format fallback (type: warning/danger/info)
    const typeColorMap = {
        'warning': {
            color: 'text-amber-600',
            bgColor: 'bg-amber-50 dark:bg-amber-900/20'
        },
        'danger': {
            color: 'text-red-600',
            bgColor: 'bg-red-50 dark:bg-red-900/20'
        },
        'info': {
            color: 'text-blue-600',
            bgColor: 'bg-blue-50 dark:bg-blue-900/20'
        },
    };
    return typeColorMap[type] || typeColorMap['info'];
};

// Format timestamp
const formatTime = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins} mins ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
};

const BudgetAlerts = ({ alerts = [], aiForecast = null }) => {
    const hasAlerts = alerts.length > 0 || aiForecast;

    if (!hasAlerts) {
        return null;
    }

    return (
        <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-[#1E1E2D]">
            <div className="mb-6 flex items-center gap-2">
                <Bell className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Budget Alerts</h2>
            </div>
            <div className="space-y-3">
                {alerts.map((alert, index) => {
                    const Icon = alert.icon || getAlertIcon(alert.type);
                    const colors = getSeverityColors(alert.severity, alert.type);
                    const color = alert.color || colors.color;
                    const bgColor = alert.bgColor || colors.bgColor;
                    const time = alert.time || formatTime(alert.createdAt);

                    return (
                        <div
                            key={alert._id || alert.id || index}
                            className={`rounded-xl p-3 transition-all hover:shadow-sm ${bgColor}`}
                        >
                            <div className="flex items-start gap-3">
                                <Icon className={`h-5 w-5 mt-0.5 ${color}`} />
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm text-gray-700 dark:text-gray-300">{alert.message}</p>
                                    {time && <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{time}</p>}
                                </div>
                            </div>
                        </div>
                    );
                })}

                {/* AI Forecast Alert */}
                {aiForecast && aiForecast.prediction === 'overspend' && (
                    <div className="rounded-xl p-3 transition-all hover:shadow-sm bg-indigo-50 dark:bg-indigo-900/20">
                        <div className="flex items-start gap-3">
                            <TrendingUp className="h-5 w-5 mt-0.5 text-indigo-600" />
                            <div className="flex-1 min-w-0">
                                <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                                    📈 AI Forecast: {aiForecast.message}
                                </p>
                                {aiForecast.recommendations && aiForecast.recommendations.length > 0 && (
                                    <div className="mt-2">
                                        <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Recommendations:</p>
                                        <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                                            {aiForecast.recommendations.map((rec, idx) => (
                                                <li key={idx} className="flex items-start gap-1">
                                                    <span>•</span>
                                                    <span>{rec}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                <p className="text-xs mt-2 text-gray-500 dark:text-gray-400">
                                    Confidence: {Math.round(aiForecast.confidence * 100)}%
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BudgetAlerts;
