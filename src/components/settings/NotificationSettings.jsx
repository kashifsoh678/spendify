import { useState, useEffect } from 'react';
import { Bell, Calendar, FileText, Zap } from 'lucide-react';
import toast from 'react-hot-toast';
import { getNotificationSettings, updateNotificationSettings } from '../../services/settingsService';

const NotificationSettings = () => {
    const [settings, setSettings] = useState({
        budgetAlerts: true,
        billDueAlerts: true,
        weeklyReport: false,
        aiPredictions: true
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadSettings();
    }, []);

    const loadSettings = async () => {
        try {
            const data = await getNotificationSettings();
            setSettings(data);
        } catch (error) {
            toast.error('Failed to load notification settings');
        } finally {
            setLoading(false);
        }
    };

    const handleToggle = async (key) => {
        const newSettings = { ...settings, [key]: !settings[key] };
        setSettings(newSettings); // Optimistic update

        try {
            await updateNotificationSettings(newSettings);
            toast.success('Settings updated');
        } catch (error) {
            setSettings(settings); // Revert on error
            toast.error('Failed to update settings');
        }
    };

    // if (loading) return <div className="animate-pulse h-64 bg-gray-100 dark:bg-gray-800 rounded-xl"></div>;

    const toggles = [
        {
            key: 'budgetAlerts',
            title: 'Budget Alerts',
            description: 'Get notified when you exceed your budget limits.',
            icon: <Bell className="w-5 h-5 text-purple-500" />
        },
        {
            key: 'billDueAlerts',
            title: 'Bill Due Reminders',
            description: 'Receive reminders 3 days before bills are due.',
            icon: <Calendar className="w-5 h-5 text-blue-500" />
        },
        {
            key: 'weeklyReport',
            title: 'Weekly Report',
            description: 'Receive a weekly summary of your spending via email.',
            icon: <FileText className="w-5 h-5 text-green-500" />
        },
        {
            key: 'aiPredictions',
            title: 'AI Prediction Alerts',
            description: 'Get notified about unusual spending patterns.',
            icon: <Zap className="w-5 h-5 text-yellow-500" />
        }
    ];

    return (
        <div className="bg-white dark:bg-[#1E1E2D] rounded-xl p-4 sm:p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6">Notification Preferences</h3>

            <div className="space-y-4 sm:space-y-6">
                {toggles.map((toggle) => (
                    <div key={toggle.key} className="flex items-start sm:items-center justify-between gap-3">
                        <div className="flex gap-3 sm:gap-4 flex-1 min-w-0">
                            <div className="flex-shrink-0 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg h-fit">
                                {toggle.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="text-sm font-medium text-gray-900 dark:text-white">{toggle.title}</h4>
                                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5">{toggle.description}</p>
                            </div>
                        </div>

                        <button
                            onClick={() => handleToggle(toggle.key)}
                            className={`flex-shrink-0 relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2 ${settings[toggle.key] ? 'bg-[var(--color-primary)]' : 'bg-gray-200 dark:bg-gray-700'
                                }`}
                        >
                            <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings[toggle.key] ? 'translate-x-6' : 'translate-x-1'
                                    }`}
                            />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NotificationSettings;
