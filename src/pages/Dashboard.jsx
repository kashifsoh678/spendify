import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import {
  TrendingUp,
  TrendingDown,
  PiggyBank,
  AlertCircle,
  Sparkles,
  Calendar,
  Utensils,
  Car,
  Home,
  Wallet,
  ShoppingBag,
} from 'lucide-react';

// Import dashboard components
import DashboardHeader from '../components/dashboard/DashboardHeader';
import StatCard from '../components/dashboard/StatCard';
import BudgetProgress from '../components/dashboard/BudgetProgress';
import CategoryPieChart from '../components/dashboard/CategoryPieChart';
import MonthlyLineChart from '../components/dashboard/MonthlyLineChart';
import AIInsightsList from '../components/dashboard/AIInsightsList';
import AlertsList from '../components/dashboard/AlertsList';
import RecentTransactions from '../components/dashboard/RecentTransactions';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Dashboard = () => {
  // Get current month
  const currentMonth = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  // Dummy data for KPI cards
  const kpiData = {
    totalIncome: 120000,
    totalExpenses: 78500,
    monthlyBudget: 100000,
    upcomingBills: 2
  };

  const remainingBudget = kpiData.monthlyBudget - kpiData.totalExpenses;
  const budgetUsedPercentage = (kpiData.totalExpenses / kpiData.monthlyBudget) * 100;

  // Budget status color for remaining budget card
  const getBudgetGradient = () => {
    if (budgetUsedPercentage < 50) return 'from-emerald-500 to-emerald-600';
    if (budgetUsedPercentage < 85) return 'from-yellow-500 to-yellow-600';
    return 'from-red-500 to-red-600';
  };

  const getBudgetLabel = () => {
    if (budgetUsedPercentage < 50) return 'Healthy';
    if (budgetUsedPercentage < 85) return 'Moderate';
    return 'Critical';
  };

  // Category-wise spending data for Pie Chart
  const categorySpendingData = {
    labels: ['Food', 'Travel', 'Utilities', 'Shopping', 'Education', 'Health', 'Others'],
    datasets: [{
      data: [26700, 15700, 12000, 10500, 6800, 4300, 2500],
      backgroundColor: [
        'rgba(239, 68, 68, 0.8)',
        'rgba(59, 130, 246, 0.8)',
        'rgba(16, 185, 129, 0.8)',
        'rgba(245, 158, 11, 0.8)',
        'rgba(139, 92, 246, 0.8)',
        'rgba(236, 72, 153, 0.8)',
        'rgba(107, 114, 128, 0.8)',
      ],
      borderColor: [
        'rgb(239, 68, 68)',
        'rgb(59, 130, 246)',
        'rgb(16, 185, 129)',
        'rgb(245, 158, 11)',
        'rgb(139, 92, 246)',
        'rgb(236, 72, 153)',
        'rgb(107, 114, 128)',
      ],
      borderWidth: 2,
    }],
  };

  // Monthly trend data for Line Chart
  const monthlyTrendData = {
    labels: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
    datasets: [{
      label: 'Daily Spending',
      data: [2100, 2800, 1900, 3200, 2500, 2900, 3100, 2400, 2700, 3500, 2200, 2600, 3000, 2800, 3200, 2100, 2900, 3400, 2500, 2700, 3100, 2300, 2800, 3200, 2600, 2900, 3300, 2400, 2700, 3000],
      borderColor: 'rgb(99, 102, 241)',
      backgroundColor: 'rgba(99, 102, 241, 0.1)',
      fill: true,
      tension: 0.4,
    }],
  };

  // AI Insights
  const aiInsights = [
    {
      id: 1,
      type: 'warning',
      icon: AlertCircle,
      title: 'AI Spending Forecast',
      message: '⚠️ Based on your current trend, you may exceed your monthly budget by 18%.',
      color: 'text-amber-600',
      bgColor: 'bg-amber-50 dark:bg-amber-900/20',
      borderColor: 'border-amber-200 dark:border-amber-800'
    },
    {
      id: 2,
      type: 'info',
      icon: Sparkles,
      title: 'Personality Insight',
      message: 'You are a Foodie Spender — 34% of your expenses are on Food.',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      borderColor: 'border-purple-200 dark:border-purple-800'
    },
    {
      id: 3,
      type: 'success',
      icon: PiggyBank,
      title: 'Smart Saving Suggestion',
      message: 'Reduce your food expenses by 10% to save PKR 2,500 this month.',
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      borderColor: 'border-green-200 dark:border-green-800'
    }
  ];

  // Alerts & Notifications
  const alerts = [
    {
      id: 1,
      type: 'budget',
      icon: AlertCircle,
      message: 'You have crossed 78% of your monthly budget.',
      time: '2 hours ago',
      color: 'text-red-600',
      bgColor: 'bg-red-50 dark:bg-red-900/20'
    },
    {
      id: 2,
      type: 'bill',
      icon: Calendar,
      message: 'Electricity Bill due in 3 days.',
      time: '5 hours ago',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20'
    },
    {
      id: 3,
      type: 'trend',
      icon: TrendingUp,
      message: 'Your spending trend is increasing this week.',
      time: '1 day ago',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20'
    }
  ];

  // Recent Transactions
  const recentTransactions = [
    {
      id: 1,
      category: 'Food',
      icon: Utensils,
      description: 'Grocery Shopping',
      amount: 3500,
      type: 'expense',
      date: '2024-12-04',
      color: 'text-red-600 bg-red-50 dark:bg-red-900/20'
    },
    {
      id: 2,
      category: 'Income',
      icon: Wallet,
      description: 'Salary Deposit',
      amount: 120000,
      type: 'income',
      date: '2024-12-01',
      color: 'text-green-600 bg-green-50 dark:bg-green-900/20'
    },
    {
      id: 3,
      category: 'Travel',
      icon: Car,
      description: 'Uber Ride',
      amount: 850,
      type: 'expense',
      date: '2024-12-03',
      color: 'text-blue-600 bg-blue-50 dark:bg-blue-900/20'
    },
    {
      id: 4,
      category: 'Shopping',
      icon: ShoppingBag,
      description: 'Online Shopping',
      amount: 4200,
      type: 'expense',
      date: '2024-12-02',
      color: 'text-orange-600 bg-orange-50 dark:bg-orange-900/20'
    },
    {
      id: 5,
      category: 'Utilities',
      icon: Home,
      description: 'Internet Bill',
      amount: 2500,
      type: 'expense',
      date: '2024-12-01',
      color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Section 1: Header */}
      <DashboardHeader currentMonth={currentMonth} />

      {/* Section 2: KPI Summary Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Income"
          value={`PKR ${kpiData.totalIncome.toLocaleString()}`}
          subtitle="This Month"
          icon={TrendingUp}
          gradient="from-indigo-500 to-indigo-600"
          iconBg="bg-white/20"
        />
        <StatCard
          title="Total Expenses"
          value={`PKR ${kpiData.totalExpenses.toLocaleString()}`}
          subtitle="This Month"
          icon={TrendingDown}
          gradient="from-red-500 to-red-600"
          iconBg="bg-white/20"
        />
        <StatCard
          title="Remaining Budget"
          value={`PKR ${remainingBudget.toLocaleString()}`}
          subtitle={`${getBudgetLabel()} - ${budgetUsedPercentage.toFixed(0)}% Used`}
          icon={PiggyBank}
          gradient={getBudgetGradient()}
          iconBg="bg-white/20"
        />
        <StatCard
          title="Upcoming Bills"
          value={`${kpiData.upcomingBills} Bills`}
          subtitle="Due Soon"
          icon={Calendar}
          gradient="from-purple-500 to-purple-600"
          iconBg="bg-white/20"
        />
      </div>

      {/* Section 3: Budget Progress Indicator */}
      <BudgetProgress
        monthlyBudget={kpiData.monthlyBudget}
        totalExpenses={kpiData.totalExpenses}
      />

      {/* Section 4: Spending Breakdown Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <CategoryPieChart data={categorySpendingData} />
        <MonthlyLineChart data={monthlyTrendData} />
      </div>

      {/* Section 5 & 6: AI Insights and Alerts */}
      <div className="grid gap-6 lg:grid-cols-3">
        <AIInsightsList insights={aiInsights} />
        <AlertsList alerts={alerts} />
      </div>

      {/* Section 7: Recent Transactions */}
      <RecentTransactions transactions={recentTransactions} />
    </div>
  );
};

export default Dashboard;
