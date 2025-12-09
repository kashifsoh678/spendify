import { Sparkles } from 'lucide-react';
import AIInsightCard from './AIInsightCard';

const AIInsightsList = ({ insights }) => {
    return (
        <div className="lg:col-span-2 rounded-2xl bg-white p-6 shadow-sm dark:bg-[#1E1E2D]">
            <div className="mb-6 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">AI Insights</h2>
            </div>
            {insights && insights.length > 0 ? (
                <div className="space-y-4">
                    {insights.map((insight) => (
                        <AIInsightCard key={insight.id} insight={insight} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-8">
                    <Sparkles className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                        No AI insights available yet
                    </p>
                    <p className="text-gray-400 dark:text-gray-500 text-xs mt-2">
                        Add transactions and set a budget to get personalized insights
                    </p>
                </div>
            )}
        </div>
    );
};

export default AIInsightsList;
