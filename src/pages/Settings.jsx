import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { LogOut, User, Settings as SettingsIcon, Bell, Sparkles, Palette } from 'lucide-react';
import ProfileSettings from '../components/settings/ProfileSettings';
import CategorySettings from '../components/settings/CategorySettings';
import NotificationSettings from '../components/settings/NotificationSettings';
import AISettings from '../components/settings/AISettings';


const Settings = () => {
    const [activeTab, setActiveTab] = useState('profile');

    const handleLogout = () => {
        if (window.confirm('Are you sure you want to logout?')) {
            // Clear token/storage
            localStorage.removeItem('token');
            // Redirect to login
            window.location.href = '/login';
        }
    };

    const tabs = [
        { id: 'profile', label: 'Profile', icon: <User className="w-5 h-5" /> },
        { id: 'categories', label: 'Categories', icon: <SettingsIcon className="w-5 h-5" /> },
        { id: 'notifications', label: 'Notifications', icon: <Bell className="w-5 h-5" /> },
        { id: 'ai', label: 'AI Preferences', icon: <Sparkles className="w-5 h-5" /> },

    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'profile': return <ProfileSettings />;
            case 'categories': return <CategorySettings />;
            case 'notifications': return <NotificationSettings />;
            case 'ai': return <AISettings />;

            default: return <ProfileSettings />;
        }
    };

    return (
        <div className="space-y-6">
            <Toaster position="top-right" />

            {/* Header */}
            <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
                <p className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    Manage your profile and app preferences
                </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                {/* Sidebar Navigation */}
                <div className="lg:w-64 flex-shrink-0">
                    <div className="bg-white dark:bg-[#1E1E2D] rounded-xl shadow-sm overflow-hidden">
                        <nav className="p-2 space-y-1">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${activeTab === tab.id
                                        ? 'bg-[var(--color-primary)] text-white'
                                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                                        }`}
                                >
                                    {tab.icon}
                                    {tab.label}
                                </button>
                            ))}
                        </nav>

                        <div className="p-2 border-t border-gray-100 dark:border-gray-700 mt-2">
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 dark:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
                            >
                                <LogOut className="w-5 h-5" />
                                Logout
                            </button>
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default Settings;
