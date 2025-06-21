import React, { useState } from 'react';
import { Plus, Edit2, Trash2, FileText, AlertCircle } from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';
import Modal from '../ui/Modal';
import LoanForm from '../forms/LoanForm';

function Loans() {
  const { state, dispatch } = useFinance();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLoan, setEditingLoan] = useState(null);

  const handleAddLoan = (loanData) => {
    dispatch({ type: 'ADD_LOAN', payload: loanData });
    setIsModalOpen(false);
  };

  const handleEditLoan = (loanData) => {
    dispatch({ type: 'UPDATE_LOAN', payload: loanData });
    setEditingLoan(null);
    setIsModalOpen(false);
  };

  const handleDeleteLoan = (id) => {
    if (window.confirm('Are you sure you want to delete this loan?')) {
      dispatch({ type: 'DELETE_LOAN', payload: id });
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'overdue':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'paid':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Loan Management</h2>
          <p className="text-gray-600 mt-1">Track and manage all your loans in one place</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Loan
        </button>
      </div>

      {/* Loans List */}
      {state.loans.length === 0 ? (
        <div className="card p-12 text-center">
          <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No loans recorded</h3>
          <p className="text-gray-600 mb-6">Add your loans to keep track of payments and balances</p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn-primary"
          >
            Add Your First Loan
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {state.loans.map((loan) => (
            <div key={loan.id} className="card p-6 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{loan.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(loan.status)}`}>
                      {loan.status}
                    </span>
                    {loan.status === 'overdue' && (
                      <AlertCircle className="w-4 h-4 text-red-500" />
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Remaining Amount</p>
                      <p className="text-xl font-bold text-gray-900">${loan.remainingAmount?.toLocaleString() || 0}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Monthly EMI</p>
                      <p className="text-lg font-semibold text-gray-900">${loan.monthlyEMI?.toLocaleString() || 0}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Interest Rate</p>
                      <p className="text-lg font-semibold text-gray-900">{loan.interestRate || 0}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Next Payment</p>
                      <p className="text-lg font-semibold text-gray-900">
                        {loan.nextPaymentDate ? new Date(loan.nextPaymentDate).toLocaleDateString() : 'N/A'}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-1 ml-4">
                  <button
                    onClick={() => {
                      setEditingLoan(loan);
                      setIsModalOpen(true);
                    }}
                    className="p-2 text-gray-400 hover:text-gray-600"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteLoan(loan.id)}
                    className="p-2 text-gray-400 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingLoan(null);
        }}
        title={editingLoan ? 'Edit Loan' : 'Add New Loan'}
      >
        <LoanForm
          loan={editingLoan}
          onSubmit={editingLoan ? handleEditLoan : handleAddLoan}
          onCancel={() => {
            setIsModalOpen(false);
            setEditingLoan(null);
          }}
        />
      </Modal>
    </div>
  );
}

export default Loans;