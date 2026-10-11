# 05. Data Model & Schema Specification: Survive the Month
**Project**: Survive the Month  
**Engine**: Integer-Paise Precision Architecture  
**Database**: MongoDB Atlas via Mongoose & Strongly-Typed TypeScript Interfaces

---

## 1. Core Principle: Integer Paise Representation

All financial attributes are strictly stored and computed as **integers representing Paise**:
$$1\text{ Rupee} = 100\text{ Paise}$$
$$\text{Starting Budget} = \text{₹}10,000 = 1,000,000\text{ Paise}$$

Never store monetary amounts as floating-point numbers (`10.50`), and never perform math with strings.

---

## 2. Entity Schemas

### 1. User (`users` collection)
```typescript
interface IUser {
  _id: ObjectId;
  name: string;
  email: string;
  passwordHash: string;
  role: 'frugal_survivor' | 'budget_buddy';
  profile: {
    monthlyAllowancePaise: number; // Default: 1000000 (₹10,000)
    currentCycleDay: number;       // Range: 1 - 30
    currency: 'INR';
    avatarUrl?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}
```

### 2. Financial Transaction (`domainitems` collection)
Stores inflows and outflows with granular tags and verification proofs.
```typescript
interface IFinancialTransaction {
  _id: ObjectId;
  userId: ObjectId;
  title: string;
  description?: string;
  amountPaise: number;            // e.g. 350000 for ₹3,500
  type: 'expense' | 'income';
  category: 
    | 'essential_rent_bills'
    | 'staple_groceries'
    | 'transit_commute'
    | 'medical_vital'
    | 'discretionary_dining'
    | 'discretionary_shopping'
    | 'zero_spend_hack';
  isEssential: boolean;            // true if vital for survival
  status: 'pending' | 'in_progress' | 'completed';
  date: string;                    // YYYY-MM-DD
  cycleDay: number;                // 1 - 30
  receiptUrl?: string;
  attributes?: {
    merchantName?: string;
    paymentMethod?: 'UPI' | 'Cash' | 'Card' | 'NetBanking';
    notes?: string;
    savingsSacrificeNote?: string; // Frugal sacrifice made (e.g. cooked at home instead of Zomato)
  };
  createdAt: Date;
  updatedAt: Date;
}
```

### 3. Recurring Commitment (`recurringcommitments`)
Stores scheduled obligations that mature on specific cycle days.
```typescript
interface IRecurringCommitment {
  _id: string;
  userId: string;
  title: string;                   // e.g. "Broadband Wifi", "PG Rent Share"
  amountPaise: number;            // e.g. 69900 for ₹699
  dueDay: number;                  // Calendar day within cycle: 1 - 30
  isEssential: boolean;            // Mandatory survival bill
  isActive: boolean;
  category: string;
}
```

### 4. Protected Savings Goal (`savingsgoals`)
Stores emergency reserves shielded from daily spending.
```typescript
interface ISavingsGoal {
  _id: string;
  userId: string;
  title: string;                   // e.g. "Emergency Medical Cushion"
  targetAmountPaise: number;      // e.g. 100000 for ₹1,000
  currentAmountPaise: number;     // Amount currently locked
  isLocked: boolean;               // True = Shielded from runway
  createdAt: string;
}
```

---

## 3. Mathematical Invariants & Relations

1. **Spendable Balance**:
   $$\text{RemainingSpendable} = \text{StartingBudget} + \sum \text{Income} - \sum \text{Expenses} - \sum \text{LockedSavings}$$

2. **Safe Daily Allowance**:
   $$\text{DaysRemaining} = \max(1, 30 - d + 1)$$
   $$\text{SafeDailyAllowance} = \max\left(0, \left\lfloor \frac{\text{RemainingSpendable}}{\text{DaysRemaining}} \right\rfloor\right)$$

3. **Forecast Balance**:
   $$\text{UpcomingCommitments} = \sum_{c.\text{dueDay} \ge d \land c.\text{isActive}} c.\text{amountPaise}$$
   $$\text{ProjectedMonthEndBalance} = \text{RemainingSpendable} - \text{UpcomingCommitments}$$

4. **Essential Shortfall Check**:
   $$\text{Shortfall} = \max\left(0, \sum_{c.\text{isEssential} \land c.\text{dueDay} \ge d} c.\text{amountPaise} - \text{RemainingSpendable}\right)$$
