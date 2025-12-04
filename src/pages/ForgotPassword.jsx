import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { ArrowRight, Mail, ArrowLeft } from 'lucide-react';

const ForgotPassword = () => {
    const { control, handleSubmit, formState: { errors, isSubmitting }, getValues } = useForm();
    const [isSubmitted, setIsSubmitted] = useState(false);

    const onSubmit = async (data) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSubmitted(true);
    };

    if (isSubmitted) {
        return (
            <>
                <div className="mb-10 text-center">
                    <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
                        <svg className="h-8 w-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h2 className="text-3xl font-bold text-[var(--color-text-main)]">Check your email</h2>
                    <p className="mt-2 text-[var(--color-text-muted)]">
                        We've sent password reset instructions to <br />
                        <span className="font-medium text-[var(--color-text-main)]">{getValues('email')}</span>
                    </p>
                </div>

                <div className="space-y-4">
                    <p className="text-center text-sm text-[var(--color-text-muted)]">
                        Didn't receive the email? Check your spam folder or{' '}
                        <button
                            onClick={() => setIsSubmitted(false)}
                            className="font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-dark)]"
                        >
                            try again
                        </button>
                    </p>

                    <Link
                        to="/login"
                        className="flex items-center justify-center gap-2 text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text-main)]"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to login
                    </Link>
                </div>
            </>
        );
    }

    return (
        <>
            <div className="mb-10">
                <h2 className="text-3xl font-bold text-[var(--color-text-main)]">Forgot password?</h2>
                <p className="mt-2 text-[var(--color-text-muted)]">
                    No worries, we'll send you reset instructions.
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="relative">
                    <label className="mb-1.5 block text-sm font-medium text-[var(--color-text-main)]">Email</label>
                    <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <Controller
                            name="email"
                            control={control}
                            rules={{
                                required: 'Email is required',
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: 'Invalid email address'
                                }
                            }}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    type="email"
                                    className={`block w-full rounded-xl border-0 bg-white py-3 pl-10 pr-4 text-gray-900 shadow-[var(--shadow-soft)] ring-1 ring-inset ${errors.email ? 'ring-red-500' : 'ring-gray-200'
                                        } placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[var(--color-primary)] sm:text-sm sm:leading-6 dark:bg-white/5 dark:text-white dark:ring-white/10`}
                                    placeholder="Enter your email"
                                />
                            )}
                        />
                    </div>
                    {errors.email && (
                        <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                    )}
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

            <p className="mt-10 text-center">
                <Link
                    to="/login"
                    className="flex items-center justify-center gap-2 text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text-main)]"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to login
                </Link>
            </p>
        </>
    );
};

export default ForgotPassword;
