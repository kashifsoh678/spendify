import { forwardRef } from 'react';
import { Search, X } from 'lucide-react';

/**
 * Reusable SearchInput component with search icon and clear button
 */
const SearchInput = forwardRef(({
    label,
    placeholder = 'Search...',
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
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                    ref={ref}
                    type="text"
                    placeholder={placeholder}
                    className={`block w-full rounded-xl border-0 bg-white py-3 pl-10 ${props.value ? 'pr-10' : 'pr-4'
                        } text-gray-900 shadow-[var(--shadow-soft)] ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[var(--color-primary)] sm:text-sm dark:bg-white/5 dark:text-white dark:ring-white/10 ${className}`}
                    {...props}
                />
                {props.value && onClear && (
                    <button
                        type="button"
                        onClick={onClear}
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                    >
                        <X className="h-4 w-4" />
                    </button>
                )}
            </div>
        </div>
    );
});

SearchInput.displayName = 'SearchInput';

export default SearchInput;
