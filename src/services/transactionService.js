import api from '../api/api';

// Dummy transactions data
const dummyTransactions = [
  {
    id: 1,
    amount: 120000,
    type: 'income',
    category: 'salary',
    note: 'Monthly salary',
    mood: 'happy',
    date: '2024-12-01'
  },
  {
    id: 2,
    amount: 3500,
    type: 'expense',
    category: 'food',
    note: 'Grocery shopping',
    mood: 'neutral',
    date: '2024-12-04'
  },
  {
    id: 3,
    amount: 850,
    type: 'expense',
    category: 'travel',
    note: 'Uber ride to office',
    mood: 'neutral',
    date: '2024-12-03'
  },
  {
    id: 4,
    amount: 4200,
    type: 'expense',
    category: 'shopping',
    note: 'New clothes',
    mood: 'happy',
    date: '2024-12-02'
  },
  {
    id: 5,
    amount: 2500,
    type: 'expense',
    category: 'utilities',
    note: 'Internet bill',
    mood: 'neutral',
    date: '2024-12-01'
  },
  {
    id: 6,
    amount: 15000,
    type: 'income',
    category: 'freelance',
    note: 'Website project',
    mood: 'happy',
    date: '2024-12-05'
  },
  {
    id: 7,
    amount: 1200,
    type: 'expense',
    category: 'food',
    note: 'Restaurant dinner',
    mood: 'happy',
    date: '2024-12-06'
  },
  {
    id: 8,
    amount: 5000,
    type: 'expense',
    category: 'health',
    note: 'Medical checkup',
    mood: 'neutral',
    date: '2024-12-07'
  },
  {
    id: 9,
    amount: 8000,
    type: 'income',
    category: 'freelance',
    note: 'Logo design project',
    mood: 'happy',
    date: '2024-12-08'
  },
  {
    id: 10,
    amount: 2800,
    type: 'expense',
    category: 'food',
    note: 'Weekly groceries',
    mood: 'neutral',
    date: '2024-12-09'
  },
  {
    id: 11,
    amount: 1500,
    type: 'expense',
    category: 'entertainment',
    note: 'Movie tickets and popcorn',
    mood: 'happy',
    date: '2024-12-10'
  },
  {
    id: 12,
    amount: 3200,
    type: 'expense',
    category: 'utilities',
    note: 'Electricity bill',
    mood: 'sad',
    date: '2024-12-11'
  },
  {
    id: 13,
    amount: 25000,
    type: 'income',
    category: 'business',
    note: 'Consulting fee',
    mood: 'happy',
    date: '2024-12-12'
  },
  {
    id: 14,
    amount: 950,
    type: 'expense',
    category: 'travel',
    note: 'Fuel for car',
    mood: 'neutral',
    date: '2024-12-13'
  },
  {
    id: 15,
    amount: 6500,
    type: 'expense',
    category: 'shopping',
    note: 'Electronics purchase',
    mood: 'happy',
    date: '2024-12-14'
  },
  {
    id: 16,
    amount: 1800,
    type: 'expense',
    category: 'food',
    note: 'Family dinner',
    mood: 'happy',
    date: '2024-12-15'
  },
  {
    id: 17,
    amount: 12000,
    type: 'income',
    category: 'freelance',
    note: 'Mobile app development',
    mood: 'happy',
    date: '2024-12-16'
  },
  {
    id: 18,
    amount: 4500,
    type: 'expense',
    category: 'education',
    note: 'Online course subscription',
    mood: 'neutral',
    date: '2024-12-17'
  },
  {
    id: 19,
    amount: 750,
    type: 'expense',
    category: 'travel',
    note: 'Bus fare',
    mood: 'neutral',
    date: '2024-12-18'
  },
  {
    id: 20,
    amount: 3000,
    type: 'income',
    category: 'gift',
    note: 'Birthday gift money',
    mood: 'happy',
    date: '2024-12-19'
  },
  {
    id: 21,
    amount: 2200,
    type: 'expense',
    category: 'health',
    note: 'Pharmacy medicines',
    mood: 'neutral',
    date: '2024-12-20'
  },
  {
    id: 22,
    amount: 5800,
    type: 'expense',
    category: 'shopping',
    note: 'Gifts for family',
    mood: 'happy',
    date: '2024-12-21'
  },
  {
    id: 23,
    amount: 1200,
    type: 'expense',
    category: 'entertainment',
    note: 'Concert tickets',
    mood: 'happy',
    date: '2024-12-22'
  },
  {
    id: 24,
    amount: 18000,
    type: 'income',
    category: 'freelance',
    note: 'UI/UX design project',
    mood: 'happy',
    date: '2024-12-23'
  },
  {
    id: 25,
    amount: 3500,
    type: 'expense',
    category: 'food',
    note: 'Christmas dinner shopping',
    mood: 'happy',
    date: '2024-12-24'
  }
];

/**
 * Get transactions with filters
 */
export const getTransactions = async (params = {}) => {
  try {
    const { page = 1, limit = 10, type = 'all', category = 'all', search = '', startDate = '', endDate = '' } = params;
    
    const queryParams = new URLSearchParams({
      page,
      limit,
      type,
      category,
      search,
      startDate,
      endDate
    }).toString();

    const response = await api.get(`/transactions?${queryParams}`);
    return response.data;
  } catch (error) {
    console.warn('Backend not available, using dummy data for transactions');
    
    // Apply filters to dummy data
    let filtered = [...dummyTransactions];
    
    // Filter by type
    if (params.type && params.type !== 'all') {
      filtered = filtered.filter(t => t.type === params.type);
    }
    
    // Filter by category
    if (params.category && params.category !== 'all') {
      filtered = filtered.filter(t => t.category === params.category);
    }
    
    // Filter by search
    if (params.search) {
      const searchLower = params.search.toLowerCase();
      filtered = filtered.filter(t => t.note.toLowerCase().includes(searchLower));
    }
    
    // Filter by date range
    if (params.startDate) {
      filtered = filtered.filter(t => new Date(t.date) >= new Date(params.startDate));
    }
    if (params.endDate) {
      filtered = filtered.filter(t => new Date(t.date) <= new Date(params.endDate));
    }
    
    // Sort by date (latest first)
    filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Pagination
    const page = params.page || 1;
    const limit = params.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedData = filtered.slice(startIndex, endIndex);
    
    return {
      transactions: paginatedData,
      total: filtered.length,
      page,
      totalPages: Math.ceil(filtered.length / limit)
    };
  }
};

/**
 * Get monthly transaction stats
 */
export const getMonthlyStats = async () => {
  try {
    const response = await api.get('/transactions/stats/monthly');
    return response.data;
  } catch (error) {
    console.warn('Backend not available, using dummy data for monthly stats');
    
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    const monthlyTransactions = dummyTransactions.filter(t => {
      const date = new Date(t.date);
      return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
    });
    
    const totalIncome = monthlyTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const totalExpenses = monthlyTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    
    return {
      totalIncome,
      totalExpenses,
      netBalance: totalIncome - totalExpenses
    };
  }
};

/**
 * Add new transaction
 */
export const addTransaction = async (transactionData) => {
  try {
    const response = await api.post('/transactions', transactionData);
    return response.data;
  } catch (error) {
    console.warn('Backend not available, simulating transaction creation');
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newTransaction = {
      id: Date.now(),
      ...transactionData,
      createdAt: new Date().toISOString()
    };
    
    // Add to dummy data (in real app, this would be handled by backend)
    dummyTransactions.unshift(newTransaction);
    
    return newTransaction;
  }
};

/**
 * Update transaction
 */
export const updateTransaction = async (id, transactionData) => {
  try {
    const response = await api.put(`/transactions/${id}`, transactionData);
    return response.data;
  } catch (error) {
    console.warn('Backend not available, simulating transaction update');
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const index = dummyTransactions.findIndex(t => t.id === id);
    if (index !== -1) {
      dummyTransactions[index] = { ...dummyTransactions[index], ...transactionData };
      return dummyTransactions[index];
    }
    
    throw new Error('Transaction not found');
  }
};

/**
 * Delete transaction
 */
export const deleteTransaction = async (id) => {
  try {
    const response = await api.delete(`/transactions/${id}`);
    return response.data;
  } catch (error) {
    console.warn('Backend not available, simulating transaction deletion');
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const index = dummyTransactions.findIndex(t => t.id === id);
    if (index !== -1) {
      dummyTransactions.splice(index, 1);
      return { success: true };
    }
    
    throw new Error('Transaction not found');
  }
};

export default {
  getTransactions,
  getMonthlyStats,
  addTransaction,
  updateTransaction,
  deleteTransaction
};
