import api from '../api/api';

// Dummy bills data - expanded for pagination testing
const dummyBills = [
  {
    id: 1,
    billName: 'Electricity Bill',
    amount: 3500,
    dueDate: '2024-12-08',
    status: 'pending',
    createdAt: '2024-12-01T00:00:00Z'
  },
  {
    id: 2,
    billName: 'Internet Bill',
    amount: 2500,
    dueDate: '2024-12-12',
    status: 'pending',
    createdAt: '2024-12-01T00:00:00Z'
  },
  {
    id: 3,
    billName: 'Rent',
    amount: 25000,
    dueDate: '2024-12-05',
    status: 'paid',
    createdAt: '2024-11-25T00:00:00Z'
  },
  {
    id: 4,
    billName: 'Water Bill',
    amount: 1200,
    dueDate: '2024-12-15',
    status: 'pending',
    createdAt: '2024-12-01T00:00:00Z'
  },
  {
    id: 5,
    billName: 'Netflix Subscription',
    amount: 1500,
    dueDate: '2024-12-20',
    status: 'pending',
    createdAt: '2024-11-20T00:00:00Z'
  },
  {
    id: 6,
    billName: 'Gas Bill',
    amount: 2800,
    dueDate: '2024-12-10',
    status: 'pending',
    createdAt: '2024-12-01T00:00:00Z'
  },
  {
    id: 7,
    billName: 'Phone Bill',
    amount: 1800,
    dueDate: '2024-12-18',
    status: 'pending',
    createdAt: '2024-12-01T00:00:00Z'
  },
  {
    id: 8,
    billName: 'Car Insurance',
    amount: 12000,
    dueDate: '2024-12-25',
    status: 'pending',
    createdAt: '2024-11-15T00:00:00Z'
  },
  {
    id: 9,
    billName: 'Gym Membership',
    amount: 3000,
    dueDate: '2024-12-07',
    status: 'pending',
    createdAt: '2024-11-28T00:00:00Z'
  },
  {
    id: 10,
    billName: 'Credit Card Payment',
    amount: 15000,
    dueDate: '2024-12-22',
    status: 'pending',
    createdAt: '2024-11-20T00:00:00Z'
  },
  {
    id: 11,
    billName: 'Spotify Premium',
    amount: 900,
    dueDate: '2024-12-14',
    status: 'pending',
    createdAt: '2024-11-14T00:00:00Z'
  },
  {
    id: 12,
    billName: 'Amazon Prime',
    amount: 1200,
    dueDate: '2024-12-28',
    status: 'pending',
    createdAt: '2024-11-28T00:00:00Z'
  },
  {
    id: 13,
    billName: 'House Maintenance',
    amount: 5000,
    dueDate: '2024-12-30',
    status: 'pending',
    createdAt: '2024-11-30T00:00:00Z'
  },
  {
    id: 14,
    billName: 'School Fee',
    amount: 20000,
    dueDate: '2024-12-06',
    status: 'paid',
    createdAt: '2024-11-25T00:00:00Z'
  },
  {
    id: 15,
    billName: 'Cable TV',
    amount: 2200,
    dueDate: '2024-12-11',
    status: 'pending',
    createdAt: '2024-12-01T00:00:00Z'
  },
  {
    id: 16,
    billName: 'Home Loan EMI',
    amount: 35000,
    dueDate: '2024-12-03',
    status: 'paid',
    createdAt: '2024-11-20T00:00:00Z'
  },
  {
    id: 17,
    billName: 'Medical Insurance',
    amount: 8000,
    dueDate: '2024-12-27',
    status: 'pending',
    createdAt: '2024-11-27T00:00:00Z'
  },
  {
    id: 18,
    billName: 'Newspaper Subscription',
    amount: 500,
    dueDate: '2024-12-09',
    status: 'pending',
    createdAt: '2024-12-01T00:00:00Z'
  },
  {
    id: 19,
    billName: 'Cleaning Service',
    amount: 3500,
    dueDate: '2024-12-16',
    status: 'pending',
    createdAt: '2024-12-01T00:00:00Z'
  },
  {
    id: 20,
    billName: 'Security Charges',
    amount: 2000,
    dueDate: '2024-12-19',
    status: 'pending',
    createdAt: '2024-11-19T00:00:00Z'
  },
  {
    id: 21,
    billName: 'Parking Fee',
    amount: 1500,
    dueDate: '2024-12-13',
    status: 'pending',
    createdAt: '2024-12-01T00:00:00Z'
  },
  {
    id: 22,
    billName: 'YouTube Premium',
    amount: 800,
    dueDate: '2024-12-21',
    status: 'pending',
    createdAt: '2024-11-21T00:00:00Z'
  },
  {
    id: 23,
    billName: 'Cloud Storage',
    amount: 600,
    dueDate: '2024-12-24',
    status: 'pending',
    createdAt: '2024-11-24T00:00:00Z'
  },
  {
    id: 24,
    billName: 'Pest Control',
    amount: 2500,
    dueDate: '2024-12-26',
    status: 'pending',
    createdAt: '2024-11-26T00:00:00Z'
  },
  {
    id: 25,
    billName: 'Society Maintenance',
    amount: 4000,
    dueDate: '2024-12-04',
    status: 'paid',
    createdAt: '2024-11-20T00:00:00Z'
  }
];

/**
 * Calculate days left until due date
 */
const calculateDaysLeft = (dueDate) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(dueDate);
  due.setHours(0, 0, 0, 0);
  const diffTime = due - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

/**
 * Get all bills with filtering and pagination
 */
export const getBills = async (params = {}) => {
  try {
    // Construct query string from params
    const queryParams = new URLSearchParams();
    if (params.page) queryParams.append('page', params.page);
    if (params.limit) queryParams.append('limit', params.limit);
    if (params.search) queryParams.append('search', params.search);
    if (params.status && params.status !== 'all') queryParams.append('status', params.status);
    if (params.startDate) queryParams.append('startDate', params.startDate);
    if (params.endDate) queryParams.append('endDate', params.endDate);

    const response = await api.get(`/bills?${queryParams.toString()}`);
    return response.data;
  } catch (error) {
    console.warn('Backend not available, using dummy data for bills');
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    let filteredBills = dummyBills.map(bill => ({
      ...bill,
      daysLeft: calculateDaysLeft(bill.dueDate)
    }));

    // Apply filters
    if (params.search) {
      const searchLower = params.search.toLowerCase();
      filteredBills = filteredBills.filter(bill => 
        bill.billName.toLowerCase().includes(searchLower)
      );
    }

    if (params.status && params.status !== 'all') {
      if (params.status === 'overdue') {
        filteredBills = filteredBills.filter(bill => bill.status === 'pending' && bill.daysLeft < 0);
      } else {
        filteredBills = filteredBills.filter(bill => bill.status === params.status);
      }
    }

    if (params.startDate) {
      filteredBills = filteredBills.filter(bill => bill.dueDate >= params.startDate);
    }

    if (params.endDate) {
      filteredBills = filteredBills.filter(bill => bill.dueDate <= params.endDate);
    }

    // Sort by due date
    filteredBills.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

    // Pagination
    const page = params.page || 1;
    const limit = params.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedBills = filteredBills.slice(startIndex, endIndex);
    const totalPages = Math.ceil(filteredBills.length / limit);

    return {
      bills: paginatedBills,
      totalPages,
      currentPage: page,
      totalBills: filteredBills.length
    };
  }
};

/**
 * Get upcoming bills (due soon)
 */
export const getUpcomingBills = async () => {
  try {
    const response = await api.get('/bills/upcoming');
    return response.data;
  } catch (error) {
    console.warn('Backend not available, using dummy data for upcoming bills');
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return dummyBills
      .filter(bill => {
        const daysLeft = calculateDaysLeft(bill.dueDate);
        return bill.status === 'pending' && daysLeft <= 7;
      })
      .map(bill => ({
        ...bill,
        daysLeft: calculateDaysLeft(bill.dueDate)
      }))
      .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  }
};

/**
 * Add a new bill
 */
export const addBill = async (billData) => {
  try {
    const response = await api.post('/bills', billData);
    return response.data;
  } catch (error) {
    console.warn('Backend not available, simulating bill creation');
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newBill = {
      id: dummyBills.length + 1,
      ...billData,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    
    dummyBills.push(newBill);
    return newBill;
  }
};

/**
 * Update bill (mark as paid)
 */
export const updateBill = async (id, data) => {
  try {
    const response = await api.put(`/bills/${id}`, data);
    return response.data;
  } catch (error) {
    console.warn('Backend not available, simulating bill update');
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const billIndex = dummyBills.findIndex(b => b.id === id);
    if (billIndex !== -1) {
      dummyBills[billIndex] = { ...dummyBills[billIndex], ...data };
      return dummyBills[billIndex];
    }
    throw new Error('Bill not found');
  }
};

/**
 * Delete a bill
 */
export const deleteBill = async (id) => {
  try {
    await api.delete(`/bills/${id}`);
    return { success: true };
  } catch (error) {
    console.warn('Backend not available, simulating bill deletion');
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const billIndex = dummyBills.findIndex(b => b.id === id);
    if (billIndex !== -1) {
      dummyBills.splice(billIndex, 1);
      return { success: true };
    }
    throw new Error('Bill not found');
  }
};

export default {
  getBills,
  getUpcomingBills,
  addBill,
  updateBill,
  deleteBill
};
