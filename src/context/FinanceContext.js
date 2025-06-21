import React, { createContext, useContext, useReducer } from 'react';

const FinanceContext = createContext();

const initialState = {
  savings: [],
  loans: [],
  creditCards: [],
  goals: [],
  transactions: [],
  futureProjections: []
};

function financeReducer(state, action) {
  switch (action.type) {
    case 'ADD_SAVING':
      return {
        ...state,
        savings: [...state.savings, { ...action.payload, id: Date.now() }]
      };
    case 'UPDATE_SAVING':
      return {
        ...state,
        savings: state.savings.map(saving =>
          saving.id === action.payload.id ? action.payload : saving
        )
      };
    case 'DELETE_SAVING':
      return {
        ...state,
        savings: state.savings.filter(saving => saving.id !== action.payload)
      };
    case 'ADD_LOAN':
      return {
        ...state,
        loans: [...state.loans, { ...action.payload, id: Date.now() }]
      };
    case 'UPDATE_LOAN':
      return {
        ...state,
        loans: state.loans.map(loan =>
          loan.id === action.payload.id ? action.payload : loan
        )
      };
    case 'DELETE_LOAN':
      return {
        ...state,
        loans: state.loans.filter(loan => loan.id !== action.payload)
      };
    case 'ADD_CREDIT_CARD':
      return {
        ...state,
        creditCards: [...state.creditCards, { ...action.payload, id: Date.now() }]
      };
    case 'UPDATE_CREDIT_CARD':
      return {
        ...state,
        creditCards: state.creditCards.map(card =>
          card.id === action.payload.id ? action.payload : card
        )
      };
    case 'DELETE_CREDIT_CARD':
      return {
        ...state,
        creditCards: state.creditCards.filter(card => card.id !== action.payload)
      };
    case 'ADD_GOAL':
      return {
        ...state,
        goals: [...state.goals, { ...action.payload, id: Date.now() }]
      };
    case 'UPDATE_GOAL':
      return {
        ...state,
        goals: state.goals.map(goal =>
          goal.id === action.payload.id ? action.payload : goal
        )
      };
    case 'DELETE_GOAL':
      return {
        ...state,
        goals: state.goals.filter(goal => goal.id !== action.payload)
      };
    default:
      return state;
  }
}

export function FinanceProvider({ children }) {
  const [state, dispatch] = useReducer(financeReducer, initialState);

  return (
    <FinanceContext.Provider value={{ state, dispatch }}>
      {children}
    </FinanceContext.Provider>
  );
}

export function useFinance() {
  const context = useContext(FinanceContext);
  if (context === undefined) {
    throw new Error('useFinance must be used within a FinanceProvider');
  }
  return context;
}