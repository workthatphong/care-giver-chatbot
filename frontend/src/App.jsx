import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import SlidePanel from './components/SlidePanel';

function App() {
  const [currentView, setCurrentView] = useState('caregiver');
  const [detailOpen, setDetailOpen] = useState(null);

  return (
    <div className="flex h-screen w-full text-gray-700 font-sans">
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
      
      <main className="flex-1 relative flex flex-col transition-all duration-300 overflow-hidden bg-transparent">
        <div className="flex-1 flex flex-col h-full w-full bg-white">
          <Header currentView={currentView} />
          <div className="flex-1 overflow-y-auto px-8 pb-8 sm:px-12 sm:pb-12 custom-scrollbar relative">
            <Dashboard currentView={currentView} setDetailOpen={setDetailOpen} />
          </div>
        </div>
        <SlidePanel detailOpen={detailOpen} setDetailOpen={setDetailOpen} />
      </main>
    </div>
  );
}

export default App;
