import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import TrashBin from './components/TrashBin';
import About from './components/About';
import Profile from './components/Profile';
import Auth from './components/Auth';
import { User, ViewState } from './types';

const App: React.FC = () => {
  // Auth State
  const [user, setUser] = useState<User | null>(null);
  
  // UI State
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.DASHBOARD);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [searchTerm, setSearchTerm] = useState('');

  // Check for existing session on mount (simplified)
  useEffect(() => {
    const storedUser = localStorage.getItem('return_os_active_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Responsive check
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
    localStorage.setItem('return_os_active_user', JSON.stringify(loggedInUser));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('return_os_active_user');
    setCurrentView(ViewState.DASHBOARD);
  };

  // Render Content based on ViewState
  const renderContent = () => {
    if (!user) return null;
    switch (currentView) {
      case ViewState.DASHBOARD:
        return <Dashboard user={user} searchTerm={searchTerm} />;
      case ViewState.TRASH:
        return <TrashBin user={user} />;
      case ViewState.ABOUT:
        return <About />;
      case ViewState.PROFILE:
        return <Profile user={user} onUpdate={handleLogin} />; // handleLogin updates state
      default:
        return <Dashboard user={user} searchTerm={searchTerm} />;
    }
  };

  if (!user) {
    return <Auth onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#111827]">
      {/* Background Ambiance */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px]"></div>
      </div>

      <Sidebar 
        currentView={currentView} 
        setView={setCurrentView} 
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        isMobile={isMobile}
      />

      <main className="flex-1 flex flex-col h-screen overflow-hidden relative z-10">
        <Header 
          user={user} 
          onLogout={handleLogout} 
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        
        <div className="flex-1 overflow-y-auto scroll-smooth">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;