import { Lightbulb, TrendingDown, AlertTriangle, Zap, Leaf } from 'lucide-react';

const SavingsSuggestions = ({ suggestions }) => {
    if (!suggestions || suggestions.length === 0) return null;

    // Helper to get icon based on title/reason content
    const getIcon = (item) => {
        const text = (item.title + item.reason).toLowerCase();
        if (text.includes('food') || text.includes('cook')) return '🍔';
        if (text.includes('transport') || text.includes('fuel')) return '🚌';
        if (text.includes('entertainment') || text.includes('movie')) return '🎬';
        if (text.includes('bill') || text.includes('payment')) return '🧾';
        if (text.includes('shop') || text.includes('buy')) return '🛍️';
        return '💡'; // Default
    };

    return (
        <div className="rounded-xl sm:rounded-2xl bg-white dark:bg-[#1E1E2D] p-4 sm:p-6 shadow-sm border border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-2 mb-6">
                <div className="p-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400">
                    <Leaf className="h-5 w-5" />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                        Smart Saving Suggestions
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        Personalized tips to save more
                    </p>
                </div>
                <span className="ml-auto flex h-6 min-w-[24px] items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30 px-2 text-xs font-bold text-emerald-700 dark:text-emerald-400">
                    {suggestions.length}
                </span>
            </div>

            <div className="space-y-3">
                {suggestions.map((suggestion, index) => (
                    <div
                        key={index}
                        className="flex items-start gap-4 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/50 bg-gradient-to-r from-emerald-50/50 to-white dark:from-emerald-900/10 dark:to-[#1E1E2D] hover:shadow-md transition-all"
                    >
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center text-xl ">
                            {getIcon(suggestion)}
                        </div>

                        <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-1">
                                {suggestion.title}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 leading-relaxed">
                                {suggestion.description}
                            </p>

                            <div className="flex items-center gap-2">
                                <TrendingDown className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wide">
                                    {suggestion.reason}
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
