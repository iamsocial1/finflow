import React, { useState, useEffect } from 'react';

function SavingsForm({ saving, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    targetAmount: '',
    currentAmount: '',
    deadline: '',
    priority: 'medium'
  });

  useEffect(() => {
    if (saving) {
      setFormData({
        ...saving,
        deadline: saving.deadline ? saving.deadline.split('T')[0] : ''
      });
    }
  }, [saving]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      targetAmount: parseFloat(formData.targetAmount),
      currentAmount: parseFloat(formData.currentAmount),
      deadline: formData.deadline || null
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
          Goal Name
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          required
          placeholder="e.g., Emergency Fund, Vacation"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Target Amount ($)
        </label>
        <input
          type="number"
          name="targetAmount"
          value={formData.targetAmount}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          required
          min="0"
          step="0.01"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Current Amount ($)
        </label>
        <input
          type="number"
          name="currentAmount"
          value={formData.currentAmount}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          required
          min="0"
          step="0.01"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Target Date (Optional)
        </label>
        <input
          type="date"
          name="deadline"
          value={formData.deadline}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Priority
        </label>
        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          className="flex-1 btn-primary"
        >
          {saving ? 'Update Goal' : 'Create Goal'}
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

export default SavingsForm;