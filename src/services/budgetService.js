import api from "../api/api";

/**
 * Set or update monthly budget
 * POST /api/budget
 */
export const setBudget = async (monthlyBudget) => {
  try {
    const response = await api.post("/budget", { monthlyBudget });
    // API returns { success: true, data: { budget: {...} } }
    return response.data?.data || response.data;
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
    return response.data?.data || response.data;
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
    return response.data?.data || response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

/**
 * Get prioritized alerts
 * GET /api/alerts
 */
export const getAlerts = async () => {
  try {
    const response = await api.get("/alerts");
    // API returns { success: true, data: { alerts: [...] } }
    return response.data?.data?.alerts || response.data?.alerts || [];
  } catch (error) {
    console.warn("API /api/alerts failed, using dummy data");
    return [
      {
        id: "1",
        type: "danger",
        message: "Overdue: Electricity Bill due on 12/01/2025.",
        date: new Date().toISOString(),
        isRead: false,
      },
      {
        id: "2",
        type: "warning",
        message: "Wifi Bill is due in 2 days.",
        date: new Date(Date.now() + 86400000 * 2).toISOString(),
        isRead: false,
      },
      {
        id: "3",
        type: "warning",
        message: "You have exceeded 85% of your monthly budget.",
        date: new Date().toISOString(),
        isRead: false,
      },
    ];
  }
};

export default {
  setBudget,
  getBudget,
  getBudgetStatus,
  getAlerts,
};
