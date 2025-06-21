import React from 'react';
import { 
  LayoutDashboard, 
  PiggyBank, 
  CreditCard, 
  Calculator, 
  Target, 
  TrendingUp, 
  FileText,
  Menu,
  X
} from 'lucide-react';

const sidebarItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'savings', label: 'Savings', icon: PiggyBank },
  { id: 'loans', label: 'Loans', icon: FileText },
  { id: 'creditCards', label: 'Credit Cards', icon: CreditCard },
  { id: 'emiCalculator', label: 'EMI Calculator', icon: Calculator },
  { id: 'goalPlanner', label: 'Goal Planner', icon: Target },
  { id: 'futurePlanner', label: 'Future Planner', icon: TrendingUp },
];

function Sidebar({ activeSection, setActiveSection, isOpen, setIsOpen }) {
  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200
        transform transition-transform duration-300 ease-in-out lg:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">FinFlow</h1>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-1 rounded-md hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <nav className="p-4 space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  setIsOpen(false); // Close sidebar on mobile after selection
                }}
                className={`sidebar-item w-full ${
                  activeSection === item.id ? 'active' : ''
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </>
  );
}

export default Sidebar;