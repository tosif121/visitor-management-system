import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faUserCheck,
  faClock,
  faCalendarAlt,
  faPhone,
  faBuilding,
  faCoffee
} from '@fortawesome/free-solid-svg-icons';

const VisitorCheckin = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const expectedVisitors = [
    {
      id: 1,
      name: 'Rahul Sharma',
      visitTime: '10:30 AM',
      host: 'Amit Kumar',
      company: 'Tech Solutions Ltd',
      phone: '+91 98765 43210',
      purpose: 'Client Meeting',
      status: 'expected'
    },
    {
      id: 2,
      name: 'Priya Patel',
      visitTime: '11:45 AM',
      host: 'Neha Singh',
      company: 'Digital Corp',
      phone: '+91 98765 43211',
      purpose: 'Interview',
      status: 'checked-in'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Quick Check-in Search */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-medium text-gray-800 mb-4">Quick Check-in</h2>
          <div className="relative">
            <FontAwesomeIcon
              icon={faSearch}
              className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
            />
            <input
              type="text"
              placeholder="Search visitor by name or phone number..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Today's Schedule */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-medium text-gray-800 flex items-center gap-2">
              <FontAwesomeIcon icon={faCalendarAlt} className="w-5 h-5 text-blue-600" />
              Today's Expected Visitors
            </h2>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <FontAwesomeIcon icon={faClock} className="w-4 h-4" />
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
          </div>

          <div className="space-y-4">
            {expectedVisitors.map((visitor) => (
              <div key={visitor.id} className="border border-gray-200 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Visitor Info */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-blue-600 font-medium">
                          {visitor.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{visitor.name}</h3>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <FontAwesomeIcon icon={faBuilding} className="w-4 h-4" />
                          {visitor.company}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <FontAwesomeIcon icon={faPhone} className="w-4 h-4" />
                      {visitor.phone}
                    </div>
                  </div>

                  {/* Visit Details */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <FontAwesomeIcon icon={faClock} className="w-4 h-4" />
                      Expected: {visitor.visitTime}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <FontAwesomeIcon icon={faUserCheck} className="w-4 h-4" />
                      Host: {visitor.host}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <FontAwesomeIcon icon={faCoffee} className="w-4 h-4" />
                      Purpose: {visitor.purpose}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-end gap-3">
                    {visitor.status === 'expected' ? (
                      <>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                          Check In
                        </button>
                        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                          Cancel Visit
                        </button>
                      </>
                    ) : (
                      <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                        Check Out
                      </button>
                    )}
                  </div>
                </div>

                {visitor.status === 'checked-in' && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <div className="flex items-center gap-2">
                      <span className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-gray-500">Checked in at 11:45 AM</span>
                      </span>
                      <span className="text-sm text-gray-400">•</span>
                      <span className="text-sm text-gray-500">Badge #V2024</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisitorCheckin;
