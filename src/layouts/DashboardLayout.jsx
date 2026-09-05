import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <Navbar onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none scrollbar-thin">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
