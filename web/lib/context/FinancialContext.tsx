'use client';

import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import {
  FinancialTransaction,
  RecurringCommitment,
  SavingsGoal,
  FinancialScenario,
  FinancialMetrics,
  SimulationResult,
  calculateFinancialMetrics,
  simulateDecisionScenario,
  INITIAL_BUDGET_PAISE,
  TOTAL_SIMULATION_DAYS,
} from '@/lib/financialEngine';

interface FinancialContextType {
  currentDay: number;
  setCurrentDay: (day: number) => void;
  startingBudgetPaise: number;
  transactions: FinancialTransaction[];
  commitments: RecurringCommitment[];
  savingsGoals: SavingsGoal[];
  metrics: FinancialMetrics;
  
  // Transaction Operations
  addTransaction: (tx: Omit<FinancialTransaction, 'id'>) => void;
  updateTransaction: (id: string, tx: Partial<FinancialTransaction>) => void;
  deleteTransaction: (id: string) => void;
  
  // Commitment Operations
  toggleCommitment: (id: string) => void;
  addCommitment: (comm: Omit<RecurringCommitment, 'id'>) => void;
  deleteCommitment: (id: string) => void;
  
  // Savings Goal Operations
  addSavingsGoal: (goal: Omit<SavingsGoal, 'id'>) => void;
  contributeToGoal: (id: string, amountPaise: number) => void;
  withdrawFromGoal: (id: string, amountPaise: number) => void;
  
  // Decision Simulation ("What if?") State
  activeScenario: FinancialScenario | null;
  simulationResult: SimulationResult | null;
  startSimulation: (scenario: FinancialScenario) => void;
  clearSimulation: () => void;
  applySimulation: () => void;
  
  // Reset
  resetToDefaultState: () => void;
}

const STORAGE_KEY = 'survival_run_finances_v1';

const FinancialContext = createContext<FinancialContextType | null>(null);

export const FinancialProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load initial state synchronously from localStorage to prevent flash & race conditions
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentDay, setCurrentDay] = useState<number>(1);
  const [startingBudgetPaise, setStartingBudgetPaise] = useState<number>(INITIAL_BUDGET_PAISE);
  const [transactions, setTransactions] = useState<FinancialTransaction[]>([]);
  const [commitments, setCommitments] = useState<RecurringCommitment[]>([]);
  const [savingsGoals, setSavingsGoals] = useState<SavingsGoal[]>([]);
  const [activeScenario, setActiveScenario] = useState<FinancialScenario | null>(null);

  // Load user data from localStorage synchronously on mount before any saves run
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed.transactions)) setTransactions(parsed.transactions);
        if (Array.isArray(parsed.commitments)) setCommitments(parsed.commitments);
        if (Array.isArray(parsed.savingsGoals)) setSavingsGoals(parsed.savingsGoals);
        if (typeof parsed.currentDay === 'number') setCurrentDay(parsed.currentDay);
        if (typeof parsed.startingBudgetPaise === 'number') setStartingBudgetPaise(parsed.startingBudgetPaise);
        if (parsed.activeScenario) setActiveScenario(parsed.activeScenario);
      }
    } catch {
      // Fallback cleanly
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Sync to localStorage only AFTER initial load has completed, preventing empty overwrites
  useEffect(() => {
    if (!isLoaded) return;
    try {
      const data = {
        transactions,
        commitments,
        savingsGoals,
        currentDay,
        startingBudgetPaise,
        activeScenario,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // Storage unavailable or disabled
    }
  }, [isLoaded, transactions, commitments, savingsGoals, currentDay, startingBudgetPaise, activeScenario]);

  // Compute Base Metrics
  const metrics = useMemo(() => {
    return calculateFinancialMetrics({
      startingBudgetPaise,
      currentDay,
      transactions,
      commitments,
      savingsGoals,
    });
  }, [startingBudgetPaise, currentDay, transactions, commitments, savingsGoals]);

  // Compute Simulation Result if scenario is active
  const simulationResult = useMemo(() => {
    if (!activeScenario) return null;
    return simulateDecisionScenario({
      scenario: activeScenario,
      baseTransactions: transactions,
      baseCommitments: commitments,
      baseSavingsGoals: savingsGoals,
      currentDay,
      startingBudgetPaise,
    });
  }, [activeScenario, transactions, commitments, savingsGoals, currentDay, startingBudgetPaise]);

  const addTransaction = useCallback((tx: Omit<FinancialTransaction, 'id'>) => {
    const newTx: FinancialTransaction = {
      ...tx,
      id: `tx-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    };
    setTransactions((prev) => [newTx, ...prev]);
  }, []);

  const updateTransaction = useCallback((id: string, updated: Partial<FinancialTransaction>) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updated } : t))
    );
  }, []);

  const deleteTransaction = useCallback((id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toggleCommitment = useCallback((id: string) => {
    setCommitments((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isActive: !c.isActive } : c))
    );
  }, []);

  const addCommitment = useCallback((comm: Omit<RecurringCommitment, 'id'>) => {
    const newComm: RecurringCommitment = {
      ...comm,
      id: `comm-${Date.now()}`,
    };
    setCommitments((prev) => [...prev, newComm]);
  }, []);

  const deleteCommitment = useCallback((id: string) => {
    setCommitments((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const addSavingsGoal = useCallback((goal: Omit<SavingsGoal, 'id'>) => {
    const newGoal: SavingsGoal = {
      ...goal,
      id: `goal-${Date.now()}`,
    };
    setSavingsGoals((prev) => [...prev, newGoal]);
  }, []);

  const contributeToGoal = useCallback((id: string, amountPaise: number) => {
    setSavingsGoals((prev) =>
      prev.map((g) =>
        g.id === id ? { ...g, currentAmountPaise: g.currentAmountPaise + amountPaise } : g
      )
    );
  }, []);

  const withdrawFromGoal = useCallback((id: string, amountPaise: number) => {
    setSavingsGoals((prev) =>
      prev.map((g) =>
        g.id === id ? { ...g, currentAmountPaise: Math.max(0, g.currentAmountPaise - amountPaise) } : g
      )
    );
  }, []);

  const startSimulation = useCallback((scenario: FinancialScenario) => {
    setActiveScenario(scenario);
  }, []);

  const clearSimulation = useCallback(() => {
    setActiveScenario(null);
  }, []);

  const applySimulation = useCallback(() => {
    if (!activeScenario) return;
    
    if (activeScenario.type === 'one_off_expense' || activeScenario.type === 'unexpected_emergency') {
      addTransaction({
        title: activeScenario.label,
        amountPaise: activeScenario.amountPaise,
        type: 'expense',
        category: activeScenario.category || (activeScenario.type === 'unexpected_emergency' ? 'unexpected_emergency' : 'discretionary_dining'),
        isEssential: activeScenario.isEssential ?? false,
        date: new Date().toISOString().split('T')[0],
        notes: `Simulated decision applied: ${activeScenario.description}`,
      });
    } else if (activeScenario.type === 'additional_income') {
      addTransaction({
        title: activeScenario.label,
        amountPaise: activeScenario.amountPaise,
        type: 'income',
        category: 'essential_rent_bills',
        isEssential: false,
        date: new Date().toISOString().split('T')[0],
        notes: `Simulated decision applied: ${activeScenario.description}`,
      });
    } else if (activeScenario.type === 'new_subscription') {
      addCommitment({
        name: activeScenario.label,
        amountPaise: activeScenario.amountPaise,
        dueDay: activeScenario.recurringDueDay || Math.min(30, currentDay + 3),
        frequency: 'monthly',
        isEssential: false,
        category: 'entertainment_shopping',
        isActive: true,
      });
    } else if (activeScenario.type === 'savings_deposit') {
      if (savingsGoals.length > 0) {
        contributeToGoal(savingsGoals[0].id, activeScenario.amountPaise);
      } else {
        addSavingsGoal({
          name: 'Emergency Buffer',
          targetAmountPaise: activeScenario.amountPaise * 2,
          currentAmountPaise: activeScenario.amountPaise,
          deadlineDay: 30,
        });
      }
    }
    
    setActiveScenario(null);
  }, [activeScenario, addTransaction, addCommitment, contributeToGoal, addSavingsGoal, savingsGoals, currentDay]);

  const resetToDefaultState = useCallback(() => {
    setCurrentDay(1);
    setStartingBudgetPaise(INITIAL_BUDGET_PAISE);
    setTransactions([]);
    setCommitments([]);
    setSavingsGoals([]);
    setActiveScenario(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return (
    <FinancialContext.Provider
      value={{
        currentDay,
        setCurrentDay,
        startingBudgetPaise,
        transactions,
        commitments,
        savingsGoals,
        metrics,
        addTransaction,
        updateTransaction,
        deleteTransaction,
        toggleCommitment,
        addCommitment,
        deleteCommitment,
        addSavingsGoal,
        contributeToGoal,
        withdrawFromGoal,
        activeScenario,
        simulationResult,
        startSimulation,
        clearSimulation,
        applySimulation,
        resetToDefaultState,
      }}
    >
      {children}
    </FinancialContext.Provider>
  );
};

export const useFinancial = () => {
  const context = useContext(FinancialContext);
  if (!context) {
    throw new Error('useFinancial must be used within a FinancialProvider');
  }
  return context;
};
