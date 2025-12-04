import { forwardRef } from 'react';
import { X } from 'lucide-react';

/**
 * Reusable Input component with consistent styling
 * Supports all standard input types and integrates with react-hook-form
 */
const Input = forwardRef(({
    label,
    error,
    icon: Icon,
    type = 'text',
    clearable = false,
    onClear,
    className = '',
    ...props
}, ref) => {
    return (
        <div className="relative">
            {label && (
                <label className="mb-1.5 block text-sm font-medium text-[var(--color-text-main)]">
                    {label}
                </label>
            )}
            <div className="relative">
                {Icon && (
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Icon className="h-5 w-5 text-gray-400" />
                    </div>
                )}
                <input
                    ref={ref}
                    type={type}
                    className={`block w-full rounded-xl border-0 bg-white ${Icon ? 'pl-10' : 'pl-4'
                        } ${clearable && props.value ? 'pr-10' : 'pr-4'} py-3 text-gray-900 shadow-[var(--shadow-soft)] ring-1 ring-inset ${error ? 'ring-red-500' : 'ring-gray-200'
                        } placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[var(--color-primary)] sm:text-sm dark:bg-white/5 dark:text-white dark:ring-white/10 ${className}`}
                    {...props}
                />
                {clearable && props.value && onClear && (
                    <button
                        type="button"
                        onClick={onClear}
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                    >
                        <X className="h-4 w-4" />
                    </button>
                )}
            </div>
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
    );
});

Input.displayName = 'Input';

export default Input;
