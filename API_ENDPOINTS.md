# API Endpoints Documentation

## Dashboard API Endpoints

This document lists all API endpoints required by the frontend Dashboard module.

### 1. Monthly Transactions

**Endpoint:** `GET /api/transactions/month/:month`

**Parameters:**

- `month` (string): Month in format `YYYY-MM` (e.g., `2024-12`)

**Response:**

```json
{
  "totalIncome": 120000,
  "totalExpenses": 78500,
  "categoryTotals": {
    "Food": 26700,
    "Travel": 15700,
    "Utilities": 12000,
    "Shopping": 10500,
    "Education": 6800,
    "Health": 4300,
    "Others": 2500
  },
  "trendData": [2100, 2800, 1900, ...] // 30 days of spending
}
```

---

### 2. Budget Status

**Endpoint:** `GET /api/budget/status`

**Response:**

```json
{
  "monthlyBudget": 100000,
  "spentSoFar": 78500,
  "remainingBudget": 21500
}
```

---

### 3. Upcoming Bills

**Endpoint:** `GET /api/bills/upcoming`

**Response:**

```json
{
  "count": 2,
  "bills": [
    {
      "id": 1,
      "name": "Electricity Bill",
      "amount": 3500,
      "dueDate": "2024-12-07"
    },
    {
      "id": 2,
      "name": "Internet Bill",
      "amount": 2500,
      "dueDate": "2024-12-05"
    }
  ]
}
```

---

### 10. Alerts Module

**Endpoint:** `GET /api/alerts`

**Response:**

```json
{
  "alerts": [
    {
      "id": "1",
      "type": "danger",
      "message": "You have exceeded 90% of your Food budget.",
      "date": "2024-12-09T10:00:00Z",
      "isRead": false
    },
    {
      "id": "2",
      "type": "warning",
      "message": "Electricity Bill is due tomorrow.",
      "date": "2024-12-08T09:00:00Z",
      "isRead": false
    },
    {
      "id": "3",
      "type": "info",
      "message": "Your Weekly Report is ready.",
      "date": "2024-12-07T09:00:00Z",
      "isRead": true
    }
  ]
}
```

---

---

### 4. AI Spending Forecast

**Endpoint:** `GET /api/ai/forecast`

**Response:**

```json
{
  "predictedOverspending": 18,
  "message": "Based on your current trend, you may exceed your monthly budget by 18%."
}
```

---

### 5. AI Personality Insight

**Endpoint:** `GET /api/ai/personality`

**Response:**

```json
{
  "label": "Foodie Spender",
  "percentage": 34,
  "category": "Food",
  "message": "You are a Foodie Spender — 34% of your expenses are on Food."
}
```

---

### 6. AI Savings Suggestions

**Endpoint:** `GET /api/ai/savings`

**Response:**

```json
{
  "category": "Food",
  "percentage": 10,
  "amount": 2500,
  "message": "Reduce your food expenses by 10% to save PKR 2,500 this month."
}
```

---

### 9. Recent Transactions

**Endpoint:** `GET /api/transactions?limit=5`

**Query Parameters:**

- `limit` (number): Number of transactions to return (default: 5)

**Response:**

```json
[
  {
    "id": 1,
    "category": "Food",
    "description": "Grocery Shopping",
    "amount": 3500,
    "type": "expense",
    "date": "2024-12-04"
  },
  {
    "id": 2,
    "category": "Income",
    "description": "Salary Deposit",
    "amount": 120000,
    "type": "income",
    "date": "2024-12-01"
  }
]
```

---

## Implementation Status

✅ **Frontend Service Layer Created:** `src/services/dashboardService.js`

- All endpoints defined with dummy data fallback
- Automatic fallback when backend is unavailable
- Ready for backend integration

⏳ **Backend Implementation:** Pending

- All endpoints documented above
- Response formats defined
- Ready for backend team to implement

---

## Usage Example

```javascript
import dashboardService from "../services/dashboardService";

// Fetch all dashboard data
const data = await dashboardService.getDashboardData();

// Or fetch individual endpoints
const transactions = await dashboardService.getMonthlyTransactions("2024-12");
const budget = await dashboardService.getBudgetStatus();
const bills = await dashboardService.getUpcomingBills();
```

---

### 11. Settings Module

#### Profile Management

**Update Profile**
`PUT /api/users/profile`

- Headers: `Authorization: Bearer <token>`
- Body: `{ "name": "Talha Updated", "email": "newemail@example.com" }`

**Change Password**
`PUT /api/users/change-password`

- Body: `{ "currentPassword": "password123", "newPassword": "newpassword456" }`

#### Avatars

**Get Available Avatars**
`GET /api/users/avatars`

- Returns: List of DiceBear URLs.

**Set Avatar**
`POST /api/users/avatar`

- Body: `{ "avatarUrl": "https://api.dicebear.com/..." }`

#### Notification Settings

**Get Preferences**
`GET /api/settings/notifications`

- Response: `{ "email": true, "bills": true, "budget": true, "weeklyReports": true }`

**Update Preferences**
`PUT /api/settings/notifications`

- Body: `{ "email": false, "bills": true }`

#### AI Preferences

**Get AI Settings**
`GET /api/settings/ai`

- Response: `{ "forecast": true, "riskTolerance": "medium" }`

**Update AI Settings**
`PUT /api/settings/ai`

- Body: `{ "riskTolerance": "high", "personality": false }`

#### Custom Categories

**Get All Categories**
`GET /api/categories`

- Returns: `{ "categories": [ { "id": "1", "name": "Food", "isCustom": false }, ... ] }`

**Add Custom Category**
`POST /api/categories`

- Body: `{ "name": "Crypto", "type": "expense", "color": "#FFA500", "icon": "🪙" }`

**Delete Custom Category**
`DELETE /api/categories/:id`
