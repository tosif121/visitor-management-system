import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faBell, faCalendar, faClock, faCar, faUser, faSignOutAlt, faUsers } from '@fortawesome/free-solid-svg-icons';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className={`bg-purple-700 text-white w-64 ${isSidebarOpen ? 'block' : 'hidden'} md:block`}>
        <div className="p-4">
          <h2 className="text-2xl font-bold">Dashboard</h2>
        </div>
        <ul className="space-y-4 p-4">
          <li className="flex items-center space-x-2 cursor-pointer hover:bg-purple-500 p-2 rounded-md">
            <FontAwesomeIcon icon={faUser} />
            <span>Profile</span>
          </li>
          <li className="flex items-center space-x-2 cursor-pointer hover:bg-purple-500 p-2 rounded-md">
            <FontAwesomeIcon icon={faUsers} />
            <span>Users</span>
          </li>
          <li className="flex items-center space-x-2 cursor-pointer hover:bg-purple-500 p-2 rounded-md">
            <FontAwesomeIcon icon={faCar} />
            <span>Vehicles</span>
          </li>
          <li className="flex items-center space-x-2 cursor-pointer hover:bg-purple-500 p-2 rounded-md">
            <FontAwesomeIcon icon={faCalendar} />
            <span>Schedule</span>
          </li>
          <li className="flex items-center space-x-2 cursor-pointer hover:bg-purple-500 p-2 rounded-md">
            <FontAwesomeIcon icon={faSignOutAlt} />
            <span>Logout</span>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-md p-4 flex justify-between items-center">
          <button
            className="text-purple-700 md:hidden"
            onClick={toggleSidebar}
          >
            <FontAwesomeIcon icon={faBars} size="lg" />
          </button>
          <h1 className="text-xl font-bold">Welcome, User!</h1>
          <div className="flex space-x-4">
            <FontAwesomeIcon icon={faClock} className="text-purple-700 cursor-pointer" />
            <FontAwesomeIcon icon={faBell} className="text-purple-700 cursor-pointer" />
          </div>
        </header>

        {/* Content */}
        <main className="p-6 bg-gray-100 flex-1">
          <h2 className="text-2xl font-bold mb-4">Dashboard Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Example Widgets */}
            <div className="bg-white shadow p-4 rounded-lg">
              <FontAwesomeIcon icon={faUsers} size="2x" className="text-purple-700 mb-4" />
              <h3 className="text-lg font-semibold">Total Users</h3>
              <p className="text-gray-500">1,234</p>
            </div>
            <div className="bg-white shadow p-4 rounded-lg">
              <FontAwesomeIcon icon={faCar} size="2x" className="text-purple-700 mb-4" />
              <h3 className="text-lg font-semibold">Total Vehicles</h3>
              <p className="text-gray-500">567</p>
            </div>
            <div className="bg-white shadow p-4 rounded-lg">
              <FontAwesomeIcon icon={faCalendar} size="2x" className="text-purple-700 mb-4" />
              <h3 className="text-lg font-semibold">Scheduled Events</h3>
              <p className="text-gray-500">45</p>
            </div>
            <div className="bg-white shadow p-4 rounded-lg">
              <FontAwesomeIcon icon={faClock} size="2x" className="text-purple-700 mb-4" />
              <h3 className="text-lg font-semibold">Time Logged</h3>
              <p className="text-gray-500">123 hours</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
