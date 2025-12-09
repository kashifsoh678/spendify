import api from "../api/api";

// Helper to generate month options
export const getMonthOptions = () => {
  const months = [];
  const currentDate = new Date();

  for (let i = 0; i < 12; i++) {
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - i,
      1
    );
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const monthName = date.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });

    months.push({
      value: `${year}-${month}`,
      label: monthName,
    });
  }

  return months;
};

// Dummy report data
const generateDummyReport = (month) => {
  return {
    month,
    summary: {
      income: 120000,
      expenses: 78100,
      savings: 41900,
      topCategory: "Food & Dining",
    },
    categoryBreakdown: [
      {
        category: "Food & Dining",
        amount: 20000,
        percent: 26,
        color: "rgba(239, 68, 68, 0.8)",
      },
      {
        category: "Travel",
        amount: 12000,
        percent: 15,
        color: "rgba(59, 130, 246, 0.8)",
      },
      {
        category: "Utilities",
        amount: 9000,
        percent: 11,
        color: "rgba(16, 185, 129, 0.8)",
      },
      {
        category: "Shopping",
        amount: 8500,
        percent: 11,
        color: "rgba(245, 158, 11, 0.8)",
      },
      {
        category: "Entertainment",
        amount: 7200,
        percent: 9,
        color: "rgba(139, 92, 246, 0.8)",
      },
      {
        category: "Healthcare",
        amount: 6400,
        percent: 8,
        color: "rgba(236, 72, 153, 0.8)",
      },
      {
        category: "Education",
        amount: 5000,
        percent: 6,
        color: "rgba(107, 114, 128, 0.8)",
      },
      {
        category: "Transportation",
        amount: 4500,
        percent: 6,
        color: "rgba(239, 68, 68, 0.8)",
      },
      {
        category: "Bills",
        amount: 3500,
        percent: 4,
        color: "rgba(59, 130, 246, 0.8)",
      },
      {
        category: "Others",
        amount: 2000,
        percent: 3,
        color: "rgba(16, 185, 129, 0.8)",
      },
    ],
    trend: [
      { date: "2024-12-01", amount: 1300 },
      { date: "2024-12-02", amount: 2200 },
      { date: "2024-12-03", amount: 1800 },
      { date: "2024-12-04", amount: 3100 },
      { date: "2024-12-05", amount: 2500 },
      { date: "2024-12-06", amount: 1900 },
      { date: "2024-12-07", amount: 2800 },
      { date: "2024-12-08", amount: 3500 },
      { date: "2024-12-09", amount: 2100 },
      { date: "2024-12-10", amount: 2700 },
      { date: "2024-12-11", amount: 1600 },
      { date: "2024-12-12", amount: 2900 },
      { date: "2024-12-13", amount: 3200 },
      { date: "2024-12-14", amount: 2400 },
      { date: "2024-12-15", amount: 2000 },
      { date: "2024-12-16", amount: 1700 },
      { date: "2024-12-17", amount: 2600 },
      { date: "2024-12-18", amount: 3400 },
      { date: "2024-12-19", amount: 2300 },
      { date: "2024-12-20", amount: 2800 },
      { date: "2024-12-21", amount: 1900 },
      { date: "2024-12-22", amount: 2500 },
      { date: "2024-12-23", amount: 3100 },
      { date: "2024-12-24", amount: 2700 },
      { date: "2024-12-25", amount: 1500 },
      { date: "2024-12-26", amount: 2200 },
      { date: "2024-12-27", amount: 2900 },
      { date: "2024-12-28", amount: 2400 },
      { date: "2024-12-29", amount: 1800 },
      { date: "2024-12-30", amount: 2100 },
    ],
    transactions: [
      {
        id: 1,
        date: "2024-12-01",
        category: "Food & Dining",
        amount: 500,
        type: "expense",
        note: "Lunch at restaurant",
      },
      {
        id: 2,
        date: "2024-12-01",
        category: "Travel",
        amount: 800,
        type: "expense",
        note: "Uber ride",
      },
      {
        id: 3,
        date: "2024-12-02",
        category: "Shopping",
        amount: 1200,
        type: "expense",
        note: "Clothing",
      },
      {
        id: 4,
        date: "2024-12-02",
        category: "Salary",
        amount: 50000,
        type: "income",
        note: "Monthly salary",
      },
      {
        id: 5,
        date: "2024-12-03",
        category: "Food & Dining",
        amount: 350,
        type: "expense",
        note: "Grocery shopping",
      },
      {
        id: 6,
        date: "2024-12-03",
        category: "Entertainment",
        amount: 600,
        type: "expense",
        note: "Movie tickets",
      },
      {
        id: 7,
        date: "2024-12-04",
        category: "Utilities",
        amount: 2500,
        type: "expense",
        note: "Electricity bill",
      },
      {
        id: 8,
        date: "2024-12-05",
        category: "Food & Dining",
        amount: 450,
        type: "expense",
        note: "Dinner",
      },
      {
        id: 9,
        date: "2024-12-06",
        category: "Transportation",
        amount: 1200,
        type: "expense",
        note: "Fuel",
      },
      {
        id: 10,
        date: "2024-12-07",
        category: "Healthcare",
        amount: 1500,
        type: "expense",
        note: "Doctor visit",
      },
      {
        id: 11,
        date: "2024-12-08",
        category: "Food & Dining",
        amount: 700,
        type: "expense",
        note: "Food delivery",
      },
      {
        id: 12,
        date: "2024-12-09",
        category: "Education",
        amount: 3000,
        type: "expense",
        note: "Online course",
      },
      {
        id: 13,
        date: "2024-12-10",
        category: "Shopping",
        amount: 2200,
        type: "expense",
        note: "Electronics",
      },
      {
        id: 14,
        date: "2024-12-11",
        category: "Food & Dining",
        amount: 400,
        type: "expense",
        note: "Breakfast",
      },
      {
        id: 15,
        date: "2024-12-12",
        category: "Entertainment",
        amount: 800,
        type: "expense",
        note: "Concert tickets",
      },
    ],
  };
};

// Chart colors for fallback
const CHART_COLORS = [
  "#10B981",
  "#3B82F6",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#EC4899",
  "#6366F1",
  "#14B8A6",
  "#F97316",
  "#06B6D4",
];

/**
 * Get monthly report data
 * @param {string} month - YYYY-MM
 * @param {Object} params - Filters like { page, limit, type, search, category, startDate, endDate }
 */
export const getMonthlyReport = async (month, params = {}) => {
  try {
    // 1. Prepare query parameters
    const queryParams = {
      month,
      ...Object.fromEntries(
        Object.entries(params).filter(
          ([_, v]) => v != null && v !== "" && v !== "all"
        )
      ),
    };

    const response = await api.get("/reports/monthly", { params: queryParams });
    const data = response.data?.data || response.data;

    // 2. Map API response to UI expected format
    if (data) {
      return {
        ...data,
        summary: {
          income: data.summary?.totalIncome || 0,
          expenses: data.summary?.totalExpenses || 0,
          savings: data.summary?.savings || 0,
          topCategory:
            data.summary?.topCategory?.category ||
            data.categoryBreakdown?.[0]?.category ||
            "N/A",
        },
        categoryBreakdown:
          data.categoryBreakdown?.map((cat, index) => ({
            ...cat,
            percent: cat.percentage, // Map percentage to percent
            color: cat.color || CHART_COLORS[index % CHART_COLORS.length], // Fallback color
          })) || [],
        trend:
          data.trend?.map((item) => ({
            date: `${month}-${String(item.day).padStart(2, "0")}`, // Construct full date
            amount: item.amount,
          })) || [],

        // Ensure transactions and pagination are passed through
        transactions: data.transactions || [],
        pagination: data.pagination
          ? {
              page: data.pagination.page || Number(params.page) || 1,
              limit: data.pagination.limit || Number(params.limit) || 10,
              totalPages:
                data.pagination.totalPages ||
                (data.pagination.total
                  ? Math.ceil(
                      data.pagination.total /
                        (data.pagination.limit || params.limit || 10)
                    )
                  : 1),
              total: data.pagination.total || 0,
            }
          : {
              page: Number(params.page) || 1,
              limit: Number(params.limit) || 10,
              totalPages: 1,
              total: 0,
            },
      };
    }
    return data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

/**
 * Export monthly report as PDF
 * Note: Backend exports ALL transactions for the month (no pagination or filters)
 * @param {string} month - YYYY-MM
 */
export const getMonthlyReportPDF = async (month) => {
  try {
    const response = await api.get("/reports/monthly/pdf", {
      params: { month },
      responseType: "blob",
    });
    return response.data;
  } catch (error) {
    console.warn("Backend not available, simulating PDF export");
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Create a simple text blob as placeholder
    const content = `Monthly Report - ${month}\n\nThis is a placeholder PDF.\nIn production, the backend will generate a proper PDF file.`;
    return new Blob([content], { type: "application/pdf" });
  }
};

/**
 * Export monthly report as CSV
 * Note: Backend exports ALL transactions for the month (no pagination or filters)
 * @param {string} month - YYYY-MM
 */
export const getMonthlyReportCSV = async (month) => {
  try {
    const response = await api.get("/reports/monthly/csv", {
      params: { month },
      responseType: "blob",
    });
    return response.data;
  } catch (error) {
    console.warn("Backend not available, generating CSV from dummy data");
    await new Promise((resolve) => setTimeout(resolve, 500));

    const report = generateDummyReport(month);

    // Generate CSV content
    const headers = ["Date", "Category", "Type", "Note", "Amount"];
    const rows = report.transactions.map((t) => [
      t.date,
      t.category,
      t.type,
      t.note,
      t.amount,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    return new Blob([csvContent], { type: "text/csv" });
  }
};

/**
 * Helper to download blob as file
 */
export const downloadFile = (blob, filename) => {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

export default {
  getMonthOptions,
  getMonthlyReport,
  getMonthlyReportPDF,
  getMonthlyReportCSV,
  downloadFile,
};
