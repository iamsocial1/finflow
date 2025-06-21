import React, { useState, useEffect } from 'react';

function LoanForm({ loan, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    originalAmount: '',
    remainingAmount: '',
    interestRate: '',
    monthlyEMI: '',
    nextPaymentDate: '',
    status: 'active'
  });

  useEffect(() => {
    if (loan) {
      setFormData({
        ...loan,
        nextPaymentDate: loan.nextPaymentDate ? loan.nextPaymentDate.split('T')[0] : ''
      });
    }
  }, [loan]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      originalAmount: parseFloat(formData.originalAmount),
      remainingAmount: parseFloat(formData.remainingAmount),
      interestRate: parseFloat(formData.interestRate),
      monthlyEMI: parseFloat(formData.monthlyEMI),
      nextPaymentDate: formData.nextPaymentDate || null
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Loan Name
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          required
          placeholder="e.g., Home Loan, Car Loan"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Original Amount ($)
          </label>
          <input
            type="number"
            name="originalAmount"
            value={formData.originalAmount}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            required
            min="0"
            step="0.01"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Remaining Amount ($)
          </label>
          <input
            type="number"
            name="remainingAmount"
            value={formData.remainingAmount}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            required
            min="0"
            step="0.01"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Interest Rate (%)
          </label>
          <input
            type="number"
            name="interestRate"
            value={formData.interestRate}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            required
            min="0"
            step="0.01"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Monthly EMI ($)
          </label>
          <input
            type="number"
            name="monthlyEMI"
            value={formData.monthlyEMI}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            required
            min="0"
            step="0.01"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Next Payment Date
        </label>
        <input
          type="date"
          name="nextPaymentDate"
          value={formData.nextPaymentDate}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Status
        </label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        >
          <option value="active">Active</option>
          <option value="overdue">Overdue</option>
          <option value="paid">Paid Off</option>
        </select>
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          className="flex-1 btn-primary"
        >
          {loan ? 'Update Loan' : 'Add Loan'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 btn-secondary"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default LoanForm;