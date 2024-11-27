import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCar } from '@fortawesome/free-solid-svg-icons';
import toast, { Toaster } from 'react-hot-toast';
import { handleChange, handleNumericInput, validateForm, validationRules } from '@/utils/formUtils';
import 'react-datepicker/dist/react-datepicker.css';
import ReactDatePicker from 'react-datepicker';
import Image from 'next/image';
import { setHours, setMinutes } from 'date-fns';
import { InputField } from './reusableComponents/InputField';
import axios from 'axios';
import dynamic from 'next/dynamic';
import { visitorRegister } from '@/utils/servicesApi';
const Modal = dynamic(() => import('./reusableComponents/Modal'));

const VisitorRegistration = () => {
  const [needsCab, setNeedsCab] = useState(false);
  const [visitDate, setVisitDate] = useState(null);
  const [pickupTime, setPickupTime] = useState(null);
  const [qrCodeImage, setQrCodeImage] = useState(null);
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
        setQrCodeImage(res.data.qrCodeImage);
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
        onClose={() => setShowModal(false)}
        children={
          <div className="my-3 text-center flex items-center">
            <Image src={qrCodeImage} width={100} height={100} alt="qr-code" />
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-800">
                You visit will be scheduled pending approval.
              </h3>
              <h3 className="text-lg leading-6 font-medium text-gray-800">
                Upon confrimation an email will be sent for you to finalize
              </h3>
            </div>
          </div>
        }
      />
      <div className="min-h-screen min-w-full bg-[url('/img/login-bg.svg')] bg-no-repeat bg-center bg-cover before:relative">
        <div className="flex flex-col mt-3 md:mt-0 md:justify-center items-center min-h-screen">
          <div className="flex space-x-3 items-center justify-center md:mt-6 mt-3">
            <Image width={50} height={50} src={'/img/logo.svg'} />
            <h1 className="text-primary text-5xl font-serif tracking-widest">VMS</h1>
          </div>
          <div className="md:mx-aut w-11/12 sm:w-2/3 xl:w-1/2 2xl:w-2/5 bg-white rounded-xl shadow-[0px_0px_7px_0px_rgba(0,0,0,0.1)] p-4 md:p-6 my-3 md:my-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3 md:mb-6 text-center">Register New Visitor</h2>
            <form onSubmit={handleRegister} className="space-y-6 w-full">
              <div className="space-y-2">
                <h2 className="text-lg font-medium text-gray-700 flex items-center gap-2">
                  <FontAwesomeIcon width={20} height={20} icon={faUser} className="text-primary" />
                  Visitor Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
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
                      className="w-full"
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

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-medium text-gray-700 flex items-center gap-2">
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
                    <span className="ms-3 text-sm font-medium text-gray-700 sm:inline-block hidden">
                      Need cab pickup
                    </span>
                  </label>
                </div>

                {needsCab && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 p-4 bg-gray-50 rounded-lg">
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
        </div>
      </div>
    </>
  );
};

export default VisitorRegistration;
