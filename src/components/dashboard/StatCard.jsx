const StatCard = ({ title, value, subtitle, icon: Icon, gradient, iconBg }) => {
    return (
        <div className={`group relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br ${gradient} p-4 sm:p-6 text-white shadow-lg transition-all hover:shadow-xl`}>
            <div className="absolute right-0 top-0 h-20 w-20 sm:h-24 sm:w-24 translate-x-6 -translate-y-6 rounded-full bg-white/10"></div>
            <div className="relative">
                <div className={`rounded-lg sm:rounded-xl ${iconBg} p-2 sm:p-3 w-fit backdrop-blur-sm`}>
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <div className="mt-3 sm:mt-4">
                    <p className="text-xs sm:text-sm font-medium opacity-90">{title}</p>
                    <h3 className="mt-1 sm:mt-2 text-xl sm:text-2xl font-bold">{value}</h3>
                    <p className="mt-1 text-xs opacity-80">{subtitle}</p>
                </div>
            </div>
        </div>
    );
};

export default StatCard;
