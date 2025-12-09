import { Smile, Clock } from 'lucide-react';

const MoodAnalysisCard = ({ moodInsights }) => {
    // Check if data exists (must have topMood to be valid)
    if (!moodInsights || !moodInsights.topMood) {
        return (
            <div className="rounded-xl sm:rounded-2xl bg-white dark:bg-[#1E1E2D] p-6 shadow-sm border border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-2 mb-4">
                    <Smile className="h-5 w-5 text-gray-400" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Mood-Based Spending
                    </h3>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
                    No mood data available yet. <br /> Tag your transactions with moods to see insights!
                </p>
            </div>
        );
    }

    return (
        <div className="rounded-xl sm:rounded-2xl bg-white dark:bg-[#1E1E2D] p-4 sm:p-6 shadow-sm ">
            <div className="flex items-center gap-2 mb-4">
                {/* <Smile className="h-5 w-5 text-gray-700 dark:text-gray-300" /> */}
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Mood-Based Spending
                </h3>
            </div>

            <div className="mb-4 p-4 rounded-lg bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-800">
                <div className="flex items-center gap-3 mb-2">
                    <span className="text-4xl">{moodInsights.topMood}</span>
                    <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                            Most Common Mood
                        </p>
                        <p className="text-lg font-bold text-gray-900 dark:text-white capitalize">
                            {moodInsights.moodLabel}
                        </p>
                    </div>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                    {moodInsights.description}
                </p>
            </div>

            {moodInsights.patterns && moodInsights.patterns.length > 0 && (
                <div className="space-y-2 mb-4">
                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Spending Patterns
                    </p>
                    {moodInsights.patterns.map((pattern, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50"
                        >
                            <div className="flex items-center gap-3">
                                <span className="text-2xl">{pattern.mood}</span>
                                <div>
                                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                        {pattern.label}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                        {pattern.category}
                                    </p>
                                </div>
                            </div>
                            <span className="text-sm font-bold text-[var(--color-primary)]">
                                {pattern.percentage}%
                            </span>
                        </div>
                    ))}
                </div>
            )}

            {moodInsights.peakHours && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
                    <Clock className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                    <p className="text-sm text-amber-700 dark:text-amber-300">
                        <span className="font-semibold">Peak spending hours:</span> {moodInsights.peakHours}
                    </p>
                </div>
            )}
        </div>
    );
};

export default MoodAnalysisCard;
