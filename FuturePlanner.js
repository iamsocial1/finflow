import React, { useState } from 'react';
import { 
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from 'recharts';

import { DollarSign, TrendingUp, Target, Calendar } from 'lucide-react';

function FuturePlanner() {
  const [projectionYears, setProjectionYears] = useState(10);
  const [monthlyIncome, setMonthlyIncome] = useState(5000);
  const [monthlyExpenses, setMonthlyExpenses] = useState(3500);
  const [currentSavings, setCurrentSavings] = useState(10000);
  const [investmentReturn, setInvestmentReturn] = useState(7);

  const calculateProjections = () => {
    const monthlySavings = monthlyIncome - monthlyExpenses;
    const projections = [];
    
    for (let year = 1; year <= projectionYears; year++) {
      const totalSavings = monthlySavings * 12 * year;
      const investmentGrowth = currentSavings * Math.pow(1 + investmentReturn / 100, year);
      const totalWealth = totalSavings + investmentGrowth;
      
      projections.push({
        year: year,
        savings: totalSavings,
        investments: investmentGrowth,
        totalWealth: totalWealth,
        netWorth: totalWealth
      });
    }
    
    return projections;
  };

  const projectionData = calculateProjections();
  const finalProjection = projectionData[projectionData.length - 1];

  // Retirement planning
  const retirementAge = 65;
  const currentAge = 30; // You can make this dynamic
  const yearsToRetirement = retirementAge - currentAge;
  const retirementGoal = 1000000; // $1M goal
  const monthlyRequiredForRetirement = retirementGoal / (yearsToRetirement * 12);

  // Goal achievement timeline
  const goalTimeline = [
    { goal: 'Emergency Fund', target: 20000, timeframe: '2 years', priority: 'High' },
    { goal: 'House Down Payment', target: 50000, timeframe: '5 years', priority: 'High' },
    { goal: 'Children Education', target: 100000, timeframe: '15 years', priority: 'Medium' },
    { goal: 'Retirement Fund', target: retirementGoal, timeframe: `${yearsToRetirement} years`, priority: 'High' }
  ];

  const wealthAllocation = [
    { name: 'Savings', value: finalProjection?.savings || 0, color: '#0ea5e9' },
    { name: 'Investments', value: finalProjection?.investments || 0, color: '#10b981' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Future Financial Planner</h2>
        <p className="text-gray-600 mt-1">Visualize your financial future with smart projections and planning</p>
      </div>

      {/* Planning Inputs */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Financial Parameters</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Monthly Income ($)
            </label>
            <input
              type="number"
              value={monthlyIncome}
              onChange={(e) => setMonthlyIncome(parseFloat(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Monthly Expenses ($)
            </label>
            <input
              type="number"
              value={monthlyExpenses}
              onChange={(e) => setMonthlyExpenses(parseFloat(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Current Savings ($)
            </label>
            <input
              type="number"
              value={currentSavings}
              onChange={(e) => setCurrentSavings(parseFloat(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Investment Return (%)
            </label>
            <input
              type="number"
              value={investmentReturn}
              onChange={(e) => setInvestmentReturn(parseFloat(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              min="0"
              step="0.1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Projection Years
            </label>
            <input
              type="number"
              value={projectionYears}
              onChange={(e) => setProjectionYears(parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              min="1"
              max="50"
            />
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card p-6 text-center">
          <DollarSign className="w-8 h-8 text-primary-600 mx-auto mb-2" />
          <p className="text-sm text-gray-600 mb-1">Monthly Surplus</p>
          <p className="text-2xl font-bold text-primary-600">
            ${(monthlyIncome - monthlyExpenses).toLocaleString()}
          </p>
        </div>
        <div className="card p-6 text-center">
          <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
          <p className="text-sm text-gray-600 mb-1">Projected Wealth ({projectionYears}Y)</p>
          <p className="text-2xl font-bold text-green-600">
            ${finalProjection?.totalWealth.toLocaleString() || 0}
          </p>
        </div>
        <div className="card p-6 text-center">
          <Target className="w-8 h-8 text-orange-600 mx-auto mb-2" />
          <p className="text-sm text-gray-600 mb-1">Retirement Monthly Need</p>
          <p className="text-2xl font-bold text-orange-600">
            ${monthlyRequiredForRetirement.toLocaleString()}
          </p>
        </div>
        <div className="card p-6 text-center">
          <Calendar className="w-8 h-8 text-purple-600 mx-auto mb-2" />
          <p className="text-sm text-gray-600 mb-1">Years to Retirement</p>
          <p className="text-2xl font-bold text-purple-600">{yearsToRetirement}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Wealth Growth Projection */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Wealth Growth Projection</h3>
          <div className="chart-container h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={projectionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, '']} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="totalWealth" 
                  stroke="#0ea5e9" 
                  strokeWidth={3}
                  name="Total Wealth"
                />
                <Line 
                  type="monotone" 
                  dataKey="savings" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  name="Savings"
                />
                <Line 
                  type="monotone" 
                  dataKey="investments" 
                  stroke="#f59e0b" 
                  strokeWidth={2}
                  name="Investment Growth"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Wealth Allocation */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Wealth Allocation (Year {projectionYears})
          </h3>
          <div className="chart-container h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={wealthAllocation}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {wealthAllocation.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, '']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Goal Timeline */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Financial Goals Timeline</h3>
        <div className="space-y-4">
          {goalTimeline.map((goal, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">{goal.goal}</h4>
                <p className="text-sm text-gray-600">Target: ${goal.target.toLocaleString()}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">Timeframe</p>
                <p className="font-semibold">{goal.timeframe}</p>
              </div>
              <div className="text-right">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  goal.priority === 'High' ? 'bg-red-100 text-red-800' :
                  goal.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {goal.priority}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">AI-Powered Recommendations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">Increase Savings Rate</h4>
            <p className="text-sm text-blue-700">
              Consider increasing your monthly savings by 10% to reach your retirement goal faster. 
              This would add ${((monthlyIncome - monthlyExpenses) * 0.1).toFixed(0)} to your monthly surplus.
            </p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <h4 className="font-semibold text-green-900 mb-2">Diversify Investments</h4>
            <p className="text-sm text-green-700">
              Based on your risk profile, consider diversifying into index funds and bonds 
              to optimize your {investmentReturn}% expected return while reducing risk.
            </p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <h4 className="font-semibold text-purple-900 mb-2">Emergency Fund Priority</h4>
            <p className="text-sm text-purple-700">
              Build an emergency fund covering 6 months of expenses (${(monthlyExpenses * 6).toLocaleString()}) 
              before increasing investment contributions.
            </p>
          </div>
          <div className="p-4 bg-orange-50 rounded-lg">
            <h4 className="font-semibold text-orange-900 mb-2">Tax Optimization</h4>
            <p className="text-sm text-orange-700">
              Maximize your 401(k) contributions to reduce taxable income and 
              accelerate retirement savings with employer matching.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FuturePlanner;