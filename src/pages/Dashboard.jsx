import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  ArrowRight,
} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

// Import dashboard components
import DashboardHeader from '../components/dashboard/DashboardHeader';
import StatCard from '../components/dashboard/StatCard';
import BudgetProgress from '../components/dashboard/BudgetProgress';
import CategoryPieChart from '../components/dashboard/CategoryPieChart';
import MonthlyLineChart from '../components/dashboard/MonthlyLineChart';
import AIInsightsList from '../components/dashboard/AIInsightsList';
import AlertsList from '../components/dashboard/AlertsList';
import RecentTransactions from '../components/dashboard/RecentTransactions';

// Import services and context
import { getDashboardKPIs, getCategorySpending, getSpendingTrend } from '../services/dashboardService';
import { useTransaction } from '../context/TransactionContext';
import { getDashboardInsights } from '../services/aiService';
import { getAlerts } from '../services/alertsService';
import { getBudget } from '../services/budgetService';

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
  // Hooks
  const navigate = useNavigate();
  const { transactions, fetchTransactions } = useTransaction();

  // State management
  const [kpiData, setKpiData] = useState(null);
  const [categoryData, setCategoryData] = useState(null);
  const [trendData, setTrendData] = useState(null);
  const [aiInsights, setAiInsights] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get current month
  const currentMonth = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        // Fetch all data in parallel
        const [kpis, categories, trend, insights, alertsData, budgetData] = await Promise.all([
          getDashboardKPIs(),
          getCategorySpending(),
          getSpendingTrend(),
          getDashboardInsights().catch(() => ({ insights: [] })), // Fallback to empty if fails
          getAlerts({ limit: 5 }).catch(() => ({ alerts: [] })), // Fallback to empty if fails
          getBudget().catch(() => null), // Fetch budget to get real monthlyBudget
          fetchTransactions({ limit: 5, sort: '-createdAt' }) // Fetch recent transactions
        ]);

        // If KPI doesn't have monthlyBudget but budget API does, use it
        if (budgetData && budgetData.budget && (!kpis.monthlyBudget || kpis.monthlyBudget === 0)) {
          kpis.monthlyBudget = budgetData.budget.monthlyBudget || 0;
        }

        setKpiData(kpis);
        setCategoryData(categories);
        setTrendData(trend);
        setAiInsights(insights?.insights || []);
        setAlerts(alertsData?.alerts || []);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        toast.error('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [fetchTransactions]);

  // Safe calculations with fallback to 0 to prevent NaN
  const totalExpenses = kpiData?.totalExpenses || 0;
  const monthlyBudget = kpiData?.monthlyBudget || 0;
  const remainingBudget = monthlyBudget - totalExpenses;
  const budgetUsedPercentage = monthlyBudget > 0 ? (totalExpenses / monthlyBudget) * 100 : 0;

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
  const categorySpendingData = categoryData?.categories ? {
    labels: categoryData.categories.map(item => item.category),
    datasets: [{
      data: categoryData.categories.map(item => item.amount),
      backgroundColor: categoryData.categories.map(item => item.color),
      borderColor: categoryData.categories.map(item => {
        // Convert rgba to rgb for border
        if (item.color.startsWith('rgba')) {
          return item.color.replace('rgba', 'rgb').replace(/, 0\.\d+\)/, ')');
        }
        return item.color;
      }),
      borderWidth: 2,
    }],
  } : null;

  // Monthly trend data for Line Chart
  const monthlyTrendData = trendData?.trend ? {
    labels: trendData.trend.map(item => `Day ${item.day}`),
    datasets: [{
      label: 'Daily Spending',
      data: trendData.trend.map(item => item.amount),
      borderColor: 'rgb(99, 102, 241)',
      backgroundColor: 'rgba(99, 102, 241, 0.1)',
      fill: true,
      tension: 0.4,
    }],
  } : null;

  // Get first 5 recent transactions from context
  const recentTransactions = transactions?.slice(0, 5) || [];

  return (
    <div className="space-y-6">
      <Toaster position="top-right" />

      {/* Section 1: Header */}
      <DashboardHeader currentMonth={currentMonth} />

      {/* Section 2: KPI Summary Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Income"
          value={`PKR ${(kpiData?.totalIncome || 0).toLocaleString()}`}
          subtitle="This Month"
          icon={TrendingUp}
          gradient="from-green-500 to-green-600"
          iconBg="bg-white/20"
        />
        <StatCard
          title="Total Expenses"
          value={`PKR ${totalExpenses.toLocaleString()}`}
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
          value={`${(kpiData?.upcomingBills || 0)} Bills`}
          subtitle="Due This Month"
          icon={AlertCircle}
          gradient="from-orange-500 to-orange-600"
          iconBg="bg-white/20"
        />
      </div>

      {/* Section 3: Budget Progress Indicator */}
      <BudgetProgress
        monthlyBudget={monthlyBudget}
        totalExpenses={totalExpenses}
      />

      {/* Section 4: Spending Breakdown Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        {categorySpendingData ? (
          <CategoryPieChart data={categorySpendingData} />
        ) : (
          <div className="rounded-xl sm:rounded-2xl bg-white dark:bg-[#1E1E2D] p-6 shadow-sm flex items-center justify-center">
            <p className="text-gray-500 dark:text-gray-400">
              {loading ? 'Loading category data...' : 'No category data available'}
            </p>
          </div>
        )}
        {monthlyTrendData ? (
          <MonthlyLineChart data={monthlyTrendData} />
        ) : (
          <div className="rounded-xl sm:rounded-2xl bg-white dark:bg-[#1E1E2D] p-6 shadow-sm flex items-center justify-center">
            <p className="text-gray-500 dark:text-gray-400">
              {loading ? 'Loading trend data...' : 'No trend data available'}
            </p>
          </div>
        )}
      </div>

      {/* Section 5 & 6: AI Insights and Alerts */}
      <div className="grid gap-6 lg:grid-cols-3">
        <AIInsightsList insights={aiInsights} />
        <AlertsList alerts={alerts} />
      </div>

      {/* Section 7: Recent Transactions */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div></div>
          <button
            onClick={() => navigate('/transactions')}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-lg hover:from-indigo-600 hover:to-indigo-700 transition-all shadow-sm hover:shadow-md"
          >
            <span>View All</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
        <RecentTransactions transactions={recentTransactions} />
      </div>
    </div>
  );
};

export default Dashboard;
