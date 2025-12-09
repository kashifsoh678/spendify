import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { X } from 'lucide-react';
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES, MOODS, TRANSACTION_TYPES } from '../../constants/transactions';

const AddTransactionModal = ({ isOpen, onClose, onSubmit, initialData = null }) => {
    const isEdit = !!initialData;

    const { control, handleSubmit, formState: { errors, isSubmitting }, reset, watch, setValue } = useForm({
        defaultValues: initialData || {
            amount: '',
            type: TRANSACTION_TYPES.EXPENSE,
            category: '',
            note: '',
            mood: 'happy',
            date: new Date().toISOString().split('T')[0]
        }
    });

    const watchType = watch('type');

    // Update form when initialData changes (for edit mode)
    useEffect(() => {
        if (initialData) {
            // Format date to YYYY-MM-DD for date input
            const formattedData = {
                ...initialData,
                date: initialData.date ? new Date(initialData.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
            };
            reset(formattedData);
        }
    }, [initialData, reset]);

    // Reset category when type changes
    useEffect(() => {
        if (!initialData) {
            setValue('category', '');
        }
    }, [watchType, setValue, initialData]);

    const categories = watchType === TRANSACTION_TYPES.INCOME ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

    const onSubmitForm = async (data) => {
        try {
            await onSubmit({
                ...data,
                amount: parseFloat(data.amount)
            });
            handleClose();
        } catch (error) {
            console.error('Error submitting transaction:', error);
        }
    };

    const handleClose = () => {
        reset({
            amount: '',
            type: TRANSACTION_TYPES.EXPENSE,
            category: '',
            note: '',
            mood: 'happy',
            date: new Date().toISOString().split('T')[0]
        });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-screen items-center justify-center p-4">
                {/* Backdrop */}
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" onClick={handleClose}></div>

                {/* Modal */}
                <div className="relative w-full max-w-md transform rounded-2xl bg-white p-6 shadow-xl transition-all dark:bg-[#1E1E2D]">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                            {isEdit ? 'Edit Transaction' : 'Add Transaction'}
                        </h2>
                        <button
                            onClick={handleClose}
                            className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800"
                        >
                            <X className="h-6 w-6" />
                        </button>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
                        {/* Amount */}
                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-[var(--color-text-main)]">
                                Amount (PKR) *
                            </label>
                            <Controller
                                name="amount"
                                control={control}
                                rules={{
                                    required: 'Amount is required',
                                    min: { value: 0.01, message: 'Amount must be greater than 0' }
                                }}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type="number"
                                        className={`block w-full rounded-xl border-0 bg-white py-3 px-4 text-gray-900 shadow-[var(--shadow-soft)] ring-1 ring-inset ${errors.amount ? 'ring-red-500' : 'ring-gray-200'
                                            } placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[var(--color-primary)] sm:text-sm dark:bg-white/5 dark:text-white dark:ring-white/10`}
                                        placeholder="0.00"
                                        min="0"
                                        step="0.01"
                                    />
                                )}
                            />
                            {errors.amount && <p className="mt-1 text-sm text-red-600">{errors.amount.message}</p>}
                        </div>

                        {/* Type */}
                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-[var(--color-text-main)]">
                                Type *
                            </label>
                            <Controller
                                name="type"
                                control={control}
                                rules={{ required: 'Type is required' }}
                                render={({ field }) => (
                                    <div className="flex gap-4">
                                        <label className="flex items-center cursor-pointer">
                                            <input
                                                type="radio"
                                                value={TRANSACTION_TYPES.INCOME}
                                                checked={field.value === TRANSACTION_TYPES.INCOME}
                                                onChange={(e) => field.onChange(e.target.value)}
                                                className="h-4 w-4 text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                                            />
                                            <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Income</span>
                                        </label>
                                        <label className="flex items-center cursor-pointer">
                                            <input
                                                type="radio"
                                                value={TRANSACTION_TYPES.EXPENSE}
                                                checked={field.value === TRANSACTION_TYPES.EXPENSE}
                                                onChange={(e) => field.onChange(e.target.value)}
                                                className="h-4 w-4 text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                                            />
                                            <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Expense</span>
                                        </label>
                                    </div>
                                )}
                            />
                            {errors.type && <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>}
                        </div>

                        {/* Category */}
                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-[var(--color-text-main)]">
                                Category *
                            </label>
                            <Controller
                                name="category"
                                control={control}
                                rules={{ required: 'Category is required' }}
                                render={({ field }) => (
                                    <select
                                        {...field}
                                        className={`block w-full rounded-xl border-0 bg-white py-3 px-4 text-gray-900 shadow-[var(--shadow-soft)] ring-1 ring-inset ${errors.category ? 'ring-red-500' : 'ring-gray-200'
                                            } focus:ring-2 focus:ring-inset focus:ring-[var(--color-primary)] sm:text-sm dark:bg-white/5 dark:text-white dark:ring-white/10`}
                                    >
                                        <option value="">Select category</option>
                                        {categories.map(cat => (
                                            <option key={cat.value} value={cat.value}>
                                                {cat.icon} {cat.label}
                                            </option>
                                        ))}
                                    </select>
                                )}
                            />
                            {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>}
                        </div>

                        {/* Note */}
                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-[var(--color-text-main)]">
                                Note / Description *
                            </label>
                            <Controller
                                name="note"
                                control={control}
                                rules={{
                                    required: 'Note is required',
                                    minLength: { value: 3, message: 'Note must be at least 3 characters' }
                                }}
                                render={({ field }) => (
                                    <textarea
                                        {...field}
                                        rows={3}
                                        className={`block w-full rounded-xl border-0 bg-white py-3 px-4 text-gray-900 shadow-[var(--shadow-soft)] ring-1 ring-inset ${errors.note ? 'ring-red-500' : 'ring-gray-200'
                                            } placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[var(--color-primary)] sm:text-sm dark:bg-white/5 dark:text-white dark:ring-white/10`}
                                        placeholder="Enter transaction details..."
                                    />
                                )}
                            />
                            {errors.note && <p className="mt-1 text-sm text-red-600">{errors.note.message}</p>}
                        </div>

                        {/* Mood */}
                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-[var(--color-text-main)]">
                                Mood (Optional)
                            </label>
                            <Controller
                                name="mood"
                                control={control}
                                render={({ field }) => (
                                    <select
                                        {...field}
                                        className="block w-full rounded-xl border-0 bg-white py-3 px-4 text-gray-900 shadow-[var(--shadow-soft)] ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-[var(--color-primary)] sm:text-sm dark:bg-white/5 dark:text-white dark:ring-white/10"
                                    >
                                        {MOODS.map(mood => (
                                            <option key={mood.value} value={mood.value}>
                                                {mood.emoji} {mood.label}
                                            </option>
                                        ))}
                                    </select>
                                )}
                            />
                        </div>

                        {/* Date */}
                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-[var(--color-text-main)]">
                                Date *
                            </label>
                            <Controller
                                name="date"
                                control={control}
                                rules={{ required: 'Date is required' }}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type="date"
                                        className={`block w-full rounded-xl border-0 bg-white py-3 px-4 text-gray-900 shadow-[var(--shadow-soft)] ring-1 ring-inset ${errors.date ? 'ring-red-500' : 'ring-gray-200'
                                            } focus:ring-2 focus:ring-inset focus:ring-[var(--color-primary)] sm:text-sm dark:bg-white/5 dark:text-white dark:ring-white/10`}
                                    />
                                )}
                            />
                            {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>}
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3 pt-4">
                            <button
                                type="button"
                                onClick={handleClose}
                                className="flex-1 rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="flex-1 rounded-lg bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--color-primary-dark)] disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? 'Saving...' : isEdit ? 'Update' : 'Add Transaction'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddTransactionModal;
