import { User, TrendingUp } from 'lucide-react';

const PersonalityCard = ({ personality }) => {
    if (!personality) {
        return (
            <div className="rounded-xl sm:rounded-2xl bg-white dark:bg-[#1E1E2D] p-6 shadow-sm border border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-2 mb-4">
                    <User className="h-5 w-5 text-gray-400" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Spending Personality
                    </h3>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
                    Not enough data to detect personality. <br /> Continue using Spendify to unlock insights!
                </p>
            </div>
        );
    }

    const getPersonalityColor = (type) => {
        switch (type) {
            case 'Foodie Spender':
                return 'from-orange-500 to-red-500';
            case 'Impulsive Spender':
                return 'from-purple-500 to-pink-500';
            case 'Micro Spender':
                return 'from-blue-500 to-cyan-500';
            case 'Saver':
                return 'from-green-500 to-emerald-500';
            case 'Balanced Spender':
                return 'from-indigo-500 to-blue-500';
            default:
                return 'from-gray-500 to-gray-600';
        }
    };

    const gradientColor = getPersonalityColor(personality.type);

    return (

        <div className="rounded-xl sm:rounded-2xl bg-white dark:bg-[#1E1E2D] p-4 sm:p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
                <User className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Spending Personality
                </h3>
            </div>

            <div className="flex items-center gap-4 mb-6">
                <div className={`flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br ${gradientColor} flex items-center justify-center text-3xl shadow-md`}>
                    {personality.icon || '👤'}
                </div>
                <div className="flex-1">
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                        {personality.type}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                        {personality.description}
                    </p>
                </div>
            </div>

            <div className="space-y-4">
                {/* Reason & Advice */}
                <div className="grid gap-3 sm:grid-cols-2">
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/10 rounded-lg border border-blue-100 dark:border-blue-800/30">
                        <p className="text-xs font-semibold text-blue-800 dark:text-blue-300 mb-1 uppercase tracking-wide">
                            Why?
                        </p>
                        <p className="text-sm text-blue-900 dark:text-blue-100">
                            {personality.reason}
                        </p>
                    </div>
                    <div className="p-3 bg-amber-50 dark:bg-amber-900/10 rounded-lg border border-amber-100 dark:border-amber-800/30">
                        <p className="text-xs font-semibold text-amber-800 dark:text-amber-300 mb-1 uppercase tracking-wide">
                            Tip for you
                        </p>
                        <p className="text-sm text-amber-900 dark:text-amber-100">
                            {personality.advice}
                        </p>
                    </div>
                </div>

                {/* Top Categories */}
                {personality.topCategories && personality.topCategories.length > 0 && (
                    <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3 ml-1">
                            TOP SPENDING CATEGORIES
                        </p>
                        <div className="space-y-3">
                            {personality.topCategories.map((cat, idx) => (
                                <div key={idx} className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <TrendingUp className="h-4 w-4 text-gray-400" />
                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            {cat.category}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3 w-32 sm:w-40 md:w-1/2">
                                        <div className="flex-1 h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-[var(--color-primary)] rounded-full"
                                                style={{ width: `${cat.percentage}%` }}
                                            />
                                        </div>
                                        <span className="text-xs font-bold text-gray-600 dark:text-gray-400 w-8 text-right shrink-0">
                                            {cat.percentage}%
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PersonalityCard;
