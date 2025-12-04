import { forwardRef } from 'react';

/**
 * Reusable Select component with consistent styling
 */
const Select = forwardRef(({
    label,
    error,
    options = [],
    placeholder = 'Select an option',
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
            <select
                ref={ref}
                className={`block w-full rounded-xl border-0 bg-white py-3 px-4 text-gray-900 shadow-[var(--shadow-soft)] ring-1 ring-inset ${error ? 'ring-red-500' : 'ring-gray-200'
                    } focus:ring-2 focus:ring-inset focus:ring-[var(--color-primary)] sm:text-sm dark:bg-white/5 dark:text-white dark:ring-white/10 ${className}`}
                {...props}
            >
                {placeholder && <option value="">{placeholder}</option>}
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.icon && `${option.icon} `}{option.label}
                    </option>
                ))}
            </select>
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
    );
});

Select.displayName = 'Select';

export default Select;
