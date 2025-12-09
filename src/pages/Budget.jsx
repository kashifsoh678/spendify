import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import BudgetForm from '../components/budget/BudgetForm';
import BudgetSummary from '../components/budget/BudgetSummary';
import BudgetProgress from '../components/budget/BudgetProgress';
import BudgetAlerts from '../components/budget/BudgetAlerts';
import ForecastCard from '../components/ai/ForecastCard';
import { useBudget } from '../context/BudgetContext';

const Budget = () => {
    const { budget, budgetStatus, alerts, aiForecast, loading, setBudget: updateBudget } = useBudget();
    const [saving, setSaving] = useState(false);

    // Handle budget save/update
    const handleSaveBudget = async (amount) => {
        setSaving(true);
        try {
            await updateBudget(amount);
            toast.success('Budget updated successfully!');
        } catch (error) {
            toast.error('Failed to update budget');
            console.error('Error saving budget:', error);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="space-y-6">
            <Toaster position="top-right" />

            {/* Header */}
            <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                    Monthly Budget
                </h1>
                <p className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    Monitor and manage your monthly spending
                </p>
            </div>

            {/* Budget Summary Cards */}
            {budgetStatus && <BudgetSummary budgetData={budgetStatus} />}

            {/* Main Grid Layout - 2 columns (50% each) on desktop */}
            <div className="grid gap-6 lg:grid-cols-2">
                {/* Left Column - Budget Form & Progress stacked */}
                <div className="space-y-6 ">
                    <BudgetForm
                        currentBudget={budget?.monthlyBudget}
                        onSave={handleSaveBudget}
                        isLoading={saving}
                    />

                    {budgetStatus && budgetStatus.budget && (
                        <BudgetProgress
                            percentUsed={budgetStatus.budget.percentageUsed || 0}
                            statusColor={budgetStatus.budget.statusColor || budgetStatus.statusColor || 'green'}
                        />
                    )}
                </div>


                {/* Right Column - Budget Alerts */}
                <div className=" space-y-6">
                    <BudgetAlerts
                        alerts={alerts && alerts.length > 0 ? alerts : (budgetStatus?.alerts || [])}
                        aiForecast={null}
                    />
                    {/* AI Forecast Card - Full Width */}
                    {aiForecast && <ForecastCard forecast={aiForecast} />}
                </div>



            </div>


        </div>
    );
};

export default Budget;
