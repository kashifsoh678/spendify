import api from "../api/api";

// Dummy AI data for features not yet implemented on backend
const dummyAIData = {
  personality: {
    type: "Foodie Spender",
    description:
      "You love food experiences and spend a significant part of your budget on meals.",
    reason: "Food is consistently your top spending category (over 30%).",
    advice: "Try meal planning or cooking at home twice a week to save money.",
    icon: "🍔",
    topCategories: [
      { category: "Food", percentage: 45 },
      { category: "Travel", percentage: 20 },
      { category: "Shopping", percentage: 15 },
    ],
  },
  forecast: {
    predictedExpenses: 125000,
    monthlyBudget: 100000,
    difference: 25000,
    remainingDays: 14,
    riskLevel: "High",
    message:
      "Based on your current trend, you may exceed your monthly budget by 25%.",
  },
  moodInsights: {
    topMood: "😊",
    moodLabel: "Happy",
    description: "You mostly spend on Food when feeling happy.",
    patterns: [
      { mood: "😊", label: "Happy", category: "Food", percentage: 55 },
      { mood: "😓", label: "Stressed", category: "Shopping", percentage: 30 },
      { mood: "😐", label: "Bored", category: "Utilities", percentage: 15 },
    ],
    peakHours: "12pm - 3pm",
  },
  suggestions: [
    {
      id: 1,
      title: "Reduce Food Spending",
      description:
        "Food category makes up 61% of your monthly spending. Try reducing expenses here.",
      reason: "High Food category spending",
    },
    {
      id: 2,
      title: "Cook More, Order Less",
      description: "Cook at home twice a week to reduce food expenses.",
      reason: "Foodie spending pattern detected",
    },
    {
      id: 3,
      title: "Upcoming Bill Alert",
      description:
        "Your Internet Bill is due in 3 days. Keep extra 2500 saved.",
      reason: "Upcoming bill detected",
    },
  ],
  challenges: [
    {
      id: 1,
      title: "No Food Delivery Challenge",
      description: "Avoid ordering food delivery for 3 consecutive days",
      expectedSave: 1250,
      duration: "3 days",
      difficulty: "Medium",
      icon: "🍕",
      status: "available",
    },
    {
      id: 2,
      title: "No New Clothes",
      description: "Do not buy any new clothes for 2 weeks",
      expectedSave: 3000,
      duration: "14 days",
      difficulty: "Medium",
      icon: "👗",
      status: "available",
    },
    {
      id: 3,
      title: "Zero Spend Day",
      description: "Go a full day without spending a single rupee",
      expectedSave: 500,
      duration: "1 day",
      difficulty: "Easy",
      icon: "🚫",
      status: "available",
    },
  ],
};

/**
 * Get AI spending forecast
 * GET /api/ai/forecast
 */
export const getAIForecast = async () => {
  try {
    const response = await api.get("/ai/forecast");
    return response.data;
  } catch (error) {
    console.warn("API /ai/forecast failed, using dummy data");
    return { data: { forecast: dummyAIData.forecast } }; // Return structure matching API response wrapper
  }
};

/**
 * Get spending personality analysis
 * Uses dummy data until API is ready
 */
export const getPersonality = async () => {
  try {
    const response = await api.get("/ai/personality");
    // Extract nested data: response.data.data.personality
    return (
      response.data?.data?.personality ||
      response.data?.personality ||
      response.data
    );
  } catch (error) {
    console.warn("API /ai/personality failed, using dummy data");
    return dummyAIData.personality;
  }
};

/**
 * Get mood-based spending insights
 * Uses dummy data until API is ready
 */
export const getMoodInsights = async () => {
  try {
    const response = await api.get("/ai/mood-insights");
    // Extract nested data: response.data.data (response usually has { data: { moodInsights... } } or { data: { ...fields } })
    // Based on spec: { data: { topMood: ... } }
    return response.data?.data || response.data;
  } catch (error) {
    console.warn("API /ai/mood-insights failed, using dummy data");
    return dummyAIData.moodInsights;
  }
};

/**
 * Get smart saving suggestions
 * Uses dummy data until API is ready
 */
export const getSavings = async () => {
  try {
    const response = await api.get("/ai/suggestions");
    // Extract nested data: response.data.data.suggestions
    return (
      response.data?.data?.suggestions ||
      response.data?.suggestions ||
      response.data
    );
  } catch (error) {
    console.warn("API /ai/suggestions failed, using dummy data");
    return dummyAIData.suggestions;
  }
};

/**
 * Get spending challenges
 * Uses dummy data until API is ready
 */
export const getChallenges = async () => {
  try {
    const response = await api.get("/ai/challenges");
    // Extract nested data: response.data.data.challenges
    return (
      response.data?.data?.challenges ||
      response.data?.challenges ||
      response.data
    );
  } catch (error) {
    console.warn("API /ai/challenges failed, using dummy data");
    return dummyAIData.challenges;
  }
};

/**
 * Get all AI insights at once
 */
export const getAllAIInsights = async () => {
  try {
    // Run forecast in parallel with dummy data functions
    const [forecastData, personality, moodInsights, suggestions, challenges] =
      await Promise.all([
        getAIForecast().catch(() => null), // Allow forecast to fail without breaking everything
        getPersonality(),
        getMoodInsights(),
        getSavings(),
        getChallenges(),
      ]);

    // Handle forecast response structure or null
    const forecast =
      forecastData?.data?.forecast || forecastData?.forecast || null;

    return {
      forecast,
      personality,
      moodInsights,
      suggestions,
      challenges,
    };
  } catch (error) {
    console.error("Error fetching AI insights:", error);
    // Return at least the dummy data on error
    return {
      forecast: dummyAIData.forecast,
      personality: dummyAIData.personality,
      moodInsights: dummyAIData.moodInsights,
      suggestions: dummyAIData.suggestions,
      challenges: dummyAIData.challenges,
    };
  }
};

export default {
  getAIForecast,
  getPersonality,
  getMoodInsights,
  getSavings,
  getChallenges,
  getAllAIInsights,
};
