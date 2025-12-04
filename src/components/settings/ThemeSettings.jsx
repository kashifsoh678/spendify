import { useState, useEffect } from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';

const ThemeSettings = () => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'system');

    useEffect(() => {
        const root = window.document.documentElement;

        const applyTheme = (selectedTheme) => {
            if (selectedTheme === 'dark' || (selectedTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                root.classList.add('dark');
            } else {
                root.classList.remove('dark');
            }
        };

        applyTheme(theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const options = [
        { value: 'light', label: 'Light', icon: <Sun className="w-5 h-5" /> },
        { value: 'dark', label: 'Dark', icon: <Moon className="w-5 h-5" /> },
        { value: 'system', label: 'System', icon: <Monitor className="w-5 h-5" /> }
    ];

    return (
        <div className="bg-white dark:bg-[#1E1E2D] rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Appearance</h3>

            <div className="grid grid-cols-3 gap-4">
                {options.map((option) => (
                    <button
                        key={option.value}
                        onClick={() => setTheme(option.value)}
                        className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${theme === option.value
                                ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5 text-[var(--color-primary)]'
                                : 'border-gray-100 dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600 text-gray-600 dark:text-gray-400'
                            }`}
                    >
                        <div className="mb-2">{option.icon}</div>
                        <span className="text-sm font-medium">{option.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ThemeSettings;
