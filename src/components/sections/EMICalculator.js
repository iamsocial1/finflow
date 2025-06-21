import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Calculator } from 'lucide-react';

function EMICalculator() {
  const [loanAmount, setLoanAmount] = useState(100000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [loanTenure, setLoanTenure] = useState(12);
  const [tenureType, setTenureType] = useState('years'); // years or months

  const calculateEMI = () => {
    const principal = parseFloat(loanAmount);
    const monthlyRate = parseFloat(interestRate) / 12 / 100;
    const totalMonths = tenureType === 'years' ? parseInt(loanTenure) * 12 : parseInt(loanTenure);

    if (monthlyRate === 0) {
      return principal / totalMonths;
    }

    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / 
                (Math.pow(1 + monthlyRate, totalMonths) - 1);
    
    return emi;
  };

  const emi = calculateEMI();
  const totalMonths = tenureType === 'years' ? loanTenure * 12 : loanTenure;
  const totalAmount = emi * totalMonths;
  const totalInterest = totalAmount - loanAmount;

  const chartData = [
    { name: 'Principal', value: loanAmount, color: '#0ea5e9' },
    { name: 'Interest', value: totalInterest, color: '#ef4444' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">EMI Calculator</h2>
        <p className="text-gray-600 mt-1">Calculate your loan EMI and view payment breakdown</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Calculator Form */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <Calculator className="w-5 h-5" />
            Loan Details
          </h3>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Loan Amount
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="number"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  min="1000"
                  step="1000"
                />
              </div>
              <input
                type="range"
                min="1000"
                max="1000000"
                step="1000"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                className="w-full mt-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Interest Rate (% per annum)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  min="0.1"
                  max="30"
                  step="0.1"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="30"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                className="w-full mt-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Loan Tenure
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={loanTenure}
                  onChange={(e) => setLoanTenure(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  min="1"
                />
                <select
                  value={tenureType}
                  onChange={(e) => setTenureType(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="years">Years</option>
                  <option value="months">Months</option>
                </select>
              </div>
              <input
                type="range"
                min="1"
                max={tenureType === 'years' ? "30" : "360"}
                value={loanTenure}
                onChange={(e) => setLoanTenure(e.target.value)}
                className="w-full mt-2"
              />
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-6">
          {/* EMI Result */}
          <div className="card p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Monthly EMI</h3>
            <div className="text-4xl font-bold text-primary-600 mb-4">
              ${emi.toLocaleString('en-US', { maximumFractionDigits: 0 })}
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Principal Amount</p>
                <p className="font-semibold">${parseInt(loanAmount).toLocaleString()}</p>
              </div>
              <div>
                <p className="text-gray-600">Total Interest</p>
                <p className="font-semibold">${totalInterest.toLocaleString('en-US', { maximumFractionDigits: 0 })}</p>
              </div>
            </div>
          </div>

          {/* Payment Breakdown Chart */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Breakdown</h3>
            <div className="chart-container h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, '']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-primary-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Principal</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Interest</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Table */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Loan Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Total Amount Payable</p>
            <p className="text-2xl font-bold text-gray-900">
              ${totalAmount.toLocaleString('en-US', { maximumFractionDigits: 0 })}
            </p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Total Interest Payable</p>
            <p className="text-2xl font-bold text-red-600">
              ${totalInterest.toLocaleString('en-US', { maximumFractionDigits: 0 })}
            </p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Total Tenure</p>
            <p className="text-2xl font-bold text-gray-900">
              {totalMonths} months
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EMICalculator;