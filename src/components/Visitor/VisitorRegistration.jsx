import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCar, faEnvelope, faCheckCircle, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import toast, { Toaster } from 'react-hot-toast';
import { handleChange, handleNumericInput, validateForm, validationRules } from '@/utils/formUtils';
import 'react-datepicker/dist/react-datepicker.css';
import ReactDatePicker from 'react-datepicker';
import Image from 'next/image';
import { setHours, setMinutes } from 'date-fns';
import InputField from '../ReusableComponents/InputField';
import dynamic from 'next/dynamic';
import { visitorRegister } from '@/utils/servicesApi';
import Link from 'next/link';
const Modal = dynamic(() => import('../ReusableComponents/Modal'));

const VisitorRegistration = () => {
  const [needsCab, setNeedsCab] = useState(false);
  const [visitDate, setVisitDate] = useState(null);
  const [pickupTime, setPickupTime] = useState(null);
  const [visitData, setVisitData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    email: '',
    company: '',
    purpose: '',
    pickupLocation: '',
    instructions: '',
  });

  const registrationValidationRules = {
    fullName: [(value) => validationRules.required(value, 'Full Name')],
    purpose: [(value) => validationRules.required(value, 'Purpose of Visit')],
    pickupLocation: [(value) => needsCab && validationRules.required(value, 'Pickup Location')],
    company: [(value) => validationRules.required(value, 'Company Name')],
    email: [(value) => validationRules.required(value, 'Email Address'), validationRules.email],
    mobileNumber: [(value) => validationRules.required(value, 'Mobile Number'), validationRules.mobile],
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const errors = validateForm(formData, registrationValidationRules);
    if (!visitDate) {
      errors.visitDate = 'Select Visit Date and Time';
    }
    if (needsCab && !pickupTime) {
      errors.pickupTime = 'Select Pickup Time';
    }

    setFormErrors(errors);

    if (Object.keys(errors).length > 0) return;

    setLoading(true);
    try {
      const params = {
        ...formData,
        visitDate,
        pickupTime: needsCab ? pickupTime : null,
      };

      const res = await visitorRegister(params);
      if (res.status) {
        toast.success(res.message || 'Registration successful');
        setVisitData(res.data);
        setShowModal(true);
        setFormData({
          fullName: '',
          mobileNumber: '',
          email: '',
          company: '',
          purpose: '',
          pickupLocation: '',
          instructions: '',
        });
        setVisitDate(null);
        setPickupTime(null);
        setNeedsCab(false);
      } else {
        toast.error(res.message || 'Registration failed');
      }
    } catch (error) {
      toast.error(error.response?.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);
    return currentDate.getTime() < selectedDate.getTime();
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Modal
        isOpen={showModal}
        title={'Visitor Registration Confirmation'}
        onClose={() => setShowModal(false)}
        children={
          <div className="md:p-6 p-4 mx-auto space-y-6">
            <div className="flex flex-col items-center space-y-4">
              <div className="bg-blue-50 p-4 rounded-xl border-2 border-blue-100 hover:shadow-md transition-all duration-300">
                <Image
                  src={visitData?.qrCodeImage}
                  width={200}
                  height={200}
                  alt="Visitor QR Code"
                  className="rounded-lg"
                />
              </div>

              <Link
                href={`visitor-details?id=${visitData?.visitorId}`}
                className="text-primary hover:text-blue-800 transition-colors flex items-center space-x-2"
              >
                <span>Scan QR code or click here for details</span>

                <FontAwesomeIcon icon={faArrowRight} width={20} height={20} />
              </Link>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 shadow-sm dark:bg-[#000] dark:border-[#4D4D4D]">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 rounded-full p-2 flex justify-center items-center">
                  <FontAwesomeIcon width={25} height={25} icon={faCheckCircle} className="text-primary text-2xl" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 dark:text-white">
                    Visit Scheduling in Progress
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-white space-y-1">
                    <div className="flex items-center space-x-2">
                      <FontAwesomeIcon width={25} height={25} icon={faCheckCircle} className="text-green-500 mr-2" />
                      Visit is pending final approval
                    </div>
                    <div className="flex items-center space-x-2">
                      <FontAwesomeIcon width={25} height={25} icon={faEnvelope} className="text-primary mr-2" />
                      Confirmation email will be sent shortly
                    </div>
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <p className="text-xs text-gray-500 dark:text-white">Please keep this QR code handy for your visit</p>
            </div>
          </div>
        }
      />
      <div className="bg-white dark:bg-[#1F1F1F] min-h-screen shadow-md hover:shadow-lg transition-shadow duration-300 p-5 rounded-lg">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 capitalize"> Register New Visitor</h2>
        <form onSubmit={handleRegister} className="space-y-6 w-full">
          <div className="space-y-4">
            <h2 className="text-lg font-medium text-gray-700 dark:text-white flex items-center gap-2">
              <FontAwesomeIcon width={20} height={20} icon={faUser} className="text-primary" />
              Visitor Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                name="fullName"
                type="text"
                value={formData?.fullName
                  ?.replace(/^\s+/, '')
                  .replace(/\s{2,}/g, ' ')
                  .trimStart()}
                onChange={(e) => handleChange(e, setFormData, setFormErrors)}
                label="Full Name"
                placeholder="Enter visitor's full name"
                error={formErrors.fullName}
              />

              <InputField
                name="mobileNumber"
                type="tel"
                value={formData?.mobileNumber?.replace(/\s+/g, '')}
                onChange={(e) => handleNumericInput(e, setFormData, setFormErrors)}
                label="Mobile Number"
                placeholder="Enter mobile number"
                error={formErrors.mobileNumber}
              />

              <InputField
                name="email"
                type="text"
                value={formData?.email?.replace(/\s+/g, '')}
                onChange={(e) => handleChange(e, setFormData, setFormErrors)}
                label="Email Address"
                placeholder="Enter email address"
                error={formErrors.email}
              />

              <InputField
                name="company"
                type="text"
                value={formData?.company
                  ?.replace(/^\s+/, '')
                  .replace(/\s{2,}/g, ' ')
                  .trimStart()}
                onChange={(e) => handleChange(e, setFormData, setFormErrors)}
                label="Company"
                placeholder="Enter company name"
                error={formErrors.company}
              />
              <div className="w-full">
                <label className="input-label">Visit Date Time</label>
                <ReactDatePicker
                  peekNextMonth
                  timeIntervals={15}
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  selected={visitDate}
                  onChange={(date) => setVisitDate(date)}
                  placeholderText="Select visit date and time"
                  showTimeSelect
                  timeFormat="h:mm aa"
                  dateFormat="dd MMM yyyy h:mm aa"
                  className="w-full input-box"
                  onKeyDown={(e) => e.preventDefault()}
                  minDate={new Date()}
                  filterTime={filterPassedTime}
                />
                {formErrors.visitDate && <p className="error-msg">{formErrors.visitDate}</p>}
              </div>
              <div>
                <label className="input-label">Purpose of Visit</label>
                <textarea
                  name="purpose"
                  value={formData.purpose}
                  onChange={(e) => handleChange(e, setFormData, setFormErrors)}
                  className="input-box rounded-md"
                  rows="3"
                  placeholder="Enter purpose of visit"
                ></textarea>
                {formErrors.purpose && <p className="error-msg">{formErrors.purpose}</p>}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-700 dark:text-white flex items-center gap-2">
                <FontAwesomeIcon width={20} height={20} icon={faCar} className="text-primary" />
                Cab Requirement
              </h2>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={needsCab}
                  onChange={(e) => setNeedsCab(e.target.checked)}
                />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-100 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                <span className="ms-3 text-sm font-medium text-gray-700 dark:text-white sm:inline-block hidden">
                  Need cab pickup
                </span>
              </label>
            </div>

            {needsCab && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 dark:bg-[#1a1a1a] rounded-lg">
                <InputField
                  name="pickupLocation"
                  type="text"
                  value={formData?.pickupLocation
                    ?.replace(/^\s+/, '')
                    .replace(/\s{2,}/g, ' ')
                    .trimStart()}
                  onChange={(e) => handleChange(e, setFormData, setFormErrors)}
                  label="Pickup Address"
                  placeholder="Enter pickup address"
                  error={formErrors.pickupLocation}
                />

                <div>
                  <label className="input-label">Pickup Time</label>
                  <ReactDatePicker
                    selected={pickupTime}
                    onChange={(date) => setPickupTime(date)}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    dateFormat="h:mm aa"
                    placeholderText="Enter pickup time"
                    className="w-full input-box"
                    onKeyDown={(e) => e.preventDefault()}
                    minTime={setHours(setMinutes(new Date(), 0), new Date().getHours())}
                    maxTime={setHours(setMinutes(new Date(), 45), 23)}
                  />
                  {formErrors.pickupTime && <p className="error-msg">{formErrors.pickupTime}</p>}
                </div>
                <div className="md:col-span-2">
                  <label className="input-label">Additional Instructions</label>
                  <div>
                    <textarea
                      name="instructions"
                      value={formData.instructions}
                      onChange={(e) => handleChange(e, setFormData, setFormErrors)}
                      className="input-box rounded-md"
                      rows="3"
                      placeholder="Enter additional instructions"
                    ></textarea>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="text-center">
            <button type="submit" className="primary-btn" disabled={loading}>
              {loading ? 'Registering...' : 'Register Visitor'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default VisitorRegistration;
