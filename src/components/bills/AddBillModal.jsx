import { useForm, Controller } from 'react-hook-form';
import { X } from 'lucide-react';
import { Input, DatePicker } from '../common';

const AddBillModal = ({ isOpen, onClose, onSubmit }) => {
    const { control, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
        defaultValues: {
            billName: '',
            amount: '',
            dueDate: ''
        }
    });

    const onSubmitForm = async (data) => {
        try {
            await onSubmit(data);
            handleClose();
        } catch (error) {
            console.error('Error submitting bill:', error);
        }
    };

    const handleClose = () => {
        reset({
            billName: '',
            amount: '',
            dueDate: ''
        });
        onClose();
    };

    if (!isOpen) return null;

    // Get today's date in YYYY-MM-DD format for min date
    const today = new Date().toISOString().split('T')[0];

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
                            Add Bill
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
                        {/* Bill Name */}
                        <Controller
                            name="billName"
                            control={control}
                            rules={{
                                required: 'Bill name is required',
                                minLength: { value: 3, message: 'Bill name must be at least 3 characters' }
                            }}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    label="Bill Name"
                                    placeholder="e.g., Electricity Bill"
                                    error={errors.billName?.message}
                                />
                            )}
                        />

                        {/* Amount */}
                        <Controller
                            name="amount"
                            control={control}
                            rules={{
                                required: 'Amount is required',
                                min: { value: 1, message: 'Amount must be at least 1' }
                            }}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    type="number"
                                    label="Amount (PKR)"
                                    placeholder="Enter amount"
                                    error={errors.amount?.message}
                                    min="1"
                                    step="1"
                                />
                            )}
                        />

                        {/* Due Date */}
                        <Controller
                            name="dueDate"
                            control={control}
                            rules={{
                                required: 'Due date is required',
                                validate: (value) => {
                                    const selected = new Date(value);
                                    const todayDate = new Date(today);
                                    return selected >= todayDate || 'Due date must be today or in the future';
                                }
                            }}
                            render={({ field }) => (
                                <DatePicker
                                    {...field}
                                    label="Due Date"
                                    error={errors.dueDate?.message}
                                    min={today}
                                />
                            )}
                        />

                        {/* Buttons */}
                        <div className="flex gap-3 pt-2">
                            <button
                                type="button"
                                onClick={handleClose}
                                className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="flex-1 rounded-lg bg-[var(--color-primary)] px-4 py-2.5 text-sm font-medium text-white hover:bg-[var(--color-primary-dark)] disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? 'Adding...' : 'Add Bill'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddBillModal;
