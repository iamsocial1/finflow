import React from 'react';
import { Menu } from 'lucide-react';
import Dashboard from './sections/Dashboard';
import Savings from './sections/Savings';
import Loans from './sections/Loans';
import CreditCards from './sections/CreditCards';
import EMICalculator from './sections/EMICalculator';
import GoalPlanner from './sections/GoalPlanner';
import FuturePlanner from './sections/FuturePlanner';

function MainContent({ activeSection, isSidebarOpen, setIsSidebarOpen }) {
  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'savings':
        return <Savings />;
      case 'loans':
        return <Loans />;
      case 'creditCards':
        return <CreditCards />;
      case 'emiCalculator':
        return <EMICalculator />;
      case 'goalPlanner':
        return <GoalPlanner />;
      case 'futurePlanner':
        return <FuturePlanner />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100"
          >
            <Menu className="w-5 h-5" />
          </button>
          <h2 className="text-2xl font-semibold text-gray-900 capitalize">
            {activeSection === 'emiCalculator' ? 'EMI Calculator' : 
             activeSection === 'goalPlanner' ? 'Goal Planner' :
             activeSection === 'futurePlanner' ? 'Future Planner' :
             activeSection === 'creditCards' ? 'Credit Cards' :
             activeSection}
          </h2>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 overflow-auto p-6">
        {renderSection()}
      </main>
    </div>
  );
}

export default MainContent;