import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faBuilding,
  faEnvelope,
  faPhone,
  faCalendar,
  faClock,
  faMapPin,
  faCoffee,
  faCar,
  faArrowLeft,
} from '@fortawesome/free-solid-svg-icons';

const VisitorDetails = () => {
  const visitorData = {
    name: 'Rahul Sharma',
    company: 'Tech Solutions Ltd',
    email: 'rahul.sharma@techsolutions.com',
    phone: '+91 98765 43210',
    visitDate: '22 Nov 2024',
    visitTime: '10:30 AM',
    purpose: 'Client Meeting',
    host: 'Amit Kumar',
    status: 'checked-in',
    checkInTime: '10:28 AM',
    badgeNumber: 'V2024',
    cabDetails: {
      pickup: 'Airport Terminal 2',
      dropoff: 'Office HQ',
      time: '9:45 AM',
      status: 'completed',
    },
    timeline: [
      { time: '9:45 AM', event: 'Cab pickup from Airport Terminal 2' },
      { time: '10:28 AM', event: 'Visitor checked in at reception' },
      { time: '10:35 AM', event: 'Meeting started with Amit Kumar' },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <FontAwesomeIcon icon={faArrowLeft} className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="text-2xl font-semibold text-gray-800">Visitor Details</h1>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          {/* Visitor Info Card */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-xl text-blue-600 font-medium">
                  {visitorData.name.split(' ').map((n) => n[0]).join('')}
                </span>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{visitorData.name}</h2>
                <div className="flex items-center gap-2 text-gray-500">
                  <FontAwesomeIcon icon={faBuilding} className="w-4 h-4" />
                  {visitorData.company}
                </div>
              </div>
              <div className="ml-auto">
                <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-medium">
                  {visitorData.status}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <FontAwesomeIcon icon={faEnvelope} className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-600">{visitorData.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <FontAwesomeIcon icon={faPhone} className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-600">{visitorData.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <FontAwesomeIcon icon={faCalendar} className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-600">{visitorData.visitDate}</span>
                </div>
                <div className="flex items-center gap-3">
                  <FontAwesomeIcon icon={faClock} className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-600">{visitorData.visitTime}</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <FontAwesomeIcon icon={faCoffee} className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-600">{visitorData.purpose}</span>
                </div>
                <div className="flex items-center gap-3">
                  <FontAwesomeIcon icon={faUser} className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-600">Host: {visitorData.host}</span>
                </div>
                <div className="flex items-center gap-3">
                  <FontAwesomeIcon icon={faClock} className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-600">Checked in: {visitorData.checkInTime}</span>
                </div>
                <div className="flex items-center gap-3">
                  <FontAwesomeIcon icon={faUser} className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-600">Badge: #{visitorData.badgeNumber}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Cab Details Card */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-medium text-gray-800 flex items-center gap-2 mb-4">
              <FontAwesomeIcon icon={faCar} className="w-5 h-5 text-blue-600" />
              Cab Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <FontAwesomeIcon icon={faMapPin} className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Pickup Location</p>
                    <p className="text-gray-700">{visitorData.cabDetails.pickup}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FontAwesomeIcon icon={faClock} className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Pickup Time</p>
                    <p className="text-gray-700">{visitorData.cabDetails.time}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <FontAwesomeIcon icon={faMapPin} className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Drop Location</p>
                    <p className="text-gray-700">{visitorData.cabDetails.dropoff}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-medium">
                    {visitorData.cabDetails.status}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Visit Timeline</h3>

            <div className="space-y-4">
              {visitorData.timeline.map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="relative">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    {index !== visitorData.timeline.length - 1 && (
                      <div className="absolute top-3 left-1 w-px h-full bg-gray-200"></div>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{item.time}</p>
                    <p className="text-sm text-gray-600">{item.event}</p>
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

export default VisitorDetails;
