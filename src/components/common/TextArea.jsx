import { forwardRef } from 'react';

/**
 * Reusable TextArea component with consistent styling
 */
const TextArea = forwardRef(({
    label,
    error,
    rows = 3,
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
            <textarea
                ref={ref}
                rows={rows}
                className={`block w-full rounded-xl border-0 bg-white py-3 px-4 text-gray-900 shadow-[var(--shadow-soft)] ring-1 ring-inset ${error ? 'ring-red-500' : 'ring-gray-200'
                    } placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[var(--color-primary)] sm:text-sm dark:bg-white/5 dark:text-white dark:ring-white/10 ${className}`}
                {...props}
            />
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
    );
});

TextArea.displayName = 'TextArea';

export default TextArea;
