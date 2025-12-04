import { useState, useEffect } from 'react';
import { Brain, Sparkles, Target, Trophy } from 'lucide-react';
import toast from 'react-hot-toast';
import { getAISettings, updateAISettings } from '../../services/settingsService';

const AISettings = () => {
    const [settings, setSettings] = useState({
        forecast: true,
        personality: true,
        suggestions: true,
        challenges: false
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadSettings();
    }, []);

    const loadSettings = async () => {
        try {
            const data = await getAISettings();
            setSettings(data);
        } catch (error) {
            toast.error('Failed to load AI settings');
        } finally {
            setLoading(false);
        }
    };

    const handleToggle = async (key) => {
        const newSettings = { ...settings, [key]: !settings[key] };
        setSettings(newSettings); // Optimistic update

        try {
            await updateAISettings(newSettings);
            toast.success('Settings updated');
        } catch (error) {
            setSettings(settings); // Revert on error
            toast.error('Failed to update settings');
        }
    };

    // if (loading) return <div className="animate-pulse h-64 bg-gray-100 dark:bg-gray-800 rounded-xl"></div>;

    const toggles = [
        {
            key: 'forecast',
            title: 'AI Spending Forecast',
            description: 'Enable predictive analysis for future spending.',
            icon: <Brain className="w-5 h-5 text-purple-500" />
        },
        {
            key: 'personality',
            title: 'Personality Insights',
            description: 'Analyze your financial personality type.',
            icon: <Sparkles className="w-5 h-5 text-pink-500" />
        },
        {
            key: 'suggestions',
            title: 'Smart Suggestions',
            description: 'Get personalized savings tips and advice.',
            icon: <Target className="w-5 h-5 text-blue-500" />
        },
        {
            key: 'challenges',
            title: 'Gamified Challenges',
            description: 'Participate in savings challenges.',
            icon: <Trophy className="w-5 h-5 text-yellow-500" />
        }
    ];

    return (
        <div className="bg-white dark:bg-[#1E1E2D] rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">AI Preferences</h3>

            <div className="space-y-6">
                {toggles.map((toggle) => (
                    <div key={toggle.key} className="flex items-center justify-between">
                        <div className="flex gap-4">
                            <div className="mt-1 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg h-fit">
                                {toggle.icon}
                            </div>
                            <div>
                                <h4 className="text-sm font-medium text-gray-900 dark:text-white">{toggle.title}</h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{toggle.description}</p>
                            </div>
                        </div>

                        <button
                            onClick={() => handleToggle(toggle.key)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2 ${settings[toggle.key] ? 'bg-[var(--color-primary)]' : 'bg-gray-200 dark:bg-gray-700'
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

export default AISettings;
