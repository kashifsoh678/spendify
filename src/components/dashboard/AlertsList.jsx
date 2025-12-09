import { Bell, AlertCircle, Calendar, TrendingUp, Target, DollarSign } from 'lucide-react';

// Map alert type to icon
const getAlertIcon = (type) => {
    const iconMap = {
        'budget': DollarSign,
        'bill': Calendar,
        'trend': TrendingUp,
        'goal': Target,
    };
    return iconMap[type] || AlertCircle;
};

// Map severity to colors
const getSeverityColors = (severity) => {
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

const AlertsList = ({ alerts }) => {
    return (
        <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-[#1E1E2D]">
            <div className="mb-6 flex items-center gap-2">
                <Bell className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Alerts</h2>
            </div>
            {alerts && alerts.length > 0 ? (
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
                </div>
            ) : (
                <div className="text-center py-8">
                    <Bell className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                        No alerts at the moment
                    </p>
                    <p className="text-gray-400 dark:text-gray-500 text-xs mt-2">
                        You'll see budget and bill alerts here
                    </p>
                </div>
            )}
        </div>
    );
};

export default AlertsList;
