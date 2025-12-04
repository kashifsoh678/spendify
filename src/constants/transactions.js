// Transaction categories
export const EXPENSE_CATEGORIES = [
  { value: 'food', label: 'Food', icon: '🍔' },
  { value: 'travel', label: 'Travel', icon: '✈️' },
  { value: 'utilities', label: 'Utilities', icon: '💡' },
  { value: 'shopping', label: 'Shopping', icon: '🛍️' },
  { value: 'health', label: 'Health', icon: '🏥' },
  { value: 'education', label: 'Education', icon: '📚' },
  { value: 'entertainment', label: 'Entertainment', icon: '🎬' },
  { value: 'other', label: 'Other', icon: '📌' }
];

export const INCOME_CATEGORIES = [
  { value: 'salary', label: 'Salary', icon: '💰' },
  { value: 'freelance', label: 'Freelance', icon: '💼' },
  { value: 'business', label: 'Business', icon: '🏢' },
  { value: 'gift', label: 'Gift', icon: '🎁' },
  { value: 'other', label: 'Other', icon: '📌' }
];

// Mood options
export const MOODS = [
  { value: 'happy', label: 'Happy', emoji: '😊' },
  { value: 'neutral', label: 'Neutral', emoji: '😐' },
  { value: 'sad', label: 'Sad', emoji: '😠' }
];

// Transaction types
export const TRANSACTION_TYPES = {
  INCOME: 'income',
  EXPENSE: 'expense'
};

// Get category by value and type
export const getCategoryByValue = (value, type) => {
  const categories = type === TRANSACTION_TYPES.INCOME ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;
  return categories.find(cat => cat.value === value) || { value, label: value, icon: '📌' };
};

// Get mood by value
export const getMoodByValue = (value) => {
  return MOODS.find(mood => mood.value === value) || { value, label: value, emoji: '😐' };
};
