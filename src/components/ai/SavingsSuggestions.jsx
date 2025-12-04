import { Lightbulb, TrendingDown } from 'lucide-react';

const SavingsSuggestions = ({ suggestions }) => {
    if (!suggestions || suggestions.length === 0) return null;

    return (
        <div className="rounded-xl sm:rounded-2xl bg-white dark:bg-[#1E1E2D] p-4 sm:p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
                {/* <Lightbulb className="h-5 w-5 text-gray-700 dark:text-gray-300" /> */}
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Smart Saving Suggestions
                </h3>
                <span className="ml-auto text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">
                    {suggestions.length}
                </span>
            </div>

            <div className="space-y-3">
                {suggestions.map((suggestion) => (
                    <div
                        key={suggestion.id}
                        className="flex items-start gap-3 p-4 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10 border border-green-200 dark:border-green-800"
                    >
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center text-xl border border-green-200 dark:border-green-700">
                            {suggestion.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                                {suggestion.text}
                            </p>
                            <div className="flex items-center gap-2">
                                <TrendingDown className="h-3 w-3 text-green-600 dark:text-green-400" />
                                <span className="text-xs font-semibold text-green-700 dark:text-green-300">
                                    Save PKR {suggestion.potentialSavings.toLocaleString()}
                                </span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                    • {suggestion.category}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SavingsSuggestions;
