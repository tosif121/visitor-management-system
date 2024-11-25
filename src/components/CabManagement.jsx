import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCar,
  faSearch,
  faFilter,
  faClock,
  faLocationArrow,
  faUser,
  faPhone,
} from '@fortawesome/free-solid-svg-icons';

const CabManagement = () => {
  const [activeTab, setActiveTab] = useState('pending');

  const cabRequests = [
    {
      id: 1,
      visitorName: 'Rahul Sharma',
      phone: '+91 98765 43210',
      pickupLocation: 'Airport Terminal 2',
      dropLocation: 'Office HQ',
      pickupTime: '10:30 AM',
      status: 'pending',
      purpose: 'Client Meeting',
    },
    {
      id: 2,
      visitorName: 'Priya Patel',
      phone: '+91 98765 43211',
      pickupLocation: 'Railway Station',
      dropLocation: 'Office HQ',
      pickupTime: '2:15 PM',
      status: 'approved',
      purpose: 'Interview',
    },
    // Add more requests as needed
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h1 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
            <FontAwesomeIcon icon={faCar} className="text-blue-600" />
            Cab Management
          </h1>

          <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-4">
            <div className="relative">
              <FontAwesomeIcon
                icon={faSearch}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search requests..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full sm:w-64 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <FontAwesomeIcon icon={faFilter} className="text-gray-600" />
              Filters
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="border-b border-gray-200">
            <div className="flex space-x-8 px-4">
              {['pending', 'approved', 'completed', 'cancelled'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm capitalize ${
                    activeTab === tab
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Requests List */}
          <div className="p-4">
            <div className="space-y-4">
              {cabRequests
                .filter((request) => request.status === activeTab)
                .map((request) => (
                  <div
                    key={request.id}
                    className="border border-gray-200 rounded-lg p-4 hover:border-blue-200 transition-colors"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <FontAwesomeIcon icon={faUser} className="text-gray-400" />
                          <h3 className="font-medium text-gray-900">{request.visitorName}</h3>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <FontAwesomeIcon icon={faPhone} className="text-gray-400" />
                          {request.phone}
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <FontAwesomeIcon icon={faLocationArrow} className="text-gray-400" />
                          From: {request.pickupLocation}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <FontAwesomeIcon icon={faLocationArrow} className="text-gray-400" />
                          To: {request.dropLocation}
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <FontAwesomeIcon icon={faClock} className="text-gray-400" />
                          Pickup: {request.pickupTime}
                        </div>
                        <div className="text-sm text-gray-500">Purpose: {request.purpose}</div>
                      </div>

                      <div className="flex items-center justify-end gap-2">
                        {activeTab === 'pending' && (
                          <>
                            <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                              Approve
                            </button>
                            <button className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">
                              Reject
                            </button>
                          </>
                        )}
                        {activeTab === 'approved' && (
                          <button className="px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50">
                            View Details
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CabManagement;
