import { Outlet, useLocation } from 'react-router-dom';
import { Wallet } from 'lucide-react';

const AuthLayout = () => {
  const location = useLocation();

  // Dynamic content based on route
  const getPageContent = () => {
    if (location.pathname === '/register') {
      return {
        title: 'Join the future of',
        subtitle: 'personal finance.',
        description: 'Create an account today and start your journey towards financial freedom with smart tracking and AI insights.'
      };
    } else if (location.pathname === '/forgot-password') {
      return {
        title: 'Reset your',
        subtitle: 'password.',
        description: 'Enter your email address and we\'ll send you instructions to reset your password.'
      };
    } else if (location.pathname === '/reset-password') {
      return {
        title: 'Create a new',
        subtitle: 'password.',
        description: 'Choose a strong password to keep your financial data secure.'
      };
    }
    // Default for login
    return {
      title: 'Master your money,',
      subtitle: 'effortlessly.',
      description: 'Track expenses, manage budgets, and gain insights into your spending habits with our intelligent financial assistant.'
    };
  };

  const content = getPageContent();

  return (
    <div className="flex min-h-screen w-full overflow-hidden bg-[var(--color-background)] w-screen">
      {/* Left Side - Brand/Visual */}
      <div className="hidden w-1/2 flex-col justify-between bg-[var(--color-primary)] p-12 text-white lg:flex relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] opacity-90"></div>
        <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-white/10 blur-3xl"></div>
        <div className="absolute -left-20 bottom-0 h-96 w-96 rounded-full bg-white/10 blur-3xl"></div>

        <div className="relative z-10 flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur-md">
            <Wallet className="h-6 w-6 text-white" />
          </div>
          <span className="text-2xl font-bold tracking-tight">Spendify</span>
        </div>

        <div className="relative z-10 max-w-md">
          <h1 className="mb-6 text-5xl font-bold leading-tight">
            {content.title} <br />
            <span className="text-white/80">{content.subtitle}</span>
          </h1>
          <p className="text-lg text-indigo-100">
            {content.description}
          </p>
        </div>

        <div className="relative z-10 text-sm text-indigo-200">
          © 2025 Spendify Inc. All rights reserved.
        </div>
      </div>

      {/* Right Side - Form Content */}
      <div className="flex w-full flex-col justify-center p-8 lg:w-1/2 lg:p-24">
        <div className="mx-auto w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
