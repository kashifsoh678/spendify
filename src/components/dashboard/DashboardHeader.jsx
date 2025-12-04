const DashboardHeader = ({ currentMonth }) => {
    return (
        <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
            <p className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">{currentMonth}</p>
        </div>
    );
};

export default DashboardHeader;
