import api from "../api/api";

// Dummy Data
const DUMMY_PROFILE = {
  name: "Talha Saleem",
  email: "talha@example.com",
  avatar: null,
};

const DUMMY_CATEGORIES = [
  { id: "1", name: "Food & Dining", type: "system", isCustom: false },
  { id: "2", name: "Transportation", type: "system", isCustom: false },
  { id: "3", name: "Utilities", type: "system", isCustom: false },
  { id: "4", name: "Shopping", type: "system", isCustom: false },
  { id: "5", name: "Entertainment", type: "system", isCustom: false },
  { id: "6", name: "Healthcare", type: "system", isCustom: false },
  { id: "7", name: "Freelance", type: "custom", isCustom: true },
  { id: "8", name: "Gifts", type: "custom", isCustom: true },
];

const DUMMY_NOTIFICATIONS = {
  email: true,
  bills: true,
  budget: true,
  weeklyReports: false,
  // Maintaining compatibility with UI generic keys if needed, but spec says keys are specific
  // UI NotificationSettings.jsx uses: budgetAlerts, billDueAlerts, weeklyReport, aiPredictions
  // Adjusted to map to UI expectations or update UI later. Let's map spec <-> UI.
  // Spec: email, bills, budget, weeklyReports
  // UI: budgetAlerts, billDueAlerts, weeklyReport, aiPredictions
  // We will align the service to return what the UI needs, or map it.
  // For now, I'll return the UI keys populated from the API response or dummy.
  budgetAlerts: true,
  billDueAlerts: true,
  weeklyReport: false,
  aiPredictions: true,
};

const DUMMY_AI_PREFS = {
  forecast: true,
  personality: true,
  suggestions: true,
  challenges: false,
  riskTolerance: "medium",
};

// Profile API
export const getProfile = async () => {
  try {
    const response = await api.get("/users/profile");
    return response.data?.user || response.data;
  } catch (error) {
    console.warn("API /users/profile failed, using dummy data");
    return DUMMY_PROFILE;
  }
};

export const updateProfile = async (data) => {
  try {
    const response = await api.put("/users/profile", data);
    return response.data?.user || response.data;
  } catch (error) {
    console.warn("API /users/profile failed, using dummy data");
    return { ...DUMMY_PROFILE, ...data };
  }
};

export const uploadAvatar = async (file) => {
  try {
    const formData = new FormData();
    formData.append("avatar", file);
    const response = await api.post("/users/avatar", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    // Handle response structure: { data: { avatar: "/uploads/..." } }
    let avatarUrl =
      response.data?.data?.avatar ||
      response.data?.avatar ||
      response.data?.url;

    // If it's a relative path (starts with /), prepend the API base URL
    if (avatarUrl && avatarUrl.startsWith("/")) {
      const baseURL = api.defaults.baseURL || "http://localhost:5001/api";
      const origin = baseURL.replace("/api", ""); // remove /api to get root
      avatarUrl = `${origin}${avatarUrl}`;
    }

    return avatarUrl;
  } catch (error) {
    throw error; // Propagate error
  }
};

export const changePassword = async (data) => {
  try {
    const response = await api.put("/users/change-password", data);
    return response.data;
  } catch (error) {
    throw error; // Propagate error
  }
};

// Categories API
export const getCategories = async () => {
  try {
    const response = await api.get("/categories");
    const data = response.data?.categories || response.data;
    return Array.isArray(data) ? data : response.data?.data?.categories || [];
  } catch (error) {
    console.warn("API /categories failed, using dummy data");
    return DUMMY_CATEGORIES;
  }
};

export const addCategory = async (category) => {
  try {
    const response = await api.post("/categories", category);
    const newCategory = response.data?.data || response.data;
    if (newCategory && newCategory._id && !newCategory.id) {
      newCategory.id = newCategory._id;
    }
    // Ensure isCustom is true for the UI to allow deletion
    newCategory.isCustom = true;
    return newCategory;
  } catch (error) {
    throw error; // Propagate error
  }
};

export const deleteCategory = async (id) => {
  try {
    const response = await api.delete(`/categories/${id}`);
    return response.data;
  } catch (error) {
    throw error; // Propagate error
  }
};

// Notification Settings API
export const getNotificationSettings = async () => {
  try {
    const response = await api.get("/settings/notifications");
    // Map API response keys to UI keys if necessary
    // Spec: { email, bills, budget, weeklyReports }
    // UI expects: { budgetAlerts, billDueAlerts, weeklyReport, aiPredictions }
    const data = response.data?.data || response.data;
    return {
      budgetAlerts: data.budget ?? true,
      billDueAlerts: data.bills ?? true,
      weeklyReport: data.weeklyReports ?? false,
      aiPredictions: true, // API might not support this yet?
    };
  } catch (error) {
    console.warn("API /settings/notifications failed, using dummy data");
    return DUMMY_NOTIFICATIONS;
  }
};

export const updateNotificationSettings = async (settings) => {
  try {
    // Map UI keys back to API spec
    const apiPayload = {
      email: true, // defaulting
      bills: settings.billDueAlerts,
      budget: settings.budgetAlerts,
      weeklyReports: settings.weeklyReport,
    };
    const response = await api.put("/settings/notifications", apiPayload);
    return settings;
  } catch (error) {
    throw error; // Propagate error
  }
};

// AI Settings API
export const getAISettings = async () => {
  try {
    const response = await api.get("/settings/ai");
    return response.data?.data || response.data;
  } catch (error) {
    console.warn("API /settings/ai failed, using dummy data");
    return DUMMY_AI_PREFS;
  }
};

export const updateAISettings = async (settings) => {
  try {
    const response = await api.put("/settings/ai", settings);
    return response.data;
  } catch (error) {
    throw error; // Propagate error
  }
};
