import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Receipt, Wallet, FileText, Bot, BarChart3, LogOut, ChevronRight, Settings } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { logout } = useAuth();

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Receipt, label: 'Transactions', path: '/transactions' },
    { icon: Wallet, label: 'Budget', path: '/budget' },
    { icon: FileText, label: 'Bills', path: '/bills' },
    { icon: Bot, label: 'AI Insights', path: '/ai' },
    { icon: BarChart3, label: 'Reports', path: '/reports' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <>

      {/* Mobile overlay - only show on mobile when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-gray-900/50 backdrop-blur-sm lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      <aside
        className={`fixed left-0 top-0 h-screen  w-60 border-r border-gray-100 bg-white/80 backdrop-blur-xl transition-transform duration-300 dark:border-gray-800 dark:bg-[#1E1E2D]/90 lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'
          } sidebar-container`}
      >
        <div className="flex h-full flex-col px-4 py-6">
          <div className="mb-8 flex items-center px-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-primary)] text-white shadow-lg shadow-indigo-500/30">
              <Wallet className="h-6 w-6" />
            </div>
            <span className="ml-3 text-2xl font-bold tracking-tight text-[var(--color-text-main)] dark:text-white">Spendify</span>
          </div>

          <div className="mb-4 px-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
            Menu
          </div>

          <ul className="space-y-1.5 font-medium flex-1">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `group flex items-center justify-between rounded-xl px-3 py-2.5 transition-all duration-200 ${isActive
                      ? 'bg-[var(--color-primary)] text-white shadow-[var(--shadow-glow)]'
                      : 'text-[var(--color-text-muted)] hover:bg-gray-50 hover:text-[var(--color-primary)] dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <div className="flex items-center">
                        <item.icon className={`h-5 w-5 flex-shrink-0 transition-colors ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-[var(--color-primary)] dark:text-gray-500 dark:group-hover:text-white'}`} />
                        <span className="ml-3">{item.label}</span>
                      </div>
                      {isActive && <ChevronRight className="h-4 w-4 text-white/70" />}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="mt-auto border-t border-gray-100 pt-6 dark:border-gray-800">
            <button
              onClick={logout}
              className="group flex w-full items-center rounded-xl px-3 py-2.5 text-[var(--color-text-muted)] transition-all hover:bg-red-50 hover:text-red-600 dark:text-gray-400 dark:hover:bg-red-900/20 dark:hover:text-red-400"
            >
              <LogOut className="h-5 w-5 flex-shrink-0 text-gray-400 transition-colors group-hover:text-red-600 dark:text-gray-500 dark:group-hover:text-red-400" />
              <span className="ml-3 font-medium">Sign Out</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
