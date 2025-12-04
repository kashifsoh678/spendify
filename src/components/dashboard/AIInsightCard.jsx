const AIInsightCard = ({ insight }) => {
    const Icon = insight.icon;

    return (
        <div
            className={`rounded-xl border p-4 transition-all hover:shadow-md ${insight.bgColor} ${insight.borderColor}`}
        >
            <div className="flex items-start gap-3">
                <div className={`rounded-lg p-2 ${insight.color}`}>
                    <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                    <h3 className={`font-semibold ${insight.color}`}>{insight.title}</h3>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{insight.message}</p>
                </div>
            </div>
        </div>
    );
};

export default AIInsightCard;
