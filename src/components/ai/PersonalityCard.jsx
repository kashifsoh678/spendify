import { User, TrendingUp } from 'lucide-react';

const PersonalityCard = ({ personality }) => {
    if (!personality) return null;

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
        <div className="rounded-xl sm:rounded-2xl bg-white dark:bg-[#1E1E2D] p-4 sm:p-6 shadow-sm ">
            <div className="flex items-center gap-2 mb-4">
                {/* <User className="h-5 w-5 text-gray-700 dark:text-gray-300" /> */}
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Spending Personality
                </h3>
            </div>

            <div className="flex items-center gap-4 mb-4">
                <div className={`flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br ${gradientColor} flex items-center justify-center text-3xl`}>
                    {personality.icon}
                </div>
                <div className="flex-1">
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                        {personality.type}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        {personality.description}
                    </p>
                </div>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-[var(--color-primary)]" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {personality.topCategory}
                    </span>
                </div>
                <span className="text-lg font-bold text-[var(--color-primary)]">
                    {personality.percentage}%
                </span>
            </div>
        </div>
    );
};

export default PersonalityCard;
