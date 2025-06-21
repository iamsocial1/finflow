import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Target } from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';
import Modal from '../ui/Modal';
import SavingsForm from '../forms/SavingsForm';

function Savings() {
  const { state, dispatch } = useFinance();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSaving, setEditingSaving] = useState(null);

  const handleAddSaving = (savingData) => {
    dispatch({ type: 'ADD_SAVING', payload: savingData });
    setIsModalOpen(false);
  };

  const handleEditSaving = (savingData) => {
    dispatch({ type: 'UPDATE_SAVING', payload: savingData });
    setEditingSaving(null);
    setIsModalOpen(false);
  };

  const handleDeleteSaving = (id) => {
    if (window.confirm('Are you sure you want to delete this savings goal?')) {
      dispatch({ type: 'DELETE_SAVING', payload: id });
    }
  };

  const getProgressPercentage = (current, target) => {
    return Math.min((current / target) * 100, 100);
  };

  const getTagColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Savings Goals</h2>
          <p className="text-gray-600 mt-1">Track and manage your savings objectives</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Savings Goal
        </button>
      </div>

      {/* Savings Goals Grid */}
      {state.savings.length === 0 ? (
        <div className="card p-12 text-center">
          <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No savings goals yet</h3>
          <p className="text-gray-600 mb-6">Start your financial journey by creating your first savings goal</p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn-primary"
          >
            Create Your First Goal
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {state.savings.map((saving) => {
            const progress = getProgressPercentage(saving.currentAmount, saving.targetAmount);
            return (
              <div key={saving.id} className="card p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{saving.name}</h3>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium border ${getTagColor(saving.priority)} mt-2`}>
                      {saving.priority} priority
                    </span>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => {
                        setEditingSaving(saving);
                        setIsModalOpen(true);
                      }}
                      className="p-1 text-gray-400 hover:text-gray-600"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteSaving(saving.id)}
                      className="p-1 text-gray-400 hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-medium">{progress.toFixed(1)}%</span>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-primary-500 to-primary-600 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Current</p>
                      <p className="font-semibold text-gray-900">${saving.currentAmount.toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Target</p>
                      <p className="font-semibold text-gray-900">${saving.targetAmount.toLocaleString()}</p>
                    </div>
                  </div>

                  {saving.deadline && (
                    <div className="text-sm text-gray-600">
                      <span>Target date: </span>
                      <span className="font-medium">
                        {new Date(saving.deadline).toLocaleDateString()}
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
          setEditingSaving(null);
        }}
        title={editingSaving ? 'Edit Savings Goal' : 'Add New Savings Goal'}
      >
        <SavingsForm
          saving={editingSaving}
          onSubmit={editingSaving ? handleEditSaving : handleAddSaving}
          onCancel={() => {
            setIsModalOpen(false);
            setEditingSaving(null);
          }}
        />
      </Modal>
    </div>
  );
}

export default Savings;