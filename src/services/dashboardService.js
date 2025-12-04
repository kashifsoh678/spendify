import api from '../api/api';

/**
 * Dashboard API Service
 * Handles all API calls for dashboard data with dummy data fallback
 */

// Dummy data for fallback
const dummyData = {
  monthlyTransactions: {
    totalIncome: 120000,
    totalExpenses: 78500,
    categoryTotals: {
      Food: 26700,
      Travel: 15700,
      Utilities: 12000,
      Shopping: 10500,
      Education: 6800,
      Health: 4300,
      Others: 2500
    },
    trendData: [2100, 2800, 1900, 3200, 2500, 2900, 3100, 2400, 2700, 3500, 2200, 2600, 3000, 2800, 3200, 2100, 2900, 3400, 2500, 2700, 3100, 2300, 2800, 3200, 2600, 2900, 3300, 2400, 2700, 3000]
  },
  budgetStatus: {
    monthlyBudget: 100000,
    spentSoFar: 78500,
    remainingBudget: 21500
  },
  upcomingBills: {
    count: 2,
    bills: [
      { id: 1, name: 'Electricity Bill', amount: 3500, dueDate: '2024-12-07' },
      { id: 2, name: 'Internet Bill', amount: 2500, dueDate: '2024-12-05' }
    ]
  },
  aiForecast: {
    predictedOverspending: 18,
    message: 'Based on your current trend, you may exceed your monthly budget by 18%.'
  },
  aiPersonality: {
    label: 'Foodie Spender',
    percentage: 34,
    category: 'Food',
    message: 'You are a Foodie Spender — 34% of your expenses are on Food.'
  },
  aiSavings: {
    category: 'Food',
    percentage: 10,
    amount: 2500,
    message: 'Reduce your food expenses by 10% to save PKR 2,500 this month.'
  },
  recentTransactions: [
    {
      id: 1,
      category: 'Food',
      description: 'Grocery Shopping',
      amount: 3500,
      type: 'expense',
      date: '2024-12-04'
    },
    {
      id: 2,
      category: 'Income',
      description: 'Salary Deposit',
      amount: 120000,
      type: 'income',
      date: '2024-12-01'
    },
    {
      id: 3,
      category: 'Travel',
      description: 'Uber Ride',
      amount: 850,
      type: 'expense',
      date: '2024-12-03'
    },
    {
      id: 4,
      category: 'Shopping',
      description: 'Online Shopping',
      amount: 4200,
      type: 'expense',
      date: '2024-12-02'
    },
    {
      id: 5,
      category: 'Utilities',
      description: 'Internet Bill',
      amount: 2500,
      type: 'expense',
      date: '2024-12-01'
    }
  ]
};

/**
 * Get monthly transactions data
 * @param {string} month - Month in format 'YYYY-MM'
 */
export const getMonthlyTransactions = async (month) => {
  try {
    const response = await api.get(`/transactions/month/${month}`);
    return response.data;
  } catch (error) {
    console.warn('Backend not available, using dummy data for monthly transactions');
    return dummyData.monthlyTransactions;
  }
};

/**
 * Get budget status
 */
export const getBudgetStatus = async () => {
  try {
    const response = await api.get('/budget/status');
    return response.data;
  } catch (error) {
    console.warn('Backend not available, using dummy data for budget status');
    return dummyData.budgetStatus;
  }
};

/**
 * Get upcoming bills
 */
export const getUpcomingBills = async () => {
  try {
    const response = await api.get('/bills/upcoming');
    return response.data;
  } catch (error) {
    console.warn('Backend not available, using dummy data for upcoming bills');
    return dummyData.upcomingBills;
  }
};

/**
 * Get AI spending forecast
 */
export const getAIForecast = async () => {
  try {
    const response = await api.get('/ai/forecast');
    return response.data;
  } catch (error) {
    console.warn('Backend not available, using dummy data for AI forecast');
    return dummyData.aiForecast;
  }
};

/**
 * Get AI personality insight
 */
export const getAIPersonality = async () => {
  try {
    const response = await api.get('/ai/personality');
    return response.data;
  } catch (error) {
    console.warn('Backend not available, using dummy data for AI personality');
    return dummyData.aiPersonality;
  }
};

/**
 * Get AI savings suggestions
 */
export const getAISavings = async () => {
  try {
    const response = await api.get('/ai/savings');
    return response.data;
  } catch (error) {
    console.warn('Backend not available, using dummy data for AI savings');
    return dummyData.aiSavings;
  }
};

/**
 * Get recent transactions
 * @param {number} limit - Number of transactions to fetch
 */
export const getRecentTransactions = async (limit = 5) => {
  try {
    const response = await api.get(`/transactions?limit=${limit}`);
    return response.data;
  } catch (error) {
    console.warn('Backend not available, using dummy data for recent transactions');
    return dummyData.recentTransactions.slice(0, limit);
  }
};

/**
 * Get all dashboard data in one call (optional optimization)
 */
export const getDashboardData = async () => {
  try {
    const currentMonth = new Date().toISOString().slice(0, 7); // Format: YYYY-MM
    
    const [
      monthlyTransactions,
      budgetStatus,
      upcomingBills,
      aiForecast,
      aiPersonality,
      aiSavings,
      recentTransactions
    ] = await Promise.all([
      getMonthlyTransactions(currentMonth),
      getBudgetStatus(),
      getUpcomingBills(),
      getAIForecast(),
      getAIPersonality(),
      getAISavings(),
      getRecentTransactions(5)
    ]);

    return {
      monthlyTransactions,
      budgetStatus,
      upcomingBills,
      aiForecast,
      aiPersonality,
      aiSavings,
      recentTransactions
    };
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    throw error;
  }
};

export default {
  getMonthlyTransactions,
  getBudgetStatus,
  getUpcomingBills,
  getAIForecast,
  getAIPersonality,
  getAISavings,
  getRecentTransactions,
  getDashboardData
};
