import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Target, Calendar, DollarSign } from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';
import Modal from '../ui/Modal';
import GoalForm from '../forms/GoalForm';

function GoalPlanner() {
  const { state, dispatch } = useFinance();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);

  const handleAddGoal = (goalData) => {
    dispatch({ type: 'ADD_GOAL', payload: goalData });
    setIsModalOpen(false);
  };

  const handleEditGoal = (goalData) => {
    dispatch({ type: 'UPDATE_GOAL', payload: goalData });
    setEditingGoal(null);
    setIsModalOpen(false);
  };

  const handleDeleteGoal = (id) => {
    if (window.confirm('Are you sure you want to delete this goal?')) {
      dispatch({ type: 'DELETE_GOAL', payload: id });
    }
  };

  const getPriorityColor = (priority) => {
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

  const getProgressPercentage = (current, target) => {
    return Math.min((current / target) * 100, 100);
  };

  const calculateTimeRemaining = (targetDate) => {
    if (!targetDate) return null;
    const today = new Date();
    const target = new Date(targetDate);
    const diffTime = target - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Overdue';
    if (diffDays === 0) return 'Due today';
    if (diffDays === 1) return '1 day left';
    if (diffDays < 30) return `${diffDays} days left`;
    if (diffDays < 365) return `${Math.ceil(diffDays / 30)} months left`;
    return `${Math.ceil(diffDays / 365)} years left`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Goal Planner</h2>
          <p className="text-gray-600 mt-1">Set and track your financial goals with actionable plans</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Goal
        </button>
      </div>

      {/* Goals Grid */}
      {state.goals.length === 0 ? (
        <div className="card p-12 text-center">
          <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No financial goals set</h3>
          <p className="text-gray-600 mb-6">Create your first financial goal to start planning your future</p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn-primary"
          >
            Set Your First Goal
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {state.goals.map((goal) => {
            const progress = getProgressPercentage(goal.currentAmount, goal.targetAmount);
            const timeRemaining = calculateTimeRemaining(goal.targetDate);
            
            return (
              <div key={goal.id} className="card p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{goal.name}</h3>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(goal.priority)}`}>
                      {goal.priority} priority
                    </span>
                  </div>
                  <div className="flex gap-1 ml-2">
                    <button
                      onClick={() => {
                        setEditingGoal(goal);
                        setIsModalOpen(true);
                      }}
                      className="p-1 text-gray-400 hover:text-gray-600"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteGoal(goal.id)}
                      className="p-1 text-gray-400 hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {goal.description && (
                    <p className="text-sm text-gray-600">{goal.description}</p>
                  )}

                  <div className="space-y-2">
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
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="flex items-center gap-1 mb-1">
                        <DollarSign className="w-3 h-3 text-gray-400" />
                        <span className="text-gray-600">Current</span>
                      </div>
                      <p className="font-semibold">${goal.currentAmount.toLocaleString()}</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-1 mb-1">
                        <Target className="w-3 h-3 text-gray-400" />
                        <span className="text-gray-600">Target</span>
                      </div>
                      <p className="font-semibold">${goal.targetAmount.toLocaleString()}</p>
                    </div>
                  </div>

                  {timeRemaining && (
                    <div className="flex items-center gap-1 text-sm">
                      <Calendar className="w-3 h-3 text-gray-400" />
                      <span className={`font-medium ${
                        timeRemaining === 'Overdue' ? 'text-red-600' : 'text-gray-600'
                      }`}>
                        {timeRemaining}
                      </span>
                    </div>
                  )}

                  {goal.monthlyContribution && (
                    <div className="bg-primary-50 p-3 rounded-lg">
                      <p className="text-sm text-primary-700">
                        <span className="font-medium">Suggested monthly saving:</span> ${goal.monthlyContribution.toLocaleString()}
                      </p>
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
          setEditingGoal(null);
        }}
        title={editingGoal ? 'Edit Goal' : 'Add New Goal'}
      >
        <GoalForm
          goal={editingGoal}
          onSubmit={editingGoal ? handleEditGoal : handleAddGoal}
          onCancel={() => {
            setIsModalOpen(false);
            setEditingGoal(null);
          }}
        />
      </Modal>
    </div>
  );
}

export default GoalPlanner;