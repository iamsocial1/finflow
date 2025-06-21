import React, { useState, useEffect } from 'react';

function CreditCardForm({ card, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    brand: 'visa',
    lastFourDigits: '',
    creditLimit: '',
    balance: '',
    dueDate: '',
    minimumPayment: ''
  });

  useEffect(() => {
    if (card) {
      setFormData({
        ...card,
        dueDate: card.dueDate ? card.dueDate.split('T')[0] : ''
      });
    }
  }, [card]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      creditLimit: parseFloat(formData.creditLimit),
      balance: parseFloat(formData.balance),
      minimumPayment: formData.minimumPayment ? parseFloat(formData.minimumPayment) : 0,
      dueDate: formData.dueDate || null
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
          Card Name
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          required
          placeholder="e.g., Chase Freedom, Bank of America Cash Rewards"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Card Brand
          </label>
          <select
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="visa">Visa</option>
            <option value="mastercard">Mastercard</option>
            <option value="amex">American Express</option>
            <option value="discover">Discover</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Last 4 Digits
          </label>
          <input
            type="text"
            name="lastFourDigits"
            value={formData.lastFourDigits}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            required
            pattern="[0-9]{4}"
            maxLength="4"
            placeholder="1234"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Credit Limit ($)
          </label>
          <input
            type="number"
            name="creditLimit"
            value={formData.creditLimit}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            required
            min="0"
            step="0.01"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Current Balance ($)
          </label>
          <input
            type="number"
            name="balance"
            value={formData.balance}
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
            Due Date
          </label>
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Minimum Payment ($)
          </label>
          <input
            type="number"
            name="minimumPayment"
            value={formData.minimumPayment}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            min="0"
            step="0.01"
          />
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          className="flex-1 btn-primary"
        >
          {card ? 'Update Card' : 'Add Card'}
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

export default CreditCardForm;