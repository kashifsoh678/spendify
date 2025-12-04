import { Bell } from 'lucide-react';

const AlertsList = ({ alerts }) => {
    return (
        <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-[#1E1E2D]">
            <div className="mb-6 flex items-center gap-2">
                <Bell className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Alerts</h2>
            </div>
            <div className="space-y-3">
                {alerts.map((alert) => {
                    const Icon = alert.icon;
                    return (
                        <div
                            key={alert.id}
                            className={`rounded-xl p-3 transition-all hover:shadow-sm ${alert.bgColor}`}
                        >
                            <div className="flex items-start gap-3">
                                <Icon className={`h-5 w-5 mt-0.5 ${alert.color}`} />
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm text-gray-700 dark:text-gray-300">{alert.message}</p>
                                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{alert.time}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default AlertsList;
