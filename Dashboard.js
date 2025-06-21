import React from 'react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, CreditCard, Target, PiggyBank } from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';

const COLORS = ['#0ea5e9', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6'];

function Dashboard() {
  const { state } = useFinance();

  // Sample data for demonstration
  const expenseData = [
    { name: 'Food', value: 2400, color: '#0ea5e9' },
    { name: 'Transport', value: 1398, color: '#ef4444' },
    { name: 'Entertainment', value: 800, color: '#10b981' },
    { name: 'Shopping', value: 1200, color: '#f59e0b' },
    { name: 'Utilities', value: 600, color: '#8b5cf6' },
  ];

  const monthlyData = [
    { month: 'Jan', income: 5000, expenses: 3200 },
    { month: 'Feb', income: 5200, expenses: 3400 },
    { month: 'Mar', income: 4800, expenses: 3100 },
    { month: 'Apr', income: 5500, expenses: 3600 },
    { month: 'May', income: 5300, expenses: 3300 },
    { month: 'Jun', income: 5800, expenses: 3800 },
  ];

  const savingsGrowth = [
    { month: 'Jan', amount: 10000 },
    { month: 'Feb', amount: 11800 },
    { month: 'Mar', amount: 12700 },
    { month: 'Apr', amount: 14900 },
    { month: 'May', amount: 16000 },
    { month: 'Jun', amount: 18000 },
  ];

  const totalSavings = state.savings.reduce((total, saving) => total + saving.currentAmount, 0);
  const totalLoans = state.loans.reduce((total, loan) => total + loan.remainingAmount, 0);
  const totalCreditCardDebt = state.creditCards.reduce((total, card) => total + card.balance, 0);
  const totalGoals = state.goals.length;

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Savings</p>
              <p className="text-2xl font-bold text-gray-900">
                ${totalSavings.toLocaleString()}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <PiggyBank className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="flex items-center mt-4">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-sm text-green-600">+12% from last month</span>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Loans</p>
              <p className="text-2xl font-bold text-gray-900">
                ${totalLoans.toLocaleString()}
              </p>
            </div>
            <div className="p-3 bg-red-100 rounded-full">
              <DollarSign className="w-6 h-6 text-red-600" />
            </div>
          </div>
          <div className="flex items-center mt-4">
            <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
            <span className="text-sm text-red-600">-5% from last month</span>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Credit Card Debt</p>
              <p className="text-2xl font-bold text-gray-900">
                ${totalCreditCardDebt.toLocaleString()}
              </p>
            </div>
            <div className="p-3 bg-orange-100 rounded-full">
              <CreditCard className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <div className="flex items-center mt-4">
            <TrendingDown className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-sm text-green-600">-8% from last month</span>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Goals</p>
              <p className="text-2xl font-bold text-gray-900">{totalGoals}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="flex items-center mt-4">
            <TrendingUp className="w-4 h-4 text-blue-500 mr-1" />
            <span className="text-sm text-blue-600">2 new goals this month</span>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Expense Breakdown */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Expense Breakdown</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={expenseData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {expenseData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`$${value}`, 'Amount']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly Income vs Expenses */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Income vs Expenses</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value}`, '']} />
                <Legend />
                <Bar dataKey="income" fill="#0ea5e9" name="Income" />
                <Bar dataKey="expenses" fill="#ef4444" name="Expenses" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Savings Growth Chart */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Savings Growth</h3>
        <div className="chart-container h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={savingsGrowth}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`$${value}`, 'Savings']} />
              <Line 
                type="monotone" 
                dataKey="amount" 
                stroke="#10b981" 
                strokeWidth={3}
                dot={{ fill: '#10b981', strokeWidth: 2, r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;