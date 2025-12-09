import { useState, useEffect } from 'react';
import { Brain } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import ForecastCard from '../components/ai/ForecastCard';
import PersonalityCard from '../components/ai/PersonalityCard';
import MoodAnalysisCard from '../components/ai/MoodAnalysisCard';
import SavingsSuggestions from '../components/ai/SavingsSuggestions';
import ChallengesList from '../components/ai/ChallengesList';
import { getAllAIInsights } from '../services/aiService';

const AIInsights = () => {
    const [forecast, setForecast] = useState(null);
    const [personality, setPersonality] = useState(null);
    const [moodInsights, setMoodInsights] = useState(null);
    const [suggestions, setSuggestions] = useState([]);
    const [challenges, setChallenges] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch all AI insights
    const fetchAIInsights = async () => {
        setLoading(true);
        try {
            const data = await getAllAIInsights();
            setForecast(data.forecast);
            setPersonality(data.personality);
            setMoodInsights(data.moodInsights);
            setSuggestions(data.suggestions);
            setChallenges(data.challenges);
        } catch (error) {
            console.error('Error fetching AI insights:', error);
            toast.error('Failed to load AI insights');
        } finally {
            setLoading(false);
        }
    };

    // Initial load
    useEffect(() => {
        fetchAIInsights();
    }, []);

    return (
        <div className="space-y-6">
            <Toaster position="top-right" />

            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-2">
                        {/* <Brain className="h-8 w-8 text-[var(--color-primary)]" /> */}
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                            AI Insights
                        </h1>
                    </div>
                    <p className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                        Smart financial insights powered by Spendify AI
                    </p>
                </div>
            </div>

            {/* Forecast & Personality Row */}
            <div className="grid gap-6 md:grid-cols-2 ">
                <ForecastCard forecast={forecast} />
                <PersonalityCard personality={personality} />
            </div>

            {/* Mood Analysis & Savings Suggestions Row */}
            <div className="grid gap-6 xl:grid-cols-2">
                <SavingsSuggestions suggestions={suggestions} />
                <div>
                    <MoodAnalysisCard moodInsights={moodInsights} />
                </div>
            </div>

            {/* Challenges */}
            <ChallengesList challenges={challenges} />
        </div>
    );
};

export default AIInsights;
