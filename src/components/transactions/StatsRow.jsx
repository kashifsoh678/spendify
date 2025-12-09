const StatsRow = ({ stats }) => {
    return (
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 xl:grid-cols-3 mb-6">
            {/* Total Income */}
            <div className="group relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br from-green-500 to-green-600 p-4 sm:p-6 text-white shadow-lg transition-all hover:shadow-xl">
                <div className="absolute right-0 top-0 h-20 w-20 sm:h-24 sm:w-24 translate-x-6 -translate-y-6 rounded-full bg-white/10"></div>
                <div className="relative">
                    <div className="rounded-lg sm:rounded-xl bg-white/20 p-2 sm:p-3 w-fit backdrop-blur-sm">
                        <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                    </div>
                    <div className="mt-3 sm:mt-4">
                        <p className="text-xs sm:text-sm font-medium opacity-90">Total Income</p>
                        <h3 className="mt-1 sm:mt-2 text-xl sm:text-2xl font-bold">
                            PKR {stats.totalIncome.toLocaleString()}
                        </h3>
                        <p className="mt-1 text-xs opacity-80">This Month</p>
                    </div>
                </div>
            </div>

            {/* Total Expenses */}
            <div className="group relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br from-red-500 to-red-600 p-4 sm:p-6 text-white shadow-lg transition-all hover:shadow-xl">
                <div className="absolute right-0 top-0 h-20 w-20 sm:h-24 sm:w-24 translate-x-6 -translate-y-6 rounded-full bg-white/10"></div>
                <div className="relative">
                    <div className="rounded-lg sm:rounded-xl bg-white/20 p-2 sm:p-3 w-fit backdrop-blur-sm">
                        <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                        </svg>
                    </div>
                    <div className="mt-3 sm:mt-4">
                        <p className="text-xs sm:text-sm font-medium opacity-90">Total Expenses</p>
                        <h3 className="mt-1 sm:mt-2 text-xl sm:text-2xl font-bold">
                            PKR {stats.totalExpenses.toLocaleString()}
                        </h3>
                        <p className="mt-1 text-xs opacity-80">This Month</p>
                    </div>
                </div>
            </div>

            {/* Net Balance */}
            <div className={`group relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br ${stats.netBalance >= 0 ? 'from-indigo-500 to-indigo-600' : 'from-orange-500 to-orange-600'
                } p-4 sm:p-6 text-white shadow-lg transition-all hover:shadow-xl`}>
                <div className="absolute right-0 top-0 h-20 w-20 sm:h-24 sm:w-24 translate-x-6 -translate-y-6 rounded-full bg-white/10"></div>
                <div className="relative">
                    <div className="rounded-lg sm:rounded-xl bg-white/20 p-2 sm:p-3 w-fit backdrop-blur-sm">
                        <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div className="mt-3 sm:mt-4">
                        <p className="text-xs sm:text-sm font-medium opacity-90">Net Balance</p>
                        <h3 className="mt-1 sm:mt-2 text-xl sm:text-2xl font-bold">
                            PKR {stats.netBalance.toLocaleString()}
                        </h3>
                        <p className="mt-1 text-xs opacity-80">
                            {stats.netBalance >= 0 ? 'Surplus' : 'Deficit'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatsRow;
