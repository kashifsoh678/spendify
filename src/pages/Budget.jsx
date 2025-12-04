import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import BudgetForm from '../components/budget/BudgetForm';
import BudgetSummary from '../components/budget/BudgetSummary';
import BudgetProgress from '../components/budget/BudgetProgress';
import BudgetAlerts from '../components/budget/BudgetAlerts';
import { getBudget, setBudget, getBudgetStatus, getAIForecast } from '../services/budgetService';

const Budget = () => {
    const [budgetData, setBudgetData] = useState(null);
    const [budgetStatus, setBudgetStatus] = useState(null);
    const [aiForecast, setAIForecast] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // Fetch all budget data
    const fetchBudgetData = async () => {
        setLoading(true);
        try {
            const [budget, status, forecast] = await Promise.all([
                getBudget(),
                getBudgetStatus(),
                getAIForecast()
            ]);

            setBudgetData(budget);
            setBudgetStatus(status);
            setAIForecast(forecast);
        } catch (error) {
            console.error('Error fetching budget data:', error);
            toast.error('Failed to load budget data');
        } finally {
            setLoading(false);
        }
    };

    // Initial load
    useEffect(() => {
        fetchBudgetData();
    }, []);

    // Handle budget save/update
    const handleSaveBudget = async (amount) => {
        setSaving(true);
        try {
            await setBudget(amount);
            toast.success('Budget updated successfully!');
            // Refresh all data
            await fetchBudgetData();
        } catch (error) {
            toast.error('Failed to update budget');
            console.error('Error saving budget:', error);
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-primary)] mx-auto"></div>
                    <p className="mt-4 text-gray-600 dark:text-gray-400">Loading budget data...</p>
                </div>
            </div>
        );
    }

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
                <div className="space-y-6">
                    <BudgetForm
                        currentBudget={budgetData?.monthlyBudget}
                        onSave={handleSaveBudget}
                        isLoading={saving}
                    />

                    {budgetStatus && (
                        <BudgetProgress percentUsed={budgetStatus.percentUsed} />
                    )}
                </div>

                {/* Right Column - Budget Alerts */}
                {budgetStatus && (
                    <BudgetAlerts
                        alerts={budgetStatus.alerts}
                        aiForecast={aiForecast}
                    />
                )}
            </div>
        </div>
    );
};

export default Budget;
