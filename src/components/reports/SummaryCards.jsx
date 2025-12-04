import { TrendingUp, TrendingDown, PiggyBank, Award } from 'lucide-react';

const SummaryCards = ({ summary }) => {
    if (!summary) return null;

    const cards = [
        {
            title: 'Total Income',
            value: `PKR ${summary.income.toLocaleString()}`,
            subtitle: 'This month',
            icon: TrendingUp,
            gradient: 'from-green-500 to-emerald-600',
            iconBg: 'bg-white/20'
        },
        {
            title: 'Total Expenses',
            value: `PKR ${summary.expenses.toLocaleString()}`,
            subtitle: 'This month',
            icon: TrendingDown,
            gradient: 'from-red-500 to-rose-600',
            iconBg: 'bg-white/20'
        },
        {
            title: 'Savings',
            value: `PKR ${summary.savings.toLocaleString()}`,
            subtitle: 'Income - Expenses',
            icon: PiggyBank,
            gradient: 'from-blue-500 to-cyan-600',
            iconBg: 'bg-white/20'
        },
        {
            title: 'Top Category',
            value: summary.topCategory,
            subtitle: 'Highest spending',
            icon: Award,
            gradient: 'from-purple-500 to-pink-600',
            iconBg: 'bg-white/20'
        }
    ];

    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map((card, index) => {
                const Icon = card.icon;

                return (
                    <div
                        key={index}
                        className={`group relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br ${card.gradient} p-4 sm:p-6 text-white shadow-lg transition-all hover:shadow-xl`}
                    >
                        {/* Decorative circle */}
                        <div className="absolute right-0 top-0 h-20 w-20 sm:h-24 sm:w-24 translate-x-6 -translate-y-6 rounded-full bg-white/10"></div>

                        <div className="relative">
                            <div className={`rounded-lg sm:rounded-xl ${card.iconBg} p-2 sm:p-3 w-fit backdrop-blur-sm`}>
                                <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                            </div>
                            <div className="mt-3 sm:mt-4">
                                <p className="text-xs sm:text-sm font-medium opacity-90">{card.title}</p>
                                <h3 className="mt-1 sm:mt-2 text-xl sm:text-2xl font-bold">{card.value}</h3>
                                <p className="mt-1 text-xs opacity-80">{card.subtitle}</p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default SummaryCards;
