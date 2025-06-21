import React, { useState } from 'react';
import { Plus, Edit2, Trash2, CreditCard, AlertTriangle } from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';
import Modal from '../ui/Modal';
import CreditCardForm from '../forms/CreditCardForm';

function CreditCards() {
  const { state, dispatch } = useFinance();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCard, setEditingCard] = useState(null);

  const handleAddCard = (cardData) => {
    dispatch({ type: 'ADD_CREDIT_CARD', payload: cardData });
    setIsModalOpen(false);
  };

  const handleEditCard = (cardData) => {
    dispatch({ type: 'UPDATE_CREDIT_CARD', payload: cardData });
    setEditingCard(null);
    setIsModalOpen(false);
  };

  const handleDeleteCard = (id) => {
    if (window.confirm('Are you sure you want to delete this credit card?')) {
      dispatch({ type: 'DELETE_CREDIT_CARD', payload: id });
    }
  };

  const getUtilizationColor = (utilization) => {
    if (utilization <= 30) return 'text-green-600';
    if (utilization <= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getCardBrandColor = (brand) => {
    const colors = {
      visa: 'bg-blue-600',
      mastercard: 'bg-red-600',
      amex: 'bg-green-600',
      discover: 'bg-orange-600',
      other: 'bg-gray-600'
    };
    return colors[brand?.toLowerCase()] || colors.other;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Credit Cards</h2>
          <p className="text-gray-600 mt-1">Monitor your credit card balances and spending</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Credit Card
        </button>
      </div>

      {/* Credit Cards Grid */}
      {state.creditCards.length === 0 ? (
        <div className="card p-12 text-center">
          <CreditCard className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No credit cards added</h3>
          <p className="text-gray-600 mb-6">Add your credit cards to track spending and payments</p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn-primary"
          >
            Add Your First Card
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {state.creditCards.map((card) => {
            const utilization = ((card.balance / card.creditLimit) * 100).toFixed(1);
            const isHighUtilization = utilization > 70;
            
            return (
              <div key={card.id} className="card p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-6 rounded ${getCardBrandColor(card.brand)}`} />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{card.name}</h3>
                      <p className="text-sm text-gray-600">**** {card.lastFourDigits}</p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => {
                        setEditingCard(card);
                        setIsModalOpen(true);
                      }}
                      className="p-1 text-gray-400 hover:text-gray-600"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteCard(card.id)}
                      className="p-1 text-gray-400 hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Current Balance</span>
                    <span className="text-xl font-bold text-gray-900">
                      ${card.balance.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Credit Limit</span>
                    <span className="text-lg font-semibold text-gray-900">
                      ${card.creditLimit.toLocaleString()}
                    </span>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Utilization</span>
                      <div className="flex items-center gap-1">
                        {isHighUtilization && <AlertTriangle className="w-4 h-4 text-red-500" />}
                        <span className={`text-sm font-semibold ${getUtilizationColor(utilization)}`}>
                          {utilization}%
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${
                          utilization <= 30 ? 'bg-green-500' :
                          utilization <= 70 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${Math.min(utilization, 100)}%` }}
                      />
                    </div>
                  </div>

                  {card.dueDate && (
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">Next Due Date</span>
                      <span className="font-medium">
                        {new Date(card.dueDate).toLocaleDateString()}
                      </span>
                    </div>
                  )}

                  {card.minimumPayment && (
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">Minimum Payment</span>
                      <span className="font-semibold text-red-600">
                        ${card.minimumPayment.toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingCard(null);
        }}
        title={editingCard ? 'Edit Credit Card' : 'Add New Credit Card'}
      >
        <CreditCardForm
          card={editingCard}
          onSubmit={editingCard ? handleEditCard : handleAddCard}
          onCancel={() => {
            setIsModalOpen(false);
            setEditingCard(null);
          }}
        />
      </Modal>
    </div>
  );
}

export default CreditCards;