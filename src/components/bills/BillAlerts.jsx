import { AlertTriangle, AlertCircle, Clock, Bell } from 'lucide-react';

const BillAlerts = ({ bills }) => {
    // Filter and categorize bills
    const overdueBills = bills.filter(b => b.status === 'pending' && b.daysLeft < 0);
    const dueTodayBills = bills.filter(b => b.status === 'pending' && b.daysLeft === 0);
    const dueSoonBills = bills.filter(b => b.status === 'pending' && b.daysLeft > 0 && b.daysLeft <= 5);

    const alerts = [];

    // Overdue bills (critical)
    overdueBills.forEach(bill => {
        alerts.push({
            type: 'danger',
            icon: AlertCircle,
            title: 'Overdue Bill',
            message: `${bill.billName} was due ${Math.abs(bill.daysLeft)} day${Math.abs(bill.daysLeft) !== 1 ? 's' : ''} ago`,
            amount: bill.amount,
            severity: 'critical'
        });
    });

    // Due today (critical)
    dueTodayBills.forEach(bill => {
        alerts.push({
            type: 'danger',
            icon: Bell,
            title: 'Due Today',
            message: `${bill.billName} payment is due today`,
            amount: bill.amount,
            severity: 'high'
        });
    });

    // Due soon (warning)
    dueSoonBills.forEach(bill => {
        const daysText = bill.daysLeft === 1 ? 'tomorrow' : `in ${bill.daysLeft} days`;
        alerts.push({
            type: bill.daysLeft <= 2 ? 'warning' : 'info',
            icon: bill.daysLeft <= 2 ? AlertTriangle : Clock,
            title: 'Upcoming Bill',
            message: `${bill.billName} is due ${daysText}`,
            amount: bill.amount,
            severity: bill.daysLeft <= 2 ? 'medium' : 'low'
        });
    });

    const getAlertStyle = (type) => {
        switch (type) {
            case 'danger':
                return {
                    bg: 'bg-red-50 dark:bg-red-900/10',
                    border: 'border-red-200 dark:border-red-800',
                    text: 'text-red-800 dark:text-red-300',
                    iconBg: 'bg-red-100 dark:bg-red-900/30',
                    iconColor: 'text-red-600 dark:text-red-400'
                };
            case 'warning':
                return {
                    bg: 'bg-orange-50 dark:bg-orange-900/10',
                    border: 'border-orange-200 dark:border-orange-800',
                    text: 'text-orange-800 dark:text-orange-300',
                    iconBg: 'bg-orange-100 dark:bg-orange-900/30',
                    iconColor: 'text-orange-600 dark:text-orange-400'
                };
            case 'info':
                return {
                    bg: 'bg-blue-50 dark:bg-blue-900/10',
                    border: 'border-blue-200 dark:border-blue-800',
                    text: 'text-blue-800 dark:text-blue-300',
                    iconBg: 'bg-blue-100 dark:bg-blue-900/30',
                    iconColor: 'text-blue-600 dark:text-blue-400'
                };
            default:
                return {
                    bg: 'bg-gray-50 dark:bg-gray-900/10',
                    border: 'border-gray-200 dark:border-gray-800',
                    text: 'text-gray-800 dark:text-gray-300',
                    iconBg: 'bg-gray-100 dark:bg-gray-900/30',
                    iconColor: 'text-gray-600 dark:text-gray-400'
                };
        }
    };

    if (alerts.length === 0) {
        return null;
    }

    return (
        <div className="rounded-xl sm:rounded-2xl bg-white p-4 sm:p-6 shadow-sm dark:bg-[#1E1E2D] mb-6">
            <div className="flex items-center gap-2 mb-4">
                {/* <Bell className="h-5 w-5 text-gray-700 dark:text-gray-300" /> */}
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Bill Alerts
                </h3>
                <span className="ml-auto text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">
                    {alerts.length}
                </span>
            </div>

            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                {alerts.map((alert, index) => {
                    const Icon = alert.icon;
                    const styles = getAlertStyle(alert.type);

                    return (
                        <div
                            key={index}
                            className={`flex items-start gap-3 rounded-lg border p-4 ${styles.bg} ${styles.border}`}
                        >
                            <div className={`flex-shrink-0 p-2 rounded-lg ${styles.iconBg}`}>
                                <Icon className={`h-4 w-4 ${styles.iconColor}`} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className={`text-xs font-semibold uppercase tracking-wide ${styles.text} opacity-75`}>
                                    {alert.title}
                                </p>
                                <p className={`text-sm font-medium ${styles.text} mt-1`}>
                                    {alert.message}
                                </p>
                                <p className={`text-xs font-semibold ${styles.text} mt-2`}>
                                    Amount: PKR {alert.amount.toLocaleString()}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default BillAlerts;
