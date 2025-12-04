import { Line } from 'react-chartjs-2';

const MonthlyLineChart = ({ data }) => {
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                padding: 12,
                borderRadius: 8,
                callbacks: {
                    label: function (context) {
                        return 'PKR ' + context.parsed.y.toLocaleString();
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(0, 0, 0, 0.05)',
                },
                ticks: {
                    callback: function (value) {
                        return 'PKR ' + value.toLocaleString();
                    }
                }
            },
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    maxTicksLimit: 10
                }
            }
        }
    };

    return (
        <div className="rounded-xl sm:rounded-2xl bg-white p-4 sm:p-6 shadow-sm dark:bg-[#1E1E2D]">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">Monthly Spending Trend</h2>
            <div className="h-64 sm:h-80">
                <Line data={data} options={options} />
            </div>
        </div>
    );
};

export default MonthlyLineChart;
