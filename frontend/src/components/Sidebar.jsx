import React, { useState } from 'react';
import { HeartPulse, ChevronLeft, ChevronRight, HeartHandshake, Users, Pill, ClipboardList } from 'lucide-react';

const Sidebar = ({ currentView, setCurrentView }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const navItems = [
    { id: 'caregiver', icon: HeartHandshake, label: 'Care giver' },
    { id: 'patient', icon: Users, label: 'Patient' },
    { id: 'drug', icon: Pill, label: 'Drug' },
    { id: 'careplan', icon: ClipboardList, label: 'Care plan' }
  ];

  return (
    <aside className={`flex flex-col bg-white h-full shadow-[4px_0_24px_rgba(252,231,243,0.5)] transition-all duration-300 ease-in-out z-20 relative ${isExpanded ? 'w-64' : 'w-20'}`}>
      <div className="h-20 flex items-center px-6 border-b border-pink-50 relative">
        <div className="w-8 h-8 rounded-xl bg-pink-200 flex items-center justify-center text-pink-600 shrink-0 shadow-sm">
          <HeartPulse className="w-5 h-5" />
        </div>
        <span className={`ml-3 text-2xl font-semibold text-gray-800 tracking-tight transition-opacity duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0 hidden'}`}>Care</span>
        
        <button onClick={() => setIsExpanded(!isExpanded)} className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-white border border-pink-100 rounded-full flex items-center justify-center text-gray-400 hover:text-pink-500 hover:border-pink-300 shadow-sm transition-colors focus:outline-none z-50">
          {isExpanded ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>
      </div>

      <nav className="flex-1 px-3 py-6 space-y-2 overflow-y-auto overflow-x-hidden">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`w-full flex items-center px-3 py-3 rounded-xl cursor-pointer group outline-none transition-all duration-300 ${isActive ? 'bg-pink-100 text-pink-600 font-medium' : 'text-gray-500 hover:bg-pink-50 hover:text-pink-500'}`}
            >
              <Icon className="w-6 h-6 shrink-0 transition-transform group-hover:scale-110" />
              <span className={`ml-4 text-sm transition-all duration-300 whitespace-nowrap ${isExpanded ? 'opacity-100 w-auto' : 'opacity-0 w-0 overflow-hidden'}`}>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
