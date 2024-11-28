import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faCar, faClock, faUsers } from '@fortawesome/free-solid-svg-icons';

const data = [
  {
    icon: faUsers,
    title: 'Total Users',
    value: '1,234',
    iconClassName: 'text-blue-600 dark:text-blue-400',
  },
  {
    icon: faCar,
    title: 'Total Vehicles',
    value: '567',
    iconClassName: 'text-green-600 dark:text-green-400',
  },
  {
    icon: faCalendar,
    title: 'Scheduled Events',
    value: '45',
    iconClassName: 'text-purple-600 dark:text-purple-400',
  },
  {
    icon: faClock,
    title: 'Time Logged',
    value: '123 hours',
    iconClassName: 'text-orange-600 dark:text-orange-400',
  },
];

const DashboardCard = ({ icon, title, value, iconClassName }) => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow duration-300 p-5 rounded-lg">
      <div className="flex flex-col items-start">
        <FontAwesomeIcon icon={icon} className={`mb-3 w-9 h-9 ${iconClassName}`} />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 text-base">{value}</p>
      </div>
    </div>
  );
};

function Dashboard() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 capitalize">Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {data.map((card, index) => (
          <DashboardCard key={index} {...card} />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
