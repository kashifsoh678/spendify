import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowRight, Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';

const Login = () => {
  const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState(null);

  const from = location.state?.from?.pathname || '/dashboard';

  const onSubmit = async (data) => {
    try {
      setApiError(null);
      await login(data.email, data.password);
      // On success, redirect to dashboard
      navigate(from, { replace: true });
    } catch (error) {
      setApiError(error.message);
    }
  };

  return (
    <>
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-text-main">Welcome back</h2>
        <p className="mt-2 text-text-muted">
          Please enter your details to sign in.
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

          <div className="relative">
            <label className="mb-1.5 block text-sm font-medium text-[var(--color-text-main)]">Password</label>
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
                    value: 6,
                    message: 'Password must be at least 6 characters'
                  }
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    type={showPassword ? 'text' : 'password'}
                    className={`block w-full rounded-xl border-0 bg-white py-3 pl-10 pr-12 text-gray-900 shadow-[var(--shadow-soft)] ring-1 ring-inset ${errors.password ? 'ring-red-500' : 'ring-gray-200'
                      } placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[var(--color-primary)] sm:text-sm sm:leading-6 dark:bg-white/5 dark:text-white dark:ring-white/10`}
                    placeholder="••••••••"
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
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Controller
              name="rememberMe"
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <input
                  {...field}
                  id="remember-me"
                  type="checkbox"
                  checked={field.value}
                  className="h-4 w-4 rounded border-gray-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                />
              )}
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-[var(--color-text-muted)]">
              Remember me
            </label>
          </div>
          <div className="text-sm">
            <Link to="/forgot-password" className="font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-dark)]">
              Forgot password?
            </Link>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="group relative flex w-full justify-center rounded-xl bg-primary px-3 py-3.5 text-sm font-semibold text-white shadow-[var(--shadow-glow)] transition-all hover:bg-[var(--color-primary-dark)] hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)] disabled:opacity-70"
        >
          {isSubmitting ? (
            <svg className="h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <span className="flex items-center gap-2">
              Sign in <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          )}
        </button>
      </form>

      <p className="mt-10 text-center text-sm text-text-muted">
        Don't have an account?{' '}
        <Link
          to="/register"
          className="font-semibold leading-6 text-primary hover:text-primary-dark"
        >
          Create an account
        </Link>
      </p>
    </>
  );
};

export default Login;
