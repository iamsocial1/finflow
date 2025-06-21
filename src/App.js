import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import { FinanceProvider } from './context/FinanceContext';

function App() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <FinanceProvider>
      <Router>
        <div className="flex h-screen bg-gray-50">
          <Sidebar 
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            isOpen={isSidebarOpen}
            setIsOpen={setIsSidebarOpen}
          />
          <MainContent 
            activeSection={activeSection}
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
        </div>
      </Router>
    </FinanceProvider>
  );
}

export default App;