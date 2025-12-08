import api from "../api/api";

// 1. Add Transaction
export const addTransaction = async (transactionData) => {
  try {
    const response = await api.post("/transactions", transactionData);
    // Return the full response body so context can handle `data` wrapper or direct access
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// 2. Get All Transactions (with filters & pagination)
export const getTransactions = async (params = {}) => {
  try {
    // Filter out empty/null/undefined params to keep the URL clean
    const cleanParams = Object.fromEntries(
      Object.entries(params).filter(
        ([_, v]) => v != null && v !== "" && v !== "all"
      )
    );

    const response = await api.get("/transactions", { params: cleanParams });
    // API returns { success: true, data: { transactions: [], pagination: {} } }
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// 3. Get Monthly Transactions (Analytics)
export const getMonthlyTransactions = async (year, month) => {
  try {
    const response = await api.get(`/transactions/month/${year}-${month}`);
    return response.data.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// 4. Delete Transaction
export const deleteTransaction = async (id) => {
  try {
    const response = await api.delete(`/transactions/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// 5. Update Transaction
export const updateTransaction = async (id, transactionData) => {
  try {
    const response = await api.put(`/transactions/${id}`, transactionData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Also export commonly named methods if used elsewhere to avoid breakages during transition,
// strictly mapping to the new API calls.
export const getMonthlyStats = async () => {
  // If the frontend needs "stats" specifically, we might derive it from getMonthlyTransactions
  // For now, let's assume the component will call getMonthlyTransactions
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  return getMonthlyTransactions(year, month);
};
