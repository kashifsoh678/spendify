import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="layout-grid h-screen overflow-hidden bg-gray-50 dark:bg-[#181824]">

      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="layout-content">
        <Navbar toggleSidebar={toggleSidebar} />

        <main className="p-4 ">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;

