import api from "../api/api";

/**
 * Get dashboard KPIs (summary statistics)
 * @returns {Promise<Object>} KPI data
 */
export const getDashboardKPIs = async () => {
  try {
    const response = await api.get("/dashboard/kpis");
    return response.data?.data || response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

/**
 * Get category spending breakdown
 * @param {string} month - Optional month in YYYY-MM format
 * @returns {Promise<Object>} Category spending data
 */
export const getCategorySpending = async (month) => {
  try {
    const params = month ? { month } : {};
    const response = await api.get("/dashboard/category-spending", { params });
    return response.data?.data || response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

/**
 * Get monthly spending trend
 * @param {string} month - Optional month in YYYY-MM format
 * @returns {Promise<Object>} Spending trend data
 */
export const getSpendingTrend = async (month) => {
  try {
    const params = month ? { month } : {};
    const response = await api.get("/dashboard/spending-trend", { params });
    return response.data?.data || response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export default {
  getDashboardKPIs,
  getCategorySpending,
  getSpendingTrend,
};
