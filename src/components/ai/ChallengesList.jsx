import { Trophy, Clock, Target } from 'lucide-react';

const ChallengesList = ({ challenges }) => {
    if (!challenges || challenges.length === 0) return null;

    const getDifficultyStyle = (difficulty) => {
        switch (difficulty) {
            case 'Easy':
                return {
                    bg: 'bg-green-100 dark:bg-green-900/30',
                    text: 'text-green-700 dark:text-green-300'
                };
            case 'Medium':
                return {
                    bg: 'bg-yellow-100 dark:bg-yellow-900/30',
                    text: 'text-yellow-700 dark:text-yellow-300'
                };
            case 'Hard':
                return {
                    bg: 'bg-red-100 dark:bg-red-900/30',
                    text: 'text-red-700 dark:text-red-300'
                };
            default:
                return {
                    bg: 'bg-gray-100 dark:bg-gray-800',
                    text: 'text-gray-700 dark:text-gray-300'
                };
        }
    };

    return (
        <div className="rounded-xl sm:rounded-2xl bg-white dark:bg-[#1E1E2D] p-4 sm:p-6 shadow-sm ">
            <div className="flex items-center gap-2 mb-4">
                {/* <Trophy className="h-5 w-5 text-gray-700 dark:text-gray-300" /> */}
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Spending Challenges
                </h3>
                <span className="ml-auto text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">
                    {challenges.length}
                </span>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {challenges.map((challenge) => {
                    const difficultyStyle = getDifficultyStyle(challenge.difficulty);

                    return (
                        <div
                            key={challenge.id}
                            className="rounded-lg bg-gray-50 dark:bg-gray-800/50 p-4 hover:shadow-md "
                        >
                            <div className="flex items-start justify-between mb-3">
                                <div className="text-3xl">{challenge.icon}</div>
                                <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${difficultyStyle.bg} ${difficultyStyle.text}`}>
                                    {challenge.difficulty}
                                </span>
                            </div>

                            <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-2">
                                {challenge.title}
                            </h4>

                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                                {challenge.description}
                            </p>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                                        <Clock className="h-3 w-3" />
                                        <span>{challenge.duration}</span>
                                    </div>
                                    <div className="flex items-center gap-1 font-semibold text-green-600 dark:text-green-400">
                                        <Target className="h-3 w-3" />
                                        <span>PKR {challenge.expectedSave.toLocaleString()}</span>
                                    </div>
                                </div>

                                <button className="w-full rounded-lg bg-[var(--color-primary)] px-3 py-2 text-sm font-medium text-white hover:bg-[var(--color-primary-dark)] transition-colors">
                                    Accept Challenge
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ChallengesList;
