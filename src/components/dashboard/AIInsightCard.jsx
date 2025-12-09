import { AlertCircle, Sparkles, PiggyBank, TrendingUp, Info } from 'lucide-react';

// Map insight type to icon
const getInsightIcon = (type) => {
    const iconMap = {
        'forecast': AlertCircle,
        'personality': Sparkles,
        'suggestion': PiggyBank,
        'trend': TrendingUp,
    };
    return iconMap[type] || Info;
};

// Map severity to colors
const getSeverityColors = (severity) => {
    const colorMap = {
        'high': {
            color: 'text-red-600',
            bgColor: 'bg-red-50 dark:bg-red-900/20',
            borderColor: 'border-red-200 dark:border-red-800'
        },
        'medium': {
            color: 'text-amber-600',
            bgColor: 'bg-amber-50 dark:bg-amber-900/20',
            borderColor: 'border-amber-200 dark:border-amber-800'
        },
        'low': {
            color: 'text-green-600',
            bgColor: 'bg-green-50 dark:bg-green-900/20',
            borderColor: 'border-green-200 dark:border-green-800'
        },
        'info': {
            color: 'text-purple-600',
            bgColor: 'bg-purple-50 dark:bg-purple-900/20',
            borderColor: 'border-purple-200 dark:border-purple-800'
        },
    };
    return colorMap[severity] || colorMap['info'];
};

const AIInsightCard = ({ insight }) => {
    const Icon = insight.icon || getInsightIcon(insight.type);
    const colors = getSeverityColors(insight.severity);

    // Use provided colors or fallback to severity-based colors
    const color = insight.color || colors.color;
    const bgColor = insight.bgColor || colors.bgColor;
    const borderColor = insight.borderColor || colors.borderColor;

    return (
        <div
            className={`rounded-xl border p-4 transition-all hover:shadow-md ${bgColor} ${borderColor}`}
        >
            <div className="flex items-start gap-3">
                <div className={`rounded-lg p-2 ${color}`}>
                    <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                    <h3 className={`font-semibold ${color}`}>{insight.title}</h3>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{insight.message}</p>
                </div>
            </div>
        </div>
    );
};

export default AIInsightCard;
