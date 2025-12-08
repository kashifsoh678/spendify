import { AlertTriangle, X } from 'lucide-react';

const ConfirmationModal = ({
    isOpen,
    onClose,
    onConfirm,
    title = 'Confirm Action',
    message = 'Are you sure you want to proceed?',
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    variant = 'danger' // 'danger' | 'warning' | 'info'
}) => {
    if (!isOpen) return null;

    const variantStyles = {
        danger: {
            icon: 'bg-red-100 dark:bg-red-900/20',
            iconColor: 'text-red-600 dark:text-red-400',
            button: 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
        },
        warning: {
            icon: 'bg-yellow-100 dark:bg-yellow-900/20',
            iconColor: 'text-yellow-600 dark:text-yellow-400',
            button: 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500'
        },
        info: {
            icon: 'bg-blue-100 dark:bg-blue-900/20',
            iconColor: 'text-blue-600 dark:text-blue-400',
            button: 'bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] focus:ring-indigo-500'
        }
    };

    const styles = variantStyles[variant];

    const handleConfirm = () => {
        onConfirm();
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-screen items-center justify-center p-4">
                {/* Backdrop */}
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
                    onClick={onClose}
                ></div>

                {/* Modal */}
                <div className="relative w-full max-w-md transform rounded-2xl bg-white p-6 shadow-xl transition-all dark:bg-[#1E1E2D]">
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 transition-colors"
                    >
                        <X className="h-5 w-5" />
                    </button>

                    {/* Icon */}
                    <div className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full ${styles.icon}`}>
                        <AlertTriangle className={`h-6 w-6 ${styles.iconColor}`} />
                    </div>

                    {/* Content */}
                    <div className="mt-4 text-center">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {title}
                        </h3>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            {message}
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="mt-6 flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 rounded-lg bg-gray-100 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                        >
                            {cancelText}
                        </button>
                        <button
                            type="button"
                            onClick={handleConfirm}
                            className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${styles.button}`}
                        >
                            {confirmText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
