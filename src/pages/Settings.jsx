import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { LogOut, User, Settings as SettingsIcon, Bell, Sparkles, Palette } from 'lucide-react';
import ProfileSettings from '../components/settings/ProfileSettings';
import CategorySettings from '../components/settings/CategorySettings';
import NotificationSettings from '../components/settings/NotificationSettings';
import AISettings from '../components/settings/AISettings';
import { ConfirmationModal } from '../components/common';


const Settings = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false);

    const handleLogoutClick = () => {
        setIsLogoutConfirmOpen(true);
    };

    const confirmLogout = () => {
        // Clear token/storage
        localStorage.removeItem('token');
        // Redirect to login
        window.location.href = '/login';
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
        <div className="space-y-4 sm:space-y-6 px-2 sm:px-0">
            <Toaster position="top-right" />

            {/* Header */}
            <div className="px-2 sm:px-0">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
                <p className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    Manage your profile and app preferences
                </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
                {/* Sidebar Navigation - Horizontal scroll on mobile, vertical on desktop */}
                <div className="lg:w-50 xl:w-64 shrink-0 ">
                    <div className="bg-white dark:bg-[#1E1E2D] rounded-xl shadow-sm overflow-hidden ">
                        {/* Mobile: Horizontal scrollable tabs */}
                        <nav className="lg:hidden flex overflow-x-auto p-2 gap-2 scrollbar-hide">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${activeTab === tab.id
                                        ? 'bg-[var(--color-primary)] text-white'
                                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                                        }`}
                                >
                                    {tab.icon}
                                    <span className="hidden xs:inline">{tab.label}</span>
                                </button>
                            ))}
                        </nav>

                        {/* Desktop: Vertical tabs */}
                        <nav className="hidden lg:block p-2 space-y-1 ">
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

                        <div className="p-2 border-t border-gray-100 dark:border-gray-700">
                            <button
                                onClick={handleLogoutClick}
                                className="w-full flex items-center justify-center lg:justify-start gap-3 px-4 py-2.5 lg:py-3 text-sm font-medium text-red-600 dark:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
                            >
                                <LogOut className="w-5 h-5" />
                                <span className="hidden lg:inline">Logout</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 min-w-0">
                    {renderContent()}
                </div>
            </div>

            <ConfirmationModal
                isOpen={isLogoutConfirmOpen}
                onClose={() => setIsLogoutConfirmOpen(false)}
                onConfirm={confirmLogout}
                title="Logout Confirmation"
                message="Are you sure you want to logout?"
                confirmText="Logout"
                cancelText="Cancel"
                variant="danger"
            />
        </div>
    );
};

export default Settings;
