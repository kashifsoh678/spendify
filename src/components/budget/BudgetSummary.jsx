import { Wallet, TrendingDown, TrendingUp, Percent } from 'lucide-react';

const BudgetSummary = ({ budgetData }) => {
    // Handle both budgetData.budget and direct budgetData structures
    const data = budgetData?.budget || budgetData || {};
    const { monthlyBudget = 0, spentSoFar = 0, remaining = 0, percentageUsed = 0, percentUsed = 0 } = data;
    const actualPercentUsed = percentageUsed || percentUsed;

    const stats = [
        {
            title: 'Monthly Budget',
            value: `PKR ${monthlyBudget.toLocaleString()}`,
            subtitle: 'Total allocated',
            icon: Wallet,
            gradient: 'from-blue-500 to-blue-600',
            iconBg: 'bg-white/20'
        },
        {
            title: 'Spent So Far',
            value: `PKR ${spentSoFar.toLocaleString()}`,
            subtitle: 'This month',
            icon: TrendingDown,
            gradient: 'from-red-500 to-red-600',
            iconBg: 'bg-white/20'
        },
        {
            title: 'Remaining Budget',
            value: `PKR ${remaining.toLocaleString()}`,
            subtitle: remaining >= 0 ? 'Available' : 'Over budget',
            icon: TrendingUp,
            gradient: remaining >= 0 ? 'from-green-500 to-green-600' : 'from-orange-500 to-orange-600',
            iconBg: 'bg-white/20'
        },
        {
            title: 'Percentage Used',
            value: `${Math.round(actualPercentUsed)}%`,
            subtitle: 'Of total budget',
            icon: Percent,
            gradient: 'from-purple-500 to-purple-600',
            iconBg: 'bg-white/20'
        }
    ];

    return (
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
            {stats.map((stat, index) => (
                <div
                    key={index}
                    className={`group relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br ${stat.gradient} p-4 sm:p-6 text-white shadow-lg transition-all hover:shadow-xl`}
                >
                    <div className="absolute right-0 top-0 h-20 w-20 sm:h-24 sm:w-24 translate-x-6 -translate-y-6 rounded-full bg-white/10"></div>
                    <div className="relative">
                        <div className={`rounded-lg sm:rounded-xl ${stat.iconBg} p-2 sm:p-3 w-fit backdrop-blur-sm`}>
                            <stat.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                        </div>
                        <div className="mt-3 sm:mt-4">
                            <p className="text-xs sm:text-sm font-medium opacity-90">{stat.title}</p>
                            <h3 className="mt-1 sm:mt-2 text-xl sm:text-2xl font-bold">{stat.value}</h3>
                            <p className="mt-1 text-xs opacity-80">{stat.subtitle}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default BudgetSummary;
