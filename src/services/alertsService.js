import api from "../api/api";

/**
 * Get all alerts
 * @param {Object} params - Query parameters { type, severity, isRead, limit }
 * @returns {Promise<Object>} Alerts data
 */
export const getAlerts = async (params = {}) => {
  try {
    const response = await api.get("/alerts", { params });
    return response.data?.data || response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

/**
 * Mark a single alert as read
 * @param {string} alertId - Alert ID
 * @returns {Promise<Object>} Updated alert
 */
export const markAlertAsRead = async (alertId) => {
  try {
    const response = await api.patch(`/alerts/${alertId}/read`);
    return response.data?.data || response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

/**
 * Mark all alerts as read
 * @returns {Promise<Object>} Update count
 */
export const markAllAlertsAsRead = async () => {
  try {
    const response = await api.patch("/alerts/read-all");
    return response.data?.data || response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

/**
 * Generate alerts (triggers alert generation on backend)
 * @returns {Promise<Object>} Generation result
 */
export const generateAlerts = async () => {
  try {
    const response = await api.post("/alerts/generate");
    return response.data?.data || response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export default {
  getAlerts,
  markAlertAsRead,
  markAllAlertsAsRead,
  generateAlerts,
};
