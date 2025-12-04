import { Menu, Bell, X, DollarSign, AlertCircle, TrendingUp, CheckCircle, Check } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ toggleSidebar }) => {
  const { user } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef(null);

  // Notifications state
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'warning',
      icon: AlertCircle,
      iconColor: 'text-yellow-500',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
      title: 'Budget Alert',
      message: 'You\'ve spent 85% of your Food & Dining budget',
      time: '5 min ago',
      unread: true
    },
    {
      id: 2,
      type: 'success',
      icon: CheckCircle,
      iconColor: 'text-green-500',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      title: 'Bill Paid',
      message: 'Netflix subscription payment successful',
      time: '1 hour ago',
      unread: true
    },
    {
      id: 3,
      type: 'info',
      icon: TrendingUp,
      iconColor: 'text-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      title: 'Spending Insight',
      message: 'Your spending is 20% lower than last month',
      time: '3 hours ago',
      unread: false
    },
    {
      id: 4,
      type: 'alert',
      icon: DollarSign,
      iconColor: 'text-purple-500',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      title: 'Upcoming Bill',
      message: 'Electricity bill due in 3 days',
      time: '1 day ago',
      unread: false
    }
  ]);

  const unreadCount = notifications.filter(n => n.unread).length;

  // Mark single notification as read
  const markAsRead = (id, e) => {
    e.stopPropagation();
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, unread: false } : notif
      )
    );
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, unread: false }))
    );
  };

  // Get current time for greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };

    if (showNotifications) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showNotifications]);

  return (
    <nav className="fixed top-0 z-30 w-full border-b border-gray-100 bg-white/80 backdrop-blur-xl dark:border-gray-800 dark:bg-[#1E1E2D]/90 sm:ml-72 sm:w-[calc(100%-18rem)]">
      <div className="px-4 py-3 lg:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start rtl:justify-end">
            <button
              onClick={toggleSidebar}
              type="button"
              className="inline-flex items-center rounded-xl p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 sm:hidden"
            >
              <span className="sr-only">Open sidebar</span>
              <Menu className="h-6 w-6" />
            </button>

            {/* Welcome Back Message */}
            <div className="hidden sm:block ml-4">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                {getGreeting()}, <span className="text-[var(--color-primary)]">{user?.name || 'User'}</span>! 👋
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                Welcome back to your financial dashboard
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Notification Bell */}
            <div className="relative" ref={notificationRef}>
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative rounded-xl p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 transition-colors"
              >
                <span className="sr-only">View notifications</span>
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-white dark:ring-gray-800">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-xl bg-white dark:bg-[#1E1E2D] shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50">
                  {/* Header */}
                  <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Notifications
                    </h3>
                    <div className="flex items-center gap-2">
                      {unreadCount > 0 && (
                        <button
                          onClick={markAllAsRead}
                          className="text-xs font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] transition-colors px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                          Mark all as read
                        </button>
                      )}
                      <button
                        onClick={() => setShowNotifications(false)}
                        className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      >
                        <X className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                      </button>
                    </div>
                  </div>

                  {/* Notifications List */}
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-4 border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors ${notification.unread ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''
                            }`}
                        >
                          <div className="flex gap-3">
                            <div>
                              <div className={`flex-shrink-0 p-2 rounded-lg ${notification.bgColor}`}>
                                <notification.icon className={`h-5 w-5 ${notification.iconColor}`} />
                              </div>
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                  {notification.title}
                                </p>
                                <div className="flex items-center gap-2">
                                  {notification.unread && (
                                    <>
                                      <button
                                        onClick={(e) => markAsRead(notification.id, e)}
                                        className="flex-shrink-0 p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors group"
                                        title="Mark as read"
                                      >
                                        <Check className="h-3.5 w-3.5 text-gray-400 group-hover:text-[var(--color-primary)]" />
                                      </button>
                                      <span className="flex-shrink-0 h-2 w-2 rounded-full bg-blue-500"></span>
                                    </>
                                  )}
                                </div>
                              </div>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                {notification.message}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                                {notification.time}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-8 text-center">
                        <Bell className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                        <p className="text-sm text-gray-500 dark:text-gray-400">No notifications</p>
                      </div>
                    )}
                  </div>

                  {/* Footer */}
                  {notifications.length > 0 && (
                    <div className="p-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                      <button className="w-full text-center text-sm font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] transition-colors">
                        View all notifications
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center ms-3">
              <div>
                <button
                  type="button"
                  className="flex items-center gap-3 rounded-full text-sm focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                  aria-expanded="false"
                >
                  <span className="sr-only">Open user menu</span>
                  <div className="h-9 w-9 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] flex items-center justify-center text-white font-bold shadow-md overflow-hidden">
                    {user?.avatar ? (
                      <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      user?.name?.charAt(0) || 'U'
                    )}
                  </div>
                  <div className="hidden text-left sm:block">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{user?.name || 'User'}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Pro Plan</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
