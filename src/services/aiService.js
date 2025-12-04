import api from '../api/api';

// Dummy AI data
const dummyAIData = {
  forecast: {
    percent: 18,
    message: "You may exceed your budget by 18% this month.",
    risk: "high", // low, medium, high
    trend: "up",
    details: "Based on your current spending pattern, you're on track to overspend."
  },
  personality: {
    type: "Foodie Spender",
    description: "You spend a large portion of your money on food and dining.",
    percentage: 34,
    icon: "🍔",
    topCategory: "Food & Dining"
  },
  moodInsights: {
    topMood: "😊",
    moodLabel: "happy",
    description: "You mostly spend on food when feeling happy.",
    patterns: [
      { mood: "😊", label: "Happy", category: "Food & Dining", percentage: 45 },
      { mood: "😐", label: "Neutral", category: "Shopping", percentage: 30 },
      { mood: "😠", label: "Stressed", category: "Entertainment", percentage: 25 }
    ],
    peakHours: "7pm - 10pm"
  },
  suggestions: [
    {
      id: 1,
      text: "Cut food spending by 10% to save PKR 2,500 this month.",
      category: "Food & Dining",
      potentialSavings: 2500,
      icon: "🍔"
    },
    {
      id: 2,
      text: "Limit entertainment expenses to PKR 5,000 this month.",
      category: "Entertainment",
      potentialSavings: 1800,
      icon: "🎬"
    },
    {
      id: 3,
      text: "Try weekly meal prep to avoid food delivery costs.",
      category: "Food & Dining",
      potentialSavings: 3000,
      icon: "🥗"
    },
    {
      id: 4,
      text: "Reduce impulse shopping by waiting 24 hours before purchases.",
      category: "Shopping",
      potentialSavings: 2200,
      icon: "🛍️"
    },
    {
      id: 5,
      text: "Use public transport twice a week to save on fuel.",
      category: "Transportation",
      potentialSavings: 1500,
      icon: "🚌"
    }
  ],
  challenges: [
    {
      id: 1,
      title: "No Food Delivery Challenge",
      description: "Avoid ordering food delivery for 3 consecutive days",
      expectedSave: 1500,
      duration: "3 days",
      difficulty: "Easy",
      icon: "🍕",
      status: "available"
    },
    {
      id: 2,
      title: "Entertainment Cap Challenge",
      description: "Keep entertainment spending under PKR 3,000 this week",
      expectedSave: 1200,
      duration: "7 days",
      difficulty: "Medium",
      icon: "🎮",
      status: "available"
    },
    {
      id: 3,
      title: "7-Day Minimal Spend",
      description: "Spend only on essentials for one week",
      expectedSave: 3500,
      duration: "7 days",
      difficulty: "Hard",
      icon: "💪",
      status: "available"
    }
  ]
};

/**
 * Get AI spending forecast
 */
export const getAIForecast = async () => {
  try {
    const response = await api.get('/ai/forecast');
    return response.data;
  } catch (error) {
    console.warn('Backend not available, using dummy AI forecast data');
    await new Promise(resolve => setTimeout(resolve, 500));
    return dummyAIData.forecast;
  }
};

/**
 * Get spending personality analysis
 */
export const getPersonality = async () => {
  try {
    const response = await api.get('/ai/personality');
    return response.data;
  } catch (error) {
    console.warn('Backend not available, using dummy personality data');
    await new Promise(resolve => setTimeout(resolve, 500));
    return dummyAIData.personality;
  }
};

/**
 * Get mood-based spending insights
 */
export const getMoodInsights = async () => {
  try {
    const response = await api.get('/ai/mood-insights');
    return response.data;
  } catch (error) {
    console.warn('Backend not available, using dummy mood insights data');
    await new Promise(resolve => setTimeout(resolve, 500));
    return dummyAIData.moodInsights;
  }
};

/**
 * Get smart saving suggestions
 */
export const getSavings = async () => {
  try {
    const response = await api.get('/ai/savings');
    return response.data;
  } catch (error) {
    console.warn('Backend not available, using dummy savings suggestions');
    await new Promise(resolve => setTimeout(resolve, 500));
    return dummyAIData.suggestions;
  }
};

/**
 * Get spending challenges
 */
export const getChallenges = async () => {
  try {
    const response = await api.get('/ai/challenges');
    return response.data;
  } catch (error) {
    console.warn('Backend not available, using dummy challenges data');
    await new Promise(resolve => setTimeout(resolve, 500));
    return dummyAIData.challenges;
  }
};

/**
 * Get all AI insights at once
 */
export const getAllAIInsights = async () => {
  try {
    const [forecast, personality, moodInsights, suggestions, challenges] = await Promise.all([
      getAIForecast(),
      getPersonality(),
      getMoodInsights(),
      getSavings(),
      getChallenges()
    ]);

    return {
      forecast,
      personality,
      moodInsights,
      suggestions,
      challenges
    };
  } catch (error) {
    console.error('Error fetching AI insights:', error);
    throw error;
  }
};

export default {
  getAIForecast,
  getPersonality,
  getMoodInsights,
  getSavings,
  getChallenges,
  getAllAIInsights
};
