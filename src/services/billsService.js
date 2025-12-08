import api from "../api/api";

/**
 * Create a new bill
 * POST /api/bills
 */
export const createBill = async (billData) => {
  try {
    const response = await api.post("/bills", billData);
    // API returns { success: true, data: { bill: {...} } }
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

/**
 * Get all bills with filters and pagination
 * GET /api/bills
 */
export const getBills = async (params = {}) => {
  try {
    // Filter out empty/null/undefined/'all' params to keep URL clean
    const cleanParams = Object.fromEntries(
      Object.entries(params).filter(
        ([_, v]) => v != null && v !== "" && v !== "all"
      )
    );

    const response = await api.get("/bills", { params: cleanParams });
    // API returns { success: true, data: { bills: [], pagination: {} } }
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

/**
 * Get upcoming bills (due in next 7 days or overdue)
 * GET /api/bills/upcoming
 */
export const getUpcomingBills = async () => {
  try {
    const response = await api.get("/bills/upcoming");
    // API returns { success: true, data: { upcoming: [...] } }
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

/**
 * Mark bill as paid
 * PUT /api/bills/:id/paid
 */
export const markBillAsPaid = async (billId) => {
  try {
    const response = await api.put(`/bills/${billId}/paid`);
    // API returns { success: true, data: { bill: {...} } }
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

/**
 * Delete a bill
 * DELETE /api/bills/:id
 */
export const deleteBill = async (billId) => {
  try {
    const response = await api.delete(`/bills/${billId}`);
    // API returns { success: true, data: {} }
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export default {
  createBill,
  getBills,
  getUpcomingBills,
  markBillAsPaid,
  deleteBill,
};
