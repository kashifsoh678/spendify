import api from "../api/api";

/**
 * Set or update monthly budget
 * POST /api/budget
 */
export const setBudget = async (monthlyBudget) => {
  try {
    const response = await api.post("/budget", { monthlyBudget });
    // API returns { success: true, data: { budget: {...} } }
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

/**
 * Get current monthly budget
 * GET /api/budget
 */
export const getBudget = async () => {
  try {
    const response = await api.get("/budget");
    // API returns { success: true, data: { budget: {...} } }
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

/**
 * Get budget status with alert messages
 * GET /api/budget/status
 */
export const getBudgetStatus = async () => {
  try {
    const response = await api.get("/budget/status");
    // API returns { success: true, data: { alert, statusColor, budget: {...} } }
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export default {
  setBudget,
  getBudget,
  getBudgetStatus,
};
