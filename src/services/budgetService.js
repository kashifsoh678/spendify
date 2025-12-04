import api from '../api/api';

// Dummy budget data
const dummyBudgetData = {
  monthlyBudget: 100000,
  month: '2024-12',
  createdAt: '2024-12-01T00:00:00Z'
};

// Helper to calculate spending from transactions (dummy data)
const calculateSpentFromTransactions = () => {
  // This would normally come from the transactions API
  // For now, return a reasonable amount based on the dummy transactions
  return 62500; // This matches the dummy transaction data
};

const dummyBudgetStatus = {
  monthlyBudget: 100000,
  spentSoFar: 62500,
  remaining: 37500,
  percentUsed: 62.5,
  alerts: [
    {
      type: 'warning',
      message: 'You have reached 62% of your monthly budget.',
      severity: 'medium'
    }
  ]
};

const dummyAIForecast = {
  prediction: 'overspend',
  estimatedOverspend: 18,
  message: 'Based on your spending pattern, you may overspend by 18% this month.',
  confidence: 0.85,
  recommendations: [
    'Reduce dining out expenses',
    'Monitor entertainment spending',
    'Consider postponing non-essential purchases'
  ]
};

/**
 * Get current monthly budget
 */
export const getBudget = async () => {
  try {
    const response = await api.get('/budget');
    return response.data;
  } catch (error) {
    console.warn('Backend not available, using dummy data for budget');
    return dummyBudgetData;
  }
};

/**
 * Set or update monthly budget
 */
export const setBudget = async (amount) => {
  try {
    const response = await api.post('/budget', { amount });
    return response.data;
  } catch (error) {
    console.warn('Backend not available, simulating budget update');
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Update dummy data
    dummyBudgetData.monthlyBudget = amount;
    dummyBudgetData.month = new Date().toISOString().slice(0, 7);
    dummyBudgetData.createdAt = new Date().toISOString();
    
    // Get current spending (this should come from transactions)
    const spentSoFar = calculateSpentFromTransactions();
    
    // Recalculate status with proper values
    dummyBudgetStatus.monthlyBudget = amount;
    dummyBudgetStatus.spentSoFar = spentSoFar;
    dummyBudgetStatus.remaining = amount - spentSoFar;
    dummyBudgetStatus.percentUsed = amount > 0 ? (spentSoFar / amount) * 100 : 0;
    
    // Update alerts based on new percentage
    dummyBudgetStatus.alerts = generateAlerts(dummyBudgetStatus.percentUsed);
    
    return dummyBudgetData;
  }
};

/**
 * Get budget status (spending summary)
 */
export const getBudgetStatus = async () => {
  try {
    const response = await api.get('/budget/status');
    return response.data;
  } catch (error) {
    console.warn('Backend not available, using dummy data for budget status');
    
    // Ensure percentUsed is calculated correctly
    const spentSoFar = dummyBudgetStatus.spentSoFar;
    const monthlyBudget = dummyBudgetStatus.monthlyBudget;
    
    return {
      ...dummyBudgetStatus,
      percentUsed: monthlyBudget > 0 ? (spentSoFar / monthlyBudget) * 100 : 0,
      remaining: monthlyBudget - spentSoFar
    };
  }
};

/**
 * Get AI forecast for budget
 */
export const getAIForecast = async () => {
  try {
    const response = await api.get('/ai/forecast');
    return response.data;
  } catch (error) {
    console.warn('Backend not available, using dummy data for AI forecast');
    return dummyAIForecast;
  }
};

/**
 * Helper function to generate alerts based on percentage
 */
const generateAlerts = (percentUsed) => {
  const alerts = [];
  
  if (percentUsed >= 85 && percentUsed < 100) {
    alerts.push({
      type: 'warning',
      message: `You have reached ${Math.round(percentUsed)}% of your monthly budget.`,
      severity: 'high'
    });
  } else if (percentUsed >= 100) {
    alerts.push({
      type: 'danger',
      message: 'You have exceeded your monthly budget!',
      severity: 'critical'
    });
  } else if (percentUsed >= 50) {
    alerts.push({
      type: 'info',
      message: `You have used ${Math.round(percentUsed)}% of your monthly budget.`,
      severity: 'medium'
    });
  }
  
  return alerts;
};

export default {
  getBudget,
  setBudget,
  getBudgetStatus,
  getAIForecast
};
