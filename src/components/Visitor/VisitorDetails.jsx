import React, { useEffect, useState } from 'react';
import { visitorById } from '@/utils/servicesApi';
import toast from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faPhone,
  faBuilding,
  faCalendarAlt,
  faCheckCircle,
  faTimesCircle,
  faMapMarkerAlt,
  faInfoCircle,
  faIdBadge,
} from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import dynamic from 'next/dynamic';
const LoadingSpinner = dynamic(() => import('../reusableComponents/LoadingSpinner'));
const NoDataFound = dynamic(() => import('../reusableComponents/NoDataFound'));

function VisitorDetails({ id }) {
  const [visitorData, setVisitorData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await visitorById(id);
      if (res.status) {
        setVisitorData(res.data);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(error?.response?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Detail Row Component
  const DetailRow = ({ icon, label, value }) => (
    <div className="bg-gray-50 rounded-lg p-4 flex items-center space-x-4 transform transition-all duration-300 hover:scale-105 hover:shadow-md">
      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
        <FontAwesomeIcon icon={icon} className="text-primary text-2xl" />
      </div>
      <div>
        <p className="text-sm text-gray-500 tracking-wider">{label}</p>
        <p className="text-lg font-semibold text-gray-800">{value || 'Not Provided'}</p>
      </div>
    </div>
  );

  if (loading) return <LoadingSpinner />;

  if (!visitorData) return <NoDataFound />;

  return (
    <div className="min-h-screen flex justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden">
        {/* Header Section */}
        <div className="bg-primary text-white p-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">{visitorData.fullName}</h1>
            <p className="mt-2 text-lg">Visitor Profile</p>
          </div>
          <FontAwesomeIcon icon={faIdBadge} className="text-5xl" width={40} height={40} />
        </div>

        {/* Details Grid */}
        <div className="p-8 grid md:grid-cols-2 gap-6">
          <DetailRow icon={faEnvelope} label="Email Address" value={visitorData.email} />
          <DetailRow icon={faPhone} label="Phone Number" value={visitorData.phoneNumber} />
          <DetailRow icon={faBuilding} label="Company" value={visitorData.company} />
          <DetailRow icon={faCalendarAlt} label="Visit Date" value={moment(visitorData.visitDate).format('LLLL')} />

          {/* Additional Information Section */}
          <DetailRow
            icon={visitorData.needsCab ? faCheckCircle : faTimesCircle}
            label="Transportation"
            value={visitorData.needsCab ? 'Cab Requested' : 'No Cab Needed'}
          />
          <DetailRow icon={faMapMarkerAlt} label="Pickup Location" value={visitorData.pickupLocation} />
        </div>

        {/* Footer Section */}
        <div className="bg-gray-100 p-6 text-center">
          <p className="text-sm text-gray-500">
            <FontAwesomeIcon icon={faInfoCircle} className="mr-2 text-blue-500" />
            Visitor information as of {moment().format('LLLL')}
          </p>
        </div>
      </div>
    </div>
  );
}

export default VisitorDetails;
