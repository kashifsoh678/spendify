import { useForm, Controller } from 'react-hook-form';
import { DollarSign } from 'lucide-react';
import { Input } from '../common';

const BudgetForm = ({ currentBudget, onSave, isLoading }) => {
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            amount: currentBudget || ''
        }
    });

    const onSubmit = (data) => {
        onSave(parseFloat(data.amount));
    };

    return (
        <div className="rounded-xl sm:rounded-2xl bg-white p-4 sm:p-6 shadow-sm dark:bg-[#1E1E2D]">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Set Monthly Budget
            </h3>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Controller
                    name="amount"
                    control={control}
                    rules={{
                        required: 'Budget amount is required',
                        min: { value: 100, message: 'Budget must be at least PKR 100' }
                    }}
                    render={({ field }) => (
                        <Input
                            {...field}
                            type="number"
                            label="Monthly Budget (PKR)"
                            placeholder="Enter your monthly budget"
                            icon={DollarSign}
                            error={errors.amount?.message}
                            min="100"
                            step="100"
                        />
                    )}
                />

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full rounded-lg bg-[var(--color-primary)] px-4 py-3 text-sm font-medium text-white hover:bg-[var(--color-primary-dark)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    {isLoading ? 'Saving...' : currentBudget ? 'Update Budget' : 'Set Budget'}
                </button>
            </form>
        </div>
    );
};

export default BudgetForm;
