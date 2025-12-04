import { Sparkles } from 'lucide-react';
import AIInsightCard from './AIInsightCard';

const AIInsightsList = ({ insights }) => {
    return (
        <div className="lg:col-span-2 rounded-2xl bg-white p-6 shadow-sm dark:bg-[#1E1E2D]">
            <div className="mb-6 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">AI Insights</h2>
            </div>
            <div className="space-y-4">
                {insights.map((insight) => (
                    <AIInsightCard key={insight.id} insight={insight} />
                ))}
            </div>
        </div>
    );
};

export default AIInsightsList;
