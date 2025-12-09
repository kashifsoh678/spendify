import { Pie } from 'react-chartjs-2';
import { PieChart } from 'lucide-react';

const CategoryPieChart = ({ data }) => {
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: window.innerWidth < 640 ? 'bottom' : 'right',
                labels: {
                    usePointStyle: true,
                    padding: 15,
                    font: {
                        size: 11,
                        family: 'Circular Medium, sans-serif'
                    }
                }
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                padding: 12,
                borderRadius: 8,
                callbacks: {
                    label: function (context) {
                        const label = context.label || '';
                        const value = context.parsed || 0;
                        const total = context.dataset.data.reduce((a, b) => a + b, 0);
                        const percentage = ((value / total) * 100).toFixed(1);
                        return `${label}: PKR ${value.toLocaleString()} (${percentage}%)`;
                    }
                }
            }
        }
    };

    // Check if there's no data
    const hasData = data && data.datasets && data.datasets[0] && data.datasets[0].data && data.datasets[0].data.length > 0;

    return (
        <div className="rounded-xl sm:rounded-2xl bg-white p-4 sm:p-6 shadow-sm dark:bg-[#1E1E2D]">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">Category-wise Spending</h2>
            <div className="h-64 sm:h-80">
                {hasData ? (
                    <Pie data={data} options={options} />
                ) : (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                        <PieChart className="h-16 w-16 text-gray-300 dark:text-gray-600 mb-4" />
                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                            No spending data yet
                        </p>
                        <p className="text-gray-400 dark:text-gray-500 text-xs mt-2">
                            Start adding transactions to see your category breakdown
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CategoryPieChart;
