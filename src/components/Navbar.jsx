import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ toggleSidebar }) => {
  const { user } = useAuth();

  // Get current time for greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <nav className="sticky top-0 z-30 w-full border-b border-gray-100 bg-white/80 backdrop-blur-xl dark:border-gray-800 dark:bg-[#1E1E2D]/90">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start rtl:justify-end">
            <button
              onClick={toggleSidebar}
              type="button"
              className="inline-flex items-center rounded-xl p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 lg:hidden"
            >
              <span className="sr-only">Open sidebar</span>
              <Menu className="h-6 w-6" />
            </button>

            {/* Welcome Back Message */}
            <div className="hidden lg:block ml-4">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                {getGreeting()}, <span className="text-[var(--color-primary)]">{user?.name || 'User'}</span>! 👋
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                Welcome back to your financial dashboard
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
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
                  <div className="hidden text-left lg:block">
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
