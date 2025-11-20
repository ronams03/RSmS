import React, { useState } from 'react';
import { Search, LogOut, Menu, Bell } from 'lucide-react';
import { User } from '../types';

interface HeaderProps {
  user: User | null;
  onLogout: () => void;
  toggleSidebar: () => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout, toggleSidebar, searchTerm, setSearchTerm }) => {
  return (
    <header className="h-20 px-6 flex items-center justify-between glass-panel rounded-b-2xl md:rounded-2xl md:mx-6 md:mt-4 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar}
          className="md:hidden p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
        >
          <Menu size={24} />
        </button>
        
        {/* Search Bar */}
        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input 
            type="text"
            placeholder="Search proofs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="glass-input pl-10 pr-4 py-2 rounded-xl w-64 text-sm placeholder-gray-500 focus:w-80 transition-all duration-300"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center gap-3 px-4 py-1.5 rounded-full bg-black/20 border border-white/5">
            <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
            <span className="text-xs text-gray-400 font-medium">System Online</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden md:block text-sm text-gray-300 font-medium">
            Hello, {user?.name}
          </span>
          <div className="h-8 w-px bg-white/10 hidden md:block"></div>
          <button 
            onClick={onLogout}
            className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-all duration-200 flex items-center gap-2 group"
            title="Logout"
          >
            <LogOut size={20} />
            <span className="hidden md:inline text-sm font-medium group-hover:translate-x-0.5 transition-transform">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;