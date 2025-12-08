import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { ArrowRight, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const ResetPassword = () => {
    const { control, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [apiError, setApiError] = useState(null);
    const navigate = useNavigate();
    const { token } = useParams();
    const { resetPassword } = useAuth();

    // Watch password to validate confirm password
    const password = watch('password');

    const onSubmit = async (data) => {
        try {
            setApiError(null);
            await resetPassword(token, data.password);
            // On success, redirect to dashboard or login
            // The API returns a token which AuthContext saves, so we can redirect to dashboard
            navigate('/dashboard');
        } catch (error) {
            setApiError(error.message);
        }
    };

    return (
        <>
            <div className="mb-10">
                <h2 className="text-3xl font-bold text-[var(--color-text-main)]">Set new password</h2>
                <p className="mt-2 text-[var(--color-text-muted)]">
                    Your new password must be different from previously used passwords.
                </p>
            </div>

            {/* API Error Message */}
            {apiError && (
                <div className="mb-6 rounded-xl bg-red-50 p-4 dark:bg-red-900/20">
                    <div className="flex items-center gap-3">
                        <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                        <p className="text-sm text-red-600 dark:text-red-400">{apiError}</p>
                    </div>
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">
                    <div className="relative">
                        <label className="mb-1.5 block text-sm font-medium text-text-main">New Password</label>
                        <div className="relative">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <Lock className="h-5 w-5 text-gray-400" />
                            </div>
                            <Controller
                                name="password"
                                control={control}
                                rules={{
                                    required: 'Password is required',
                                    minLength: {
                                        value: 8,
                                        message: 'Password must be at least 8 characters'
                                    }
                                }}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type={showPassword ? 'text' : 'password'}
                                        className={`block w-full rounded-xl border-0 bg-white py-3 pl-10 pr-12 text-gray-900 shadow-[var(--shadow-soft)] ring-1 ring-inset ${errors.password ? 'ring-red-500' : 'ring-gray-200'
                                            } placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[var(--color-primary)] sm:text-sm sm:leading-6 dark:bg-white/5 dark:text-white dark:ring-white/10`}
                                        placeholder="Enter new password"
                                    />
                                )}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 flex items-center pr-3"
                            >
                                {showPassword ? (
                                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
                                ) : (
                                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
                                )}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                        )}
                        <p className="mt-1 text-xs text-[var(--color-text-muted)]">Must be at least 8 characters</p>
                    </div>

                    <div className="relative">
                        <label className="mb-1.5 block text-sm font-medium text-[var(--color-text-main)]">Confirm Password</label>
                        <div className="relative">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <Lock className="h-5 w-5 text-gray-400" />
                            </div>
                            <Controller
                                name="confirmPassword"
                                control={control}
                                rules={{
                                    required: 'Please confirm your password',
                                    validate: (val) => {
                                        if (!val) return 'Please confirm your password';
                                        if (watch('password') != val) return "Passwords do not match";
                                    },
                                }}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        className={`block w-full rounded-xl border-0 bg-white py-3 pl-10 pr-12 text-gray-900 shadow-[var(--shadow-soft)] ring-1 ring-inset ${errors.confirmPassword ? 'ring-red-500' : 'ring-gray-200'
                                            } placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[var(--color-primary)] sm:text-sm sm:leading-6 dark:bg-white/5 dark:text-white dark:ring-white/10`}
                                        placeholder="Confirm new password"
                                    />
                                )}
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute inset-y-0 right-0 flex items-center pr-3"
                            >
                                {showConfirmPassword ? (
                                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
                                ) : (
                                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
                                )}
                            </button>
                        </div>
                        {errors.confirmPassword && (
                            <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
                        )}
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative flex w-full justify-center rounded-xl bg-[var(--color-primary)] px-3 py-3.5 text-sm font-semibold text-white shadow-[var(--shadow-glow)] transition-all hover:bg-[var(--color-primary-dark)] hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)] disabled:opacity-70"
                >
                    {isSubmitting ? (
                        <svg className="h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    ) : (
                        <span className="flex items-center gap-2">
                            Reset password <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </span>
                    )}
                </button>
            </form>
        </>
    );
};

export default ResetPassword;
