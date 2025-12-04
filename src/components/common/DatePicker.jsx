import { forwardRef } from 'react';
import { X } from 'lucide-react';

/**
 * Reusable DatePicker component with consistent styling
 */
const DatePicker = forwardRef(({
    label,
    error,
    clearable = false,
    onClear,
    className = '',
    ...props
}, ref) => {
    return (
        <div>
            {label && (
                <label className="mb-1.5 block text-sm font-medium text-[var(--color-text-main)]">
                    {label}
                </label>
            )}
            <div className="relative">
                <input
                    ref={ref}
                    type="date"
                    className={`block w-full rounded-xl border-0 bg-white py-3 ${clearable && props.value ? 'pr-10 px-3' : 'px-4'
                        } text-gray-900 shadow-[var(--shadow-soft)] ring-1 ring-inset ${error ? 'ring-red-500' : 'ring-gray-200'
                        } focus:ring-2 focus:ring-inset focus:ring-[var(--color-primary)] sm:text-sm dark:bg-white/5 dark:text-white dark:ring-white/10 ${className}`}
                    {...props}
                />
                {clearable && props.value && onClear && (
                    <button
                        type="button"
                        onClick={onClear}
                        className="absolute inset-y-0 right-0 flex items-center pr-2 text-gray-400 hover:text-gray-600"
                    >
                        <X className="h-3 w-3" />
                    </button>
                )}
            </div>
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
    );
});

DatePicker.displayName = 'DatePicker';

export default DatePicker;
