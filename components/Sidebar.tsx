import React from 'react';
import { Home, Trash2, User, Info, LayoutGrid, Menu, X } from 'lucide-react';
import { ViewState } from '../types';

interface SidebarProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  isMobile: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView, isOpen, setIsOpen, isMobile }) => {
  
  const menuItems = [
    { id: ViewState.DASHBOARD, label: 'Dashboard', icon: LayoutGrid },
    { id: ViewState.TRASH, label: 'Recently Deleted', icon: Trash2 },
    { id: ViewState.PROFILE, label: 'My Account', icon: User },
    { id: ViewState.ABOUT, label: 'About App', icon: Info },
  ];

  const handleNav = (view: ViewState) => {
    setView(view);
    if (isMobile) setIsOpen(false);
  };

  // Mobile Drawer logic classes
  const sidebarClasses = `
    fixed inset-y-0 left-0 z-50 
    w-64 glass-panel border-r border-white/10
    transform transition-transform duration-300 ease-in-out
    ${isOpen ? 'translate-x-0' : '-translate-x-full'}
    md:translate-x-0 md:static md:h-screen
  `;

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div className={sidebarClasses}>
        <div className="p-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center shadow-lg">
              <Home className="text-white w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold tracking-wide text-white">
              Return<span className="text-gray-400">OS</span>
            </h1>
          </div>
          {isMobile && (
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
              <X size={24} />
            </button>
          )}
        </div>

        <nav className="mt-8 px-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`
                  w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200
                  ${isActive 
                    ? 'bg-white/10 text-white shadow-lg border border-white/5' 
                    : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'}
                `}
              >
                <Icon size={20} className={isActive ? 'text-blue-400' : ''} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
        
        <div className="absolute bottom-0 left-0 w-full p-6 text-center">
            <p className="text-xs text-gray-500">v1.0.0 • Stable Build</p>
        </div>
      </div>
    </>
  );
};

export default Sidebar;