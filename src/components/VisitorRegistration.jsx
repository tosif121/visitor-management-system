import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCar } from '@fortawesome/free-solid-svg-icons';
import toast, { Toaster } from 'react-hot-toast';
import { handleChange, handleNumericInput, validateForm, validationRules } from '@/utils/formUtils';
import { InputField } from './reusableComponents/InputField';
import 'react-datepicker/dist/react-datepicker.css';
import ReactDatePicker from 'react-datepicker';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import Image from 'next/image';
import { setHours, setMinutes } from 'date-fns';

const VisitorRegistration = () => {
  const router = useRouter();
  const [needsCab, setNeedsCab] = useState(false);
  const [visitDate, setVisitDate] = useState(null);
  const [pickupTime, setPickupTime] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
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
    phoneNumber: [(value) => validationRules.required(value, 'Mobile Number'), validationRules.mobile],
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
        needsCab,
      };

      router.push('/');
      if (res.status) {
        toast.success('Visitor registered successfully');
        Cookies.set('vms_token', res.data.accessToken, { expires: 30, path: '/' });
        setFormData({
          fullName: '',
          phoneNumber: '',
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
      toast.error('An error occurred. Please try again.');
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
      <div className="h-screen w-screen bg-[url('/img/login-bg.svg')] bg-no-repeat bg-center bg-cover overflow-x-hidden before:relative">
        <div className="flex flex-col mt-3 md:mt-0 md:justify-center items-center min-h-screen">
          <div className="flex space-x-3 items-center justify-center">
            <Image width={50} height={50} src={'/img/logo.svg'} />
            <h1 className="text-primary text-5xl font-serif tracking-widest">VMS</h1>
          </div>
          <div className="md:mx-aut w-11/12 sm:w-2/3 lg:w-1/2 2xl:w-2/5 bg-white rounded-xl shadow-[0px_0px_7px_0px_rgba(0,0,0,0.1)] p-4 md:p-6 my-3 md:my-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3 md:mb-6 text-center">Register New Visitor</h2>
            <form onSubmit={handleRegister} className="space-y-6 w-full">
              <div className="md:space-y-4">
                <h2 className="text-lg font-medium text-gray-700 flex items-center gap-2">
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
                    name="phoneNumber"
                    type="tel"
                    value={formData?.phoneNumber?.replace(/\s+/g, '')}
                    onChange={(e) => handleNumericInput(e, setFormData, setFormErrors)}
                    label="Mobile Number"
                    placeholder="Enter mobile number"
                    error={formErrors.phoneNumber}
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

              <div className="md:space-y-4">
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
                    <span className="ms-3 text-sm font-medium text-gray-700">Need cab pickup</span>
                  </label>  
                </div>

                {needsCab && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
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
                          onChange={handleChange}
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
